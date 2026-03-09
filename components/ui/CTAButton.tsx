"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  icon?: ReactNode;
}

export default function CTAButton({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  icon,
}: CTAButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    let ctx: ReturnType<(typeof import("gsap"))["default"]["context"]>;

    async function initGsap() {
      const gsapModule = await import("gsap");
      const gsap = gsapModule.default;

      ctx = gsap.context(() => {
        const iconEl = el?.querySelector(".btn-icon");

        if (!el) return;
        el.addEventListener("mouseenter", () => {
          if (!el) return;
          gsap.to(el, { scale: 1.03, duration: 0.25, ease: "power2.out" });
          if (iconEl) {
            gsap.to(iconEl, { x: 4, duration: 0.25, ease: "power2.out" });
          }
        });

        el.addEventListener("mouseleave", () => {
          if (!el) return;
          gsap.to(el, { scale: 1, duration: 0.25, ease: "power2.out" });
          if (iconEl) {
            gsap.to(iconEl, { x: 0, duration: 0.25, ease: "power2.out" });
          }
        });
      }, el!);
    }

    initGsap();

    return () => {
      ctx?.revert();
    };
  }, []);

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
    outline:
      "border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl font-semibold transition-colors cursor-pointer",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
      {icon && <span className="btn-icon">{icon}</span>}
    </button>
  );
}
