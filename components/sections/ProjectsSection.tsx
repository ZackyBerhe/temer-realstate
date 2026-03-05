"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
  {
    image: "/images/project-1.jpg",
    title: "Ayat Feres Bet Site",
    location: "Ayat, Addis Ababa",
    units: "120 Units",
    status: "Under Construction",
  },
  {
    image: "/images/project-2.jpg",
    title: "Garment Site 1",
    location: "Garment, Addis Ababa",
    units: "85 Units",
    status: "Pre-Launch",
  },
  {
    image: "/images/project-3.jpg",
    title: "Sarbet Site",
    location: "Sarbet, Addis Ababa",
    units: "200 Units",
    status: "Under Construction",
  },
  {
    image: "/images/project-4.jpg",
    title: "Ayat Site",
    location: "Ayat, Addis Ababa",
    units: "150 Units",
    status: "Pre-Launch",
  },
  {
    image: "/images/project-5.jpg",
    title: "Garment Site 2",
    location: "Garment, Addis Ababa",
    units: "60 Units",
    status: "Under Construction",
  },
  {
    image: "/images/project-6.jpg",
    title: "Sumale Tera Site",
    location: "Sumale Tera, Addis Ababa",
    units: "180 Units",
    status: "Pre-Launch",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Determine visible card count based on viewport
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

  const maxIndex = projects.length - visibleCount;

  const animateSlide = useCallback(async (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const gsapModule = await import("gsap");
    const gsap = gsapModule.default;

    const cardWidth = track.children[0]?.getBoundingClientRect().width || 0;
    const gap = 24;
    const offset = index * (cardWidth + gap);

    gsap.to(track, {
      x: -offset,
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

  // Drag/swipe support
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeft.current = currentIndex;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = startX.current - e.clientX;
    if (diff > 50) goNext();
    else if (diff < -50) goPrev();
  };

  // Reveal animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let ctx: ReturnType<(typeof import("gsap"))["default"]["context"]>;

    async function init() {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      gsap.registerPlugin(scrollTriggerModule.ScrollTrigger);

      if (el) {
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
                toggleActions: "play none none none",
              },
            },
          );
        }, el);
      }
    }
    init();

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-16 md:py-24 bg-secondary overflow-hidden"
      style={{ opacity: 0 }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              Developments
            </p>
            <h2 className="text-3xl font-bold font-serif text-foreground sm:text-4xl lg:text-5xl text-balance">
              Our Projects
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl leading-relaxed text-pretty">
              Explore our latest developments across Addis Ababa featuring
              modern architecture and premium amenities.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl border border-border transition-colors cursor-pointer",
                currentIndex === 0
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-primary hover:text-primary-foreground hover:border-primary",
              )}
              aria-label="Previous project"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goNext}
              disabled={currentIndex >= maxIndex}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl border border-border transition-colors cursor-pointer",
                currentIndex >= maxIndex
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-primary hover:text-primary-foreground hover:border-primary",
              )}
              aria-label="Next project"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <div
            ref={trackRef}
            className="flex gap-6"
            style={{ touchAction: "pan-y" }}
          >
            {projects.map((project, i) => (
              <article
                key={i}
                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] rounded-2xl overflow-hidden bg-card border border-border shadow-sm group hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      className={cn(
                        "rounded-lg px-3 py-1 text-xs font-bold",
                        project.status === "Ready to Move"
                          ? "bg-primary text-primary-foreground"
                          : project.status === "Pre-Launch"
                            ? "bg-foreground text-background"
                            : "bg-accent text-accent-foreground",
                      )}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-card-foreground">
                    {project.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm">{project.location}</span>
                  </div>
                  <div className="mt-3 text-sm text-muted-foreground">
                    {project.units}
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
                  : "w-2.5 bg-border hover:bg-muted-foreground",
              )}
              aria-label={`Go to slide group ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
