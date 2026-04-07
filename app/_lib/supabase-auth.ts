import { supabase } from "./supabase";

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "someone@email.com",
    password: "GzgVVrSDYxrkECzIuVWZ",
  });

  if (error) {
    console.log(error.message);
    throw new Error("Error while logging in");
  }

  return data;
}
