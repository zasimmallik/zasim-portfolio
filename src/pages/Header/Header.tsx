import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION_LINKS } from '@/config/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from '@/components/ThemeToggle';

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
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Close on Escape key press
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    onNavClick(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center items-center transition-all duration-200 pointer-events-none
          ${isScrolled ? 'lg:py-4' : 'lg:py-6'} 
          p-0 lg:p-4`}
      >
        <nav
          className={`pointer-events-auto relative flex items-center justify-between lg:justify-center shadow-lg backdrop-blur-md transition-all duration-200 
            w-full lg:w-auto h-16 lg:h-auto
            rounded-none lg:rounded-full 
            ${isScrolled || mobileMenuOpen
              ? 'bg-white/95 dark:bg-[#050507]/95 supports-backdrop-filter:bg-white/85 dark:supports-backdrop-filter:bg-[#050507]/85 border-b border-[#D6DAE2] dark:border-[#22242D] lg:border lg:border-[#D6DAE2] lg:dark:border-[#22242D] shadow-sm dark:shadow-black/40'
              : 'bg-transparent border-b border-transparent lg:border lg:border-[#D6DAE2]/80 lg:dark:border-[#22242D]'
            }
            ${isScrolled
              ? 'lg:py-2 px-4 lg:px-6'
              : 'lg:py-3 px-4 lg:px-8'
            }`}
        >
          {/* Subtle top-edge hairline */}
          <div
            className={`absolute top-0 left-0 right-0 h-[1px] bg-slate-900/10 dark:bg-white/10 transition-opacity duration-300 ${
              isScrolled ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Desktop Navigation - Visible on Large Screens */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAVIGATION_LINKS.map((link, index) => {
              const isActive = activeSection === link.id;
              const Icon = link.icon;

              return (
                <motion.li
                  key={link.id}
                  className="relative z-10"
                  initial={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + index * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full flex items-center gap-2 cursor-pointer ${isActive
                      ? 'text-slate-950 dark:text-white font-semibold'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-slate-200/70 dark:bg-white/10 border border-[#D6DAE2] dark:border-white/10 rounded-full -z-10 shadow-xs"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {link.text}
                    </span>
                  </button>
                </motion.li>
              );
            })}

            {/* Hairline Divider */}
            <li className="relative z-10 mx-1 flex items-center" aria-hidden="true">
              <div className="h-4 w-[1px] bg-slate-300/70 dark:bg-white/10" />
            </li>

            {/* Integrated Theme Toggle */}
            <li className="relative z-10 flex items-center">
              <ThemeToggle />
            </li>
          </ul>

          {/* Mobile/Tablet Navigation Toggle */}
          <div className="lg:hidden flex items-center justify-between w-full pl-4 pr-1">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-bold text-xl tracking-tight text-slate-950 dark:text-white"
              style={{ animation: 'text-shimmer 6s ease-in-out infinite' }}
            >
              Portfolio
            </motion.span>
            <div className="flex items-center gap-1.5">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-full hover:bg-slate-200/60 dark:hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-slate-300/40 dark:hover:border-white/10 active:scale-95 cursor-pointer"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-menu"
              >
                {mobileMenuOpen ? (
                  <FaTimes size={20} className="text-slate-800 dark:text-white" />
                ) : (
                  <FaBars size={20} className="text-slate-800 dark:text-white" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Menu Container */}
            <motion.div
              id="mobile-navigation-menu"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-16 left-0 right-0 z-40 lg:hidden bg-white/95 dark:bg-[#050507]/95 supports-backdrop-filter:bg-white/85 dark:supports-backdrop-filter:bg-[#050507]/85 backdrop-blur-2xl border-b border-[#D6DAE2] dark:border-[#22242D] shadow-2xl dark:shadow-black/60 overflow-hidden max-h-[calc(100vh-4rem)] overflow-y-auto"
            >
              <div className="p-3 sm:p-4 flex flex-col gap-1.5 max-w-lg mx-auto">
                {NAVIGATION_LINKS.map((link, index) => {
                  const Icon = link.icon;
                  const isActive = activeSection === link.id;

                  return (
                    <motion.button
                      key={link.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => handleNavClick(link.id)}
                      className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl transition-all duration-200 group text-left cursor-pointer ${isActive
                        ? 'bg-blue-500/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-white/5 font-medium'
                        }`}
                    >
                      <div
                        className={`p-2 rounded-lg transition-colors duration-200 ${isActive
                          ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                          : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200/70 dark:group-hover:bg-white/10 group-hover:text-slate-900 dark:group-hover:text-white'
                          }`}
                      >
                        <Icon size={18} />
                      </div>
                      <span className="text-base tracking-tight">{link.text}</span>
                      {isActive && (
                        <motion.div
                          layoutId="mobileActiveIndicator"
                          className="ml-auto w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
