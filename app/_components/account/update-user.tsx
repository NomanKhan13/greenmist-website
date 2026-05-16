"use client";
import React, { useActionState } from "react";
import { FormField } from "./form-field";
import { Button } from "@/components/ui/button";
import { handleUpdate } from "@/app/_lib/auth";

export default function UpdateUser({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) {
  const [state, formAction, isPending] = useActionState(handleUpdate, null);

  return (
    <form className="space-y-6 mb-12" action={formAction}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          name="fullName"
          label="First Name"
          type="text"
          defaultValue={fullName}
          placeholder="John"
        />

        <FormField
          name="email"
          label="Email"
          type="email"
          defaultValue={email}
          placeholder="John@gmail.com"
        />
      </div>
      <Button
        variant="secondary"
        type="submit"
        disabled={isPending}
        className="cursor-pointer p-6"
      >
        Save Changes
      </Button>
      {state?.error && (
        <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-center">
          <p className="text-sm font-medium text-destructive">{state.error}</p>
        </div>
      )}
    </form>
  );
}
