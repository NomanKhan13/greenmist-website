"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabase-server";
import { revalidatePath } from "next/cache";

export async function getUserData() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userData = {
    email: user?.email,
    full_name: user?.user_metadata.full_name,
  };
  return userData;
}

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

export async function handleUpdate(prevState: any, formData: FormData) {
  const newName = formData.get("fullName")?.toString().trim();
  const newEmail = formData.get("email")?.toString().trim();

  if (!newName || !newEmail)
    return { success: false, error: "All fields are required." };

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) return { success: false, error: "401 Unauthorized" };

  console.log("Old email", user.email);
  console.log("New email", newEmail);
  if (newEmail && newEmail !== user.email) {
    const { data, error: emailUpdateError } = await supabase.auth.updateUser({
      email: newEmail,
    });
    console.log("Data is: ", data);

    console.log(emailUpdateError);
    if (emailUpdateError)
      return { success: false, error: "Error while updating email." };
  } else if (newName) {
    const { data, error: nameUpdateError } = await supabase
      .from("profiles")
      .update({ full_name: newName })
      .eq("id", user.id);
    console.log(data);
    if (nameUpdateError)
      return { success: false, error: "Error while updating name." };
  }
  revalidatePath("/account");
  return {
    success: true,
    error: "",
    message:
      "Profile updated successfully. If you changed your email, check your inbox.",
  };
}

export async function handlePasswordChange(prevState: any, formData: FormData) {
  const currentPassword = formData.get("current-password")?.toString();
  const newPassword = formData.get("new-password")?.toString();

  if (!currentPassword || !newPassword)
    return {
      success: false,
      error: "Both current password and new password are required.",
    };

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user)
    return { success: false, error: "401 Unauthorized request" };

  const { data, error: passwordUpdateError } = await supabase.auth.updateUser({
    current_password: currentPassword,
    password: newPassword,
  });
  console.log("Password Error: ", passwordUpdateError);
  console.log("Data? : ", data);

  if (passwordUpdateError) {
    return { success: false, error: passwordUpdateError.message };
  } else {
    await supabase.auth.signOut();
    redirect(
      "/login?message=Password updated successfully. Please log in again.",
    );
  }
}

export async function handleLogout() {
  const supabase = await createClient();

  await supabase.auth.signOut();
  redirect("/login");
}
