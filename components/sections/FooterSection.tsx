"use client";

import { Building2, MapPin, Phone, Mail, MessageCircle } from "lucide-react";

const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "#hero" },
      { label: "Properties", href: "#properties" },
      { label: "Projects", href: "#projects" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Neighborhoods",
    links: [
      { label: "Bole", href: "#properties" },
      { label: "CMC", href: "#properties" },
      { label: "Kazanchis", href: "#properties" },
      { label: "Old Airport", href: "#properties" },
      { label: "Summit", href: "#properties" },
      { label: "Ayat", href: "#properties" },
    ],
  },
];

export default function FooterSection() {
  const scrollToSection = async (href: string) => {
    if (!href.startsWith("#") || href === "#") return;
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
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Building2 className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold font-serif">
                TEMER PROPERTIES
              </span>
            </div>
            <p className="text-sm leading-relaxed text-background/60">
              Your trusted partner in Addis Ababa real estate since 2015.
              Premium apartments, villas, and condos in prime locations across
              the city.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((group, i) => (
            <div key={i}>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-5">
                {group.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {group.links.map((link, j) => (
                  <li key={j}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm text-background/60 hover:text-primary transition-colors cursor-pointer"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-5">
              Get In Touch
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-background/60">
                  Bole Road, Atlas Area, Addis Ababa, Ethiopia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href="tel:+251913455624"
                  className="text-sm text-background/60 hover:text-primary transition-colors"
                >
                  +251 913 455 624
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@temerpropertiessales.com"
                  className="text-sm text-background/60 hover:text-primary transition-colors"
                >
                  info@temerpropertiessales.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href="https://t.me/temerproperties"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-background/60 hover:text-primary transition-colors"
                >
                  @temerproperties
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-background/10 pt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-xs text-background/40">
            {new Date().getFullYear()} website developed by{" "}
            <a
              href="https://t.me/SoLiveTheLife"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary transition-colors"
            >
              Zekarias Berhe
            </a>
          </p>
          <div className="flex gap-6">
            <button className="text-xs text-background/40 hover:text-primary transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button className="text-xs text-background/40 hover:text-primary transition-colors cursor-pointer">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
