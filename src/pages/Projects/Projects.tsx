import { useTransform, motion, useScroll, MotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface Project {
  title: string;
  description: string;
  src: string;
  link: string;
  color: string;
  githubLink: string;
  liveLink: string;
  tags: string[];
}

const projects: Project[] = [
  {
    title: "Project One",
    description: "Detailed description of your project. Explain the core features, architectural decisions, and the technologies used to build this product.",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    link: "",
    color: "#60a5fa",
    githubLink: "",
    liveLink: "",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Project Two",
    description: "Detailed description of your project. Explain the core features, architectural decisions, and the technologies used to build this product.",
    src: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop",
    link: "",
    color: "#c084fc",
    githubLink: "",
    liveLink: "",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    title: "Project Three",
    description: "Detailed description of your project. Explain the core features, architectural decisions, and the technologies used to build this product.",
    src: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop",
    link: "",
    color: "#2dd4bf",
    githubLink: "",
    liveLink: "",
    tags: ["Python", "FastAPI", "Docker"],
  },
  {
    title: "Project Four",
    description: "Detailed description of your project. Explain the core features, architectural decisions, and the technologies used to build this product.",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    link: "",
    color: "#f97316",
    githubLink: "",
    liveLink: "",
    tags: ["Vue.js", "Firebase", "Stripe"],
  },
  {
    title: "Project Five",
    description: "Detailed description of your project. Explain the core features, architectural decisions, and the technologies used to build this product.",
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    link: "",
    color: "#ec4899",
    githubLink: "",
    liveLink: "",
    tags: ["AWS", "Terraform", "Go"],
  },
];

export default function Projects() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    // Eagerly preload project images in parallel for fast loading
    projects.forEach((proj) => {
      const img = new Image();
      img.src = proj.src;
    });

    // Add specific styles for 1366x768 resolution
    const style = document.createElement("style");
    style.textContent = `
      @media screen and (width: 1366px) and (height: 768px),
             screen and (width: 1367px) and (height: 768px),
             screen and (width: 1368px) and (height: 769px) {
        .project-card {
          scale: 0.85;
          margin-top: -5vh;
        }
        .project-container {
          height: 90vh;
        }
      }
    `;
    document.head.appendChild(style);

    // Resolution check function
    const checkResolution = () => {
      const isTargetResolution =
        window.innerWidth >= 1360 &&
        window.innerWidth <= 1370 &&
        window.innerHeight >= 760 &&
        window.innerHeight <= 775;

      if (isTargetResolution) {
        document.documentElement.style.setProperty("--project-scale", "0.85");
        document.documentElement.style.setProperty("--project-margin", "-5vh");
      } else {
        document.documentElement.style.setProperty("--project-scale", "1");
        document.documentElement.style.setProperty("--project-margin", "0");
      }
    };

    checkResolution();
    window.addEventListener("resize", checkResolution);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener("resize", checkResolution);
    };
  }, []);

  return (
    <section
      className="bg-[#DFE4EC] dark:bg-[#050507] text-slate-900 dark:text-slate-200 py-12 sm:py-16 md:py-24 lg:py-28 relative transition-colors duration-150"
      ref={container}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 md:space-y-12 relative z-10">
        <div className="text-center space-y-3 sm:space-y-4 md:space-y-5">
          {/* Small Title */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#13141A] dark:bg-[#F3F5F9] border border-[#22242D] dark:border-[#C5CDD9] text-[#F3F5F9] dark:text-[#090A0C] text-xs font-semibold tracking-wider uppercase font-mono shadow-sm transition-all duration-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-600 animate-pulse shrink-0"></span>
            Projects
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Featured Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-normal tracking-wide">
            Selected products and systems built with a focus on clean architecture, performance, and user experience.
          </p>
        </div>

        <div className="flex flex-col">
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.03;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                url={project.src}
                title={project.title}
                color={project.color}
                description={project.description}
                progress={scrollYProgress}
                range={[i * (1 / projects.length), 1]}
                targetScale={targetScale}
                githubLink={project.githubLink}
                liveLink={project.liveLink}
                tags={project.tags}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface CardProps {
  i: number;
  title: string;
  description: string;
  url: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  githubLink: string;
  liveLink: string;
  tags: string[];
}

function Card({
  i,
  title,
  description,
  url,
  color,
  progress,
  range,
  targetScale,
  githubLink,
  liveLink,
  tags,
}: CardProps) {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 768);
    updateSize();
    window.addEventListener("resize", updateSize, { passive: true });
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      ref={container}
      className="h-[85svh] min-h-[500px] sm:h-[90vh] md:h-[90vh] lg:h-screen flex items-center justify-center sticky top-0 project-container pointer-events-none"
    >
      <motion.div
        style={{
          scale,
          top: isMobile ? `calc(0.5rem + ${i * 12}px)` : `calc(-5vh + ${i * 25}px)`,
        }}
        className="relative lg:-top-[25%] h-auto w-full max-w-5xl origin-top project-card pointer-events-auto will-change-transform transform-gpu"
      >
        <div
          style={{
            transform: "scale(var(--project-scale, 1))",
            marginTop: "var(--project-margin, 0)",
            transformOrigin: "top center",
          }}
          className="w-full"
        >
        {/* Modern split card design with Glassmorphism - Enhanced */}
        <div
          ref={cardRef}
          className="w-full flex flex-col md:flex-row bg-[#F3F5F9] dark:bg-[#13141A] border border-[#C5CDD9] dark:border-[#22242D] rounded-3xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(15,23,42,0.14),0_4px_16px_-2px_rgba(15,23,42,0.06)] dark:shadow-2xl transition-all duration-200 group relative"
        >
          {/* Image section */}
          <div className="w-full md:w-[52%] lg:w-[55%] h-[190px] xs:h-[210px] sm:h-[250px] md:h-[380px] lg:h-[450px] relative overflow-hidden z-10 border-b md:border-b-0 md:border-r border-[#C5CDD9] dark:border-[#22242D]">
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <img
                src={url}
                alt={title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700"
              />
            </motion.div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

            {/* Project number badge */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 z-30">
              <div className="bg-[#F3F5F9]/90 dark:bg-[#0C0D12]/90 backdrop-blur-md border border-[#C5CDD9] dark:border-[#22242D] text-slate-900 dark:text-white px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold tracking-wide shadow-sm font-mono">
                0{i + 1}
              </div>
            </div>
          </div>

          {/* Content section */}
          <div className="w-full md:w-[48%] lg:w-[45%] p-5 sm:p-7 md:p-7 lg:p-10 xl:p-12 flex flex-col justify-between relative bg-[#F3F5F9] dark:bg-[#13141A] z-10">
            <div>
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs font-semibold tracking-[0.2em] text-slate-600 dark:text-[#A1A1AA] uppercase font-mono">
                  Featured Project
                </span>
              </div>

              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-2xl lg:text-4xl font-bold text-slate-950 dark:text-white mb-2.5 sm:mb-3 tracking-tighter">
                {title}
              </h2>
              <p className="text-xs xs:text-sm sm:text-base md:text-sm lg:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal tracking-wide mb-4 sm:mb-5">
                {description}
              </p>

              {/* Technology Tags */}
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] sm:text-xs px-2.5 py-1 rounded bg-[#E7ECF3] dark:bg-[#1A1B22] border border-[#C5CDD9] dark:border-[#22242D] text-slate-800 dark:text-slate-300 font-medium tracking-wide shadow-none"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-[#C5CDD9] dark:border-[#22242D]">
              <div className="flex items-center gap-4">
                {/* GitHub Link */}
                {githubLink && (
                  <motion.a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E7ECF3] hover:bg-[#DDE2EC] dark:bg-[#1A1B24] dark:hover:bg-[#22242D] border border-[#C5CDD9] dark:border-[#22242D] shadow-none transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-slate-700 group-hover/btn:text-slate-950 dark:text-slate-300 dark:group-hover/btn:text-white transition-colors"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    <span className="text-sm font-medium text-slate-700 group-hover/btn:text-slate-950 dark:text-slate-300 dark:group-hover/btn:text-white transition-colors">
                      Source
                    </span>
                  </motion.a>
                )}

                {/* Live Link */}
                {liveLink && (
                  <motion.a
                    href={liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#18181B] hover:bg-black dark:bg-[#F3F5F9] dark:hover:bg-[#DFE4EC] text-[#F3F5F9] dark:text-[#050507] shadow-[0_6px_16px_-3px_rgba(15,23,42,0.20)] dark:shadow-sm transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#F3F5F9]/80 group-hover/btn:text-[#F3F5F9] dark:text-[#050507]/80 dark:group-hover/btn:text-[#050507] transition-colors"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    <span className="text-sm font-medium text-[#F3F5F9] dark:text-[#050507] transition-colors">
                      Live Demo
                    </span>
                  </motion.a>
                )}
              </div>
            </div>
          </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}



