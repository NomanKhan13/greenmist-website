import Image from "next/image";
import heroImg from "@/public/hero-bg.jpg";
import { getValidDates } from "../_utils/validation";
import { BookingStrip } from "./booking-strip/booking-strip";

export default function Hero() {
  const { checkIn, checkOut } = getValidDates();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <Image
        src={heroImg}
        placeholder="blur"
        alt="Misty tea plantation in Munnar"
        fill
        className="object-cover z-0"
        priority
        quality={90}
      />

      {/* Note - Add this kind of bg so that sudden vibe change from image to black bg doesnt happen */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-black/60 from-0% via-black/20 via-60% to-background to-100%" />
      {/* Note - Used hard coded colors and not globals.css bcz we want same colors on img on both dark and light modes */}
      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8 mt-32 lg:mt-16">
        <div className="mb-6 flex items-center space-x-2 text-stone-50/90 text-sm tracking-widest uppercase font-medium">
          <span className="h-px w-8 bg-stone-50/50"></span>
          <span>Award-Winning Estates</span>
          <span className="h-px w-8 bg-stone-50/50"></span>
        </div>

        <div className="text-center space-y-6 mb-12 max-w-3xl">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium leading-tighter tracking-wide text-stone-50 drop-shadow-sm text-balance">
            Discover the Pure, Natural Luxury of Munnar.
          </h1>

          <p className="text-lg sm:text-xl leading-relaxed text-stone-50/90 font-light">
            Find peace and calm at our three unique retreats nestled in the
            misty hills. Where luxury meets nature.
          </p>
        </div>

        <BookingStrip
          defaultCheckIn={checkIn}
          defaultCheckOut={checkOut}
          navigateToPage="stays"
        />
      </div>
    </section>
  );
}
