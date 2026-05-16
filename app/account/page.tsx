import { createClient } from "../_lib/supabase-server";
import UpdateUser from "../_components/account/update-user";
import UpdatePassword from "../_components/account/update-password";

export default async function AccountSettings() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user?.id)
    .single();

  const fullName = profile?.full_name || user?.user_metadata?.full_name || "";
  const email = user?.user_metadata?.email;
  console.log("User Profile:", { fullName, email });
  return (
    <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
      <h3 className="text-3xl font-serif mb-2">Personal Details</h3>
      <p className="text-muted-foreground mb-8 text-sm">
        Update your information and secure your account.
      </p>

      <UpdateUser fullName={fullName} email={email} />

      {/* Password Form */}
      <h4 className="text-xl font-serif mb-6 pt-6 border-t border-border">
        Change Password
      </h4>
      <UpdatePassword />
    </div>
  );
}
