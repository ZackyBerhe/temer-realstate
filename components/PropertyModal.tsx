"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { type Property } from "@/lib/propertyService";
import { cn } from "@/lib/utils";
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Car,
  Home,
  Calendar,
  Layers,
  Phone,
  Mail,
} from "lucide-react";

interface PropertyModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PropertyModal({
  property,
  isOpen,
  onClose,
}: PropertyModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const detailsGridRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset state when property changes
  useEffect(() => {
    if (property) {
      setCurrentSlide(0);
      setShowPhone(false);
      setShowEmail(false);
    }
  }, [property]);

  // GSAP open/close animation
  useEffect(() => {
    if (!overlayRef.current || !modalRef.current) return;

    let ctx: ReturnType<(typeof import("gsap"))["default"]["context"]>;

    async function animate() {
      const gsapModule = await import("gsap");
      const gsap = gsapModule.default;

      const overlay = overlayRef.current;
      const modal = modalRef.current;
      if (!overlay || !modal) return;

      ctx = gsap.context(() => {
        if (isOpen) {
          gsap.set(overlay, { display: "flex" });
          gsap.fromTo(
            overlay,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: "power2.out" },
          );
          gsap.fromTo(
            modal,
            { opacity: 0, scale: 0.9, y: 40 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.4,
              ease: "back.out(1.4)",
              delay: 0.1,
            },
          );
        } else {
          gsap.to(modal, {
            opacity: 0,
            scale: 0.95,
            y: 20,
            duration: 0.25,
            ease: "power2.in",
          });
          gsap.to(overlay, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            delay: 0.05,
            onComplete: () => {
              gsap.set(overlay, { display: "none" });
            },
          });
        }
      });
    }

    animate();
    return () => {
      ctx?.revert();
    };
  }, [isOpen]);

  // Stagger details grid on open
  useEffect(() => {
    if (!isOpen || !detailsGridRef.current) return;

    let ctx: ReturnType<(typeof import("gsap"))["default"]["context"]>;

    async function stagger() {
      const gsapModule = await import("gsap");
      const gsap = gsapModule.default;

      const el = detailsGridRef.current;
      if (!el) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          el.querySelectorAll(".detail-item"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: "power2.out",
            delay: 0.35,
          },
        );
      }, el);
    }

    stagger();
    return () => {
      ctx?.revert();
    };
  }, [isOpen, property]);

  // ESC key close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Slider navigation
  const goToSlide = useCallback(
    async (index: number) => {
      if (!property) return;
      const total = property.images.length;
      const next = (index + total) % total;
      setCurrentSlide(next);
    },
    [property],
  );

  // Swipe support
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToSlide(currentSlide + 1);
      else goToSlide(currentSlide - 1);
    }
  };

  // Click outside
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!property) return null;

  const formatPrice = (price: number) =>
    `ETB ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(price)}`;

  const details = [
    { icon: Bed, label: "Bedrooms", value: property.bedrooms },
    { icon: Bath, label: "Bathrooms", value: property.bathrooms },
    {
      icon: Maximize,
      label: "Area",
      value: `${property.area.toLocaleString()} m\u00B2`,
    },
    { icon: Car, label: "Parking", value: `${property.parking} Spaces` },
    { icon: Home, label: "Type", value: property.type },
    { icon: Calendar, label: "Year Built", value: property.yearBuilt },
    ...(property.floor
      ? [{ icon: Layers, label: "Floor", value: `${property.floor}th` }]
      : []),
  ];

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] items-center justify-center bg-black/20 backdrop-blur-md p-4 sm:p-6"
      style={{ display: "none", opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Property details for ${property.title}`}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card shadow-2xl"
        style={{ opacity: 0 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-foreground/60 text-card hover:bg-foreground/80 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* ===== Image Slider ===== */}
        <div
          className="relative h-[250px] sm:h-[350px] md:h-[450px] overflow-hidden rounded-t-2xl"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {property.images.map((img, i) => (
            <div
              key={i}
              className={cn(
                "absolute inset-0 transition-opacity duration-500",
                i === currentSlide
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none",
              )}
            >
              <Image
                src={img}
                alt={`${property.title} image ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 720px"
                priority={i === 0}
              />
            </div>
          ))}

          {/* Arrows */}
          <button
            onClick={() => goToSlide(currentSlide - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-card/80 hover:bg-card text-foreground shadow-md transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => goToSlide(currentSlide + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-card/80 hover:bg-card text-foreground shadow-md transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {property.images.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300 cursor-pointer",
                  i === currentSlide
                    ? "w-7 bg-card"
                    : "w-2.5 bg-card/50 hover:bg-card/70",
                )}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ===== Property Information ===== */}
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold font-serif text-card-foreground sm:text-3xl">
            {property.title}
          </h2>
          <div className="mt-2 flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm">{property.location}</span>
          </div>
          <p className="mt-4 text-muted-foreground leading-relaxed text-pretty">
            {property.description}
          </p>

          <div className="mt-5 flex flex-wrap items-baseline gap-4">
            <span className="text-2xl font-bold text-primary sm:text-3xl">
              {formatPrice(property.price)}
            </span>
            <span className="text-sm text-muted-foreground">
              ETB {property.pricePerSqm.toLocaleString()}/m&sup2;
            </span>
          </div>

          <hr className="my-6 border-border" />

          {/* ===== Details Grid ===== */}
          <div
            ref={detailsGridRef}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
          >
            {details.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.label}
                  className="detail-item flex flex-col items-center gap-2 rounded-xl border border-border bg-secondary p-4 text-center"
                  style={{ opacity: 0 }}
                >
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="text-xs text-muted-foreground">
                    {d.label}
                  </span>
                  <span className="text-sm font-semibold text-card-foreground">
                    {d.value}
                  </span>
                </div>
              );
            })}
          </div>

          <hr className="my-6 border-border" />

          {/* ===== Action Buttons ===== */}
          <div className="flex flex-col gap-3 sm:flex-row">
            {showPhone ? (
              <a
                href="tel:+251913455624"
                className="flex items-center gap-3 rounded-xl bg-primary text-primary-foreground p-3 text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                <Phone className="h-4 w-4" />
                Call +251 913 455 624
              </a>
            ) : (
              <RevealButton
                revealed={showPhone}
                onClick={() => setShowPhone(true)}
                revealText="+251 913 455 624"
                defaultIcon={<Phone className="h-4 w-4" />}
                defaultText="Call Now"
                variant="primary"
                ariaLabel="Reveal phone number"
              />
            )}
            <RevealButton
              revealed={showEmail}
              onClick={() => setShowEmail(true)}
              revealText="info@temerproperties.com"
              defaultIcon={<Mail className="h-4 w-4" />}
              defaultText="Email Us Now"
              variant="secondary"
              ariaLabel="Reveal email address"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========== Reveal Button Sub-component ========== */

