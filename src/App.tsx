import { useEffect, useState, useCallback, useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import { motion, useScroll } from 'framer-motion';
import './assets/css/index.css';
import { SCROLL_OBSERVER_OPTIONS } from '@/config/navigation';
import { FaLinkedinIn, FaGithub, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { ArrowUp } from 'lucide-react';

// Pages
import Experience from './pages/Experience/Experience';
import Contact from './pages/Contact/Contact';
import Projects from './pages/Projects/Projects';
import Header from './pages/Header/Header';
import Hero from './pages/Hero/Hero';
import Skills from './pages/Skills/Skills';
import About from './pages/About/About';

// Scroll Progress Bar (GPU composited)
const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="scroll-progress-bar origin-left w-full pointer-events-none"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

// Section Divider
const SectionDivider = () => (
  <div className="relative py-1">
    <div className="section-divider mx-auto max-w-4xl" />
  </div>
);

// Footer
const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#DFE4EC] dark:bg-[#050507] border-t border-[#C5CDD9] dark:border-[#22242D] overflow-hidden transition-colors duration-150">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main footer content */}
        <div className="py-12 sm:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Brand */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-2 tracking-tight">
                Zasim Mallik
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Software Engineer | Founder of Zeraql & Rizmiq
              </p>
            </div>

            {/* Social */}
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { 
                  icon: FaGithub, 
                  href: 'https://github.com/zasimmallik', 
                  label: 'GitHub',
                },
                { 
                  icon: FaLinkedinIn, 
                  href: 'https://www.linkedin.com/in/zasimmallik/', 
                  label: 'LinkedIn',
                },
                { 
                  icon: FaXTwitter, 
                  href: 'https://x.com/zasimmallik', 
                  label: 'X',
                },
                { 
                  icon: FaInstagram, 
                  href: 'https://www.instagram.com/zasimmallik/', 
                  label: 'Instagram',
                },
                { 
                  icon: FaFacebookF, 
                  href: 'https://www.facebook.com/zasimmallik.Z/', 
                  label: 'Facebook',
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#F3F5F9] hover:bg-[#F7F8FB] dark:bg-[#13141A] dark:hover:bg-[#181922] border border-[#C5CDD9] dark:border-[#22242D] text-slate-600 dark:text-[#A1A1AA] hover:text-slate-950 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-150 shadow-[0_4px_12px_-2px_rgba(15,23,42,0.08)]"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#C5CDD9] dark:border-[#22242D] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-mono">
            © {currentYear} Zasim Mallik. All rights reserved.
          </p>
        </div>
      </div>

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-11 h-11 flex items-center justify-center rounded-full bg-[#F3F5F9] hover:bg-[#F7F8FB] dark:bg-[#13141A] border border-[#C5CDD9] dark:border-[#22242D] text-slate-800 dark:text-white shadow-[0_8px_24px_-4px_rgba(15,23,42,0.16)] dark:shadow-lg hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-200 hover:scale-105 cursor-pointer ${
          showBackToTop
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </footer>
  );
};

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

  // Sections that should have a divider AFTER them (skip before Projects since we're not touching it)
  const dividersAfter = new Set(['home', 'about', 'skills', 'experience', 'projects']);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true, syncTouch: false }}>
      <ScrollProgressBar />
      <Header activeSection={activeSection} onNavClick={handleNavClick} />
      <main className="flex flex-col w-full max-w-[100vw]">
        {SECTION_CONFIG.map(({ id, Component }, index) => (
          <div key={id}>
            <section
              id={id}
              className={
                id === 'home'
                  ? ''
                  : 'scroll-mt-40 md:scroll-mt-36 lg:scroll-mt-32'
              }
            >
              <Component />
            </section>
            {/* Add dividers between sections */}
            {dividersAfter.has(id) && index < SECTION_CONFIG.length - 1 && (
              <SectionDivider />
            )}
          </div>
        ))}
      </main>
      <Footer />
    </ReactLenis>
  );
}
