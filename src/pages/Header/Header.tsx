import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION_LINKS } from '@/config/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';

interface HeaderProps {
  activeSection: string;
  onNavClick: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onNavClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    onNavClick(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center items-center p-4 transition-all duration-300 ${isScrolled ? 'py-2 sm:py-4' : 'py-4 sm:py-6'
          } pointer-events-none`}
      >
        <nav
          className={`pointer-events-auto relative flex items-center justify-between px-2 rounded-full border border-white/10 shadow-lg backdrop-blur-md transition-all duration-300 ${isScrolled
            ? 'bg-background/80 supports-[backdrop-filter]:bg-background/60 py-2'
            : 'bg-background/50 supports-[backdrop-filter]:bg-background/30 py-2 sm:py-3'
            }`}
        >
          {/* Desktop Navigation - Visible on Large Screens */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAVIGATION_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              const Icon = link.icon;

              return (
                <li key={link.id} className="relative z-10">
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full flex items-center gap-2 ${isActive
                      ? 'text-blue-500'
                      : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-blue-500/10 border border-blue-500/20 rounded-full -z-10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {link.text}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Mobile/Tablet Navigation Toggle */}
          <div className="lg:hidden flex items-center justify-between w-full px-3 sm:px-4 min-w-[auto] gap-4">
            <span className="font-bold text-base sm:text-lg tracking-tight">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full hover:bg-secondary/80 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 sm:top-24 z-40 lg:hidden rounded-2xl bg-popover/95 backdrop-blur-xl border border-border shadow-2xl overflow-hidden max-h-[80vh] overflow-y-auto"
          >
            <div className="p-4 flex flex-col gap-2">
              {NAVIGATION_LINKS.map((link, index) => {
                const Icon = link.icon;
                const isActive = activeSection === link.id;

                return (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full flex items-center gap-4 p-3 sm:p-4 rounded-xl transition-all ${isActive
                      ? 'bg-blue-500/10 text-blue-500'
                      : 'hover:bg-secondary text-foreground'
                      }`}
                  >
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-background'}`}>
                      <Icon size={18} className="sm:w-5 sm:h-5" />
                    </div>
                    <span className="font-medium text-base sm:text-lg">{link.text}</span>
                    {isActive && (
                      <motion.div
                        layoutId="mobileActiveIndicator"
                        className="ml-auto w-2 h-2 rounded-full bg-white"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
