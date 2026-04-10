import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import "./globals.css";
import Header from "./_components/header";
import { ThemeProvider } from "next-themes";
import { BookingProvider } from "./_components/booking-strip/booking-strip-context";
import Footer from "./_components/footer";
import Template from "./_components/template";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GreenMist - Make your best retreat in Munnar",
  description: "A group of 3 luxury boutique hotels in munnar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={figtree.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary selection:text-primary-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <BookingProvider>
            <Header />
            <main className="min-h-screen">
              <Template>{children}</Template>
            </main>
            <Footer />
          </BookingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
