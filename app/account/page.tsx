import { Button } from "@/components/ui/button";
import { createClient } from "../_lib/supabase-server";

export default async function AccountSettings() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const fullName = user?.user_metadata?.full_name;
  const email = user?.user_metadata?.email;

  return (
    <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
      <h3 className="text-3xl font-serif mb-2">Personal Details</h3>
      <p className="text-muted-foreground mb-8 text-sm">
        Update your information and secure your account.
      </p>

      {/* Profile Info Form */}
      <form className="space-y-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label
              className="text-xs uppercase tracking-widest text-muted-foreground font-medium py-2"
              htmlFor="fullName"
            >
              First Name
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full bg-muted/30  border border-ring/40 dark:border-border rounded-sm p-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition placeholder:text-muted-foreground/50"
              placeholder="John"
              defaultValue={fullName}
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-xs uppercase tracking-widest text-muted-foreground font-medium py-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full bg-muted/30  border border-ring/40 dark:border-border rounded-sm p-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition placeholder:text-muted-foreground/50"
              placeholder="John@gmail.com"
              defaultValue={email}
            />
          </div>
        </div>
        <Button variant="secondary" className="cursor-pointer p-6">
          Save Changes
        </Button>
      </form>

      {/* Password Form */}
      <h4 className="text-xl font-serif mb-6 pt-6 border-t border-border">
        Change Password
      </h4>
      <form className="space-y-6">
        <div className="flex flex-col">
          <label
            className="text-xs uppercase tracking-widest text-muted-foreground font-medium py-2"
            htmlFor="current-password"
          >
            Current Password
          </label>
          <input
            type="text"
            id="current-password"
            className="w-full bg-muted/30  border border-ring/40 dark:border-border rounded-sm p-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition placeholder:text-muted-foreground/50"
            placeholder="*******"
          />
        </div>
        <div className="flex flex-col">
          <label
            className="text-xs uppercase tracking-widest text-muted-foreground font-medium py-2"
            htmlFor="fullName"
          >
            New Password
          </label>
          <input
            type="text"
            id="new-password"
            className="w-full bg-muted/30  border border-ring/40 dark:border-border rounded-sm p-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition placeholder:text-muted-foreground/50"
            placeholder="John@123"
          />
        </div>
        <Button className="cursor-pointer p-6">Update Password</Button>
      </form>
    </div>
  );
}
