"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowRight, Phone, ShieldCheck, Users, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  {
    image: "/images/hero-1.jpg",
    heading: "Premium Real Estate in Addis Ababa, Ethiopia",
    subheading:
      "Discover luxury apartments, villas, and condos in Bole, CMC, Kazanchis, and beyond. Your dream home is one step away.",
  },
  {
    image: "/images/hero-2.jpg",
    heading: "Luxury Living in the Heart of Addis Ababa",
    subheading:
      "Experience world-class amenities and breathtaking architecture in the most sought-after neighborhoods of Addis.",
  },
  {
    image: "/images/hero-3.jpg",
    heading: "Invest in Addis Ababa Real Estate",
    subheading:
      "Strategic locations, exceptional quality, and unmatched value. Build your property portfolio with Temer Properties.",
  },
];

const trustBadges = [
  { icon: Users, text: "10,000+ Happy Residents" },
  { icon: Star, text: "4.8/5 Average Rating" },
  { icon: ShieldCheck, text: "Licensed & Verified" },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToSlide = useCallback(
    async (index: number) => {
      if (index === current) return;
      const gsapModule = await import("gsap");
      const gsap = gsapModule.default;
      const textEl = textRef.current;

      if (textEl) {
        await gsap.to(textEl, {
          opacity: 0,
          y: 30,
          duration: 0.3,
          ease: "power2.in",
        });
      }

      setCurrent(index);

      if (textEl) {
        gsap.fromTo(
          textEl,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
        );
      }
    },
    [current]
  );

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const next = (current + 1) % slides.length;
      goToSlide(next);
    }, 12000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [current, goToSlide]);

  useEffect(() => {
    const textEl = textRef.current;
    if (!textEl) return;

    let ctx: ReturnType<typeof import("gsap")["default"]["context"]>;

    async function init() {
      const gsapModule = await import("gsap");
      const gsap = gsapModule.default;
      ctx = gsap.context(() => {
        gsap.fromTo(
          textEl!.querySelectorAll(".hero-anim"),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.5,
          }
        );
      }, textEl!);
    }
    init();

    return () => {
      ctx?.revert();
    };
  }, []);

  const scrollToSection = async (id: string) => {
    const gsapModule = await import("gsap");
    const scrollToModule = await import("gsap/ScrollToPlugin");
    const gsap = gsapModule.default;
    gsap.registerPlugin(scrollToModule.ScrollToPlugin);
    const target = document.querySelector(id);
    if (target) {
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 80 },
        duration: 1,
        ease: "power3.inOut",
      });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative h-[85vh] sm:h-[90vh] lg:h-screen w-full overflow-hidden"
    >
      {/* Slide images */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            i === current ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={slide.image}
            alt={`${slide.heading} - Temer Properties Addis Ababa`}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/75" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div
          ref={textRef}
          className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8"
        >
          {/* Trust badge pill */}
          <div className="hero-anim mb-6 inline-flex items-center gap-2 rounded-full bg-primary/20 px-5 py-2 text-sm font-medium text-primary-foreground backdrop-blur-sm border border-primary/30">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Trusted by 10,000+ Residents in Addis Ababa
          </div>

          {/* H1 with target keyword */}
          <h1 className="hero-anim text-3xl font-bold font-serif leading-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl text-balance">
            {slides[current].heading}
          </h1>

          <p className="hero-anim mt-5 text-base leading-relaxed text-primary-foreground/85 sm:text-lg lg:text-xl max-w-3xl mx-auto text-pretty">
            {slides[current].subheading}
          </p>

          {/* CTAs */}
          <div className="hero-anim mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <button
              onClick={() => scrollToSection("#properties")}
              className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground px-8 py-4 rounded-xl text-base font-bold hover:bg-primary/90 transition-colors cursor-pointer shadow-lg shadow-primary/25"
            >
              View Properties
              <ArrowRight className="h-5 w-5" />
            </button>
            <a
              href="tel:+251911123456"
              className="inline-flex items-center gap-2.5 bg-primary-foreground/15 text-primary-foreground px-8 py-4 rounded-xl text-base font-bold backdrop-blur-sm border border-primary-foreground/25 hover:bg-primary-foreground/25 transition-colors cursor-pointer"
            >
              <Phone className="h-5 w-5" />
              Call Now
            </a>
          </div>

          {/* Microcopy */}
          <p className="hero-anim mt-4 text-xs text-primary-foreground/50">
            No obligation. Free consultation for all property inquiries.
          </p>

          {/* Trust badges row */}
          <div className="hero-anim mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {trustBadges.map((badge, i) => {
              const Icon = badge.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 text-primary-foreground/70"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="text-xs sm:text-sm font-medium">
                    {badge.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={cn(
              "h-3 rounded-full transition-all duration-300 cursor-pointer",
              i === current
                ? "w-10 bg-primary-foreground"
                : "w-3 bg-primary-foreground/40 hover:bg-primary-foreground/60"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
