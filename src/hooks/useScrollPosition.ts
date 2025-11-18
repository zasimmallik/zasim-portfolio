/**
 * useScrollPosition Hook
 * Tracks scroll position and provides utilities
 */

import { useEffect, useState, useCallback } from 'react';

/**
 * @returns {Object} { scrollY, scrollX, isScrolled, scrollDirection }
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState({
    scrollY: 0,
    scrollX: 0,
    previousScrollY: 0,
  });

  const handleScroll = useCallback(() => {
    setScrollPosition((prev) => ({
      scrollY: window.scrollY,
      scrollX: window.scrollX,
      previousScrollY: prev.scrollY,
    }));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const isScrolled = scrollPosition.scrollY > 0;
  const scrollDirection = scrollPosition.scrollY > scrollPosition.previousScrollY ? 'down' : 'up';

  return {
    scrollY: scrollPosition.scrollY,
    scrollX: scrollPosition.scrollX,
    isScrolled,
    scrollDirection,
  };
}

export default useScrollPosition;

