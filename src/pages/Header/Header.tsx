import React, { useState, useEffect, memo, useCallback } from 'react';
import { FaBars } from 'react-icons/fa';
import { NAVIGATION_LINKS } from '@/config/navigation';

interface HeaderProps {
  activeSection: string;
  onNavClick: (id: string) => void;
}

function Header({ activeSection, onNavClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Manage body overflow
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNavClick = useCallback((id: string) => {
    onNavClick(id);
    setIsMenuOpen(false);
  }, [onNavClick]);

  const handleLinkClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      event.preventDefault();
      handleNavClick(id);
    },
    [handleNavClick],
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40 supports-[backdrop-filter]:bg-background/60">
      <div className="md:fixed md:top-4 sm:top-2 md:left-1/2 md:transform md:-translate-x-1/2 w-full md:w-auto px-2 sm:px-3 md:px-0 py-1.5 sm:py-2 md:py-0">
        <div className="p-[1px] md:rounded-full bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 animate-gradient-x">
          <nav className="bg-background/90 backdrop-blur-xl md:rounded-full px-2 sm:px-3 md:px-6 py-1.5 sm:py-2 md:py-2.5 border border-white/5 shadow-lg shadow-primary/5">
            {/* Mobile Menu Button */}
            <div className="flex justify-between items-center md:hidden">
              <a
                href="#home"
                onClick={(event) => handleLinkClick(event, 'home')}
                className="text-foreground font-bold text-base sm:text-lg tracking-tight"
              >
                Portfolio
              </a>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground p-2 sm:p-2.5 text-xl sm:text-2xl hover:bg-secondary/50 rounded-full transition-colors"
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <FaBars />
              </button>
            </div>

            {/* Navigation Links */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block`}>
              <div className="flex flex-col md:flex-row md:items-center gap-2 sm:gap-2 md:gap-1 lg:gap-2 py-3 sm:py-4 md:py-0">
                {NAVIGATION_LINKS.map(({ id, icon: Icon, text }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={(event) => handleLinkClick(event, id)}
                    className={`px-3 sm:px-4 md:px-4 py-2.5 sm:py-3 md:py-2 rounded-lg md:rounded-full text-sm sm:text-base md:text-sm font-medium
                      transition-all duration-300 flex items-center gap-2 sm:gap-2.5
                      hover:bg-secondary/80 whitespace-nowrap
                      ${activeSection === id
                        ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                        : 'text-muted-foreground hover:text-foreground'
                      }
                    `}
                    aria-current={activeSection === id ? 'page' : undefined}
                  >
                    <Icon
                      className={`text-base sm:text-lg md:text-base transition-transform duration-300 ${activeSection === id ? 'scale-110' : ''
                        }`}
                    />
                    <span>{text}</span>
                  </a>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>

      <style>
        {`
          @keyframes gradient-x {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          .animate-gradient-x {
            animation: gradient-x 3s linear infinite;
            background-size: 200% 200%;
          }
        `}
      </style>
    </header>
  );
}

export default memo(Header);

