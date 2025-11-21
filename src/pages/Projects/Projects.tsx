import { ReactLenis } from "lenis/react";
import { useTransform, motion, useScroll, MotionValue } from "framer-motion";
import { useRef, useEffect } from "react";

interface Project {
  title: string;
  description: string;
  src: string;
  link: string;
  color: string;
  githubLink: string;
  liveLink: string;
}

const projects: Project[] = [
  {
    title: "Project 1",
    description: "Your project description goes here",
    src: "rock.jpg",
    link: "",
    color: "#5196fd",
    githubLink: "",
    liveLink: "",
  },
  {
    title: "Project 2",
    description: "Your project description goes here",
    src: "tree.jpg",
    link: "",
    color: "#8f89ff",
    githubLink: "",
    liveLink: "",
  },
  {
    title: "Project 3",
    description: "Your project description goes here",
    src: "water.jpg",
    link: "",
    color: "#fff",
    githubLink: "",
    liveLink: "",
  },
];

export default function Projects() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
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
    <ReactLenis root>
      <section
        className="bg-[#020617] text-slate-200 py-12 sm:py-16 md:py-24 lg:py-28 relative"
        ref={container}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_50%)]" />
        </div>
        {/* Enhanced background effects - Matching About page */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-blue-900/5 via-[#020617] to-[#020617]"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] animate-pulse duration-1000"></div>
          <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[120px] animate-pulse duration-1000" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 md:space-y-12 relative z-10">
          <div className="text-center space-y-3 sm:space-y-4 md:space-y-5">
            {/* Small Title */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/10 text-blue-400 text-xs sm:text-sm font-medium tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              Projects
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
              Featured Projects
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-light tracking-wide">
              "A curated set of products and prototypes built with clarity, precision, and purpose."
            </p>
          </div>

          <div className="hidden lg:flex lg:flex-col">
            {projects.map((project, i) => {
              const targetScale = 1 - (projects.length - i) * 0.05;
              return (
                <Card
                  key={`p_${i}`}
                  i={i}
                  url={project.link}
                  title={project.title}
                  color={project.color}
                  description={project.description}
                  progress={scrollYProgress}
                  range={[i * 0.25, 1]}
                  targetScale={targetScale}
                  githubLink={project.githubLink}
                  liveLink={project.liveLink}
                />
              );
            })}
          </div>

          <div className="grid gap-8 lg:hidden">
            {projects.map((project, i) => (
              <MobileCard key={`mobile_${i}`} {...project} />
            ))}
          </div>
        </div>
      </section>
    </ReactLenis>
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
}: CardProps) {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="min-h-[85vh] flex items-center justify-center lg:h-screen lg:sticky top-0 project-container pointer-events-none"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
          transform: `scale(var(--project-scale, 1))`,
          marginTop: "var(--project-margin, 0)",
        }}
        className="relative lg:-top-[25%] h-auto w-full max-w-5xl origin-top project-card pointer-events-auto"
      >
        {/* Modern split card design with Glassmorphism - Enhanced */}
        <div className="w-full flex flex-col md:flex-row bg-slate-900/50 backdrop-blur-2xl border border-slate-800/50 rounded-3xl overflow-hidden shadow-2xl hover:border-blue-500/30 hover:shadow-blue-500/10 transition-all duration-500 group">
          {/* Image section */}
          <div className="w-full md:w-[55%] h-[200px] sm:h-[250px] md:h-[400px] lg:h-[450px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <img
                src={url}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700"
              />
            </motion.div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80" />

            {/* Project number badge */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 z-30">
              <div className="bg-slate-950/40 backdrop-blur-md border border-white/10 text-white px-4 py-1.5 rounded-full text-xs md:text-sm font-medium tracking-wide shadow-lg">
                0{i + 1}
              </div>
            </div>
          </div>

          {/* Content section */}
          <div className="w-full md:w-[45%] p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between relative bg-gradient-to-b from-white/[0.02] to-transparent">
            {/* Subtle background glow */}
            <div
              className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl -z-10 pointer-events-none"
              style={{ opacity: 0.3 }}
            />

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-2 h-2 rounded-full ring-2 ring-white/20 ring-offset-2 ring-offset-slate-900"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs font-medium tracking-[0.2em] text-slate-400 uppercase">
                  Featured Project
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 tracking-tighter">
                {title}
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-light tracking-wide">
                {description}
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5">
              <div className="flex items-center gap-4">
                {/* GitHub Link */}
                <motion.a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-300"
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
                    className="text-slate-400 group-hover/btn:text-white transition-colors"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span className="text-sm font-medium text-slate-400 group-hover/btn:text-white transition-colors">
                    Source
                  </span>
                </motion.a>

                {/* Live Link */}
                <motion.a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-300"
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
                    className="text-slate-400 group-hover/btn:text-white transition-colors"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  <span className="text-sm font-medium text-slate-400 group-hover/btn:text-white transition-colors">
                    Live Demo
                  </span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface MobileCardProps extends Project {
  link: string;
}

function MobileCard({ title, description, link: url, color, githubLink, liveLink }: MobileCardProps) {
  return (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl overflow-hidden shadow-xl hover:border-blue-500/30 hover:shadow-blue-500/10 transition-all duration-300">
      <div className="relative h-56 sm:h-64 group">
        <img src={url} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-80" />

        <div className="absolute top-4 left-4 bg-slate-950/40 backdrop-blur-md border border-white/10 text-white px-3 py-1 rounded-full text-xs font-medium">
          Featured
        </div>
      </div>

      <div className="p-6 space-y-6 relative -mt-12">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full ring-1 ring-white/20"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Project</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>
          <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
          >
            <span className="text-sm font-medium text-slate-200 group-hover:text-white">Code</span>
          </a>
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
          >
            <span className="text-sm font-medium text-slate-200 group-hover:text-white">Live</span>
          </a>
        </div>
      </div>
    </div>
  );
}

