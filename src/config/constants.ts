/**
 * Global Constants
 * Application-wide constants and magic values
 */

// Text Constants
export const TEXTS = {
  HERO: {
    WELCOME: 'Welcome to Zasim Mallik\'s universe.',
    NAME: 'Zasim Mallik',
    TITLE: 'Full-Stack Developer | Building AI SaaS',
    SUBTITLE: 'Full-Stack & AI SaaS Developer ???? | Building Next-Gen Products That Solve Real Problems ???????',
    RESUME_BTN: 'Get Resume',
    LEARN_MORE_BTN: 'Learn More',
    CONTACT_BTN: 'Get in Touch',
  },
  ABOUT: {
    LABEL: 'About',
    TITLE: 'About Me',
    CONNECT: 'Connect with me',
  },
  SKILLS: {
    LABEL: 'Skills',
    TITLE: 'Skills & Technologies',
    SUBTITLE: 'A comprehensive toolkit for building modern, scalable applications',
  },
  EXPERIENCE: {
    LABEL: 'Career Journey',
    TITLE: 'Professional Experience',
  },
  PROJECTS: {
    TITLE: 'Featured Projects',
    SUBTITLE: 'A curated set of products and prototypes built with clarity, precision, and purpose.',
  },
  CONTACT: {
    LABEL: 'Let\'s Connect',
    TITLE: 'Get in Touch',
    SUBTITLE: 'Have a question or want to work together? Drop us a message!',
    TALK_SUBTITLE: 'Let\'s Talk',
    TALK_DESC: 'I\'m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.',
    QUOTE: 'Looking forward to hearing from you and discussing how we can work together to bring your ideas to life.',
  },
};

// Color Constants
export const COLORS = {
  PRIMARY: '#2DD4BF', // Cyan
  SECONDARY: '#38BDF8', // Blue
  ACCENT: '#8B5CF6', // Purple
  DESTRUCTIVE: '#EF4444', // Red
  SUCCESS: '#10B981', // Green
  WARNING: '#F59E0B', // Amber
  GRADIENT_CYAN_BLUE: 'from-cyan-400 to-blue-500',
  GRADIENT_BLUE_PURPLE: 'from-blue-400 to-purple-500',
};

// Size Constants
export const SIZES = {
  ICON_SM: 16,
  ICON_MD: 24,
  ICON_LG: 32,
  ICON_XL: 48,
  RADIUS_SM: 4,
  RADIUS_MD: 8,
  RADIUS_LG: 12,
  RADIUS_XL: 16,
};

// Timing Constants
export const TIMING = {
  ANIMATION_FAST: 0.2,
  ANIMATION_NORMAL: 0.3,
  ANIMATION_SLOW: 0.5,
  ANIMATION_VERY_SLOW: 1,
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 500,
};

// Breakpoints (should match Tailwind)
export const BREAKPOINTS = {
  XS: 320,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};

// Contact Information
export const CONTACT_INFO = {
  EMAIL: 'zasimmallickofficial@gmail.com',
  PHONE: '+8801000000000',
  LOCATION: 'Natullabad, Barisal, Bangladesh',
  LINKEDIN: 'https://www.linkedin.com/in/zasimmallik/',
  GITHUB: 'https://github.com/zasimmallik',
  TWITTER: 'https://twitter.com/zasimmallik',
  INSTAGRAM: 'https://instagram.com/zasimmallik',
  FACEBOOK: 'https://facebook.com/zasimmallik',
};

// Social Links (for About section)
export const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    url: CONTACT_INFO.LINKEDIN,
    icon: 'FaLinkedinIn',
    color: 'hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-700',
  },
  {
    name: 'GitHub',
    url: CONTACT_INFO.GITHUB,
    icon: 'FaGithub',
    color: 'hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-800',
  },
  {
    name: 'Twitter',
    url: CONTACT_INFO.TWITTER,
    icon: 'FaTwitter',
    color: 'hover:bg-gradient-to-br hover:from-blue-400 hover:to-blue-500',
  },
  {
    name: 'Instagram',
    url: CONTACT_INFO.INSTAGRAM,
    icon: 'FaInstagram',
    color: 'hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-500',
  },
  {
    name: 'Facebook',
    url: CONTACT_INFO.FACEBOOK,
    icon: 'FaFacebookF',
    color: 'hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-700',
  },
];

// API Endpoints (for future use)
export const API_ENDPOINTS = {
  CONTACT_FORM: '/api/contact',
  NEWSLETTER: '/api/newsletter',
};

export default {
  TEXTS,
  COLORS,
  SIZES,
  TIMING,
  BREAKPOINTS,
  CONTACT_INFO,
  SOCIAL_LINKS,
  API_ENDPOINTS,
};

