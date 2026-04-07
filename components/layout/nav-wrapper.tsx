import { createClient } from "@/lib/supabase/server";
import Nav from "./nav";

export default async function NavWrapper() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let username: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .single();
    username = profile?.username ?? null;
  }

  return <Nav user={user ? { id: user.id, username } : null} />;
}
