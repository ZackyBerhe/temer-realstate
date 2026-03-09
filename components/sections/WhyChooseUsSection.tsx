"use client";

import { useRef, useEffect } from "react";
import Section from "@/components/ui/Section";
import {
  MapPin,
  DollarSign,
  Star,
  ShieldCheck,
  TrendingUp,
  HeartHandshake,
} from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Prime Addis Ababa Locations",
    description:
      "Strategically positioned properties in Bole, CMC, Kazanchis, Summit, Old Airport, and Ayat -- the most desirable neighborhoods in Addis Ababa.",
  },
  {
    icon: DollarSign,
    title: "Affordable Pricing",
    description:
      "Competitive pricing with flexible payment plans designed to suit every budget and lifestyle.",
  },
  {
    icon: Star,
    title: "Premium Quality",
    description:
      "Top-grade materials and meticulous craftsmanship that ensure lasting beauty and durability.",
  },
  {
    icon: ShieldCheck,
    title: "Safety & Security",
    description:
      "Advanced security systems and 24/7 surveillance to keep you and your family safe at all times.",
  },
  {
    icon: TrendingUp,
    title: "Smart Investment",
    description:
      "High appreciation potential and strong rental yields that maximize your return on investment.",
  },
  {
    icon: HeartHandshake,
    title: "Customer First",
    description:
      "Dedicated support from consultation to handover, ensuring a seamless and stress-free experience.",
  },
];

export default function WhyChooseUsSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    let ctx: ReturnType<(typeof import("gsap"))["default"]["context"]>;

    async function init() {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      gsap.registerPlugin(scrollTriggerModule.ScrollTrigger);

      ctx = gsap.context(() => {
        if (!el) return;
        gsap.fromTo(
          el.querySelectorAll(".feature-card"),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      }, el!);
    }
    init();

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <Section id="why-us" className="bg-secondary">
      <div className="text-center mb-14">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
          Our Advantages
        </p>
        <h2 className="text-3xl font-bold font-serif text-foreground sm:text-4xl lg:text-5xl text-balance">
          Why Choose Us
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
          Since 2015, we have been Addis Ababa&apos;s most trusted real estate
          developer. Here is why thousands of residents chose Temer Properties.
        </p>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <div
              key={i}
              className="feature-card group rounded-2xl bg-card border border-border p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-accent group-hover:bg-primary transition-colors duration-300">
                <Icon className="h-7 w-7 text-accent-foreground group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-bold text-card-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
