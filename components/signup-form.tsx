"use client";
import { handleRegister } from "@/app/_lib/auth";
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
import { Mail02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useActionState } from "react";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [state, formAction, isPending] = useActionState(handleRegister, null);

  return (
    <div className="relative flex flex-col gap-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <Card
        className="border-border/50 bg-card/40 backdrop-blur-sm shadow-2xl relative z-10"
        {...props}
      >
        <CardHeader>
          <CardTitle className="font-serif text-2xl">
            {state?.success ? "Account Created" : "Create an account"}
          </CardTitle>
          <CardDescription>
            {state?.success
              ? "You're almost there."
              : "Enter your information below to create your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state?.success ? (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-5 animate-in fade-in zoom-in duration-500">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center shadow-inner shadow-primary/20">
                <HugeiconsIcon
                  icon={Mail02Icon}
                  className="h-8 w-8 text-primary"
                  strokeWidth={1.5}
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-foreground">
                  Check your email
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                  {state.message}
                </p>
              </div>
              <Button asChild className="w-full">
                <Link href="/account/my-profile">My Profile</Link>
              </Button>
            </div>
          ) : (
            /* --- FORM STATE --- */
            <form action={formAction}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input
                    id="name"
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                    className="bg-background/50"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    className="bg-background/50"
                    required
                  />
                  <FieldDescription>
                    We&apos;ll use this to contact you. We will not share your
                    email with anyone else.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    className="bg-background/50"
                    required
                  />
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    id="confirm-password"
                    name="confirm-password"
                    className="bg-background/50"
                    type="password"
                    required
                  />
                  <FieldDescription>
                    Please confirm your password.
                  </FieldDescription>
                </Field>
                <FieldGroup>
                  <Field className="pt-2">
                    <Button
                      type="submit"
                      className="w-full shadow-lg shadow-primary/20"
                      disabled={isPending}
                    >
                      {isPending ? "Setting up..." : "Create Account"}
                    </Button>
                    <FieldDescription className="text-center mt-4">
                      Already have an account?{" "}
                      <Link
                        href="/account/login"
                        className="text-primary hover:underline"
                      >
                        Login
                      </Link>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldGroup>

              {/* Error messages remain attached to the bottom of the form */}
              {state?.error && (
                <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-center">
                  <p className="text-sm font-medium text-destructive">
                    {state.error}
                  </p>
                </div>
              )}
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
