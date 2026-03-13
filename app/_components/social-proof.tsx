// 1. The Data Array

import { Star } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import LandingSectionHeader from "./landing-section-header";

// Stragegically added different user personas so that we attarct wider audience
const TESTIMONIALS = [
  {
    id: "t1",
    author: "Arjun & Priya D.",
    location: "Mumbai",
    property: "Stayed at Tea Garden Retreat",
    text: "The perfect escape from the city. Waking up to the mist rolling over the plantations is an image we'll never forget. The staff provided a level of unobtrusive, meticulous service that defines true luxury.",
  },
  {
    id: "t2",
    author: "Rahul S.",
    location: "Ahmedabad",
    property: "Stayed at Valley Retreat",
    text: "Organizing a seamless getaway for our group of five friends usually means compromising somewhere, but GreenMist was flawless. We had the perfect balance of communal lounge space and absolute privacy.",
  },
  {
    id: "t3",
    author: "Sarah J.",
    location: "London, UK",
    property: "Stayed at Hill Retreat",
    text: "I've stayed in luxury properties across the globe, and this stands in a league of its own. The architecture doesn't fight the raw landscape; it frames it perfectly. An unforgettable mountain climate experience.",
  },
];

export default function SocialProof() {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <LandingSectionHeader
          title="Words from our Guests."
          description="Don't just take our word for it. Discover how travelers from
            around the world experienced the serenity of GreenMist."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-12">
          {TESTIMONIALS.map((testimonial) => (
            <article
              key={testimonial.id}
              className="flex flex-col rounded-2xl bg-background p-6 sm:p-8 md:p-10 shadow-sm border border-border/50"
            >
              <FiveStars />

              <blockquote className="grow mb-8">
                <p className="text-foreground/90 leading-relaxed text-lg font-light">
                  &quot;{testimonial.text}&quot;
                </p>
              </blockquote>

              <div className="mt-auto pt-6 border-t border-border/50">
                <div className="font-medium tracking-wide">
                  {testimonial.author}
                </div>
                <div className="text-sm text-muted-foreground mt-1 flex flex-col xl:flex-row xl:items-center lg:gap-1 xl:gap-2">
                  <span>{testimonial.location}</span>
                  <span className="hidden xl:inline text-border">•</span>
                  <span className="text-xs uppercase tracking-wider text-primary/80">
                    {testimonial.property}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FiveStars() {
  return (
    <div className="flex gap-1 mb-6">
      {[...Array(5)].map((_, i) => (
        <HugeiconsIcon
          key={i}
          icon={Star}
          strokeWidth={1.5}
          className="h-4 w-4 fill-primary text-primary"
        />
      ))}
    </div>
  );
}
