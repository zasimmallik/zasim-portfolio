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
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center items-center transition-all duration-200 pointer-events-none
          ${isScrolled ? 'lg:py-4' : 'lg:py-6'} 
          p-0 lg:p-4`}
      >
        <nav
          className={`pointer-events-auto relative flex items-center justify-between lg:justify-center shadow-lg backdrop-blur-md transition-all duration-200 
            w-full lg:w-auto
            rounded-none lg:rounded-full 
            border-b border-slate-200/80 dark:border-white/5 lg:border lg:border-slate-200/80 lg:dark:border-white/10
            ${isScrolled
              ? 'bg-white/85 dark:bg-[#010410]/80 supports-backdrop-filter:bg-white/70 dark:supports-backdrop-filter:bg-[#010410]/60 py-3 lg:py-2 px-4 lg:px-6 shadow-slate-200/50 dark:shadow-blue-900/5'
              : 'bg-transparent py-4 lg:py-3 px-4 lg:px-8'
            }`}
        >
          {/* Animated gradient top-edge line (visible when scrolled) */}
          <div
            className={`absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-500 ${
              isScrolled ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), rgba(6,182,212,0.5), rgba(139,92,246,0.4), transparent)',
            }}
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
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full flex items-center gap-2 ${isActive
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-blue-500/10 border border-blue-500/20 rounded-full -z-10"
                        style={{
                          boxShadow: '0 0 15px rgba(59,130,246,0.15), 0 0 30px rgba(59,130,246,0.05)',
                        }}
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
              className="font-bold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-blue-600 to-slate-700 dark:from-white dark:via-blue-200 dark:to-white/70 bg-clip-text text-transparent bg-[length:200%_auto]"
              style={{ animation: 'text-shimmer 6s ease-in-out infinite' }}
            >
              Portfolio
            </motion.span>
            <div className="flex items-center gap-1.5">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-full hover:bg-slate-200/60 dark:hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-slate-300/40 dark:hover:border-white/10 active:scale-95"
                aria-label="Toggle menu"
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
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/10 dark:bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Menu Container */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-[60px] sm:top-[72px] left-0 right-0 z-40 lg:hidden bg-white/95 dark:bg-background/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="p-2 flex flex-col gap-1">
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
                      className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all group ${isActive
                        ? 'bg-blue-500/10 text-blue-500'
                        : 'hover:bg-secondary/50 text-foreground'
                        }`}
                    >
                      <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-blue-500/20' : 'bg-secondary group-hover:bg-secondary/80'}`}>
                        <Icon size={18} className={isActive ? 'text-blue-500' : 'text-muted-foreground'} />
                      </div>
                      <span className="font-medium text-base">{link.text}</span>
                      {isActive && (
                        <motion.div
                          layoutId="mobileActiveIndicator"
                          className="ml-auto w-2 h-2 rounded-full bg-blue-500"
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
