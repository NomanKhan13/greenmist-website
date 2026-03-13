import { Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function PropertyHighlights({
  highlights,
}: {
  highlights: string[];
}) {
  console.log("Lets check this", highlights);
  return (
    <div className="bg-secondary/30 dark:bg-card/30 rounded-3xl p-8 md:p-16 border border-border/50">
      <div className="text-center mb-12">
        <h3 className="text-2xl font-serif mb-4">Property Highlights</h3>
        <p className="text-muted-foreground text-sm uppercase tracking-widest">
          Everything you need for a perfect stay
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {highlights.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border/40 hover:border-primary/50 transition-colors duration-300 group"
          >
            <div className="shrink-0 p-2.5 rounded-full bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <HugeiconsIcon icon={Tick02Icon} size={18} strokeWidth={2} />
            </div>
            <span className="text-sm md:text-base text-foreground/80 font-medium group-hover:text-foreground transition-colors">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
