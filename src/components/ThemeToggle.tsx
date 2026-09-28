import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-transparent ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === 'dark' || (!resolvedTheme && theme === 'dark');

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      className={`relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full 
        text-slate-600 hover:text-slate-900 
        dark:text-slate-400 dark:hover:text-slate-100
        hover:bg-slate-200/60 dark:hover:bg-white/10 
        border border-transparent hover:border-slate-300/40 dark:hover:border-white/10
        transition-colors duration-200 
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50
        group ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="dark-moon"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center text-cyan-400"
          >
            <Moon className="w-4 h-4 sm:w-[18px] sm:h-[18px] fill-cyan-400/20 transition-transform duration-200 group-hover:rotate-12" />
          </motion.div>
        ) : (
          <motion.div
            key="light-sun"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center text-amber-500"
          >
            <Sun className="w-4 h-4 sm:w-[18px] sm:h-[18px] fill-amber-400/30 transition-transform duration-200 group-hover:rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;
