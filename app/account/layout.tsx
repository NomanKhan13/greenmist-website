import ProfileSidebar from "../_components/account/profile-sidebar";
import { LogoutButton } from "../_components/sign-out";

export default function page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="max-w-7xl w-full mx-auto mt-32 flex flex-col sm:flex-row justify-center">
      <ProfileSidebar />
      <div className="px-6 sm:px-12 py-6">{children}</div>
      <div className="block sm:hidden bg-destructive/10 text-destructive rounded-lg mx-4">
        <LogoutButton />
      </div>
    </section>
  );
}
