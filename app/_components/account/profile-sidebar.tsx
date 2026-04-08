"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "../sign-out";

export default function ProfileSidebar() {
  const pathname = usePathname();

  const tabs = [
    { href: "/account", label: "Account Settings" },
    { href: "/account/reservations", label: "My Reservations" },
  ];

  return (
    <aside className="w-full sm:w-64 sm:border-r border-border h-max sm:h-80 flex flex-col justify-between gap-4 px-4 sm:px-0">
      <nav className="flex flex-row sm:flex-col gap-2 overflow-x-auto flex-nowrap w-full pb-2 sm:pb-0">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`text-left flex-1 px-4 py-3 rounded transition-colors ${
                isActive
                  ? "bg-card font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/60"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      <div className="hidden sm:block">
        <LogoutButton />
      </div>
    </aside>
  );
}
