import React from "react";

export function FormField({
  name,
  type,
  label,
  defaultValue,
  placeholder,
}: {
  name: string;
  type: string;
  label: string;
  defaultValue?: string;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col">
      <label
        className="text-xs uppercase tracking-widest text-muted-foreground font-medium py-2"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="w-full bg-muted/30  border border-ring/40 dark:border-border rounded-sm p-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition placeholder:text-muted-foreground/50"
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  );
}
