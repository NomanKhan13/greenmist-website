"use client"; // Must be a client component for scroll state

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mountain, User02Icon } from "@hugeicons/core-free-icons";
import { MobileMenu } from "./mobile-menu";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isTargetPathname =
    pathname === "/" || pathname.startsWith("/stays/greenmist");

  const makeBgTransparent = isTargetPathname && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all backdrop-blur-md border-b",
        makeBgTransparent
          ? "bg-transparent border-transparent text-white"
          : "bg-background/50 border-border/60 text-foreground support-[backdrop-filter]:bg-background/50",
      )}
    >
      <div className="max-w-7xl w-full mx-auto px-6 h-16 flex justify-between items-center">
        <Link
          href="/"
          className="group flex items-center gap-3 shrink-0 opacity-90 hover:opacity-100 transition-all"
        >
          <HugeiconsIcon
            icon={Mountain}
            size={24}
            color="currentColor"
            strokeWidth={1.5}
            className={`transition-transform ease-out group-hover:scale-110 text-primary`}
          />

          <span className="font-serif text-2xl tracking-wide font-medium">
            GreenMist
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {/* Pass the scroll state down to the nav links so they know what color to be */}
          <NavLink href="/stays" makeBgTransparent={makeBgTransparent}>
            Stays
          </NavLink>
          <NavLink href="/estate" makeBgTransparent={makeBgTransparent}>
            The Estate
          </NavLink>
          <NavLink href="/experiences" makeBgTransparent={makeBgTransparent}>
            Experiences
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant={makeBgTransparent ? "outline" : "secondary"} // Changes button style based on background
            size="sm"
            className={`hidden sm:flex cursor-pointer ${
              !makeBgTransparent &&
              "bg-white/10 hover:bg-white/20 text-white border-none"
            }`}
            asChild
          >
            <Link href="/account">
              <HugeiconsIcon
                icon={User02Icon}
                size={16}
                color="currentColor"
                strokeWidth={1.5}
                className="group-hover:translate-x-1 transition"
              />
              <span>Account</span>
            </Link>
          </Button>

          <div className="block md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export function NavLink({
  href,
  children,
  makeBgTransparent,
}: {
  href: string;
  children: React.ReactNode;
  makeBgTransparent: boolean;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "text-xs uppercase tracking-widest font-medium transition-colors relative group",
        makeBgTransparent
          ? "text-white/80 hover:text-white"
          : "text-secondary-foreground dark:text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
      <span
        className={clsx(
          `absolute -bottom-1 left-0 w-0 h-px transition-all group-hover:w-full opacity-50`,
          makeBgTransparent ? "bg-white" : "bg-foreground",
        )}
      />
    </Link>
  );
}
