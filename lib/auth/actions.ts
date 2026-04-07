"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { error?: string; message?: string } | undefined;

export async function signUp(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const username = formData.get("username") as string;

  if (!email || !password || !username) {
    return { error: "All fields are required." };
  }
  if (username.length < 3) {
    return { error: "Username must be at least 3 characters." };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username },
    },
  });

  if (error) {
    return { error: error.message };
  }

  // Email confirmation required — session is null until confirmed
  if (data.user && !data.session) {
    return {
      message:
        "Check your email for a confirmation link, then come back to log in.",
    };
  }

  redirect("/diary");
}

export async function signIn(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Surface a friendlier message for the most common case
    if (error.message.toLowerCase().includes("invalid login")) {
      return { error: "Incorrect email or password." };
    }
    if (error.message.toLowerCase().includes("not confirmed")) {
      return { error: "Please confirm your email before logging in." };
    }
    return { error: error.message };
  }

  redirect("/diary");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
