import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecret = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
// const supabaseSecret = process.env.NEXT_PUBLIC_SUPABASE_SECRET;

if (!supabaseUrl || !supabaseSecret) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseSecret);
