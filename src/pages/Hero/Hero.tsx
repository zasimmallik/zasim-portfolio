import { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-css";
import "@/assets/css/tomorrow.css";
import { FlipWords } from "@/components/ui/flip-words";
import {
  Files,
  Search,
  GitBranch,
  Blocks,
  Settings,
  Folder,
  FolderOpen,
  ChevronDown,
  ChevronRight,
  Copy,
  Check,
  FileCode2,
  FileJson,
  FileText,
  Terminal,
  Rocket,
  Github,
  Download,
  ArrowUpRight,
  Briefcase,
  Cpu,
} from "lucide-react";

// Enhanced Grid Background
const GridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-25 dark:opacity-[0.12] mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          className="absolute inset-0"
        >
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <rect
              width="50"
              height="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-slate-400/50 dark:text-white/25"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#DFE4EC]/70 to-[#DFE4EC] dark:via-[#050507]/70 dark:to-[#050507]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#DFE4EC_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#050507_100%)] opacity-80" />
    </div>
  );
};

interface CodeFile {
  name: string;
  path: string;
  language: string;
  prismLanguage: string;
  content: string;
}

const FILES: Record<string, CodeFile> = {
  'developer.ts': {
    name: 'developer.ts',
    path: 'src/config/developer.ts',
    language: 'typescript',
    prismLanguage: 'typescript',
    content: `const developer = {
  name: 'Zasim Mallik',
  role: 'Software Engineer',
  founderOf: ['Zeraql', 'Rizmiq'],
  languages: ['HTML5', 'CSS3', 'TypeScript', 'JavaScript', 'Python', 'SQL'],
  frontend: ['React', 'Next.js', 'Tailwind CSS', 'App Router'],
  backend: ['Node.js', 'Express.js', 'FastAPI', 'REST API', 'JWT'],
  databases: ['PostgreSQL', 'MongoDB', 'Prisma ORM', 'Vector DBs'],
  ai: ['OpenAI', 'Gemini', 'Claude', 'LangChain', 'LangGraph', 'RAG', 'MCP'],
  devops: ['Docker', 'Git', 'GitHub', 'Vercel', 'Railway', 'AWS'],
  auth: ['Clerk', 'NextAuth', 'OAuth'],
  payments: ['Stripe'],
  hardWorker: true,
  quickLearner: true,
  problemSolver: true,
  yearsOfExperience: 4,
  hireable(): boolean {
    return this.hardWorker &&
           this.problemSolver &&
           this.ai.length >= 5;
  }
};`
  },
  'skills.json': {
    name: 'skills.json',
    path: 'src/config/skills.json',
    language: 'json',
    prismLanguage: 'json',
    content: `{
  "languages": ["TypeScript", "JavaScript", "Python", "SQL"],
  "frontend": ["React", "Next.js", "Tailwind CSS", "App Router"],
  "backend": ["Node.js", "Express.js", "FastAPI", "JWT"],
  "databases": ["PostgreSQL", "MongoDB", "Prisma ORM"],
  "ai_llm": {
    "apis": ["OpenAI", "Gemini", "Claude"],
    "frameworks": ["LangChain", "LangGraph", "RAG", "MCP"]
  },
  "devops": ["Docker", "Git", "Vercel", "Railway", "AWS"],
  "auth_payments": ["Clerk", "NextAuth", "OAuth", "Stripe"],
  "entrepreneurship": {
    "startups": ["Zeraql", "Rizmiq"],
    "focus": ["AI SaaS Products", "Developer Tools"]
  }
}`
  },
  'projects.ts': {
    name: 'projects.ts',
    path: 'src/pages/projects.ts',
    language: 'typescript',
    prismLanguage: 'typescript',
    content: `import { Startup } from '@/types';

export const activeProjects: Startup[] = [
  {
    name: 'Zeraql',
    status: 'In Development',
    url: 'https://zeraql.com'
  },
  {
    name: 'Rizmiq',
    status: 'Beta Launching',
    url: 'https://rizmiq.com'
  }
];`
  },
  'contact.css': {
    name: 'contact.css',
    path: 'src/pages/contact.css',
    language: 'css',
    prismLanguage: 'css',
    content: `.developer-card {
  name: "Zasim Mallik";
  email: "zasimmallickofficial@gmail.com";
  linkedin: "linkedin.com/in/zasimmallik";
  github: "github.com/zasimmallik";
  twitter: "x.com/zasimmallik";
  availability: "selective_opportunities";
}`
  }
};

