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

export default function HomePage() {
  return (
    <main>
      <StructuredData />
      <Navbar />
      <HeroSection />
      <PropertiesSection />
      <ProjectsSection />
      <StatsSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <FAQSection />
      <FooterSection />
      <FloatingCTA />
    </main>
  );
}
