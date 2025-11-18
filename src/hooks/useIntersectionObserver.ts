/**
 * useIntersectionObserver Hook
 * Detects when elements enter/leave viewport
 */

import { useEffect, useRef, useState } from 'react';

/**
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - Intersection threshold (0-1)
 * @param {string} options.rootMargin - Margin around root
 * @returns {Object} { ref, isVisible }
 */
export function useIntersectionObserver(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px',
      ...options,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Optional: Stop observing after first intersection
        // observer.unobserve(entry.target);
      } else {
        setIsVisible(false);
      }
    }, defaultOptions);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return { ref, isVisible };
}

export default useIntersectionObserver;

