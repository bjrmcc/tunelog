-- ============================================================
-- tunelog — initial schema
-- ============================================================

-- ── helpers ──────────────────────────────────────────────────

-- citext for case-insensitive text comparisons (username uniqueness)
create extension if not exists citext;

-- auto-update updated_at on any table that has the column
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;


-- ── 1. profiles ──────────────────────────────────────────────
-- Public user data. 1:1 with auth.users, created via trigger on signup.

create table profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  username      citext unique not null,
  display_name  text,
  bio           text,
  avatar_url    text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create trigger profiles_updated_at
  before update on profiles
  for each row execute function set_updated_at();

-- auto-create a profile row when a user signs up
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, username)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', 'user_' || substr(new.id::text, 1, 8))
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();


-- ── 2. albums ────────────────────────────────────────────────
-- Local Spotify album cache. Written once on first interaction.

create table albums (
  id                uuid primary key default gen_random_uuid(),
  spotify_id        text unique not null,
  title             text not null,
  artist            text not null,
  artist_spotify_id text,
  cover_url         text,
  release_year      smallint,
  created_at        timestamptz not null default now()
);

create index albums_spotify_id_idx on albums(spotify_id);


-- ── 3. tracks ────────────────────────────────────────────────
-- Local Spotify track cache, scoped to an album.

create table tracks (
  id           uuid primary key default gen_random_uuid(),
  spotify_id   text unique not null,
  album_id     uuid not null references albums(id) on delete cascade,
  title        text not null,
  track_number smallint,
  duration_ms  integer,
  created_at   timestamptz not null default now()
);

create index tracks_album_id_idx on tracks(album_id);
create index tracks_spotify_id_idx on tracks(spotify_id);


-- ── 4. listen_logs ───────────────────────────────────────────
-- Diary entries. A user can log the same album multiple times
-- (relisten support built in from day one).

create table listen_logs (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references profiles(id) on delete cascade,
  album_id    uuid not null references albums(id) on delete cascade,
  listened_at date not null default current_date,
  notes       text,
  created_at  timestamptz not null default now()
);

create index listen_logs_user_id_idx     on listen_logs(user_id);
create index listen_logs_album_id_idx    on listen_logs(album_id);
create index listen_logs_listened_at_idx on listen_logs(listened_at desc);


-- ── 5. album_ratings ─────────────────────────────────────────
-- One rating (+optional review) per user per album.
-- Half-star scale: 0.5 to 5.0 in 0.5 increments.

create table album_ratings (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references profiles(id) on delete cascade,
  album_id   uuid not null references albums(id) on delete cascade,
  rating     numeric(3,1) not null
               check (rating >= 0.5 and rating <= 5.0 and mod(rating * 2, 1) = 0),
  review     text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, album_id)
);

create trigger album_ratings_updated_at
  before update on album_ratings
  for each row execute function set_updated_at();

create index album_ratings_user_id_idx  on album_ratings(user_id);
create index album_ratings_album_id_idx on album_ratings(album_id);


-- ── 6. track_ratings ─────────────────────────────────────────
-- One rating per user per track. Independent of album ratings.

create table track_ratings (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references profiles(id) on delete cascade,
  track_id   uuid not null references tracks(id) on delete cascade,
  rating     numeric(3,1) not null
               check (rating >= 0.5 and rating <= 5.0 and mod(rating * 2, 1) = 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, track_id)
);

create trigger track_ratings_updated_at
  before update on track_ratings
  for each row execute function set_updated_at();

create index track_ratings_user_id_idx  on track_ratings(user_id);
create index track_ratings_track_id_idx on track_ratings(track_id);


-- ── 7. lists ─────────────────────────────────────────────────
-- Curated collections and rankings (albums only for MVP).
-- When is_ranked = true, list_items.position is meaningful.

create table lists (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references profiles(id) on delete cascade,
  title       text not null,
  description text,
  is_ranked   boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger lists_updated_at
  before update on lists
  for each row execute function set_updated_at();

create index lists_user_id_idx on lists(user_id);


-- ── 8. list_items ────────────────────────────────────────────
-- Albums within a list. Position is only enforced unique when set
-- (allows unranked lists where position is null).

create table list_items (
  id         uuid primary key default gen_random_uuid(),
  list_id    uuid not null references lists(id) on delete cascade,
  album_id   uuid not null references albums(id) on delete cascade,
  position   smallint check (position is null or position > 0),
  note       text,
  created_at timestamptz not null default now(),
  unique(list_id, album_id)
);

-- partial unique index: positions must be unique within a ranked list
create unique index list_items_ranked_position_idx
  on list_items(list_id, position)
  where position is not null;

create index list_items_list_id_idx on list_items(list_id);


-- ============================================================
-- Row Level Security
-- ============================================================

alter table profiles     enable row level security;
alter table albums       enable row level security;
alter table tracks       enable row level security;
alter table listen_logs  enable row level security;
alter table album_ratings enable row level security;
alter table track_ratings enable row level security;
alter table lists        enable row level security;
alter table list_items   enable row level security;

-- profiles
create policy "profiles are publicly readable"
  on profiles for select using (true);

create policy "users can update their own profile"
  on profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- albums & tracks (shared catalog — anyone can read, auth users can insert)
create policy "albums are publicly readable"
  on albums for select using (true);

create policy "authenticated users can insert albums"
  on albums for insert with check (auth.role() = 'authenticated');

create policy "tracks are publicly readable"
  on tracks for select using (true);

create policy "authenticated users can insert tracks"
  on tracks for insert with check (auth.role() = 'authenticated');

-- listen_logs
create policy "listen logs are publicly readable"
  on listen_logs for select using (true);

create policy "users can insert their own listen logs"
  on listen_logs for insert with check (auth.uid() = user_id);

create policy "users can update their own listen logs"
  on listen_logs for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "users can delete their own listen logs"
  on listen_logs for delete using (auth.uid() = user_id);

-- album_ratings
create policy "album ratings are publicly readable"
  on album_ratings for select using (true);

create policy "users can insert their own album ratings"
  on album_ratings for insert with check (auth.uid() = user_id);

create policy "users can update their own album ratings"
  on album_ratings for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "users can delete their own album ratings"
  on album_ratings for delete using (auth.uid() = user_id);

-- track_ratings
create policy "track ratings are publicly readable"
  on track_ratings for select using (true);

create policy "users can insert their own track ratings"
  on track_ratings for insert with check (auth.uid() = user_id);

create policy "users can update their own track ratings"
  on track_ratings for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "users can delete their own track ratings"
  on track_ratings for delete using (auth.uid() = user_id);

-- lists
create policy "lists are publicly readable"
  on lists for select using (true);

create policy "users can insert their own lists"
  on lists for insert with check (auth.uid() = user_id);

create policy "users can update their own lists"
  on lists for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "users can delete their own lists"
  on lists for delete using (auth.uid() = user_id);

-- list_items (ownership checked via the parent list)
create policy "list items are publicly readable"
  on list_items for select using (true);

create policy "users can insert items into their own lists"
  on list_items for insert with check (
    exists (select 1 from lists where id = list_id and user_id = auth.uid())
  );

create policy "users can update items in their own lists"
  on list_items for update
  using (
    exists (select 1 from lists where id = list_id and user_id = auth.uid())
  )
  with check (
    exists (select 1 from lists where id = list_id and user_id = auth.uid())
  );

create policy "users can delete items from their own lists"
  on list_items for delete using (
    exists (select 1 from lists where id = list_id and user_id = auth.uid())
  );
