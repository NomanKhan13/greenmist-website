import aboutUsArc from "@/public/about-us.png";
import aboutUsHero from "@/public/about-us-hero.png";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="bg-background text-foreground font-sans">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src={aboutUsHero}
          alt="Mist rolling over Munnar tea estates"
          fill
          priority
          className="object-cover opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/60 via-background/20 to-background"></div>

        <div className="relative z-10 text-center space-y-6 px-4 mt-20">
          <p className="text-primary text-xs md:text-sm font-semibold tracking-[0.3em] uppercase">
            Our Story
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-foreground tracking-tight max-w-4xl mx-auto leading-tight">
            A quiet reverence for the Western Ghats.
          </h1>
        </div>
      </section>

      {/* Section 1: The Origin */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-serif text-foreground">
          Born from the Mist
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed">
          GreenMist was not built to command the landscape, but to submit to it.
          Nestled high in the tea estates of Munnar, our sanctuaries were
          conceived as a retreat from the noise of the modern world. Here, the
          passage of time is measured not by clocks, but by the lifting of the
          morning fog and the slow unfurling of tea leaves.
        </p>
      </section>

      {/* Section 2: Architecture & Environment */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8 items-center">
          <div className="md:col-span-5 space-y-8 md:pr-8 order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground">
              Invisible Architecture
            </h2>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed text-lg font-light">
                We sourced local stone, weathered timber, and native flora to
                construct spaces that feel inherently part of the mountain. From
                the valley floors to the highest ridges, every structure is
                designed with a low ecological footprint, ensuring the ecosystem
                remains entirely undisturbed.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg font-light">
                Wide, unobstructed sightlines bring the outside in, dissolving
                the boundaries between the sanctuary of your room and the raw
                beauty of Kerala.
              </p>
            </div>
          </div>

          <div className="md:col-span-7 aspect-4/3 bg-card rounded-2xl overflow-hidden relative border border-border order-1 md:order-2">
            <Image
              fill
              placeholder="blur"
              src={aboutUsArc}
              alt="GreenMist Architecture blending with nature"
              className="object-cover w-full h-full opacity-80 hover:opacity-100 transition-opacity duration-700"
            />
          </div>
        </div>
      </section>

      {/* Section 3: The Ethos */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-border">
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
            The Ethos
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground">
            What we stand for
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          <div className="space-y-4">
            <span className="text-primary font-serif text-4xl block mb-6">
              01.
            </span>
            <h3 className="text-xl font-serif text-foreground">
              Absolute Seclusion
            </h3>
            <p className="text-muted-foreground leading-relaxed font-light">
              We limit our capacity intentionally. GreenMist is designed for
              those who seek the luxury of silence, privacy, and uninterrupted
              thought.
            </p>
          </div>

          <div className="space-y-4">
            <span className="text-primary font-serif text-4xl block mb-6">
              02.
            </span>
            <h3 className="text-xl font-serif text-foreground">
              Heritage Preservation
            </h3>
            <p className="text-muted-foreground leading-relaxed font-light">
              We work alongside local tea planters and artisans, ensuring the
              rich cultural history of Munnar is woven into every aspect of the
              guest experience.
            </p>
          </div>

          <div className="space-y-4">
            <span className="text-primary font-serif text-4xl block mb-6">
              03.
            </span>
            <h3 className="text-xl font-serif text-foreground">
              Mindful Luxury
            </h3>
            <p className="text-muted-foreground leading-relaxed font-light">
              Premium comfort without excess. We prioritize sustainable
              practices, from zero-waste dining initiatives to purely organic
              room amenities.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Bottom CTA */}
      <section className="bg-card border-t border-border py-24 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
          Experience the Estate
        </h2>
        <p className="text-muted-foreground mb-10 max-w-md mx-auto font-light">
          Discover the sanctuaries we have prepared for you in the clouds.
        </p>
        <Link
          href="/stays"
          className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded font-medium transition-colors duration-200 tracking-wide"
        >
          Explore Our Retreats
        </Link>
      </section>
    </div>
  );
}
