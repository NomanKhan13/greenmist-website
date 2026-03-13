import { cn } from "@/lib/utils";
import { Loading02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <HugeiconsIcon
      icon={Loading02Icon}
      strokeWidth={1.5}
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin text-primary", className)}
      {...props}
    />
  );
}

export { Spinner };
