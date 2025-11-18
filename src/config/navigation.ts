/**
 * Navigation Configuration
 * Centralized navigation links and structure
 */

import {
  FaHome,
  FaUser,
  FaCode,
  FaBriefcase,
  FaLaptopCode,
  FaEnvelope,
} from 'react-icons/fa';

export const NAVIGATION_LINKS = [
  { id: 'home', icon: FaHome, text: 'Home', label: 'Go to home section' },
  { id: 'about', icon: FaUser, text: 'About', label: 'Go to about section' },
  { id: 'skills', icon: FaCode, text: 'Skills', label: 'Go to skills section' },
  {
    id: 'experience',
    icon: FaBriefcase,
    text: 'Experience',
    label: 'Go to experience section',
  },
  {
    id: 'projects',
    icon: FaLaptopCode,
    text: 'Projects',
    label: 'Go to projects section',
  },
  { id: 'contact', icon: FaEnvelope, text: 'Contact', label: 'Go to contact section' },
];

export const SECTION_CONFIG = [
  { id: 'home', Component: null }, // Will be injected
  { id: 'about', Component: null },
  { id: 'skills', Component: null },
  { id: 'experience', Component: null },
  { id: 'projects', Component: null },
  { id: 'contact', Component: null },
];

export const SCROLL_MARGIN_CONFIG = {
  default: 40,
  md: 36,
  lg: 32,
};

export const SCROLL_OBSERVER_OPTIONS = {
  root: null,
  rootMargin: '-45% 0px -45% 0px',
  threshold: 0,
};

export default {
  NAVIGATION_LINKS,
  SECTION_CONFIG,
  SCROLL_MARGIN_CONFIG,
  SCROLL_OBSERVER_OPTIONS,
};

