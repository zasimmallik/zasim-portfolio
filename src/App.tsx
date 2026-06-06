import { useEffect, useState, useCallback, useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import './assets/css/index.css';
import { SCROLL_OBSERVER_OPTIONS } from '@/config/navigation';
import { FaLinkedinIn, FaGithub, FaHeart, FaInstagram, FaFacebookF } from 'react-icons/fa';
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

// Scroll Progress Bar
const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="scroll-progress-bar"
      style={{ width: `${progress}%` }}
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
    <footer className="relative bg-[#010410] border-t border-slate-800/50 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-blue-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main footer content */}
        <div className="py-12 sm:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Brand */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                Zasim Mallik
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Software Developer | Founder of Zeraql & Rizmiq
              </p>
            </div>

            {/* Social */}
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { 
                  icon: FaGithub, 
                  href: 'https://github.com/zasimmallik', 
                  label: 'GitHub',
                  hoverClass: 'hover:bg-[#333] hover:text-white hover:border-[#444]'
                },
                { 
                  icon: FaLinkedinIn, 
                  href: 'https://www.linkedin.com/in/zasimmallik/', 
                  label: 'LinkedIn',
                  hoverClass: 'hover:bg-[#0077b5] hover:text-white hover:border-[#0088cc]'
                },
                { 
                  icon: FaXTwitter, 
                  href: 'https://x.com/zasimmallik', 
                  label: 'X',
                  hoverClass: 'hover:bg-black hover:text-white hover:border-slate-800'
                },
                { 
                  icon: FaInstagram, 
                  href: 'https://www.instagram.com/zasimmallik/', 
                  label: 'Instagram',
                  hoverClass: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-orange-500 hover:text-white hover:border-purple-500'
                },
                { 
                  icon: FaFacebookF, 
                  href: 'https://www.facebook.com/zasimmallik.Z/', 
                  label: 'Facebook',
                  hoverClass: 'hover:bg-[#1877f2] hover:text-white hover:border-[#2887f2]'
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-slate-500 transition-all duration-300 hover:scale-110 shadow-md ${social.hoverClass}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/50 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs sm:text-sm">
            © {currentYear} Zasim Mallik. All rights reserved.
          </p>
        </div>
      </div>

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 hover:text-white hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-500 hover:scale-110 ${
          showBackToTop
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
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
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
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
