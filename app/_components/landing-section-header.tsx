export default function LandingSectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-16 md:mb-20 max-w-2xl">
      <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-wide mb-6">
        {title}
      </h2>
      <p className="text-lg text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
