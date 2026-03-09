import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import PropertiesSection from "@/components/sections/PropertiesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import StatsSection from "@/components/sections/StatsSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import FooterSection from "@/components/sections/FooterSection";
import FloatingCTA from "@/components/FloatingCTA";
import StructuredData from "@/components/StructuredData";
import { generateMetadata, SEOConfig } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Temer Real Estate | Addis Ababa Property Experts",
  description:
    "Temer Real Estate offers premium homes, apartments, and property sales in Addis Ababa and Ayat. Discover trusted real estate services in Ethiopia.",
  keywords: [
    "Addis Ababa real estate",
    "real estate Addis Ababa",
    "Temer Properties",
    "property for sale Addis Ababa",
    "homes for sale Addis Ababa",
    "luxury real estate Ethiopia",
  ],
  canonical: "https://temerproperties.com",
  openGraph: {
    title: "Temer Real Estate | Addis Ababa Property Experts",
    description:
      "Temer Real Estate offers premium homes, apartments, and property sales in Addis Ababa and Ayat. Discover trusted real estate services in Ethiopia.",
    type: "website",
    images: [
      {
        url: "/images/hero-1.jpg",
        width: 1200,
        height: 630,
        alt: "Luxury real estate in Addis Ababa by Temer Properties",
      },
    ],
  },
} as SEOConfig);

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <header>
        <Navbar />
      </header>
      <main>
        <HeroSection />
        <PropertiesSection />
        <ProjectsSection />
        <StatsSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <footer>
        <FooterSection />
      </footer>
      <FloatingCTA />
    </>
  );
}
