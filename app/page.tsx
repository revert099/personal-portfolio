import Hero from "@/components/sections/Hero";
import CapabilitiesGrid from "@/components/sections/CapabilitiesGrid"
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <CapabilitiesGrid />
      <Projects />
      <Contact />
    </main>
  );
}