export default function Hero() {
  const words = [
    "Software Engineer",
    "Full-Stack Engineer",
    "AI SaaS Founder",
  ];

  const [activeTab, setActiveTab] = useState<keyof typeof FILES>('developer.ts');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [copied, setCopied] = useState(false);
  const [openFolders, setOpenFolders] = useState({
    src: true,
    config: true,
    pages: true
  });
  const [isVisible, setIsVisible] = useState(false);

  const toggleFolder = (folderName: 'src' | 'config' | 'pages') => {
    setOpenFolders(prev => ({
      ...prev,
      [folderName]: !prev[folderName]
    }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(FILES[activeTab].content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    setIsVisible(true);

    // Add CSS animation for grid and dots
    const style = document.createElement("style");
    style.textContent = `
      @keyframes gridPulse {
        0%, 100% { opacity: 0.1; }
        50% { opacity: 0.3; }
      }
      
      @keyframes dotPulse {
        0%, 100% { opacity: 0.2; transform: scale(0.8); }
        50% { opacity: 0.5; transform: scale(1.2); }
      }

      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(25px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }

      @keyframes gradientX {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      .animate-fade-in-up {
        animation: fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        opacity: 0;
      }

      .delay-100 { animation-delay: 0.1s; }
      .delay-200 { animation-delay: 0.2s; }
      .delay-300 { animation-delay: 0.3s; }
      .delay-400 { animation-delay: 0.4s; }
      
      @keyframes scrollLine {
        0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
        30% { transform: scaleY(1); transform-origin: top; opacity: 1; }
        60% { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
        100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
      }

      @keyframes blurIn {
        0% { opacity: 0; filter: blur(25px); transform: translateY(30px); }
        100% { opacity: 1; filter: blur(0); transform: translateY(0); }
      }

      @keyframes aurora {
        0% { background-position: 50% 50%, 50% 50%; }
        100% { background-position: 350% 50%, 350% 50%; }
      }

      @keyframes spotlight {
        0% { background-position: 0% 50%; }
        100% { background-position: 100% 50%; }
      }

      @keyframes shine {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(200%); }
      }

      .animate-blur-in {
        animation: blurIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        opacity: 0;
      }

      .animate-scroll-line {
        animation: scrollLine 2.5s cubic-bezier(0.77, 0, 0.175, 1) infinite;
      }
      
      .delay-500 { animation-delay: 0.5s; }
      .delay-700 { animation-delay: 0.7s; }
      
      /* Media query for 1366x768 resolution */
      @media screen and (width: 1366px) and (height: 768px), 
             screen and (width: 1367px) and (height: 768px),
             screen and (width: 1368px) and (height: 769px) {
        .hero {
          padding-top: 12rem !important;
        }
        .hero .container {
          padding-top: 10rem !important;
          margin-top: 5rem !important;
        }
        .hero-section-padding {
          padding-top: 12rem !important;
        }
      }

      @keyframes shimmer-badge {
        0% { left: -100%; }
        100% { left: 200%; }
      }

      @keyframes rotating-gradient {
        0% { --gradient-angle: 0deg; }
        100% { --gradient-angle: 360deg; }
      }

      @property --gradient-angle {
        syntax: "<angle>";
        inherits: false;
        initial-value: 0deg;
      }
    `;
    document.head.appendChild(style);

    // Apply extra padding for 1366x768 resolution
    const checkResolution = () => {
      const isTargetResolution =
        window.innerWidth >= 1360 &&
        window.innerWidth <= 1370 &&
        window.innerHeight >= 760 &&
        window.innerHeight <= 775;

      if (isTargetResolution) {
        document.documentElement.style.setProperty(
          "--hero-padding-top",
          "12rem"
        );
      } else {
        document.documentElement.style.setProperty("--hero-padding-top", "0");
      }
    };

    checkResolution();
    window.addEventListener("resize", checkResolution);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener("resize", checkResolution);
    };
  }, []);

  // Highlight code on mount or when active tab changes
  useEffect(() => {
    Prism.highlightAll();
  }, [activeTab]);

  const currentFile = FILES[activeTab];
  const lines = currentFile.content.split('\n');

  return (
    <>
      <div role="region" aria-label="Hero Introduction" className="bg-[#DFE4EC] dark:bg-[#050507] text-[#090A0C] dark:text-[#FFFFFF] min-h-screen relative overflow-hidden selection:bg-blue-500/20 dark:selection:bg-blue-500/30">

        {/* Dynamic Multi-Layer Background (Aurora + Light Orbs) */}
        <div className="absolute inset-0 bg-[#DFE4EC] dark:bg-[#050507] z-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noiseFilter%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noiseFilter)%22%2F%3E%3C%2Fsvg%3E')] opacity-10 dark:opacity-15 mix-blend-soft-light pointer-events-none"></div>

          {/* Subtle architectural ambient illumination */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-500/[0.04] dark:bg-blue-500/[0.03] blur-[140px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#DFE4EC_130%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#050507_130%)] pointer-events-none" />
        </div>

        <section
          className="hero min-h-screen flex items-start lg:items-center justify-center relative px-4 xs:px-6 sm:px-8 lg:px-12 py-16 sm:py-20 md:py-24 lg:py-16 pb-40 hero-section-padding z-10"
          style={{ paddingTop: "var(--hero-padding-top, 0)" }}
        >
          {/* Grid Background */}
          <GridBackground />

          {/* Main Content Layout Grid */}
          <div
            className="container mx-auto flex flex-col lg:flex-row items-center justify-between relative pt-20 pb-8 sm:pt-28 sm:pb-12 md:pt-32 lg:py-12 lg:pt-28 xl:pt-28 px-2 xs:px-4 sm:px-6 gap-8 sm:gap-10 md:gap-12 lg:gap-10 xl:gap-20"
          >
            {/* Left Column - Redesigned Content & Text */}
            <div className="w-full lg:w-[47%] xl:w-[48%] flex flex-col items-start text-left relative z-20">

              {/* Minimalist Status Badge */}
              <div className="animate-blur-in relative inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#13141A] dark:bg-[#F3F5F9] border border-[#22242D] dark:border-[#C5CDD9] mb-5 sm:mb-8 transition-colors duration-150 shadow-sm max-w-full">
                <span className="w-2 h-2 rounded-full bg-blue-400 dark:bg-blue-600 animate-pulse shrink-0" />
                <span className="text-[#F3F5F9] dark:text-[#090A0C] text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase font-mono truncate">
                  Welcome to my portfolio
                </span>
              </div>

              {/* Typography Redesign (Bold Headline + Glowing Accents) */}
              <div className="relative mb-5 sm:mb-8 animate-blur-in delay-100 w-full">
                <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold leading-[0.95] lg:leading-[0.9] tracking-tight relative text-slate-950 dark:text-white">
                  <span className="block text-slate-700 dark:text-slate-400 font-normal text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl mb-2 sm:mb-3 tracking-normal">
                    Hey, I&apos;m
                  </span>
                  <span className="relative block sm:inline-block text-slate-950 dark:text-white">
                    Zasim Mallik
                  </span>
                </h1>
              </div>

              {/* Sub-Header & Role Flip Words */}
              <div className="animate-blur-in delay-200 relative inline-flex items-center gap-2.5 sm:gap-3 px-3.5 py-2 sm:px-4.5 sm:py-2.5 rounded-full bg-[#F3F5F9] dark:bg-[#13141A] border border-[#C5CDD9] dark:border-[#22242D] mb-6 sm:mb-10 backdrop-blur-md hover:border-blue-500/40 dark:hover:border-blue-500/30 transition-all duration-200 group cursor-default w-full sm:w-auto max-w-full shadow-[0_4px_14px_-3px_rgba(15,23,42,0.08)] dark:shadow-xs overflow-hidden">
                <Rocket className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 relative z-10" />
                <span className="min-w-0 flex-1 sm:flex-none overflow-hidden relative z-10">
                  <FlipWords
                    className="text-sm sm:text-base md:text-lg !text-blue-700 dark:!text-blue-400 font-bold truncate tracking-wide block w-full font-mono"
                    words={words}
                  />
                </span>
              </div>

              {/* Description Section with Light-up Side Accent */}
              <div className="relative mb-8 sm:mb-10 max-w-xl group animate-blur-in delay-300 w-full">
                <div className="absolute -left-4 top-1 bottom-1 w-[3px] bg-gradient-to-b from-blue-600 via-cyan-500 to-transparent rounded-full hidden sm:block group-hover:from-blue-500 group-hover:scale-y-105 transition-all duration-200" />
                <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl text-slate-700 dark:text-slate-400 leading-relaxed font-normal tracking-wide group-hover:text-slate-950 dark:group-hover:text-slate-200 transition-colors duration-200 sm:pl-2">
                  I design, engineer, and ship AI-powered SaaS. Currently building two startups and turning complex ideas into fast, reliable software.
                </p>
              </div>

              {/* Redesigned Floating Cards (Traits Showcase) */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full mb-8 sm:mb-10 animate-blur-in delay-300">

                {/* Card 1: Startups */}
                <div className="relative flex flex-col items-start p-3.5 sm:p-4.5 rounded-2xl bg-[#F3F5F9] dark:bg-[#13141A] border border-[#C5CDD9] dark:border-[#22242D] hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-200 group/card shadow-[0_8px_24px_-6px_rgba(15,23,42,0.09),0_2px_6px_-1px_rgba(15,23,42,0.04)] hover:shadow-[0_14px_30px_-6px_rgba(15,23,42,0.13)] dark:shadow-xs hover:-translate-y-0.5 overflow-hidden">
                  <div className="p-2 rounded-xl bg-[#E7ECF3] dark:bg-[#1A1B22] border border-[#C5CDD9] dark:border-[#22242D] text-blue-600 dark:text-blue-400 mb-2 sm:mb-2.5 transition-transform group-hover/card:scale-105 shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400 tracking-wider font-semibold">Startups</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-950 dark:text-white mt-0.5">Zeraql & Rizmiq</span>
                </div>

                {/* Card 2: Core Focus */}
                <div className="relative flex flex-col items-start p-3.5 sm:p-4.5 rounded-2xl bg-[#F3F5F9] dark:bg-[#13141A] border border-[#C5CDD9] dark:border-[#22242D] hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-200 group/card shadow-[0_8px_24px_-6px_rgba(15,23,42,0.09),0_2px_6px_-1px_rgba(15,23,42,0.04)] hover:shadow-[0_14px_30px_-6px_rgba(15,23,42,0.13)] dark:shadow-xs hover:-translate-y-0.5 overflow-hidden">
                  <div className="p-2 rounded-xl bg-[#E7ECF3] dark:bg-[#1A1B22] border border-[#C5CDD9] dark:border-[#22242D] text-blue-600 dark:text-blue-400 mb-2 sm:mb-2.5 transition-transform group-hover/card:scale-105 shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400 tracking-wider font-semibold">Core Focus</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-950 dark:text-white mt-0.5">AI SaaS</span>
                </div>
              </div>

              {/* Startup Web Projects Quick Links */}
              <div className="flex flex-wrap gap-2.5 sm:gap-4 items-center mb-8 sm:mb-12 sm:pl-1 text-sm animate-blur-in delay-300">
                <a
                  href="https://zeraql.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3F5F9] dark:bg-[#13141A] border border-[#C5CDD9] dark:border-[#22242D] hover:border-blue-500/50 dark:hover:border-blue-400/50 hover:bg-[#F7F8FB] dark:hover:bg-[#181922] transition-all text-xs font-mono font-medium text-slate-800 dark:text-slate-200 shadow-[0_4px_12px_-2px_rgba(15,23,42,0.07)] dark:shadow-xs group/link"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  <span>zeraql.com</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                </a>

                <a
                  href="https://rizmiq.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3F5F9] dark:bg-[#13141A] border border-[#C5CDD9] dark:border-[#22242D] hover:border-emerald-500/50 dark:hover:border-emerald-400/50 hover:bg-[#F7F8FB] dark:hover:bg-[#181922] transition-all text-xs font-mono font-medium text-slate-800 dark:text-slate-200 shadow-[0_4px_12px_-2px_rgba(15,23,42,0.07)] dark:shadow-xs group/link"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>rizmiq.com</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-emerald-600 dark:group-hover/link:text-emerald-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                </a>
              </div>

              {/* Premium Redesigned Action CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-blur-in delay-400">
                {/* GitHub Primary Button */}
                <a
                  href="https://github.com/zasimmallik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center w-full sm:w-auto px-7 py-3 rounded-full bg-[#18181B] hover:bg-black dark:bg-[#F3F5F9] dark:hover:bg-[#DFE4EC] text-[#F3F5F9] dark:text-[#050507] font-semibold text-xs sm:text-sm tracking-wide font-mono transition-all duration-200 hover:-translate-y-0.5 shadow-[0_8px_20px_-4px_rgba(15,23,42,0.22)] dark:shadow-black/40"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <span>View GitHub</span>
                    <Github className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                  </span>
                </a>

                {/* Resume Download Button */}
                <a
                  href="/resume.pdf"
                  download
                  className="group relative inline-flex items-center justify-center w-full sm:w-auto px-7 py-3 rounded-full bg-[#F3F5F9] dark:bg-[#13141A] hover:bg-[#F7F8FB] dark:hover:bg-[#1A1B24] border border-[#C5CDD9] dark:border-[#22242D] hover:border-slate-400 dark:hover:border-slate-500 text-slate-900 dark:text-slate-200 font-semibold text-xs sm:text-sm tracking-wide font-mono transition-all duration-200 hover:-translate-y-0.5 shadow-[0_6px_16px_-3px_rgba(15,23,42,0.08)] dark:shadow-xs"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <span>Get Resume</span>
                    <Download className="w-4 h-4 text-slate-600 dark:text-slate-400 shrink-0 transition-transform group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </div>
            </div>

            {/* Right Column - Senior Engineer Code Editor Window */}
            <div className={`w-full lg:w-[50%] xl:w-[48%] transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative group w-full max-w-full">

                <div className="relative rounded-2xl bg-[#F3F5F9] dark:bg-[#13141A] border border-[#C5CDD9] dark:border-[#22242D] shadow-[0_24px_60px_-12px_rgba(15,23,42,0.16),0_6px_20px_-4px_rgba(15,23,42,0.08)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)] overflow-hidden transition-all duration-200">
                  {/* Subtle hairline top highlight */}
                  <div className="absolute top-0 inset-x-0 h-px bg-[#F7F8FB]/70 dark:bg-white/10 pointer-events-none z-20" />

                  {/* Window Header */}
                  <div className="bg-[#DDE2EC] dark:bg-[#0A0B0E] px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 border-b border-[#C5CDD9] dark:border-[#1E2028] relative z-20">
                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56]/90 hover:brightness-110 transition-all cursor-pointer"></div>
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E]/90 hover:brightness-110 transition-all cursor-pointer"></div>
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27C93F]/90 hover:brightness-110 transition-all cursor-pointer"></div>
                    </div>

                    {/* Centered title */}
                    <div className="flex items-center gap-1.5 bg-[#F3F5F9] dark:bg-[#14151C] border border-[#C5CDD9] dark:border-[#262835] px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] text-slate-700 dark:text-[#A1A1AA] font-mono shadow-xs min-w-0 truncate">
                      <Terminal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span className="truncate">zasim-IDE v1.1.3</span>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                      {/* Copy code button */}
                      <button
                        onClick={copyToClipboard}
                        className="p-1.5 rounded-lg bg-[#F3F5F9] dark:bg-[#181920] hover:bg-[#F7F8FB] dark:hover:bg-[#22242D] border border-[#C5CDD9] dark:border-[#22242D] text-slate-600 dark:text-[#A1A1AA] hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer relative group/copy shadow-xs"
                        title="Copy code"
                      >
                        {copied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 px-2 py-1 text-[10px] bg-slate-950 text-white border border-white/10 rounded opacity-0 pointer-events-none group-hover/copy:opacity-100 transition-opacity whitespace-nowrap z-55">
                          {copied ? 'Copied!' : 'Copy code'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* IDE Body */}
                  <div className="flex min-h-[340px] sm:min-h-[420px] relative z-20">

                    {/* Activity Bar (Visible on md and larger) */}
                    <div className="hidden md:flex flex-col items-center justify-between py-4 w-11 xl:w-12 bg-[#D5DBE7] dark:bg-[#08090C] border-r border-[#C5CDD9] dark:border-[#1E2028] shrink-0 select-none">
                      <div className="flex flex-col items-center gap-6 w-full">
                        {/* Files Explorer Toggle */}
                        <button
                          onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                          className={`p-2 rounded-lg transition-all relative group cursor-pointer ${isSidebarExpanded ? 'text-slate-950 bg-[#F3F5F9] dark:text-white dark:bg-[#181920] border border-[#C5CDD9] dark:border-[#22242D] shadow-xs' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                            }`}
                        >
                          <Files className="w-5 h-5" />
                        </button>

                        {/* Search Icon */}
                        <div className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-400 p-2 rounded-lg cursor-not-allowed transition-all relative group">
                          <Search className="w-5 h-5" />
                        </div>

                        {/* Git Branch Icon */}
                        <div className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-400 p-2 rounded-lg cursor-not-allowed transition-all relative group">
                          <GitBranch className="w-5 h-5" />
                        </div>

                        {/* Extensions Icon */}
                        <div className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-400 p-2 rounded-lg cursor-not-allowed transition-all relative group">
                          <Blocks className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Settings */}
                      <div className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-400 p-2 rounded-lg cursor-default transition-all">
                        <Settings className="w-5 h-5" />
                      </div>
                    </div>

                    {/* File Explorer Sidebar */}
                    {isSidebarExpanded && (
                      <div className="hidden md:block w-36 xl:w-44 bg-[#E7ECF3] dark:bg-[#0B0C10] border-r border-[#C5CDD9] dark:border-[#1E2028] py-3 select-none text-left font-sans shrink-0 overflow-y-auto">
                        <div className="px-3 mb-2 flex items-center justify-between text-slate-500 dark:text-[#71717A] font-bold text-[9px] uppercase tracking-wider">
                          <span>Explorer</span>
                        </div>

                        {/* File Tree */}
                        <div className="text-slate-600 dark:text-[#A1A1AA] text-xs font-medium">
                          {/* Workspace Root */}
                          <div className="flex items-center gap-1.5 px-3 py-1 text-slate-900 dark:text-slate-200 font-semibold truncate">
                            <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-[#71717A]" />
                            <span className="truncate">zasim-portfolio</span>
                          </div>

                          {/* src folder */}
                          <div className="ml-2">
                            <button
                              onClick={() => toggleFolder('src')}
                              className="flex items-center gap-1.5 w-full text-left px-2.5 py-1 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-[#DDE2EC] dark:hover:bg-white/[0.04] cursor-pointer rounded-md transition-colors"
                            >
                              {openFolders.src ? (
                                <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-[#71717A]" />
                              ) : (
                                <ChevronRight className="w-3.5 h-3.5 text-slate-500 dark:text-[#71717A]" />
                              )}
                              {openFolders.src ? (
                                <FolderOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                              ) : (
                                <Folder className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                              )}
                              <span>src</span>
                            </button>

                            {/* config folder */}
                            {openFolders.src && (
                              <div className="ml-3">
                                <button
                                  onClick={() => toggleFolder('config')}
                                  className="flex items-center gap-1.5 w-full text-left px-2.5 py-1 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-[#DDE2EC] dark:hover:bg-white/[0.04] cursor-pointer rounded-md transition-colors"
                                >
                                  {openFolders.config ? (
                                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-[#71717A]" />
                                  ) : (
                                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 dark:text-[#71717A]" />
                                  )}
                                  {openFolders.config ? (
                                    <FolderOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                                  ) : (
                                    <Folder className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                                  )}
                                  <span>config</span>
                                </button>

                                {/* config files */}
                                {openFolders.config && (
                                  <div className="ml-2 space-y-0.5">
                                    <button
                                      onClick={() => setActiveTab('developer.ts')}
                                      className={`flex items-center gap-1.5 w-full text-left px-2 py-1 cursor-pointer rounded-md transition-colors ${activeTab === 'developer.ts'
                                          ? 'text-slate-950 dark:text-white bg-[#F3F5F9] dark:bg-[#181922] font-semibold border border-[#C5CDD9] dark:border-[#2A2C38] shadow-xs'
                                          : 'text-slate-600 dark:text-[#8E909B] hover:text-slate-950 dark:hover:text-white hover:bg-[#DDE2EC] dark:hover:bg-white/[0.04] border border-transparent'
                                        }`}
                                    >
                                      <FileCode2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                                      <span className="truncate">developer.ts</span>
                                    </button>

                                    <button
                                      onClick={() => setActiveTab('skills.json')}
                                      className={`flex items-center gap-1.5 w-full text-left px-2 py-1 cursor-pointer rounded-md transition-colors ${activeTab === 'skills.json'
                                          ? 'text-slate-950 dark:text-white bg-[#F3F5F9] dark:bg-[#181922] font-semibold border border-[#C5CDD9] dark:border-[#2A2C38] shadow-xs'
                                          : 'text-slate-600 dark:text-[#8E909B] hover:text-slate-950 dark:hover:text-white hover:bg-[#DDE2EC] dark:hover:bg-white/[0.04] border border-transparent'
                                        }`}
                                    >
                                      <FileJson className="w-3.5 h-3.5 text-[#FBBF24] shrink-0" />
                                      <span className="truncate">skills.json</span>
                                    </button>
                                  </div>
                                )}

                                {/* pages folder */}
                                <button
                                  onClick={() => toggleFolder('pages')}
                                  className="flex items-center gap-1.5 w-full text-left px-2.5 py-1 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-[#DDE2EC] dark:hover:bg-white/[0.04] cursor-pointer rounded-md transition-colors mt-0.5"
                                >
                                  {openFolders.pages ? (
                                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-[#71717A]" />
                                  ) : (
                                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 dark:text-[#71717A]" />
                                  )}
                                  {openFolders.pages ? (
                                    <FolderOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                                  ) : (
                                    <Folder className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                                  )}
                                  <span>pages</span>
                                </button>

                                {/* pages files */}
                                {openFolders.pages && (
                                  <div className="ml-2 space-y-0.5">
                                    <button
                                      onClick={() => setActiveTab('projects.ts')}
                                      className={`flex items-center gap-1.5 w-full text-left px-2 py-1 cursor-pointer rounded-md transition-colors ${activeTab === 'projects.ts'
                                          ? 'text-slate-950 dark:text-white bg-[#F3F5F9] dark:bg-[#181922] font-semibold border border-[#C5CDD9] dark:border-[#2A2C38] shadow-xs'
                                          : 'text-slate-600 dark:text-[#8E909B] hover:text-slate-950 dark:hover:text-white hover:bg-[#DDE2EC] dark:hover:bg-white/[0.04] border border-transparent'
                                        }`}
                                    >
                                      <FileCode2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                                      <span className="truncate">projects.ts</span>
                                    </button>

                                    <button
                                      onClick={() => setActiveTab('contact.css')}
                                      className={`flex items-center gap-1.5 w-full text-left px-2 py-1 cursor-pointer rounded-md transition-colors ${activeTab === 'contact.css'
                                          ? 'text-slate-950 dark:text-white bg-[#F3F5F9] dark:bg-[#181922] font-semibold border border-[#C5CDD9] dark:border-[#2A2C38] shadow-xs'
                                          : 'text-slate-600 dark:text-[#8E909B] hover:text-slate-950 dark:hover:text-white hover:bg-[#DDE2EC] dark:hover:bg-white/[0.04] border border-transparent'
                                        }`}
                                    >
                                      <FileText className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" />
                                      <span className="truncate">contact.css</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Main Editor Panel */}
                    <div className="flex-1 flex flex-col min-w-0 bg-[#F3F5F9] dark:bg-[#13141A]">

                      {/* Editor Tabs (Horizontal scrollable tab bar) */}
                      <div
                        className="flex items-center bg-[#DDE2EC] dark:bg-[#0A0B0E] border-b border-[#C5CDD9] dark:border-[#1E2028] overflow-x-auto scrollbar-hide text-xs select-none"
                        style={{ WebkitOverflowScrolling: 'touch', overscrollBehaviorX: 'contain' }}
                      >
                        {(Object.keys(FILES) as Array<keyof typeof FILES>).map((fileName) => {
                          const isActive = activeTab === fileName;
                          return (
                            <button
                              key={fileName}
                              onClick={() => setActiveTab(fileName)}
                              className={`flex items-center gap-2 px-4 py-2.5 border-r border-[#C5CDD9] dark:border-[#1E2028] cursor-pointer relative shrink-0 transition-all ${isActive
                                  ? 'bg-[#F3F5F9] dark:bg-[#13141A] text-slate-950 dark:text-white font-medium shadow-xs'
                                  : 'bg-transparent text-slate-600 dark:text-[#71717A] hover:text-slate-900 dark:hover:text-[#D4D4D8] hover:bg-[#D5DBE7] dark:hover:bg-white/[0.03]'
                                }`}
                            >
                              {fileName.endsWith('.json') && <FileJson className="w-3.5 h-3.5 text-[#FBBF24]" />}
                              {fileName.endsWith('.css') && <FileText className="w-3.5 h-3.5 text-[#60A5FA]" />}
                              {fileName.endsWith('.ts') && <FileCode2 className="w-3.5 h-3.5 text-[#38BDF8]" />}
                              <span>{fileName}</span>

                              {/* Top active tab accent line */}
                              {isActive && (
                                <div className="absolute top-0 inset-x-0 h-[2px] bg-blue-600 dark:bg-blue-400" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Breadcrumbs bar */}
                      <div className="bg-[#E7ECF3] dark:bg-[#0E0F14] px-3 sm:px-4 py-1.5 flex items-center gap-1.5 border-b border-[#C5CDD9] dark:border-[#1E2028] text-[10px] text-slate-500 dark:text-[#71717A] font-mono overflow-x-auto whitespace-nowrap scrollbar-hide">
                        <span>zasim-portfolio</span>
                        <span>&gt;</span>
                        <span>src</span>
                        <span>&gt;</span>
                        {activeTab === 'developer.ts' || activeTab === 'skills.json' ? (
                          <>
                            <span>config</span>
                            <span>&gt;</span>
                          </>
                        ) : (
                          <>
                            <span>pages</span>
                            <span>&gt;</span>
                          </>
                        )}
                        <span className="text-slate-800 dark:text-slate-200 font-semibold">{activeTab}</span>
                      </div>

                      {/* Code Content Area with Line Numbers */}
                      <div className="flex-1 flex overflow-hidden relative min-h-[280px] sm:min-h-[300px] bg-[#F3F5F9] dark:bg-[#13141A]">

                        {/* Line Numbers Column */}
                        <div className="py-3 sm:py-4 text-slate-400 dark:text-[#52525B] select-none text-right pr-2.5 sm:pr-3 border-r border-[#C5CDD9] dark:border-[#1E2028] font-mono text-[11px] sm:text-xs leading-6 shrink-0 min-w-[2.25rem] sm:min-w-[2.5rem] bg-[#E7ECF3] dark:bg-[#0E0F14] overflow-hidden">
                          {lines.map((_, i) => (
                            <div key={i} className="h-6 flex items-center justify-end font-light" style={{ height: '1.5rem', lineHeight: '1.5rem' }}>
                              {i + 1}
                            </div>
                          ))}
                        </div>

                        {/* Prism highlighted text — drag to scroll */}
                        <div
                          className="flex-1 min-h-0 py-3 sm:py-4 pl-3 sm:pl-4 pr-3 text-left overflow-auto code-scroll-area bg-[#F3F5F9] dark:bg-[#13141A]"
                          style={{
                            cursor: 'grab',
                            WebkitOverflowScrolling: 'touch',
                            overscrollBehaviorX: 'contain',
                          }}
                          onMouseDown={(e) => {
                            const el = e.currentTarget;
                            el.style.cursor = 'grabbing';
                            el.style.userSelect = 'none';
                            const startX = e.pageX;
                            const startY = e.pageY;
                            const scrollLeft = el.scrollLeft;
                            const scrollTop = el.scrollTop;
                            const onMove = (ev: MouseEvent) => {
                              el.scrollLeft = scrollLeft - (ev.pageX - startX);
                              el.scrollTop = scrollTop - (ev.pageY - startY);
                            };
                            const onUp = () => {
                              el.style.cursor = 'grab';
                              el.style.userSelect = '';
                              window.removeEventListener('mousemove', onMove);
                              window.removeEventListener('mouseup', onUp);
                            };
                            window.addEventListener('mousemove', onMove);
                            window.addEventListener('mouseup', onUp);
                          }}
                        >
                          <pre className={`language-${currentFile.prismLanguage} !p-0 !m-0 !bg-transparent !overflow-visible`} style={{ lineHeight: '1.5rem', minWidth: 'max-content' }}>
                            <code className={`language-${currentFile.prismLanguage} block !bg-transparent !p-0 !text-slate-900 dark:!text-slate-200 !shadow-none font-medium text-[11px] sm:text-xs leading-6`} style={{ lineHeight: '1.5rem' }}>
                              {currentFile.content}
                            </code>
                          </pre>
                        </div>
                      </div>


                      {/* Editor Status Bar */}
                      <div className="bg-[#DDE2EC] dark:bg-[#0A0B0E] px-3 sm:px-4 py-1.5 border-t border-[#C5CDD9] dark:border-[#1E2028] flex items-center justify-between gap-2 text-[10px] text-slate-600 dark:text-[#8E909B] font-mono select-none relative z-20 overflow-hidden whitespace-nowrap">
                        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
                          <div className="flex items-center gap-1 text-slate-700 dark:text-[#A1A1AA]">
                            <GitBranch className="w-3 h-3 text-slate-500" />
                            <span>main</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
                          </div>

                          <div className="hidden xs:flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500/80 animate-pulse" />
                            <span>Syncing...</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
                          <span className="hidden sm:inline">Ln {lines.length}, Col {lines[lines.length - 1]?.length || 1}</span>
                          <span className="hidden md:inline">Spaces: 2</span>
                          <span>UTF-8</span>
                          <span className="hidden sm:inline">LF</span>
                          <span className="text-slate-700 dark:text-slate-400 capitalize">{currentFile.language}</span>
                          <span className="text-emerald-600 dark:text-emerald-500 font-medium">✓ Prettier</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Luxury Scroll Indicator */}
        <div className="hidden sm:flex absolute bottom-2 left-1/2 transform -translate-x-1/2 flex-col items-center gap-4 pointer-events-none z-50 animate-blur-in delay-700">
          <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-light font-mono">Scroll to explore</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-slate-500/50 to-transparent overflow-hidden">
            <div className="w-full h-full bg-blue-400/80 animate-scroll-line"></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        /* Code window — thin styled scrollbars for drag-scroll area */
        .code-scroll-area::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        .code-scroll-area::-webkit-scrollbar-track {
          background: transparent;
        }
        .code-scroll-area::-webkit-scrollbar-thumb {
          background: rgba(99,130,180,0.25);
          border-radius: 4px;
          transition: background 0.2s;
        }
        .code-scroll-area::-webkit-scrollbar-thumb:hover {
          background: rgba(99,130,180,0.55);
        }
        .code-scroll-area {
          scrollbar-width: thin;
          scrollbar-color: rgba(99,130,180,0.25) transparent;
        }
      `}</style>
    </>
  );
}