interface RevealButtonProps {
  revealed: boolean;
  onClick: () => void;
  revealText: string;
  defaultIcon: React.ReactNode;
  defaultText: string;
  variant: "primary" | "secondary";
  ariaLabel: string;
}

function RevealButton({
  revealed,
  onClick,
  revealText,
  defaultIcon,
  defaultText,
  variant,
  ariaLabel,
}: RevealButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!revealed || !btnRef.current) return;
    let ctx: ReturnType<(typeof import("gsap"))["default"]["context"]>;

    async function animate() {
      const gsapModule = await import("gsap");
      const gsap = gsapModule.default;
      const el = btnRef.current;
      if (!el) return;

      ctx = gsap.context(() => {
        const inner = el.querySelector(".reveal-text");
        if (inner) {
          gsap.fromTo(
            inner,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
          );
        }
      }, el);
    }
    animate();
    return () => {
      ctx?.revert();
    };
  }, [revealed]);

  const baseClasses =
    "flex-1 flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-colors cursor-pointer";

  const variantClasses =
    variant === "primary"
      ? revealed
        ? "bg-primary text-primary-foreground"
        : "bg-primary text-primary-foreground hover:bg-primary/90"
      : revealed
        ? "bg-accent text-accent-foreground"
        : "bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground";

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className={cn(baseClasses, variantClasses)}
      aria-label={ariaLabel}
    >
      {revealed ? (
        <span className="reveal-text flex items-center gap-2">
          {defaultIcon}
          {revealText}
        </span>
      ) : (
        <span className="flex items-center gap-2">
          {defaultIcon}
          {defaultText}
        </span>
      )}
    </button>
  );
}
