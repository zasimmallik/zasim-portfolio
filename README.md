# Portfolio Website

<div align="center">
  <pre>
    _____           _    __      _ _       
   |  __ \         | |  / _|    | (_)      
   | |__) |__  _ __| |_| |_ ___ | |_  ___  
   |  ___/ _ \| '__| __|  _/ _ \| | |/ _ \ 
   | |  | (_) | |  | |_| || (_) | | | (_) |
   |_|   \___/|_|   \__|_| \___/|_|_|\___/ 
  </pre>
</div>

Welcome to my personal portfolio — a focused showcase of my skills, experience, projects, and background.

Built with React + Vite, the site delivers a fast, modern, and responsive experience.

Explore my work, learn about my journey as a developer, and connect with me directly.

---

## Demo

![Portfolio Demo]()

---

## Live Preview

Check out the live preview of the portfolio website here:  
[**Live Demo**]()

---

## Project Structure

```
portfolio/
├── 📄 package.json                 # Project dependencies and scripts
├── 📄 vite.config.js              # Vite build configuration
├── 📄 tailwind.config.js          # Tailwind CSS configuration
├── 📄 postcss.config.js           # PostCSS configuration
├── 📄 tsconfig.json               # TypeScript configuration
├── 📄 tsconfig.node.json          # TypeScript Node config
├── 📄 eslint.config.js            # ESLint configuration
├── 📄 components.json             # ShadCN components config
├── 📄 index.html                  # HTML entry point
├── 📄 README.md                   # This file
│
├── 📁 public/                     # Static assets (favicon, etc)
│
└── 📁 src/
    ├── 📄 main.tsx                # React DOM entry point (TypeScript)
    ├── 📄 App.tsx                 # Main App component (TypeScript)
    ├── 📄 vite-env.d.ts           # Vite type definitions
    │
    ├── 📁 assets/                 # Static files
    │   ├── css/
    │   │   ├── index.css
    │   │   ├── Header.css
    │   │   └── tomorrow.css
    │   └── images/
    │       └── hero.jpg
    │
    ├── 📁 components/             # React components (TypeScript)
    │   ├── 📄 AnimatedGrid.tsx
    │   ├── 📄 enhanced-portfolio-card.tsx
    │   ├── 📄 globe.tsx
    │   │
    │   ├── 📁 ui/                 # ShadCN-inspired UI components
    │   │   ├── 📄 badge.tsx
    │   │   ├── 📄 button.tsx
    │   │   ├── 📄 card.tsx
    │   │   ├── 📄 cool-mode.ts
    │   │   ├── 📄 evervault-card.tsx
    │   │   ├── 📄 flip-words.tsx
    │   │   ├── 📄 icon-cloud.tsx
    │   │   ├── 📄 meteors.tsx
    │   │   ├── 📄 sparkles-text.tsx
    │   │   ├── 📄 tooltip.tsx
    │   │   └── 📄 index.ts
    │   │
    │   └── 📁 shared/             # Shared components
    │       ├── 📄 ErrorBoundary.tsx
    │       ├── 📄 LoadingSpinner.tsx
    │       └── 📄 index.ts
    │
    ├── 📁 config/                 # App configuration (TypeScript)
    │   ├── 📄 constants.ts
    │   └── 📄 navigation.ts
    │
    ├── 📁 pages/                  # Page components (TypeScript)
    │   ├── 📁 About/
    │   │   └── 📄 About.tsx
    │   ├── 📁 Contact/
    │   │   └── 📄 Contact.tsx
    │   ├── 📁 Experience/
    │   │   └── 📄 Experience.tsx
    │   ├── 📁 Header/
    │   │   └── 📄 Header.tsx
    │   ├── 📁 Hero/
    │   │   └── 📄 Hero.tsx
    │   ├── 📁 Projects/
    │   │   └── 📄 Projects.tsx
    │   └── 📁 Skills/
    │       └── 📄 Skills.tsx
    │
    ├── 📁 hooks/                  # Custom React hooks (TypeScript)
    │   ├── 📄 useIntersectionObserver.ts
    │   ├── 📄 usePrefersReducedMotion.ts
    │   ├── 📄 useScrollPosition.ts
    │   ├── 📄 useWindowSize.ts
    │   └── 📄 index.ts
    │
    ├── 📁 lib/                    # Utility functions (TypeScript)
    │   └── 📄 utils.ts
    │
    └── 📁 utils/                  # Helper utilities (TypeScript)
        ├── 📄 cn.ts               # ClassNames utility
        ├── 📄 errorHandler.ts
        ├── 📄 validators.ts
        └── 📄 index.ts
```

---

## Sections of the Portfolio

The portfolio website consists of the following sections:

- **Header** — Navigation and branding
- **Hero** — Eye-catching introduction section
- **About** — Professional background and summary
- **Skills** — Technical skills and expertise
- **Experience** — Work history and professional journey
- **Projects** — Showcase of completed projects with details
- **Contact** — Get in touch section with contact information

---

## Tech Stack

- **Frontend Framework:** React 18.3.1
- **Language:** TypeScript 5.x (100% type-safe)
- **Build Tool:** Vite 7.2.2
- **Styling:** Tailwind CSS 4.1.12 + PostCSS
- **Animations:** Framer Motion 12.23.12
- **Icons:** React Icons, Lucide React
- **UI Components:** ShadCN-inspired custom components
- **Component Library:** Radix UI
- **Code Quality:** ESLint with modern config
- **Type Safety:** Full TypeScript strict mode
- **Utilities:** TailwindMerge, clsx, class-variance-authority
- **Smooth Scrolling:** Lenis
- **Theme Support:** next-themes
- **Form Handling:** Web3Forms integration

---

## Ownership

This portfolio is the personal property of **Zasim Mallik**.  
All code, design, and content are owned and maintained by Zasim Mallik.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Development Commands

| Command           | Purpose                                           |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Start development server on http://localhost:5173 |
| `npm run build`   | Build optimized production bundle                 |
| `npm run preview` | Preview production build locally                  |
| `npm run lint`    | Run ESLint to check code quality                  |

---
