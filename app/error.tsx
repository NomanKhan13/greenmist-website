"use client"; // Error components must be Client Components

import { useEffect } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mountain } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log the error to an error reporting service (e.g., Sentry)
  useEffect(() => {
    // In a real job, you'd send this to Sentry/LogRocket
    console.error("GreenMist Error:", error);
  }, [error]);

  return (
    <main className="flex h-screen flex-col items-center justify-center text-center px-4">
      {/* Decorative Icon/Element matching the Nature Theme */}
      <HugeiconsIcon
        icon={Mountain}
        size={60}
        className="text-primary mb-8"
        strokeWidth={1.5}
      />

      <h1 className="text-3xl font-serif font-bold mb-2">
        Something went wrong at the retreat.
      </h1>

      <p className="text-secondary-foreground mb-8 max-w-md mx-auto">
        We apologize, but we encountered an unexpected error while loading this
        page.
        <br />
        <span className="text-xs text-muted-foreground mt-2 block">
          Error Code: {error.digest || "Unknown"}
        </span>
      </p>

      <div className="flex gap-4">
        <Button onClick={() => reset()} size="lg" className="rounded-md">
          Try Again
        </Button>

        <Button asChild variant="outline" size="lg" className="rounded-md">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </main>
  );
}
