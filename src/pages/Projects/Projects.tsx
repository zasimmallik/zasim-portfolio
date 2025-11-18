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
  {
    title: "Project 4",
    description: "Your project description goes here",
    src: "house.jpg",
    link: "",
    color: "#ed649e",
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
        className="bg-slate-950 text-white py-12 sm:py-16 md:py-24 lg:py-28"
        ref={container}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 md:space-y-12">
          <div className="text-center space-y-3 sm:space-y-4 md:space-y-5">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-linear-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
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
        whileHover={{
          y: -8,
          transition: { duration: 0.3 },
        }}
      >
        {/* Modern split card design */}
        <div className="w-full flex flex-col md:flex-row bg-zinc-900 rounded-2xl overflow-hidden shadow-xl">
          {/* Image section - full width on mobile, 55% on desktop */}
          <div className="w-full md:w-[55%] h-[200px] sm:h-[250px] md:h-[400px] lg:h-[450px] relative overflow-hidden">
            <motion.img
              src={url}
              alt={title}
              className="w-full h-full object-cover"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />

            {/* Colored overlay on hover */}
            <motion.div
              className="absolute inset-0"
              style={{ backgroundColor: color, mixBlendMode: "overlay" }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            />

            {/* Project number */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 bg-black/50 backdrop-blur-md text-white px-2 py-1 sm:px-3 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
              Project {i + 1}
            </div>
          </div>

          {/* Content section - full width on mobile, 45% on desktop */}
          <div className="w-full md:w-[45%] p-4 sm:p-5 md:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                <div
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <div className="h-px w-10 sm:w-12 md:w-20 bg-gray-600" />
              </div>

              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-4">
                {title}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed line-clamp-3 md:line-clamp-none max-w-md">
                {description}
              </p>
            </div>

            <div className="mt-3 sm:mt-4 md:mt-auto pt-3 sm:pt-4">
              <div className="w-full h-px bg-gray-800 mb-3 sm:mb-4 md:mb-6" />

              <div className="flex items-center gap-3 sm:gap-4">
                {/* GitHub Link */}
                <motion.a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1 sm:gap-2"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span
                    className="text-xs sm:text-sm font-medium"
                    style={{ color }}
                  >
                    Code
                  </span>
                </motion.a>

                {/* Live Link */}
                <motion.a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1 sm:gap-2"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  <span
                    className="text-xs sm:text-sm font-medium"
                    style={{ color }}
                  >
                    Live
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
    <div className="bg-zinc-900 rounded-lg sm:rounded-2xl overflow-hidden shadow-xl">
      <div className="relative h-40 sm:h-48 md:h-56">
        <img src={url} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-black/50 backdrop-blur-md text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
          Featured
        </div>
      </div>
      <div className="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-6">
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <span
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            <div className="h-px w-10 sm:w-12 bg-gray-700" />
          </div>
          <h3 className="text-lg sm:text-2xl font-bold">{title}</h3>
          <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{description}</p>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-gray-200 hover:text-white transition-colors"
          >
            <span style={{ color }}>Code</span>
          </a>
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-gray-200 hover:text-white transition-colors"
          >
            <span style={{ color }}>Live</span>
          </a>
        </div>
      </div>
    </div>
  );
}

