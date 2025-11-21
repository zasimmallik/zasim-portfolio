import { useEffect, useState, useCallback, useRef } from 'react';
import './assets/css/index.css';
import { SCROLL_OBSERVER_OPTIONS } from '@/config/navigation';

// Pages
import Experience from './pages/Experience/Experience';
import Contact from './pages/Contact/Contact';
import Projects from './pages/Projects/Projects';
import Header from './pages/Header/Header';
import Hero from './pages/Hero/Hero';
import Skills from './pages/Skills/Skills';
import About from './pages/About/About';

const SECTION_CONFIG = [
  { id: 'home', Component: Hero },
  { id: 'about', Component: About },
  { id: 'skills', Component: Skills },
  { id: 'experience', Component: Experience },
  { id: 'projects', Component: Projects },
  { id: 'contact', Component: Contact },
];

export default function App() {
  const sectionIds = SECTION_CONFIG.map((section) => section.id);
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const isScrollingRef = useRef(false);

  // Use intersection observer hook for better performance
  useEffect(() => {
    const observerOptions = SCROLL_OBSERVER_OPTIONS;

    const observer = new IntersectionObserver((entries) => {
      if (isScrollingRef.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  const handleNavClick = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);

    if (target) {
      isScrollingRef.current = true;
      setActiveSection(sectionId);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Reset scrolling lock after animation
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  }, []);

  return (
    <>
      <Header activeSection={activeSection} onNavClick={handleNavClick} />
      <main className="flex flex-col w-full max-w-[100vw]">
        {SECTION_CONFIG.map(({ id, Component }) => (
          <section
            key={id}
            id={id}
            className={
              id === 'home'
                ? ''
                : 'scroll-mt-40 md:scroll-mt-36 lg:scroll-mt-32'
            }
          >
            <Component />
          </section>
        ))}
      </main>
    </>
  );
}

