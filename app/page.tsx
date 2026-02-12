import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

import { JSX } from "react/jsx-dev-runtime";

export default function Home(): JSX.Element {
  return (
    <main>
      <Hero />
      <Projects />
      <Contact />
    </main>
  );
}