const SectionHeader = ({
  heading,
  subHeading,
  description,
}: {
  heading: string;
  subHeading: string;
  description: string;
}) => {
  return (
    <section className="text-center max-w-2xl mx-auto mb-20">
      <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">
        {subHeading}
      </h2>
      <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-6">
        {heading}
      </h1>
      <p className="text-muted-foreground">{description}</p>
    </section>
  );
};

export default SectionHeader;
