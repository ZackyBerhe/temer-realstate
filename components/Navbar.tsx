"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Phone, Building2 } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Properties", href: "#properties" },
  { label: "Projects", href: "#projects" },
  { label: "Why Us", href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // GSAP-powered smooth scroll to section
  const scrollToSection = useCallback(async (href: string) => {
    const gsapModule = await import("gsap");
    const scrollToModule = await import("gsap/ScrollToPlugin");
    const gsap = gsapModule.default;
    gsap.registerPlugin(scrollToModule.ScrollToPlugin);

    const target = document.querySelector(href);
    if (target) {
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 80 },
        duration: 1,
        ease: "power3.inOut",
      });
    }
    setMenuOpen(false);
  }, []);

  // Scroll listener for navbar bg and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // determine active section
      const sections = navLinks.map((l) => document.querySelector(l.href));
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(navLinks[i].href.replace("#", ""));
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navbar fade-in on load
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    let ctx: ReturnType<(typeof import("gsap"))["default"]["context"]>;

    async function init() {
      const gsapModule = await import("gsap");
      const gsap = gsapModule.default;
      ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 },
        );
      }, el!);
    }
    init();

    return () => {
      ctx?.revert();
    };
  }, []);

  // Mobile menu animation
  useEffect(() => {
    const el = mobileMenuRef.current;
    if (!el) return;

    let ctx: ReturnType<(typeof import("gsap"))["default"]["context"]>;

    async function animate() {
      const gsapModule = await import("gsap");
      const gsap = gsapModule.default;
      ctx = gsap.context(() => {
        if (menuOpen) {
          gsap.fromTo(
            el,
            { x: "100%", opacity: 0 },
            { x: "0%", opacity: 1, duration: 0.4, ease: "power3.out" },
          );
          const mobileNavItems = el!.querySelectorAll(".mobile-nav-item");
          if (mobileNavItems.length > 0) {
            gsap.fromTo(
              mobileNavItems,
              { x: 30, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.3,
                stagger: 0.08,
                ease: "power2.out",
                delay: 0.15,
              },
            );
          }
        } else {
          gsap.to(el, {
            x: "100%",
            opacity: 0,
            duration: 0.3,
            ease: "power3.in",
          });
        }
      }, el!);
    }
    animate();

    return () => {
      ctx?.revert();
    };
  }, [menuOpen]);

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent",
      )}
      style={{ opacity: 0 }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("#hero")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Building2
              className={cn(
                "h-8 w-8 transition-colors",
                scrolled ? "text-primary" : "text-primary-foreground",
              )}
            />
            <span
              className={cn(
                "text-xl font-bold font-serif tracking-tight transition-colors",
                scrolled ? "text-foreground" : "text-primary-foreground",
              )}
            >
              TEMER PROPERTIES
            </span>
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={cn(
                  "text-sm font-medium transition-colors relative cursor-pointer py-1",
                  scrolled
                    ? activeSection === link.href.replace("#", "")
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground"
                    : activeSection === link.href.replace("#", "")
                      ? "text-primary-foreground"
                      : "text-primary-foreground/70 hover:text-primary-foreground",
                )}
              >
                {link.label}
                {activeSection === link.href.replace("#", "") && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
            <a
              href="tel:+251913455624"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              <Phone className="h-4 w-4" />
              +251 913 455 624
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={cn(
              "md:hidden p-2 rounded-lg cursor-pointer transition-colors",
              scrolled
                ? "text-foreground hover:bg-muted"
                : "text-primary-foreground hover:bg-primary-foreground/10",
            )}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile slide-in menu */}
      <div
        ref={mobileMenuRef}
        className={cn(
          "fixed inset-0 top-20 bg-background/98 backdrop-blur-lg md:hidden z-40",
          !menuOpen && "pointer-events-none",
        )}
        style={{ transform: "translateX(100%)", opacity: 0 }}
      >
        <div className="flex flex-col px-6 py-8 gap-2">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className={cn(
                "mobile-nav-item text-left px-4 py-3 rounded-xl text-lg font-medium transition-colors cursor-pointer",
                activeSection === link.href.replace("#", "")
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground hover:bg-muted",
              )}
            >
              {link.label}
            </button>
          ))}
          <a
            href="tel:+251913455624"
            className="mobile-nav-item mt-4 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-xl text-lg font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            <Phone className="h-5 w-5" />
            +251 913 455 624
          </a>
        </div>
      </div>
    </nav>
  );
}
