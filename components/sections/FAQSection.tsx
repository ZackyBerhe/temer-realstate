"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronDown, Phone, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Section from "@/components/ui/Section";

const faqs = [
  {
    question:
      "What types of properties does Temer Properties offer in Addis Ababa?",
    answer:
      "We offer a wide range of premium properties including luxury apartments, modern condominiums, spacious townhouses, elegant villas, and duplex residences across Addis Ababa. Our developments are located in prime neighborhoods such as Bole, CMC, Kazanchis, Summit, Old Airport, and Ayat.",
  },
  {
    question: "What are the payment plans available for buying property?",
    answer:
      "We offer flexible payment plans tailored to your budget. Options include full upfront payment with discounts, installment plans ranging from 12 to 60 months, and bank mortgage assistance. Our finance team will guide you through the best option for your situation.",
  },
  {
    question: "Is real estate a good investment in Addis Ababa right now?",
    answer:
      "Addis Ababa's real estate market continues to show strong growth potential. Property values have appreciated significantly over the past decade, and the city's rapid urbanization, expanding infrastructure, and growing middle class make it an excellent time to invest. Our properties have shown an average appreciation of 15-25% annually.",
  },
  {
    question: "How do I schedule a property viewing?",
    answer:
      "Scheduling a viewing is easy. You can call us directly at +251 913 455 624, message us on Telegram @temerproperties, or email info@temerproperties.com. We offer both in-person tours and virtual walkthroughs for your convenience. Our team is available 6 days a week.",
  },
  {
    question: "What guarantees do you provide on build quality?",
    answer:
      "All Temer Properties come with a comprehensive quality guarantee. We use premium materials sourced from trusted suppliers, employ experienced contractors, and conduct rigorous quality inspections at every stage. We also provide a 2-year structural warranty and ongoing maintenance support after handover.",
  },
  {
    question: "Can foreign nationals buy property through Temer Properties?",
    answer:
      "Ethiopian real estate laws have specific provisions for foreign nationals. While direct freehold ownership has restrictions, we can guide eligible diaspora Ethiopians and foreign investors through legal ownership structures, lease agreements, and investment vehicles. Contact our team for personalized guidance on your eligibility.",
  },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = useCallback(
    (i: number) => {
      setOpenIndex(openIndex === i ? null : i);
    },
    [openIndex],
  );

  // Animate on scroll
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
        gsap.fromTo(
          el!.querySelectorAll(".faq-item"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el!,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      }, el!);
    }
    init();
    return () => {
      ctx?.revert();
    };
  }, []);

  // FAQ Schema markup
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Section id="faq">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              Common Questions
            </p>
            <h2 className="text-3xl font-bold font-serif text-foreground sm:text-4xl lg:text-5xl text-balance">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
              Everything you need to know about buying property in Addis Ababa
              with Temer Properties.
            </p>
          </div>

          <div ref={sectionRef} className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="faq-item rounded-2xl border border-border bg-card overflow-hidden shadow-sm"
                style={{ opacity: 0 }}
              >
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left cursor-pointer"
                  aria-expanded={openIndex === i}
                >
                  <h3 className="text-sm sm:text-base font-semibold text-card-foreground pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-300",
                      openIndex === i && "rotate-180 text-primary",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300",
                    openIndex === i
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA below FAQ */}
          <div className="mt-12 text-center rounded-2xl bg-primary/5 border border-primary/10 p-8">
            <p className="text-lg font-bold text-foreground mb-2">
              Still have questions?
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Our team is ready to help. Reach out for a free, no-obligation
              consultation.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="tel:+251913455624"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors"
              >
                <Phone className="h-4 w-4" />
                +251 913 455 624
              </a>
              <a
                href="mailto:info@temerproperties.com"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-xl text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Email Us
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
