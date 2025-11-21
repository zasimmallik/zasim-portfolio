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
      <div className="absolute inset-0 opacity-20 mask-[radial-gradient(ellipse_at_center,transparent_0%,black)]">
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
              className="opacity-30 animate-gridPulse"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
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
      <main className="bg-[#020617] text-white min-h-screen relative overflow-hidden">
        {/* Enhanced background effects */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-950/5 to-transparent pointer-events-none" />

        <section
          className="hero min-h-screen flex items-center justify-center relative px-3 xs:px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-10 hero-section-padding"
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
            <div className="absolute top-1/4 -left-16 sm:-left-24 md:-left-32 w-40 sm:w-56 md:w-80 lg:w-96 h-40 sm:h-56 md:h-80 lg:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 -right-16 sm:-right-24 md:-right-32 w-40 sm:w-56 md:w-80 lg:w-96 h-40 sm:h-56 md:h-80 lg:h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          {/* Main content container */}
          <div
            className="container mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10 py-4 sm:py-6 md:py-8 lg:py-12 md:pt-20 lg:pt-28 xl:pt-28 px-3 xs:px-4 sm:px-6 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16"
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
            <div className={`w-full lg:w-1/2 mb-6 sm:mb-8 lg:mb-0 relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              {/* Decorative blurs - hidden on mobile and tablet */}
              <div className="absolute hidden xl:-top-20 xl:-left-20 xl:block w-48 h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute hidden xl:block xl:top-40 xl:-right-20 w-48 h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 bg-teal-500/10 rounded-full blur-3xl"></div>

              {/* Welcome badge - fully responsive */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-full bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 mb-4 sm:mb-5 md:mb-6 hover:border-blue-500/30 transition-all duration-300">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-blue-400 animate-pulse"></div>
                <span className="text-gray-300 text-[10px] xs:text-xs sm:text-sm font-medium">
                  Welcome to Zasim Mallik's universe.
                </span>
              </div>

              {/* Name section - responsive text sizes */}
              <div className="relative mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <SparklesText text="Hello" />
                  <span className="relative inline-block">
                    I&apos;m
                    <span className="typing-effect gradient-text bg-linear-to-r from-white via-blue-100 to-gray-300 bg-clip-text text-transparent">
                      {" "}
                      Zasim Mallik
                    </span>
                  </span>
                </h1>
                <div className="absolute -z-10 top-1/2 -translate-y-1/2 left-1/4 w-12 sm:w-16 md:w-24 lg:w-32 h-12 sm:h-16 md:h-24 lg:h-32 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
              </div>

              {/* Role badge - responsive */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-lg sm:rounded-xl md:rounded-2xl bg-linear-to-r from-blue-500/10 to-teal-500/10 border border-blue-500/30 mb-4 sm:mb-5 md:mb-6 lg:mb-8 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300">
                <i className="fas fa-rocket text-blue-400 animate-bounce text-[10px] xs:text-xs sm:text-sm md:text-base"></i>
                <span className="min-w-0">
                  <FlipWords
                    className={"text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-blue-400 font-medium truncate"}
                    words={words}
                  />
                </span>
              </div>

              {/* Description - responsive */}
              <div className="relative mb-5 sm:mb-6 md:mb-8 lg:mb-12 max-w-xl">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 sm:w-1 bg-linear-to-b from-blue-500 to-teal-500 rounded-full" />
                <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-gray-300/90 leading-relaxed pl-3 sm:pl-4 md:pl-5">
                  Full-Stack & AI SaaS Developer 🚀 | Building Next-Gen Products That Solve Real Problems 💻✨
                </p>
              </div>

              {/* CTA Buttons - fully responsive stack on mobile */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {/* GitHub Button */}
                <a
                  href="https://github.com/zasimmallik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center w-full sm:w-auto"
                >
                  <div className="absolute -inset-0.5 sm:-inset-1 bg-linear-to-r from-blue-500 to-teal-400 rounded-lg sm:rounded-xl blur-md sm:blur-lg opacity-30 group-hover:opacity-60 transition-all duration-300" />
                  <span className="relative inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-linear-to-r from-blue-500 to-teal-400 px-5 sm:px-6 md:px-7 lg:px-8 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50 w-full sm:w-auto">
                    <span className="text-white font-semibold text-xs sm:text-sm md:text-base">View GitHub</span>
                    <i className="fas fa-github text-white transform transition-all duration-300 group-hover:translate-x-1 text-xs sm:text-sm"></i>
                  </span>
                </a>

                {/* Resume Button */}
                <a
                  href="/resume.pdf"
                  download
                  className="group relative inline-flex items-center justify-center w-full sm:w-auto"
                >
                  <div className="absolute -inset-0.5 bg-linear-to-r from-gray-700 to-gray-600 rounded-lg sm:rounded-xl blur-md sm:blur-lg opacity-0 group-hover:opacity-40 transition-all duration-300" />
                  <span className="relative inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 px-5 sm:px-6 md:px-7 lg:px-8 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                    <span className="text-gray-300 group-hover:text-white font-semibold text-xs sm:text-sm md:text-base transition-colors duration-300">Get Resume</span>
                    <i className="fas fa-download text-gray-400 group-hover:text-white transform transition-all duration-300 group-hover:rotate-12 text-xs sm:text-sm"></i>
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
                <div className="absolute -inset-0.5 sm:-inset-1 bg-linear-to-r from-blue-500 via-teal-500 to-blue-500 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500 animate-gradient" />

                <div className="relative gradient-border code-window-container max-w-full">
                  <div className="code-window bg-linear-to-br from-[#0a1628] to-[#091121] border border-gray-700/50 group-hover:border-blue-500/30 transition-all duration-300 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl max-w-full">
                    {/* Modern Window Header */}
                    <div className="window-header bg-linear-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm px-2 xs:px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 flex items-center justify-between border-b border-gray-700/50 shrink-0">
                      <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 shrink-0">
                        <div className="window-dot bg-red-500 w-2 xs:w-2.5 sm:w-3 h-2 xs:h-2.5 sm:h-3 rounded-full hover:brightness-125 transition-all cursor-pointer shadow-lg shadow-red-500/50"></div>
                        <div className="window-dot bg-yellow-500 w-2 xs:w-2.5 sm:w-3 h-2 xs:h-2.5 sm:h-3 rounded-full hover:brightness-125 transition-all cursor-pointer shadow-lg shadow-yellow-500/50"></div>
                        <div className="window-dot bg-green-500 w-2 xs:w-2.5 sm:w-3 h-2 xs:h-2.5 sm:h-3 rounded-full hover:brightness-125 transition-all cursor-pointer shadow-lg shadow-green-500/50"></div>
                      </div>
                      <span className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-gray-400 flex items-center gap-1 xs:gap-1.5 sm:gap-2 font-mono truncate mx-2">
                        <i className="fas fa-code text-blue-400 shrink-0"></i>
                        <span className="hidden xs:inline text-gray-300 truncate">developer.js</span>
                      </span>
                      <div className="flex items-center gap-1 sm:gap-2 opacity-50 shrink-0">
                        <div className="w-2.5 xs:w-3 sm:w-4 h-2.5 xs:h-3 sm:h-4 border border-gray-600 rounded"></div>
                      </div>
                    </div>

                    {/* Code Content - Fully contained with no overflow */}
                    <div className="relative w-full overflow-hidden">
                      <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
                        <pre className="language-javascript p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 text-[9px] xs:text-[10px] sm:text-xs md:text-sm bg-transparent min-h-[250px] xs:min-h-[280px] sm:min-h-80 md:min-h-[360px] lg:min-h-[400px] xl:min-h-[450px] max-w-full whitespace-pre-wrap wrap-break-word">
                          <code className="language-javascript block max-w-full">{code}</code>
                        </pre>
                      </div>
                    </div>

                    {/* Line numbers effect (optional decoration) */}
                    <div className="absolute left-0 top-10 xs:top-[44px] sm:top-12 md:top-[52px] bottom-0 w-6 xs:w-7 sm:w-8 md:w-10 bg-linear-to-r from-gray-900/50 to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scroll indicator - hidden on mobile */}
        <div className="hidden sm:flex absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce flex-col items-center gap-2 pointer-events-none">
          <span className="text-gray-400 text-xs sm:text-sm flex items-center gap-2">
            <i className="fas fa-mouse text-blue-400"></i>
          </span>
          <i className="fas fa-chevron-down text-blue-400 text-lg sm:text-xl"></i>
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

