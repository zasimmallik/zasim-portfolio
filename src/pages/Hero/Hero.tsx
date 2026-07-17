import { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-css";
import "@/assets/css/tomorrow.css";
import Meteors from "@/components/ui/meteors";
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
  Sparkles,
  Code2,
  Lightbulb,
  ArrowUpRight,
  Briefcase,
  Cpu,
  ShieldCheck
} from "lucide-react";

// Floating Light Particles
const FloatingParticles = () => {
  const particles = [
    { top: '12%', left: '8%', size: 4, duration: 8, delay: 0 },
    { top: '22%', left: '85%', size: 3, duration: 10, delay: 1 },
    { top: '65%', left: '12%', size: 5, duration: 9, delay: 0.5 },
    { top: '75%', left: '80%', size: 3, duration: 7, delay: 2 },
    { top: '38%', left: '48%', size: 4, duration: 11, delay: 3 },
    { top: '85%', left: '25%', size: 3, duration: 8, delay: 1.5 },
    { top: '8%', left: '65%', size: 5, duration: 9, delay: 0.2 },
    { top: '48%', left: '92%', size: 3, duration: 10, delay: 2.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={i}
          className="floating-particle"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            '--duration': `${p.duration}s`,
            '--delay': `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

// Enhanced Grid Background
const GridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-[0.12] mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]">
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
              stroke="white"
              strokeWidth="0.5"
              className="opacity-25"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#010410]/70 to-[#010410]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#010410_100%)] opacity-80" />
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
  skills: [
    'HTML', 'CSS', 'Tailwind', 'JS', 'TS',
    'React', 'Next.js', 'Redux',
    'Node.js', 'Express', 'MongoDB', 'PostgreSQL',
    'GraphQL', 'REST APIs', 'WebSockets',
    'Python', 'LLMs', 'RAG', 'Agents',
    'Git', 'Docker', 'AWS'
  ],
  hardWorker: true,
  quickLearner: true,
  problemSolver: true,
  yearsOfExperience: 4,
  hireable(): boolean {
    return this.hardWorker && 
           this.problemSolver && 
           this.skills.length >= 5;
  }
};`
  },
  'skills.json': {
    name: 'skills.json',
    path: 'src/config/skills.json',
    language: 'json',
    prismLanguage: 'json',
    content: `{
  "core_tech": {
    "languages": ["TypeScript", "JavaScript", "Python"],
    "frontend": ["React", "Next.js", "Tailwind CSS"],
    "backend": ["Node.js", "Express", "GraphQL", "PostgreSQL"],
    "devops": ["Docker", "AWS", "Git", "Linux"]
  },
  "ai_capabilities": {
    "frameworks": ["LangChain", "LangGraph"],
    "methods": ["RAG", "Multi-Agent Systems", "LLMs"]
  },
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
  email: "zasimmallik@gmail.com";
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
      <main className="bg-[#010410] text-slate-200 min-h-screen relative overflow-hidden selection:bg-blue-500/30">

        {/* Dynamic Multi-Layer Background (Aurora + Light Orbs) */}
        <div className="absolute inset-0 bg-[#010410] z-0">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-soft-light pointer-events-none"></div>

          {/* Main Glowing Orbs */}
          <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />
          <div className="absolute bottom-[15%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[130px] pointer-events-none animate-[pulse_10s_ease-in-out_infinite]" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none animate-[pulse_12s_ease-in-out_infinite]" style={{ animationDelay: '3s' }} />

          {/* Gradient Mesh Layer */}
          <div
            className="absolute -inset-[10px] opacity-25 blur-[90px]"
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.12), transparent 50%),
                radial-gradient(circle at 0% 0%, rgba(14, 165, 233, 0.08), transparent 45%),
                radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.12), transparent 50%),
                radial-gradient(circle at 100% 100%, rgba(14, 165, 233, 0.08), transparent 45%),
                radial-gradient(circle at 0% 100%, rgba(139, 92, 246, 0.12), transparent 50%)
              `,
            }}
          ></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#010410_130%)] pointer-events-none" />
        </div>

        <section
          className="hero min-h-screen flex items-start lg:items-center justify-center relative px-4 xs:px-6 sm:px-8 lg:px-12 py-16 sm:py-20 md:py-24 lg:py-16 pb-40 hero-section-padding z-10"
          style={{ paddingTop: "var(--hero-padding-top, 0)" }}
        >
          {/* Grid Background */}
          <GridBackground />

          {/* Floating Particles */}
          <FloatingParticles />

          {/* Meteors Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Meteors number={12} />
          </div>

          {/* Main Content Layout Grid */}
          <div
            className="container mx-auto flex flex-col lg:flex-row items-center justify-between relative pt-24 pb-8 sm:pt-32 sm:pb-12 md:pt-32 lg:py-12 lg:pt-28 xl:pt-28 px-3 xs:px-4 sm:px-6 gap-10 sm:gap-12 md:gap-14 lg:gap-16 xl:gap-24"
            style={{
              paddingTop:
                window.innerWidth >= 1360 &&
                  window.innerWidth <= 1370 &&
                  window.innerHeight >= 760 &&
                  window.innerHeight <= 775
                  ? "12rem"
                  : "",
            }}
          >
            {/* Left Column - Redesigned Content & Text */}
            <div className="w-full lg:w-[48%] flex flex-col items-start text-left relative z-20">

              {/* Redesigned Glassmorphic Welcome Badge */}
              <div className="animate-blur-in relative inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-950/40 backdrop-blur-xl border border-white/5 mb-6 sm:mb-8 hover:bg-slate-900/60 hover:border-blue-500/30 transition-all duration-500 group cursor-default overflow-hidden shadow-lg shadow-black/10">
                {/* Shimmer overlay */}
                <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                  <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    style={{ animation: 'shimmer-badge 4.5s ease-in-out infinite' }}
                  />
                </div>
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.6)] shrink-0"></div>
                <span className="text-slate-300 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase font-mono">
                  Welcome to my portfolio
                </span>
              </div>

              {/* Typography Redesign (Bold Headline + Glowing Accents) */}
              <div className="relative mb-6 sm:mb-8 animate-blur-in delay-100 w-full">
                <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-extrabold leading-[0.9] tracking-tight relative text-white">
                  <span className="block text-slate-400 font-light text-xl xs:text-2xl sm:text-3xl md:text-4xl mb-3 tracking-normal">
                    Hey, I&apos;m
                  </span>
                  <span className="relative block sm:inline-block">
                    <span className="typing-effect gradient-text bg-gradient-to-r from-white via-blue-150 to-slate-450 bg-size-[200%_auto] animate-[gradientX_8s_ease_infinite] bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(59,130,246,0.25)]">
                      Zasim Mallik
                    </span>
                  </span>
                </h1>
              </div>

              {/* Sub-Header & Role Flip Words */}
              <div className="animate-blur-in delay-200 inline-flex items-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-gradient-to-r from-blue-950/20 via-slate-900/40 to-cyan-950/20 border border-white/5 mb-8 sm:mb-10 backdrop-blur-md hover:border-blue-500/30 transition-all duration-500 hover:bg-slate-900/60 group cursor-default w-full sm:w-auto max-w-full shadow-lg shadow-black/10">
                <Rocket className="w-4.5 h-4.5 text-blue-400 group-hover:animate-bounce transition-transform group-hover:rotate-12 shrink-0" />
                <span className="min-w-0 flex-1 sm:flex-none overflow-hidden">
                  <FlipWords
                    className="text-sm sm:text-base md:text-lg !text-blue-400 font-semibold truncate tracking-wide block w-full font-mono"
                    words={words}
                  />
                </span>
              </div>

              {/* Description Section with Light-up Side Accent */}
              <div className="relative mb-10 max-w-xl group animate-blur-in delay-300 w-full">
                <div className="absolute -left-4 top-1 bottom-1 w-[3px] bg-gradient-to-b from-blue-500/60 via-cyan-500/30 to-transparent rounded-full hidden sm:block group-hover:from-blue-400 group-hover:scale-y-105 transition-all duration-500" />
                <p className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed font-light tracking-wide group-hover:text-slate-200 transition-colors duration-500 sm:pl-2">
                  I design, build, and ship web products — mostly AI-powered SaaS. Currently running two startups and always working on something new.
                </p>
              </div>

              {/* Redesigned Floating Cards (Traits Showcase) */}
              <div className="grid grid-cols-2 gap-4 w-full mb-10 animate-blur-in delay-300">

                {/* Card 1: Startups */}
                <div className="flex flex-col items-start p-4 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md hover:border-blue-500/20 hover:bg-white/[0.04] transition-all duration-300 group/card shadow-md">
                  <Briefcase className="w-5 h-5 text-blue-400 mb-2.5 transition-transform group-hover/card:scale-110" />
                  <span className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">Startups</span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">Zeraql & Rizmiq</span>
                </div>

                {/* Card 2: Core Focus */}
                <div className="flex flex-col items-start p-4 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md hover:border-blue-500/20 hover:bg-white/[0.04] transition-all duration-300 group/card shadow-md">
                  <Cpu className="w-5 h-5 text-blue-400 mb-2.5 transition-transform group-hover/card:scale-110" />
                  <span className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">Core Focus</span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">AI SaaS</span>
                </div>
              </div>

              {/* Startup Web Projects Quick Links */}
              <div className="flex flex-wrap gap-5 items-center mb-12 sm:pl-2 text-sm text-slate-400 font-semibold animate-blur-in delay-300">
                <a
                  href="https://zeraql.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#38BDF8] transition-colors relative group/link"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] shrink-0" />
                  <span>zeraql.com</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#38BDF8] group-hover/link:w-full transition-all duration-300" />
                </a>
                <span className="w-1 h-1 rounded-full bg-slate-700 hidden xs:inline" />
                <a
                  href="https://rizmiq.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#2DD4BF] transition-colors relative group/link"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] shrink-0" />
                  <span>rizmiq.com</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#2DD4BF] group-hover/link:w-full transition-all duration-300" />
                </a>
              </div>

              {/* Premium Redesigned Action CTAs */}
              <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto animate-blur-in delay-400">
                {/* GitHub Primary Button with Glow border */}
                <a
                  href="https://github.com/zasimmallik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center w-full sm:w-auto overflow-hidden rounded-full transition-all duration-350 hover:scale-105 hover:shadow-[0_0_35px_rgba(45,212,191,0.25)] gradient-border-animated"
                  style={{ borderRadius: '9999px' }}
                >
                  <span className="absolute inset-0 w-full h-full bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-full group-hover:bg-slate-900/60 transition-all duration-300"></span>
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#2DD4BF]/10 to-[#38BDF8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
                  <span className="relative inline-flex items-center justify-center gap-3 px-9 py-4.5 w-full sm:w-auto">
                    <span className="text-slate-200 font-semibold text-xs sm:text-sm tracking-widest uppercase group-hover:text-white transition-colors font-mono">View GitHub</span>
                    <Github className="w-4.5 h-4.5 text-[#38BDF8] transform transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#2DD4BF] shrink-0" />
                  </span>
                </a>

                {/* Resume Download Glass Button */}
                <a
                  href="/resume.pdf"
                  download
                  className="group relative inline-flex items-center justify-center w-full sm:w-auto overflow-hidden rounded-full transition-all duration-350 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.08)]"
                >
                  <span className="absolute inset-0 w-full h-full bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-full group-hover:bg-white/[0.06] hover:border-white/15 transition-all duration-300"></span>
                  <span className="relative inline-flex items-center justify-center gap-3 px-9 py-4.5 w-full sm:w-auto">
                    <span className="text-slate-300 group-hover:text-white font-semibold text-xs sm:text-sm tracking-widest uppercase transition-colors duration-300 font-mono">Get Resume</span>
                    <Download className="w-4.5 h-4.5 text-slate-400 group-hover:text-white transform transition-all duration-300 group-hover:rotate-12 shrink-0" />
                  </span>
                </a>
              </div>
            </div>

            {/* Right Column - Premium Code Editor Window */}
            <div className={`w-full lg:w-[48%] transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative group w-full max-w-full">

                {/* Neon unified blue outer glow */}
                <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-2xl opacity-60 group-hover:opacity-85 transition-all duration-500 pointer-events-none" />

                <div className="relative rounded-2xl bg-[#030712]/80 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.65)] overflow-hidden backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 hover:border-white/20">
                  {/* Glossy top reflection */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-20" />

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-10 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shine_2s_ease-in-out_infinite] pointer-events-none z-10" />

                  {/* Window Header */}
                  <div className="bg-[#060a15]/90 px-4 py-3.5 flex items-center justify-between border-b border-white/5 relative z-20">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[0_0_10px_rgba(255,95,86,0.3)] hover:brightness-110 transition-all cursor-pointer"></div>
                      <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_10px_rgba(255,189,46,0.3)] hover:brightness-110 transition-all cursor-pointer"></div>
                      <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-[0_0_10px_rgba(39,201,63,0.3)] hover:brightness-110 transition-all cursor-pointer"></div>
                    </div>

                    {/* Centered title */}
                    <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] text-slate-400 font-mono">
                      <Terminal className="w-3.5 h-3.5 text-blue-400" />
                      <span>zasim-IDE v1.1.3</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Copy code button */}
                      <button
                        onClick={copyToClipboard}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-400 hover:text-white transition-all cursor-pointer relative group/copy"
                        title="Copy code"
                      >
                        {copied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
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
                  <div className="flex min-h-[380px] sm:min-h-[440px] relative z-20">

                    {/* Activity Bar (Visible on md and larger) */}
                    <div className="hidden md:flex flex-col items-center justify-between py-4 w-12 bg-[#04060c] border-r border-white/5 shrink-0 select-none">
                      <div className="flex flex-col items-center gap-6 w-full">
                        {/* Files Explorer Toggle */}
                        <button
                          onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                          className={`p-2 rounded-lg transition-all relative group cursor-pointer ${isSidebarExpanded ? 'text-blue-400 bg-white/5' : 'text-slate-500 hover:text-slate-300'
                            }`}
                        >
                          <Files className="w-5 h-5" />
                          <div className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-blue-500 rounded-r opacity-0 transition-opacity"
                            style={{ opacity: isSidebarExpanded ? 1 : 0 }}
                          />
                        </button>

                        {/* Search Icon (Static Decorator) */}
                        <div className="text-slate-600 hover:text-slate-400 p-2 rounded-lg cursor-not-allowed transition-all relative group">
                          <Search className="w-5 h-5" />
                        </div>

                        {/* Git Branch Icon (Static Decorator) */}
                        <div className="text-slate-600 hover:text-slate-400 p-2 rounded-lg cursor-not-allowed transition-all relative group">
                          <GitBranch className="w-5 h-5" />
                        </div>

                        {/* Extensions Icon (Static Decorator) */}
                        <div className="text-slate-600 hover:text-slate-400 p-2 rounded-lg cursor-not-allowed transition-all relative group">
                          <Blocks className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Settings (Static Decorator) */}
                      <div className="text-slate-600 hover:text-slate-400 p-2 rounded-lg cursor-default transition-all">
                        <Settings className="w-5 h-5" />
                      </div>
                    </div>

                    {/* File Explorer Sidebar (Visible on md and larger when expanded) */}
                    {isSidebarExpanded && (
                      <div className="hidden md:block w-44 bg-[#050811] border-r border-white/5 py-3 select-none text-left font-sans shrink-0 overflow-y-auto">
                        <div className="px-3 mb-2 flex items-center justify-between text-slate-500 font-bold text-[9px] uppercase tracking-wider">
                          <span>Explorer</span>
                        </div>

                        {/* File Tree */}
                        <div className="text-slate-400 text-xs font-medium">
                          {/* Workspace Root */}
                          <div className="flex items-center gap-1.5 px-3 py-1 text-slate-300 font-semibold truncate">
                            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                            <span className="truncate">zasim-portfolio</span>
                          </div>

                          {/* src folder */}
                          <div className="ml-3">
                            <button
                              onClick={() => toggleFolder('src')}
                              className="flex items-center gap-1.5 w-full text-left px-3 py-1 hover:text-slate-200 hover:bg-white/[0.02] cursor-pointer"
                            >
                              {openFolders.src ? (
                                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                              ) : (
                                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                              )}
                              {openFolders.src ? (
                                <FolderOpen className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                              ) : (
                                <Folder className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                              )}
                              <span>src</span>
                            </button>

                            {/* config folder */}
                            {openFolders.src && (
                              <div className="ml-3">
                                <button
                                  onClick={() => toggleFolder('config')}
                                  className="flex items-center gap-1.5 w-full text-left px-3 py-1 hover:text-slate-200 hover:bg-white/[0.02] cursor-pointer"
                                >
                                  {openFolders.config ? (
                                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                                  ) : (
                                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                                  )}
                                  {openFolders.config ? (
                                    <FolderOpen className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                  ) : (
                                    <Folder className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                  )}
                                  <span>config</span>
                                </button>

                                {/* config files */}
                                {openFolders.config && (
                                  <div className="ml-3">
                                    <button
                                      onClick={() => setActiveTab('developer.ts')}
                                      className={`flex items-center gap-1.5 w-full text-left px-3 py-1 border-l hover:bg-white/[0.02] cursor-pointer transition-colors ${activeTab === 'developer.ts'
                                          ? 'text-blue-400 bg-blue-500/5 border-blue-500'
                                          : 'text-slate-400 hover:text-slate-200 border-transparent'
                                        }`}
                                    >
                                      <FileCode2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                                      <span className="truncate">developer.ts</span>
                                    </button>

                                    <button
                                      onClick={() => setActiveTab('skills.json')}
                                      className={`flex items-center gap-1.5 w-full text-left px-3 py-1 border-l hover:bg-white/[0.02] cursor-pointer transition-colors ${activeTab === 'skills.json'
                                          ? 'text-yellow-450 bg-yellow-500/5 border-yellow-500'
                                          : 'text-slate-400 hover:text-slate-200 border-transparent'
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
                                  className="flex items-center gap-1.5 w-full text-left px-3 py-1 hover:text-slate-200 hover:bg-white/[0.02] cursor-pointer"
                                >
                                  {openFolders.pages ? (
                                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                                  ) : (
                                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                                  )}
                                  {openFolders.pages ? (
                                    <FolderOpen className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                  ) : (
                                    <Folder className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                  )}
                                  <span>pages</span>
                                </button>

                                {/* pages files */}
                                {openFolders.pages && (
                                  <div className="ml-3">
                                    <button
                                      onClick={() => setActiveTab('projects.ts')}
                                      className={`flex items-center gap-1.5 w-full text-left px-3 py-1 border-l hover:bg-white/[0.02] cursor-pointer transition-colors ${activeTab === 'projects.ts'
                                          ? 'text-blue-400 bg-blue-500/5 border-blue-500'
                                          : 'text-slate-400 hover:text-slate-200 border-transparent'
                                        }`}
                                    >
                                      <FileCode2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                                      <span className="truncate">projects.ts</span>
                                    </button>

                                    <button
                                      onClick={() => setActiveTab('contact.css')}
                                      className={`flex items-center gap-1.5 w-full text-left px-3 py-1 border-l hover:bg-white/[0.02] cursor-pointer transition-colors ${activeTab === 'contact.css'
                                          ? 'text-blue-400 bg-blue-500/5 border-blue-500'
                                          : 'text-slate-400 hover:text-slate-200 border-transparent'
                                        }`}
                                    >
                                      <FileText className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
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
                    <div className="flex-1 flex flex-col min-w-0 bg-[#010410]/70">

                      {/* Editor Tabs (Horizontal scrollable tab bar) */}
                      <div className="flex items-center bg-[#070b15] border-b border-white/5 overflow-x-auto scrollbar-hide text-xs select-none">
                        {(Object.keys(FILES) as Array<keyof typeof FILES>).map((fileName) => {
                          const isActive = activeTab === fileName;
                          return (
                            <button
                              key={fileName}
                              onClick={() => setActiveTab(fileName)}
                              className={`flex items-center gap-2 px-4 py-2.5 border-r border-white/5 cursor-pointer relative shrink-0 transition-all ${isActive
                                  ? 'bg-[#010410] text-slate-100 font-semibold'
                                  : 'bg-transparent text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]'
                                }`}
                            >
                              {fileName.endsWith('.json') && <FileJson className="w-3.5 h-3.5 text-[#FBBF24]" />}
                              {fileName.endsWith('.css') && <FileText className="w-3.5 h-3.5 text-[#60A5FA]" />}
                              {fileName.endsWith('.ts') && <FileCode2 className="w-3.5 h-3.5 text-[#38BDF8]" />}
                              <span>{fileName}</span>

                              {/* Bottom active tab line */}
                              {isActive && (
                                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Breadcrumbs bar */}
                      <div className="bg-[#010410]/40 px-4 py-1.5 flex items-center gap-1.5 border-b border-white/5 text-[10px] text-slate-500 font-mono">
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
                        <span className="text-slate-400 font-medium">{activeTab}</span>
                      </div>

                      {/* Code Content Area with Line Numbers */}
                      <div className="flex-1 flex overflow-y-auto overflow-x-hidden relative min-h-[300px]">

                        {/* Line Numbers Column */}
                        <div className="py-4 text-slate-600 select-none text-right pr-3 border-r border-white/5 font-mono text-[11px] sm:text-xs leading-6 shrink-0 min-w-[2.5rem] bg-[#02050b]/20">
                          {lines.map((_, i) => (
                            <div key={i} className="h-6 flex items-center justify-end font-light" style={{ height: '1.5rem', lineHeight: '1.5rem' }}>
                              {i + 1}
                            </div>
                          ))}
                        </div>

                        {/* Prism highlighted text */}
                        <div className="flex-1 py-4 pl-4 overflow-x-auto scrollbar-hide text-left min-w-0">
                          <pre className={`language-${currentFile.prismLanguage} !p-0 !m-0 !bg-transparent !overflow-visible`} style={{ lineHeight: '1.5rem' }}>
                            <code className={`language-${currentFile.prismLanguage} block !bg-transparent !p-0 !text-slate-200 !shadow-none font-medium text-[11px] sm:text-xs leading-6`} style={{ lineHeight: '1.5rem' }}>
                              {currentFile.content}
                            </code>
                          </pre>
                        </div>
                      </div>

                      {/* Editor Status Bar */}
                      <div className="bg-[#04060c] px-4 py-1.5 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-mono select-none relative z-20">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-slate-400">
                            <GitBranch className="w-3 h-3 text-slate-500" />
                            <span>main</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                            <span>Syncing...</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="hidden sm:inline">Ln {lines.length}, Col {lines[lines.length - 1]?.length || 1}</span>
                          <span className="hidden xs:inline">Spaces: 2</span>
                          <span>UTF-8</span>
                          <span>LF</span>
                          <span className="text-slate-400 capitalize">{currentFile.language}</span>
                          <span className="text-emerald-500 font-medium">✓ Prettier</span>
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
          <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-light">Scroll to explore</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-slate-500/50 to-transparent overflow-hidden">
            <div className="w-full h-full bg-blue-400/80 animate-scroll-line"></div>
          </div>
        </div>
      </main>

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
      `}</style>
    </>
  );
}
