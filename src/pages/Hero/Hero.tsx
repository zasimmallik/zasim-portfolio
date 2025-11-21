import { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "@/assets/css/tomorrow.css";
import Meteors from "@/components/ui/meteors";
import SparklesText from "@/components/ui/sparkles-text";
import { FlipWords } from "@/components/ui/flip-words";

// Enhanced Grid Background
const GridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-[0.15] mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          className="absolute inset-0"
        >
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <rect
              width="40"
              height="40"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              className="opacity-20"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/80 to-[#020617]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] opacity-60" />
    </div>
  );
};

export default function Hero() {
  const words = [
    "Full-Stack Developer | Building AI SaaS",
    "Focused on AI, Startups & Entrepreneurship",
    "Learning AI engineering",
  ];

  const [code] = useState(`
const profile = {
    name: 'Zasim Mallik',
    title: 'Full-Stack Developer | AI SaaS Developer | Future AI SaaS Founder',
    skills: [
        'HTML', 'CSS', 'Tailwind', 'JS', 'TS',
        'React', 'Next.js', 'Redux',
        'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Prisma',
        'GraphQL', 'REST APIs', 'JWT', 'WebSockets',
        'Python', 'LLMs', 'RAG', 'Agents', 'LangChain', 'LangGraph',
        'Git', 'Linux', 'Docker', 'AWS'
    ],
    hardWorker: true,
    quickLearner: true,
    problemSolver: true,
    yearsOfExperience: 4,
    hireable(): boolean {
        return this.hardWorker && this.problemSolver && this.skills.length >= 5;
    }
};



  `);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    Prism.highlightAll();

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
        from { opacity: 0; transform: translateY(20px); }
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
        animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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
        0% { opacity: 0; filter: blur(20px); transform: translateY(20px); }
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

      .animate-blur-in {
        animation: blurIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        opacity: 0;
      }

      .animate-scroll-line {
        animation: scrollLine 2.5s cubic-bezier(0.77, 0, 0.175, 1) infinite;
      }
      
      .delay-100 { animation-delay: 0.1s; }
      .delay-200 { animation-delay: 0.2s; }
      .delay-300 { animation-delay: 0.3s; }
      .delay-400 { animation-delay: 0.4s; }
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
  }, [code]);

  return (
    <>
      <main className="bg-[#020617] text-slate-200 min-h-screen relative overflow-hidden selection:bg-blue-500/30">
        {/* Ultra Premium Background - Aurora Effect */}
        <div className="absolute inset-0 bg-[#020617]">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>
          <div
            className="absolute -inset-[10px] opacity-30 blur-[100px]"
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent 50%),
                radial-gradient(circle at 0% 0%, rgba(14, 165, 233, 0.1), transparent 50%),
                radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.15), transparent 50%),
                radial-gradient(circle at 100% 100%, rgba(14, 165, 233, 0.1), transparent 50%),
                radial-gradient(circle at 0% 100%, rgba(139, 92, 246, 0.15), transparent 50%)
              `,
            }}
          ></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_120%)] pointer-events-none" />
        </div>

        <section
          className="hero min-h-screen flex items-start lg:items-center justify-center relative px-3 xs:px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-10 pb-40 hero-section-padding"
          style={{ paddingTop: "var(--hero-padding-top, 0)" }}
        >
          <div className="absolute inset-0"></div>

          {/* Grid Background */}
          <GridBackground />

          {/* Meteors Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Meteors number={10} />
          </div>

          {/* Floating gradient orbs - responsive sizes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-16 sm:-left-24 md:-left-32 w-40 sm:w-56 md:w-80 lg:w-96 h-40 sm:h-56 md:h-80 lg:h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse mix-blend-screen" />
            <div className="absolute bottom-1/4 -right-16 sm:-right-24 md:-right-32 w-40 sm:w-56 md:w-80 lg:w-96 h-40 sm:h-56 md:h-80 lg:h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse mix-blend-screen" style={{ animationDelay: '1s' }} />
          </div>

          {/* Main content container */}
          <div
            className="container mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10 pt-24 pb-8 sm:pt-32 sm:pb-12 md:pt-32 lg:py-12 lg:pt-28 xl:pt-28 px-3 xs:px-4 sm:px-6 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16"
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
            {/* Left column - Text content */}
            <div className={`w-full lg:w-1/2 mb-6 sm:mb-8 lg:mb-0 relative z-20`}>

              {/* Welcome badge - fully responsive */}
              <div className="animate-blur-in inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/5 backdrop-blur-xl border border-blue-500/10 mb-8 hover:bg-blue-500/10 transition-all duration-500 group cursor-default">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                <span className="text-blue-300 text-xs font-medium tracking-[0.2em] uppercase">
                  Welcome to my universe
                </span>
              </div>

              {/* Name section - responsive text sizes */}
              <div className="relative mb-8 animate-blur-in delay-100">
                <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight">
                  <span className="block text-slate-400 font-light text-2xl xs:text-3xl sm:text-4xl mb-2 tracking-normal">Hello, I&apos;m</span>
                  <span className="relative inline-block">
                    <span className="typing-effect gradient-text bg-gradient-to-r from-white via-blue-200 to-slate-400 bg-size-[200%_auto] animate-[gradientX_8s_ease_infinite] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(59,130,246,0.3)]">
                      Zasim Mallik
                    </span>
                  </span>
                </h1>
              </div>

              {/* Role badge - responsive */}
              <div className="animate-blur-in delay-200 inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border border-blue-500/10 mb-10 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-500 hover:bg-blue-500/10 group cursor-default">
                <i className="fas fa-rocket text-blue-400 group-hover:animate-bounce text-sm transition-transform group-hover:rotate-12"></i>
                <span className="min-w-0">
                  <FlipWords
                    className={"text-base md:text-lg !text-blue-500 font-medium truncate tracking-wide"}
                    words={words}
                  />
                </span>
              </div>

              {/* Description - responsive */}
              <div className="relative mb-12 max-w-xl group animate-blur-in delay-300">
                <p className="text-base md:text-lg lg:text-xl text-slate-400 leading-relaxed font-light tracking-wide group-hover:text-slate-200 transition-colors duration-500">
                  Full-Stack & AI SaaS Developer 🚀 | Building Next-Gen Products That Solve Real Problems 💻✨
                </p>
              </div>

              {/* CTA Buttons - fully responsive stack on mobile */}
              <div className="flex flex-col sm:flex-row gap-5 animate-blur-in delay-400">
                {/* GitHub Button */}
                <a
                  href="https://github.com/zasimmallik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center w-full sm:w-auto overflow-hidden rounded-full"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 to-cyan-600 opacity-100 group-hover:opacity-90 transition-opacity duration-300"></span>
                  <span className="relative inline-flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto">
                    <span className="text-white font-medium text-sm tracking-widest uppercase">View GitHub</span>
                    <i className="fas fa-github text-white/90 transform transition-all duration-300 group-hover:translate-x-1 group-hover:text-white text-sm"></i>
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-20" />
                </a>

                {/* Resume Button */}
                <a
                  href="/resume.pdf"
                  download
                  className="group relative inline-flex items-center justify-center w-full sm:w-auto overflow-hidden rounded-full"
                >
                  <span className="absolute inset-0 w-full h-full bg-[#0F172A] border border-slate-700 group-hover:border-slate-500 transition-colors duration-300 rounded-full"></span>
                  <span className="relative inline-flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto">
                    <span className="text-slate-300 group-hover:text-white font-medium text-sm tracking-widest uppercase transition-colors duration-300">Get Resume</span>
                    <i className="fas fa-download text-slate-400 group-hover:text-white transform transition-all duration-300 group-hover:rotate-12 text-sm"></i>
                  </span>
                </a>
              </div>

              {/* Floating badges - only visible on large screens */}
              <div className="hidden xl:block absolute left-22 top-[2.3rem] animate-float-slow">
                <div className="px-3 py-1.5 lg:px-4 lg:py-2 rounded-xl bg-purple-500/10 backdrop-blur-sm border border-purple-500/30 text-purple-400 hover:border-purple-400/50 transition-all duration-300 text-xs lg:text-sm">
                  <i className="fas fa-wand-magic-sparkles"></i>&nbsp;&nbsp;AI SaaS
                </div>
              </div>
              <div className="hidden xl:block absolute right-10 top-20 animate-float">
                <div className="px-3 py-1.5 lg:px-4 lg:py-2 rounded-xl bg-blue-500/10 backdrop-blur-sm border border-blue-500/30 text-blue-400 hover:border-blue-400/50 transition-all duration-300 text-xs lg:text-sm">
                  <i className="fas fa-code"></i>&nbsp;&nbsp;Clean Code
                </div>
              </div>
              <div className="hidden xl:block absolute top-68 left-[70%] transform -translate-x-1/2 animate-float">
                <div className="px-3 py-1.5 lg:px-4 lg:py-2 rounded-xl bg-amber-500/10 backdrop-blur-sm border border-amber-500/30 text-amber-400 hover:border-amber-400/50 transition-all duration-300 text-xs lg:text-sm">
                  <i className="fas fa-lightbulb"></i>&nbsp;&nbsp;Innovation
                </div>
              </div>
            </div>

            {/* Right column - Code window - fully responsive */}
            <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative group max-w-full">
                {/* Enhanced gradient border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-blue-500/30 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-all duration-500 animate-gradient" />

                <div className="relative rounded-2xl bg-[#0B1120]/90 border border-slate-700/50 shadow-2xl overflow-hidden backdrop-blur-xl">
                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out] pointer-events-none z-10" />

                  {/* Modern Window Header */}
                  <div className="bg-[#1E293B]/50 px-4 py-3 flex items-center justify-between border-b border-slate-800/60">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[0_0_10px_rgba(255,95,86,0.3)] hover:brightness-110 transition-all"></div>
                      <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_10px_rgba(255,189,46,0.3)] hover:brightness-110 transition-all"></div>
                      <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-[0_0_10px_rgba(39,201,63,0.3)] hover:brightness-110 transition-all"></div>
                    </div>
                    <div className="flex items-center gap-2 opacity-60">
                      <i className="fas fa-code text-blue-400 text-xs"></i>
                      <span className="text-xs text-slate-400 font-mono">developer.ts</span>
                    </div>
                    <div className="w-10"></div> {/* Spacer for centering */}
                  </div>

                  {/* Code Content */}
                  <div className="relative w-full overflow-hidden bg-[#0B1120]/95">
                    <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
                      <pre className="language-javascript p-6 text-xs sm:text-sm leading-relaxed font-mono bg-transparent min-h-[300px] sm:min-h-[400px] max-w-full">
                        <code className="language-javascript block max-w-full !bg-transparent !p-0 !text-slate-300 !shadow-none">{code}</code>
                      </pre>
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

