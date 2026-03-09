"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Section from "@/components/ui/Section";
import PropertyModal from "@/components/PropertyModal";
import { type Property } from "@/lib/propertyService";
import { getProperties } from "@/lib/propertyService";
import {
  MapPin,
  ArrowRight,
  Bed,
  Bath,
  Maximize,
  Phone,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PropertiesSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch properties from Firebase
  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await getProperties();
        const activeProperties = data.filter((property) => property.active);
        setProperties(activeProperties);
      } catch (error) {
        console.error("Error loading properties:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  const openModal = useCallback((prop: Property) => {
    setSelectedProperty(prop);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    let ctx: ReturnType<(typeof import("gsap"))["default"]["context"]>;

    async function init() {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      gsap.registerPlugin(scrollTriggerModule.ScrollTrigger);

      if (!el) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          el.querySelectorAll(".property-card"),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      }, el);
    }
    init();

    return () => {
      ctx?.revert();
    };
  }, []);

  const formatPrice = (price: number) =>
    `ETB ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(price)}`;

  return (
    <>
      <Section id="properties">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Featured Listings
          </p>
          <h2 className="text-3xl font-bold font-serif text-foreground sm:text-4xl lg:text-5xl text-balance">
            Our Latest Properties
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
            Explore our handpicked selection of premium properties designed for
            comfort, style, and value in prime locations.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {loading
            ? // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-6 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))
            : properties.map((prop: Property) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  formatPrice={formatPrice}
                  onViewDetails={() => openModal(prop)}
                />
              ))}
        </div>
      </Section>

      <PropertyModal
        property={selectedProperty}
        isOpen={modalOpen}
        onClose={closeModal}
      />
    </>
  );
}

/* ========== Property Card ========== */

interface PropertyCardProps {
  property: Property;
  formatPrice: (price: number) => string;
  onViewDetails: () => void;
}

function PropertyCard({
  property: prop,
  formatPrice,
  onViewDetails,
}: PropertyCardProps) {
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  return (
    <article className="property-card group overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={prop.images[0]}
          alt={prop.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 rounded-lg bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">
          {formatPrice(prop.price)}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-card-foreground group-hover:text-primary transition-colors">
          {prop.title}
        </h3>
        <div className="mt-2 flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm">{prop.location}</span>
        </div>
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground border-t border-border pt-4">
          <span className="flex items-center gap-1.5">
            <Bed className="h-4 w-4" />
            {prop.bedrooms} Beds
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4" />
            {prop.bathrooms} Baths
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize className="h-4 w-4" />
            {prop.area.toLocaleString()} m&sup2;
          </span>
        </div>

        {/* Call / Email buttons */}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          {showPhone ? (
            <a
              href="tel:+251913455624"
              className="flex items-center gap-3 rounded-xl bg-primary text-primary-foreground p-3 text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              Call +251 913 455 624
            </a>
          ) : (
            <CardRevealButton
              revealed={showPhone}
              onClick={() => setShowPhone(true)}
              revealText="+251 913 455 624"
              icon={<Phone className="h-3.5 w-3.5" />}
              defaultText="Call Now"
              variant="primary"
            />
          )}
          <CardRevealButton
            revealed={showEmail}
            onClick={() => setShowEmail(true)}
            revealText="info@temerpropertiessales.com"
            icon={<Mail className="h-3.5 w-3.5" />}
            defaultText="Email Us"
            variant="secondary"
          />
        </div>

        {/* View Details */}
        <button
          onClick={onViewDetails}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-semibold text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
        >
          View Details
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

/* ========== Card-level Reveal Button ========== */

interface CardRevealButtonProps {
  revealed: boolean;
  onClick: () => void;
  revealText: string;
  icon: React.ReactNode;
  defaultText: string;
  variant: "primary" | "secondary";
}

function CardRevealButton({
  revealed,
  onClick,
  revealText,
  icon,
  defaultText,
  variant,
}: CardRevealButtonProps) {
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
        const inner = el.querySelector(".card-reveal-text");
        if (inner) {
          gsap.fromTo(
            inner,
            { opacity: 0, y: 6 },
            { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
          );
        }
      }, el);
    }
    animate();
    return () => {
      ctx?.revert();
    };
  }, [revealed]);

  const base =
    "flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-semibold transition-colors cursor-pointer";

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
      className={cn(base, variantClasses)}
      aria-label={revealed ? revealText : defaultText}
    >
      {revealed ? (
        <span className="card-reveal-text flex items-center gap-1.5 text-[11px]">
          {icon}
          {revealText}
        </span>
      ) : (
        <span className="flex items-center gap-1.5">
          {icon}
          {defaultText}
        </span>
      )}
    </button>
  );
}
