import { Copyright } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

// 1. Data Structure for Links
// Keeps your JSX clean and makes adding future pages effortless.
const FOOTER_LINKS = [
  {
    title: "Explore",
    links: [
      { name: "Our Stays", href: "/stays" },
      { name: "The Estate", href: "/estate" },
      { name: "Experiences", href: "/experiences" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "/faq" },
      { name: "Guest Portal", href: "/account" },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-background pt-16 pb-8 md:pt-24 md:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-8">
          <div className="md:col-span-1">
            <span className="font-serif text-2xl font-medium tracking-wide">
              GreenMist
            </span>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A sanctuary of luxury nestled in the misty hills of Munnar.
              Experience nature without compromising on elegance.
            </p>
          </div>

          <div className="flex gap-16 lg:gap-32">
            {FOOTER_LINKS.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-medium tracking-wider uppercase">
                  {section.title}
                </h3>
                <ul className="mt-6 space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between border-t border-border/50 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground flex gap-2">
            <HugeiconsIcon icon={Copyright} stroke="1.5" size={14} />
            <span>{currentYear} GreenMist Retreats. All rights reserved.</span>
          </p>

          <div className="mt-4 flex space-x-6 sm:mt-0 text-xs text-muted-foreground">
            <Link
              href="/privacy"
              className="transition-colors hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-primary"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
