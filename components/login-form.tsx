"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { handleLogin } from "@/app/_lib/auth";
import { useActionState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, formAction, isPending] = useActionState(handleLogin, null);
  return (
    <div className={cn("relative flex flex-col gap-6", className)} {...props}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <Card className="border-border/50 bg-card/40 backdrop-blur-sm shadow-2xl relative z-10">
        <CardHeader>
          <CardTitle className="font-serif text-2xl">
            Login to your account
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="bg-background/50"
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm text-muted-foreground underline-offset-4 hover:text-primary transition-colors"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="bg-background/50"
                />
              </Field>
              <Field className="pt-2">
                <Button
                  disabled={isPending}
                  type="submit"
                  className="w-full shadow-lg shadow-primary/20"
                >
                  {isPending ? "Logging in..." : "Login"}
                </Button>
                <FieldDescription className="text-center mt-4">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/account/register"
                    className="text-primary hover:underline"
                  >
                    Register
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
            {state?.error && (
              <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-center">
                <p className="text-sm font-medium text-destructive">
                  {state.error}
                </p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
