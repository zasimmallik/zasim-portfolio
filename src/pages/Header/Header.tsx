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
    <header className="fixed top-0 left-0 w-full z-50 bg-[#020617]/95 backdrop-blur-md">
      <div className="md:fixed md:top-2 sm:top-2 md:left-1/2 md:transform md:-translate-x-1/2 w-full md:w-auto px-2 sm:px-3 md:px-0 py-1.5 sm:py-2 md:py-0">
        <div className="p-px sm:p-0.5 md:rounded-full bg-linear-to-r from-emerald-400 via-cyan-500 to-indigo-500 animate-gradient-x">
          <nav className="bg-gray-900/90 backdrop-blur-md md:rounded-full px-2 sm:px-3 md:px-6 py-1.5 sm:py-2 md:py-2.5">
            {/* Mobile Menu Button */}
            <div className="flex justify-between items-center md:hidden">
              <a
                href="#home"
                onClick={(event) => handleLinkClick(event, 'home')}
                className="text-white font-bold text-base sm:text-lg"
              >
                Portfolio
              </a>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2 sm:p-2.5 text-xl sm:text-2xl"
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
                    className={`px-3 sm:px-4 md:px-3 py-2.5 sm:py-3 md:py-1.5 rounded-lg md:rounded-full text-sm sm:text-base md:text-sm font-medium
                      transition-all duration-300 flex items-center gap-2 sm:gap-2.5
                      hover:bg-white/10 whitespace-nowrap
                      ${
                        activeSection === id
                          ? 'bg-white/15 text-white'
                          : 'text-gray-300 hover:text-white'
                      }
                    `}
                    aria-current={activeSection === id ? 'page' : undefined}
                  >
                    <Icon
                      className={`text-base sm:text-lg md:text-base ${
                        activeSection === id ? 'scale-110' : ''
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

