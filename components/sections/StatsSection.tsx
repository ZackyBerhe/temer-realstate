"use client";

import { useRef, useEffect } from "react";
import { Users, Calendar, Building2, Award } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "Happy Customers",
  },
  {
    icon: Calendar,
    value: 10,
    suffix: "+",
    label: "Years Experience",
  },
  {
    icon: Building2,
    value: 20,
    suffix: "+",
    label: "Completed Projects",
  },
  {
    icon: Award,
    value: 15,
    suffix: "+",
    label: "Industry Awards",
  },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let ctx: ReturnType<(typeof import("gsap"))["default"]["context"]>;

    async function init() {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      gsap.registerPlugin(scrollTriggerModule.ScrollTrigger);

      ctx = gsap.context(() => {
        // Fade in section
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );

        // Animate numbers
        countersRef.current.forEach((counter, i) => {
          if (!counter) return;
          const target = stats[i].value;
          const obj = { val: 0 };

          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            onUpdate: () => {
              counter.textContent =
                target >= 1000
                  ? Math.floor(obj.val).toLocaleString()
                  : Math.floor(obj.val).toString();
            },
          });
        });
      }, el!);
    }
    init();

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-foreground overflow-hidden"
      style={{ opacity: 0 }}
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Our Track Record in Addis Ababa
          </p>
          <h2 className="text-3xl font-bold font-serif text-background sm:text-4xl lg:text-5xl text-balance">
            Numbers That Speak
          </h2>
          <p className="mt-4 text-background/60 max-w-xl mx-auto text-sm leading-relaxed">
            A decade of excellence in Addis Ababa real estate development
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="flex flex-col items-center text-center gap-4"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <div className="flex items-baseline justify-center">
                    <span
                      ref={(el) => {
                        if (el) countersRef.current[i] = el;
                      }}
                      className="text-4xl font-bold text-background sm:text-5xl"
                    >
                      0
                    </span>
                    <span className="text-3xl font-bold text-primary sm:text-4xl">
                      {stat.suffix}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-background/60 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
