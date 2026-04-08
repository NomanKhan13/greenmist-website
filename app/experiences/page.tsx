import teaWalk from "@/public/tea-walk.png";
import privateDining from "@/public/private-dining.png";
import valleyTrek from "@/public/valley-trek.png";
import Image from "next/image";
import Link from "next/link";

export default function Experiences() {
  const experiences = [
    {
      id: 1,
      title: "Forest Trails Trail",
      description:
        "Wake up to fresh mountain air and walk alongside our local guides through generations-old tea plantations. Learn the craft of tea plucking and end your morning with a fresh-brewed cup of tea as the mist lifts over the valley.",
      tags: ["Guided Tour", "Nature Photography", "Heritage"],
      image: teaWalk,
      reverse: false,
    },
    {
      id: 2,
      title: "Outdoor Dining Experience or Dine in Nature",
      description:
        "A unique dining experience set against the backdrop of the Western Ghats. Enjoy a customized menu of Kerala’s finest breathtaking flavors, served in total privacy as the sun sets over the hills.",
      tags: ["Culinary", "Couples", "Absolute Seclusion"],
      image: privateDining,
      reverse: true,
    },
    {
      id: 3,
      title: "Adventure Beyond Munnar",
      description:
        "For those who seek elevation and perspective. Hike on untouched trails, discover hidden waterfalls, and experience the raw beauty of Munnar's deeper valleys.",
      tags: ["Adventure", "Deep Silence", "Lush Greenery"],
      image: valleyTrek,
      reverse: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Hero Section */}
      <section className="relative h-[55vh] flex items-center justify-center overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[url('/images/experiences-hero.jpg')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-linear-to-t from-background to-transparent"></div>

        <div className="relative z-10 text-center space-y-6 px-4 mt-12">
          <p className="text-primary text-xs md:text-sm font-semibold tracking-[0.25em] uppercase">
            Curated Moments
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-foreground tracking-tight">
            The Magic of Munnar.
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto text-lg md:text-xl font-light">
            Discover experiences crafted to reconnect you with nature, culture,
            and yourself.
          </p>
        </div>
      </section>

      {/* Experience List */}
      <section className="max-w-7xl mx-auto px-6 py-24 space-y-24 md:space-y-32">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className={`flex flex-col gap-10 md:gap-20 items-center ${exp.reverse ? "md:flex-row-reverse" : "md:flex-row"}`}
          >
            {/* Image Side */}
            <div className="w-full md:w-1/2 aspect-video md:aspect-4/3 bg-card rounded-2xl overflow-hidden relative border border-border">
              <Image
                fill
                placeholder="blur"
                src={exp.image}
                alt={exp.title}
                className="object-cover w-full h-full opacity-80 hover:opacity-100 transition-opacity duration-500"
              />
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2 space-y-6 md:px-8">
              <div className="flex flex-wrap gap-3 mb-4">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs text-muted-foreground border border-border rounded-full tracking-wide bg-muted/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground">
                {exp.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg font-light">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* CTA Footer */}
      <section className="bg-card border-t border-border py-24 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-8">
          Ready for retreat?
        </h2>
        <Link
          href="/stays"
          className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded font-medium transition-colors duration-200 tracking-wide"
        >
          {" "}
          Explore Our Retreats
        </Link>
      </section>
    </div>
  );
}
