import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-8 duration-700">
        <LoginForm />
      </div>
    </div>
  );
}
