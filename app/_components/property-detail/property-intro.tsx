import { Separator } from "@/components/ui/separator";

export default function PropertyIntro({
  description,
}: {
  description: string;
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-start">
      <div className="lg:w-1/3 shrink-0">
        <h2 className="text-3xl md:text-4xl font-serif text-foreground leading-tight">
          Where Luxury <br />
          <span className="text-muted-foreground italic font-light">
            Meets The Mist
          </span>
        </h2>
        <Separator className="mt-6 md:mt-8 bg-primary h-1 w-16 rounded-full" />
      </div>

      <div className="lg:w-2/3">
        <p className="text-base md:text-lg text-muted-foreground leading-loose font-light">
          {description}
        </p>
      </div>
    </div>
  );
}
