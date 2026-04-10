import { Loading02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

function GreenMistLoader() {
  return (
    <div className="flex items-center justify-center pt-32">
      <div className="max-w-2xl mx-auto px-6 flex flex-col items-center justify-center gap-6">
        <HugeiconsIcon
          strokeWidth={1.5}
          icon={Loading02Icon}
          role="status"
          aria-label="Loading"
          className="size-12 animate-spin text-primary"
        />
        <div className="text-center">
          <h1 className="font-serif text-3xl font-light tracking-tight text-foreground mb-3">
            Loading
          </h1>
          <p className="text-sm text-foreground-secondary leading-relaxed">
            {"We're"} preparing something beautiful for you
          </p>
        </div>
      </div>
    </div>
  );
}

export default GreenMistLoader;
