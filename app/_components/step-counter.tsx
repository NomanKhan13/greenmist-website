import clsx from "clsx";

export default function StepCounter({
  step,
  label,
}: {
  step: number;
  label: string;
}) {
  return (
    <div className="mt-6 mb-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
        <span>Step {step} of 2</span>
        <span>{label}</span>
      </div>

      <div
        role="progressbar"
        aria-valuenow={50}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden"
      >
        <div
          className={clsx(
            "h-full bg-primary rounded-full transition-all",
            step === 1 ? "w-1/2" : "w-full",
          )}
        />
      </div>
    </div>
  );
}
