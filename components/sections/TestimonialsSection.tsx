"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import Section from "@/components/ui/Section";

const testimonials = [
  {
    name: "Abebe Bekele",
    role: "Homeowner, Bole",
    rating: 5,
    text: "Temer Properties made our dream of owning a home in Bole come true. The entire process was transparent, and the quality of the apartment exceeded our expectations. Highly recommended for anyone looking to invest in Addis Ababa.",
  },
  {
    name: "Sara Tesfaye",
    role: "Investor, CMC",
    rating: 5,
    text: "As a first-time real estate investor, I was nervous. But the Temer team guided me every step of the way. My property in CMC has already appreciated 30% in value. Best investment decision I have made.",
  },
  {
    name: "Daniel Hailu",
    role: "Homeowner, Summit",
    rating: 5,
    text: "The attention to detail in our Summit duplex is remarkable. From the premium finishes to the stunning mountain views, everything is exactly as promised. Temer delivers on their word.",
  },
  {
    name: "Meron Alemu",
    role: "Homeowner, Old Airport",
    rating: 5,
    text: "We bought our family townhouse from Temer two years ago and could not be happier. The neighborhood is safe, the build quality is excellent, and the customer service team still checks in on us regularly.",
  },
  {
    name: "Yonas Girma",
    role: "Investor, Kazanchis",
    rating: 4,
    text: "I own two apartments through Temer Properties, both generating excellent rental income. Their knowledge of the Addis Ababa market is unmatched. A trusted partner for any serious investor.",
  },
  {
    name: "Hiwot Mekonnen",
    role: "Homeowner, Ayat",
    rating: 5,
    text: "From the first visit to the handover ceremony, every interaction was professional and warm. The villa in Ayat is our forever home. Thank you, Temer Properties, for making it possible.",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    function updateVisible() {
      if (window.innerWidth >= 1024) setVisibleCount(3);
      else if (window.innerWidth >= 768) setVisibleCount(2);
      else setVisibleCount(1);
    }
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  const animateSlide = useCallback(async (index: number) => {
    const track = trackRef.current;
    if (!track || !track.children[0]) return;
    const gsapModule = await import("gsap");
    const gsap = gsapModule.default;
    const cardWidth = track.children[0].getBoundingClientRect().width;
    const gap = 24;
    gsap.to(track, {
      x: -(index * (cardWidth + gap)),
      duration: 0.6,
      ease: "power3.out",
    });
  }, []);

  const goNext = useCallback(() => {
    const next = Math.min(currentIndex + 1, maxIndex);
    setCurrentIndex(next);
    animateSlide(next);
  }, [currentIndex, maxIndex, animateSlide]);

  const goPrev = useCallback(() => {
    const prev = Math.max(currentIndex - 1, 0);
    setCurrentIndex(prev);
    animateSlide(prev);
  }, [currentIndex, animateSlide]);

  // Reveal animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let ctx: ReturnType<typeof import("gsap")["default"]["context"]>;

    async function init() {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      gsap.registerPlugin(scrollTriggerModule.ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          el.querySelectorAll(".testimonial-card"),
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
          }
        );
      }, el);
    }
    init();
    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <Section id="testimonials" className="bg-secondary overflow-hidden">
      <div className="text-center mb-14">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
          What Our Residents Say
        </p>
        <h2 className="text-3xl font-bold font-serif text-foreground sm:text-4xl lg:text-5xl text-balance">
          Trusted by Thousands in Addis Ababa
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
          Real stories from real homeowners and investors who chose Temer
          Properties for their biggest life decision.
        </p>
      </div>

      <div ref={sectionRef}>
        {/* Navigation arrows */}
        <div className="flex justify-end gap-3 mb-6">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl border border-border transition-colors cursor-pointer",
              currentIndex === 0
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-primary hover:text-primary-foreground hover:border-primary"
            )}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goNext}
            disabled={currentIndex >= maxIndex}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl border border-border transition-colors cursor-pointer",
              currentIndex >= maxIndex
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-primary hover:text-primary-foreground hover:border-primary"
            )}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden">
          <div ref={trackRef} className="flex gap-6">
            {testimonials.map((t, i) => (
              <article
                key={i}
                className="testimonial-card flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] rounded-2xl bg-card border border-border p-8 shadow-sm flex flex-col"
                style={{ opacity: 0 }}
              >
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-sm leading-relaxed text-muted-foreground flex-1">
                  {`"${t.text}"`}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-card-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentIndex(i);
                animateSlide(i);
              }}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300 cursor-pointer",
                i === currentIndex
                  ? "w-8 bg-primary"
                  : "w-2.5 bg-border hover:bg-muted-foreground"
              )}
              aria-label={`Go to testimonial group ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
