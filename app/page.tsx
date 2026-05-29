import Hero from "@/components/sections/Hero";
import ProblemSection from "@/components/sections/ProblemSection";
import OfferingsSection from "@/components/sections/OfferingsSection";
import HowIWorkSection from "@/components/sections/HowIWorkSection";
import CapabilitiesGrid from "@/components/sections/CapabilitiesGrid";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemSection />
      <OfferingsSection />
      <HowIWorkSection />
      <CapabilitiesGrid />
      <Projects />
      <Contact />
    </main>
  );
}
