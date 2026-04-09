import { Label } from "@/components/ui/label";
type BookingFieldProps = {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

export function DateField({ label, icon, children }: BookingFieldProps) {
  return (
    <div
      className="flex-1 p-5 lg:p-6 border-b lg:border-b-0 lg:border-r border-muted-foreground/20 dark:border-border
"
    >
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="date-from"
          className="text-xs uppercase tracking-wider text-secondary-foreground/75 dark:text-muted-foreground font-medium flex items-center gap-2"
        >
          {icon}
          {label}
        </Label>
        {children}
      </div>
    </div>
  );
}
