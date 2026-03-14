import { Button } from "@/components/ui/button";
import Link from "next/link";
// import Image from "next/image";
// import logo from "@/public/greenmist.png";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mountain, User02Icon } from "@hugeicons/core-free-icons";
import { MobileMenu } from "./mobile-menu";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md bg-background/25 border-b border-border/30 support-[backdrop-filter]:bg-background/25">
      <div className="max-w-7xl w-full mx-auto px-6 h-16 flex justify-between items-center">
        <Link
          href="/"
          className="group flex items-center gap-3 shrink-0 text-foreground opacity-90 hover:opacity-100 transition-all duration-300"
        >
          <HugeiconsIcon
            icon={Mountain}
            size={24}
            color="currentColor"
            strokeWidth={1.5}
            className="text-primary transition-transform duration-500 ease-out group-hover:scale-110"
          />

          <span className="font-serif text-2xl tracking-wide font-medium">
            GreenMist
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          <NavLink href="/stays">Stays</NavLink>
          <NavLink href="/#about">The Estate</NavLink>
          <NavLink href="/#experiences">Experiences</NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-secondary-foreground/75 dark:text-muted-foreground hover:text-foreground hover:bg-transparent px-2 cursor-pointer"
          >
            <HugeiconsIcon
              icon={User02Icon}
              size={16}
              color="currentColor"
              strokeWidth={1.5}
              className="group-hover:translate-x-1 transition"
            />
            <span>Account</span>
          </Button>

          {/* Mobile Menu Trigger would go here */}
          <div className="block md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

// Helper Component for consistent luxury links
export function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-xs uppercase tracking-widest font-medium text-secondary-foreground/75 dark:text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full opacity-50" />
    </Link>
  );
}
