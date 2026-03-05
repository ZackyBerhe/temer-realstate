"use client";

import { useRef, useState, useEffect } from "react";
import { Phone, MessageCircle, X, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FloatingCTA() {
  const [showMobileBar, setShowMobileBar] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const fabRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // Show mobile bar after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      setShowMobileBar(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate FAB entrance
  useEffect(() => {
    const el = fabRef.current;
    if (!el) return;

    let ctx: ReturnType<(typeof import("gsap"))["default"]["context"]>;

    async function init() {
      const gsapModule = await import("gsap");
      const gsap = gsapModule.default;
      ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            delay: 2,
          },
        );
      }, el!);
    }
    init();
    return () => {
      ctx?.revert();
    };
  }, []);

  // Animate popup open/close
  useEffect(() => {
    const el = popupRef.current;
    if (!el) return;

    let ctx: ReturnType<(typeof import("gsap"))["default"]["context"]>;

    async function animate() {
      const gsapModule = await import("gsap");
      const gsap = gsapModule.default;
      ctx = gsap.context(() => {
        if (contactOpen) {
          gsap.set(el, { display: "flex" });
          gsap.fromTo(
            el,
            { opacity: 0, y: 20, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.35,
              ease: "back.out(1.4)",
            },
          );
        } else {
          gsap.to(el, {
            opacity: 0,
            y: 10,
            scale: 0.95,
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => {
              gsap.set(el, { display: "none" });
            },
          });
        }
      });
    }
    animate();
    return () => {
      ctx?.revert();
    };
  }, [contactOpen]);

  return (
    <>
      {/* === Floating contact FAB (desktop + mobile, bottom-right) === */}
      <div
        ref={fabRef}
        className="fixed bottom-6 right-6 z-50"
        style={{ opacity: 0 }}
      >
        {/* Popup */}
        <div
          ref={popupRef}
          className="absolute bottom-16 right-0 w-72 flex-col gap-2 rounded-2xl bg-card border border-border shadow-2xl p-4 mb-2"
          style={{ display: "none", opacity: 0 }}
        >
          <p className="text-sm font-bold text-card-foreground mb-3">
            Get in Touch
          </p>
          <a
            href="tel:+251913455624"
            className="flex items-center gap-3 rounded-xl bg-primary text-primary-foreground p-3 text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            <Phone className="h-4 w-4" />
            Call +251 913 455 624
          </a>
          <a
            href="https://t.me/benimak7"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl bg-[#0088cc] text-primary-foreground p-3 text-sm font-semibold hover:bg-[#0088cc]/90 transition-colors mt-2"
          >
            <MessageCircle className="h-4 w-4" />
            Message on Telegram
          </a>
          <a
            href="mailto:info@temerproperties.com"
            className="flex items-center gap-3 rounded-xl bg-accent text-accent-foreground p-3 text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors mt-2"
          >
            <Mail className="h-4 w-4" />
            Email Us
          </a>
          <p className="text-[10px] text-muted-foreground mt-2 text-center">
            We respond within 30 minutes during business hours
          </p>
        </div>

        {/* FAB button */}
        <button
          onClick={() => setContactOpen(!contactOpen)}
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 cursor-pointer",
            contactOpen
              ? "bg-foreground text-background rotate-0"
              : "bg-primary text-primary-foreground animate-pulse",
          )}
          aria-label={contactOpen ? "Close contact menu" : "Open contact menu"}
        >
          {contactOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* === Sticky mobile call bar === */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 border-t border-border bg-card/98 backdrop-blur-lg shadow-[0_-4px_20px_rgba(0,0,0,0.1)]",
          showMobileBar ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <a
            href="tel:+251913455624"
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl text-sm font-bold"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
          <a
            href="https://t.me/temerproperties"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#0088cc] text-primary-foreground py-3 rounded-xl text-sm font-bold"
          >
            <MessageCircle className="h-4 w-4" />
            Telegram
          </a>
        </div>
      </div>
    </>
  );
}
