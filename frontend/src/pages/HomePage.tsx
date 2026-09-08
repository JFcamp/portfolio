import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '@/sections/Hero';
import { TechStrip } from '@/sections/TechStrip';
import { About } from '@/sections/About';
import { Experience } from '@/sections/Experience';
import { Projects } from '@/sections/Projects';
import { Skills } from '@/sections/Skills';
import { Architecture } from '@/sections/Architecture';
import { AiDemo } from '@/sections/AiDemo';
import { Contact } from '@/sections/Contact';

export function HomePage({ onOpenChat }: { onOpenChat: () => void }) {
  const location = useLocation();

  // Support deep links like /#projects coming from case study pages.
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  }, [location.hash]);

  return (
    <main>
      <Hero onOpenChat={onOpenChat} />
      <TechStrip />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Architecture />
      <AiDemo />
      <Contact />
    </main>
  );
}
