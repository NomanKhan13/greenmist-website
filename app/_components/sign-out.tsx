import { Button } from "@/components/ui/button";
import { Logout01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { handleLogout } from "../_lib/auth";

export function LogoutButton() {
  return (
    <form action={handleLogout}>
      <Button
        type="submit"
        variant="ghost"
        className="cursor-pointer rounded-lg w-full px-4 py-6 justify-start  hover:bg-destructive/25!"
      >
        <HugeiconsIcon icon={Logout01Icon} size={12} />
        <span>Log out</span>
      </Button>
    </form>
  );
}
