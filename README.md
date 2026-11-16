# Zasim Mallik — Software Engineer & AI SaaS Founder Portfolio

Official portfolio website of **Zasim Mallik** — Software Engineer and Founder of **[Zeraql](https://zeraql.com)** & **[Rizmiq](https://rizmiq.com)**.

- **Live Website:** [https://zasimmallik.com](https://zasimmallik.com)
- **LLM Context (`llms.txt`):** [https://zasimmallik.com/llms.txt](https://zasimmallik.com/llms.txt)

![Zasim Mallik's Digital Portfolio](src/assets/images/Demo.png?raw=true "Zasim Mallik's Digital Portfolio")

---

## Tech Stack & Architecture

- **Framework:** React 18 + TypeScript + Vite 7
- **Styling & Design System:** Tailwind CSS v4 (Custom *Frosted Zinc* `#ECEEF2` & *Stealth Obsidian* `#050507` dual-theme architecture)
- **Typography:** Supreme (Display), Switzer (Sans), JetBrains Mono (Code)
- **Animations & Physics:** Framer Motion, Lenis Smooth Scroll, View Transitions API
- **Interactive Components:** Custom Prism.js IDE Workstation, 3D Interactive Tech Globe (`react-icon-cloud`), Scroll-Driven Stacking Project Cards
- **SEO & AI Discovery (GEO/AEO):** Unified Schema.org `@graph` (`ProfilePage`, `Person`, `Organization`, `WebSite`, `FAQPage`), `/llms.txt`, `/llms-full.txt`, and `sitemap.xml`

---

## Project Structure

```text
├── public/                 # Static assets, favicons, robots.txt, sitemap.xml, llms.txt
├── src/
│   ├── assets/             # Global CSS (Tailwind v4 theme, syntax highlighting) & images
│   ├── components/         # Reusable UI primitives, ThemeToggle, 3D IconCloud, ErrorBoundary
│   ├── config/             # Navigation links & application constants
│   ├── hooks/              # Custom React hooks (scroll position, window size, reduced motion)
│   ├── lib/                # Classname & utility helpers
│   ├── pages/              # Core sections (Header, Hero, About, Skills, Experience, Projects, Contact)
│   └── utils/              # Form validation & error handling utilities
├── index.html              # Entry HTML with Schema.org Knowledge Graph & Open Graph metadata
└── vite.config.ts          # Vite bundler & chunk splitting configuration
```

---

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run ESLint check
npm run lint

# Build for production
npm run build
```

---

## License & Author

Designed and engineered by **Zasim Mallik** ([GitHub](https://github.com/zasimmallik) · [LinkedIn](https://www.linkedin.com/in/zasimmallik/) · [X](https://x.com/zasimmallik)).
