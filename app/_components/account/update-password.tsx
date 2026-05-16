"use client";
import { useActionState } from "react";
import { FormField } from "./form-field";
import { Button } from "@/components/ui/button";
import { handlePasswordChange } from "@/app/_lib/auth";

export default function UpdatePassword() {
  const [state, formAction, isPending] = useActionState(
    handlePasswordChange,
    null,
  );

  return (
    <form className="space-y-6" action={formAction}>
      <FormField
        name="current-password"
        label="Current Password"
        type="password"
        placeholder="*******"
      />

      <FormField
        name="new-password"
        label="New Password"
        type="password"
        placeholder="John@123"
      />

      <Button className="cursor-pointer p-6" disabled={isPending}>
        {isPending ? "Updating..." : "Update Password"}
      </Button>
      {state?.error && (
        <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-center">
          <p className="text-sm font-medium text-destructive">{state.error}</p>
        </div>
      )}
    </form>
  );
}
