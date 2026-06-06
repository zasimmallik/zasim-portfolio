import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import IconCloudDemo from "@/components/globe";
import { Code2, Database, Layout, Cpu, Cloud, LucideIcon, Terminal, Globe, Workflow, Brain } from "lucide-react";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaAws,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiGraphql,
  SiRedux,
  SiFirebase,
  SiVercel,
  SiVite,
  SiPrisma,
  SiMongoose,
  SiNetlify,
} from "react-icons/si";
import { TbBrandVscode, TbBrandOpenai } from "react-icons/tb";
import { BsFileEarmarkCode } from "react-icons/bs";

interface Skill {
  name: string;
  icon: React.ReactNode;
}

interface SkillCardProps {
  icon: LucideIcon;
  title: string;
  skills: Skill[];
  color: string;
  index: number;
}

// Staggered skill badge animation
const badgeVariants = {
  hidden: { opacity: 0, scale: 0.6, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const SkillCard = ({ icon: Icon, title, skills, color, index }: SkillCardProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  // Mouse-following gradient highlight
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="group relative h-full"
      custom={index}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
    >
      {/* Animated gradient glow effect */}
      <motion.div
        className="absolute -inset-0.5 rounded-2xl blur-xl"
        initial={{ opacity: 0 }}
        animate={isHovered ? {
          opacity: 1,
          background: [
            "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(6,182,212,0.2))",
            "linear-gradient(225deg, rgba(6,182,212,0.2), rgba(139,92,246,0.2))",
            "linear-gradient(315deg, rgba(139,92,246,0.2), rgba(59,130,246,0.2))",
            "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(6,182,212,0.2))",
          ],
        } : { opacity: 0 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      <Card className="relative h-full bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 group-hover:border-blue-500/30 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/10 overflow-hidden">
        {/* Mouse-following radial gradient */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59,130,246,0.1), transparent 60%)`,
              }}
            />
          )}
        </AnimatePresence>

        {/* Animated shimmer sweep */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent pointer-events-none"
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 2,
          }}
        />

        <CardContent className="p-6 sm:p-7 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className={`relative p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 group-hover:border-blue-500/30 transition-colors duration-300 ${color}`}
              whileHover={{ scale: 1.15, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {/* Pulse ring behind icon on hover */}
              <motion.div
                className="absolute inset-0 bg-blue-500/10 rounded-xl"
                initial={{ opacity: 0, scale: 1 }}
                animate={isHovered ? {
                  opacity: [0, 0.5, 0],
                  scale: [1, 1.4, 1.6],
                } : { opacity: 0, scale: 1 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <Icon className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />
            </motion.div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-200 group-hover:text-blue-200 transition-colors">
              {title}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill: Skill, idx: number) => (
              <motion.div
                key={idx}
                custom={idx}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={badgeVariants}
              >
                <motion.span
                  className="relative inline-flex items-center bg-slate-800/40 hover:bg-slate-700/60 text-slate-300 hover:text-white border border-slate-700/50 hover:border-blue-500/30 px-3 py-1.5 text-xs sm:text-sm rounded-md cursor-default transition-colors duration-200"
                  whileHover={{
                    scale: 1.08,
                    y: -3,
                    boxShadow: "0 8px 25px rgba(59,130,246,0.15)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span className="mr-2 text-base opacity-80 group-hover:opacity-100 transition-opacity">{skill.icon}</span>
                  {skill.name}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </CardContent>

        {/* Decorative corner gradients with animation */}
        <motion.div
          className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-bl-full -mr-10 -mt-10"
          animate={isHovered ? { scale: 1.5, opacity: 0.8 } : { scale: 1, opacity: 0.3 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-20 h-20 bg-cyan-500/5 rounded-tr-full -ml-10 -mb-10"
          animate={isHovered ? { scale: 1.5, opacity: 0.8 } : { scale: 1, opacity: 0.3 }}
          transition={{ duration: 0.5 }}
        />
      </Card>
    </motion.div>
  );
};

// Animated counter component
const AnimatedCounter = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(counterRef, { once: true, margin: "-20px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setCount(start);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <span ref={counterRef} className="tabular-nums">
      {count}{suffix}
    </span>
  );
};

// Floating orb component for background
const FloatingOrb = ({ delay, x, y, size, color }: { delay: number; x: string; y: string; size: number; color: string }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
      background: `radial-gradient(circle, ${color}, transparent 70%)`,
      filter: "blur(40px)",
    }}
    animate={{
      y: [0, -30, 10, -20, 0],
      x: [0, 15, -10, 20, 0],
      scale: [1, 1.2, 0.9, 1.1, 1],
      opacity: [0.3, 0.6, 0.4, 0.5, 0.3],
    }}
    transition={{
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

const SkillsSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  const skillCategories = [
    {
      icon: Code2,
      title: "Frontend Development",
      color: "text-blue-400",
      skills: [
        { name: "React", icon: <FaReact className="text-[#61DAFB]" /> },
        { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
        { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#38B2AC]" /> },
        { name: "HTML5", icon: <BsFileEarmarkCode className="text-[#E34F26]" /> },
        { name: "CSS3", icon: <BsFileEarmarkCode className="text-[#1572B6]" /> },
      ],
    },
    {
      icon: Database,
      title: "Backend Development",
      color: "text-green-400",
      skills: [
        { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" /> },
        { name: "Express.js", icon: <FaNodeJs className="text-[#339933]" /> },
        { name: "PostgreSQL", icon: <SiPostgresql className="text-[#336791]" /> },
        { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
        { name: "System Design", icon: <Database className="text-[#FF6C37]" /> },
        { name: "GraphQL", icon: <SiGraphql className="text-[#E10098]" /> },
      ],
    },
    {
      icon: Layout,
      title: "State & ORM",
      color: "text-purple-400",
      skills: [
        { name: "Redux", icon: <SiRedux className="text-[#764ABC]" /> },
        { name: "React Router", icon: <FaReact className="text-[#61DAFB]" /> },
        { name: "Prisma ORM", icon: <SiPrisma className="text-white" /> },
        { name: "Mongoose", icon: <SiMongoose className="text-[#880000]" /> },
        { name: "JWT & Auth", icon: <Workflow className="text-yellow-500" /> },
      ],
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      color: "text-orange-400",
      skills: [
        { name: "AWS", icon: <FaAws className="text-[#FF9900]" /> },
        { name: "Docker", icon: <FaDocker className="text-[#2496ED]" /> },
        { name: "Git & GitHub", icon: <FaGitAlt className="text-[#F05032]" /> },
        { name: "Vercel", icon: <SiVercel className="text-white" /> },
        { name: "CI/CD", icon: <Workflow className="text-green-500" /> },
      ],
    },
    {
      icon: Cpu,
      title: "AI & Python",
      color: "text-pink-400",
      skills: [
        { name: "Python", icon: <FaPython className="text-[#3776AB]" /> },
        { name: "LLMs & RAG", icon: <TbBrandOpenai className="text-[#412991]" /> },
        { name: "LangChain", icon: <Globe className="text-[#3776AB]" /> },
        { name: "Claude (Anthropic)", icon: <Brain className="text-[#CC9B7A]" /> },
        { name: "Claude Code", icon: <Terminal className="text-orange-400" /> },
        { name: "OpenAI Codex", icon: <TbBrandOpenai className="text-[#74A57F]" /> },
        { name: "Anti-gravity", icon: <Cpu className="text-purple-400" /> },
        { name: "Context Engineering", icon: <Cpu className="text-[#FF69B4]" /> },
        { name: "AI Agents", icon: <Cpu className="text-[#FF69B4]" /> },
      ],
    },
    {
      icon: Terminal,
      title: "Tools & Technologies",
      color: "text-yellow-400",
      skills: [
        { name: "VS Code", icon: <TbBrandVscode className="text-[#007ACC]" /> },
        { name: "Cursor IDE", icon: <TbBrandVscode className="text-[#007ACC]" /> },
        { name: "Vite", icon: <SiVite className="text-[#646CFF]" /> },
        { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" /> },
        { name: "Netlify", icon: <SiNetlify className="text-[#00C7B7]" /> },
        { name: "Stitch", icon: <Workflow className="text-blue-400" /> },
      ],
    },
  ];

  // Count total unique technologies
  const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <section id="skills" className="relative py-20 sm:py-32 bg-[#020610] overflow-hidden noise-overlay">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-900/5 via-[#010410] to-[#010410]"></div>
      </div>

      {/* Floating background orbs */}
      <FloatingOrb delay={0} x="10%" y="20%" size={200} color="rgba(59,130,246,0.08)" />
      <FloatingOrb delay={3} x="80%" y="60%" size={160} color="rgba(6,182,212,0.06)" />
      <FloatingOrb delay={6} x="50%" y="80%" size={180} color="rgba(139,92,246,0.06)" />
      <FloatingOrb delay={1.5} x="70%" y="10%" size={140} color="rgba(59,130,246,0.05)" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={isHeaderInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHeaderInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Cpu className="w-4 h-4" />
            </motion.div>
            <span>Technical Expertise</span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Technologies</span>
          </motion.h2>

          <motion.p
            className="text-gray-400 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            My day-to-day toolkit —{' '}
            <span className="text-blue-400 font-semibold">
              <AnimatedCounter target={totalSkills} suffix="+" />
            </span>{' '}
            technologies I use to build production-ready apps.
          </motion.p>
        </motion.div>

        {/* Icon Cloud with animated glow */}
        <motion.div
          className="flex justify-center items-center mb-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isHeaderInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="relative">
            {/* Animated glow rings */}
            <motion.div
              className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-[-20px] border border-blue-500/10 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-[-40px] border border-cyan-500/5 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <IconCloudDemo />
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={index}
              icon={category.icon}
              title={category.title}
              skills={category.skills}
              color={category.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
