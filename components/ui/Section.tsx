"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  fullWidth?: boolean;
}

export default function Section({
  id,
  children,
  className,
  containerClassName,
  fullWidth = false,
}: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let ctx: ReturnType<typeof import("gsap")["default"]["context"]>;

    async function initGsap() {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      gsap.registerPlugin(scrollTriggerModule.ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none none",
            },
          }
        );
      }, el);
    }

    initGsap();

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn("py-16 md:py-24", className)}
      style={{ opacity: 0 }}
    >
      {fullWidth ? (
        children
      ) : (
        <div
          className={cn(
            "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
            containerClassName
          )}
        >
          {children}
        </div>
      )}
    </section>
  );
}
