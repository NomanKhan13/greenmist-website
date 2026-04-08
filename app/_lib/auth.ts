"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabase-server";

export async function handleLogin(prevState: any, formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password)
    return { success: false, error: "Email and password are required" };

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { success: false, error: error.message };

  redirect("/account");
}

export async function handleRegister(prevState: any, formData: FormData) {
  const fullName = formData.get("fullName")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirm-password")?.toString();

  if (!fullName || !email || !password || !confirmPassword)
    return { success: false, error: "All fields are required." };

  if (password.length < 8)
    return {
      success: false,
      error: "Password must be at least 8 characters long.",
    };

  if (password !== confirmPassword)
    return {
      success: false,
      error: "Password and confirm password should match",
    };

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });
  if (error) {
    return { success: false, error: error.message };
  }
  if (data.user && data.user.identities && data.user.identities.length === 0) {
    return { success: false, error: "This email is already in use." };
  }
  return {
    success: true,
    message: `Welcome to GreenMist, ${fullName}! Please check your email to verify your account.`,
  };
}

export async function handleLogout() {
  const supabase = await createClient();

  // Destroys the session cookie
  await supabase.auth.signOut();

  // Redirects the guest back to the login screen
  redirect("/login");
}
