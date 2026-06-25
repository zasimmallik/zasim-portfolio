import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import IconCloudDemo from "@/components/globe";
import {
  Code2, Database, Layout, Cpu, Cloud, LucideIcon,
  Terminal, Globe, Workflow, Brain,
} from "lucide-react";
import {
  FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt, FaAws,
} from "react-icons/fa";
import {
  SiNextdotjs, SiTypescript, SiTailwindcss, SiPostgresql,
  SiMongodb, SiGraphql, SiRedux, SiFirebase, SiVercel,
  SiVite, SiPrisma, SiMongoose, SiNetlify,
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
  accent: string;
  glowColor: string;
  gradientFrom: string;
  gradientTo: string;
  index: number;
}

const EASE_CURVE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.5, y: 14 },
  visible: (i: number) => ({
    opacity: 1, scale: 1, y: 0,
    transition: { delay: i * 0.055, duration: 0.38, ease: EASE_CURVE },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.93 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.1, duration: 0.65, ease: EASE_CURVE },
  }),
};

const SkillCard = ({
  icon: Icon, title, skills, accent, glowColor, gradientFrom, gradientTo, index,
}: SkillCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={cardRef}
      className="group relative h-full"
      custom={index}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      whileHover={{ y: -10, transition: { duration: 0.3, ease: "easeOut" } }}
    >
      {/* Card body */}
      <div
        className="relative h-full rounded-2xl overflow-hidden border border-white/5 bg-[#0a0f1e]/80 backdrop-blur-xl"
        style={{ boxShadow: "0 4px 24px -4px rgba(0,0,0,0.6)" }}
      >

        {/* Shimmer sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: `linear-gradient(105deg, transparent 40%, ${glowColor.replace("0.25", "0.07")} 50%, transparent 60%)`,
          }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
        />

        {/* Top edge accent line */}
        <div
          className="absolute top-0 left-6 right-6 h-[1.5px] rounded-full opacity-60"
          style={{ background: `linear-gradient(90deg, transparent, ${gradientFrom}, ${gradientTo}, transparent)` }}
        />

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-7">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <motion.div
                className="relative p-3 rounded-xl border border-white/10 backdrop-blur-sm"
                style={{ background: `linear-gradient(135deg, ${gradientFrom}18, ${gradientTo}18)` }}
                whileHover={{ scale: 1.15, rotate: 6 }}
                transition={{ type: "spring", stiffness: 280, damping: 14 }}
              >
                <Icon className={`w-6 h-6 sm:w-7 sm:h-7 relative z-10 ${accent}`} />
              </motion.div>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-white/90 transition-colors duration-300">
                {title}
              </h3>
              <div
                className="h-[2px] mt-1 rounded-full w-8 group-hover:w-16 transition-all duration-500"
                style={{ background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})` }}
              />
            </div>
          </div>

          {/* Skill Badges */}
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
                  className="relative inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-[13px] font-medium rounded-lg overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    color: "rgba(203,213,225,0.85)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  whileHover={{
                    scale: 1.08,
                    y: -3,
                  }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 380, damping: 18 }}
                >
                  <span className="text-[14px] opacity-90 flex-shrink-0">{skill.icon}</span>
                  {skill.name}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Corner orbs */}
        <div
          className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-20 blur-2xl pointer-events-none"
          style={{ background: gradientFrom }}
        />
        <div
          className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full opacity-15 blur-2xl pointer-events-none"
          style={{ background: gradientTo }}
        />
      </div>
    </motion.div>
  );
};

const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1600;
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target]);

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
};

const FloatingOrb = ({ delay, x, y, size, color }: {
  delay: number; x: string; y: string; size: number; color: string;
}) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: x, top: y, width: size, height: size,
      background: `radial-gradient(circle, ${color}, transparent 70%)`, filter: "blur(40px)"
    }}
    animate={{
      y: [0, -35, 12, -22, 0], x: [0, 18, -12, 22, 0],
      scale: [1, 1.25, 0.88, 1.12, 1], opacity: [0.3, 0.65, 0.38, 0.52, 0.3]
    }}
    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay }}
  />
);

const OrbitalRing = ({
  size, duration, reverse, color, dotColor, dotSize = 5,
}: {
  size: number; duration: number; reverse?: boolean; color: string; dotColor: string; dotSize?: number;
}) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size, height: size,
      top: "50%", left: "50%",
      marginTop: -size / 2, marginLeft: -size / 2,
      border: `1px solid ${color}`,
    }}
    animate={{ rotate: reverse ? -360 : 360 }}
    transition={{ duration, repeat: Infinity, ease: "linear" }}
  >
    <div
      className="absolute rounded-full"
      style={{
        width: dotSize, height: dotSize,
        background: dotColor,
        boxShadow: `0 0 ${dotSize * 3}px ${dotColor}, 0 0 ${dotSize * 6}px ${dotColor}`,
        top: -dotSize / 2, left: "50%", marginLeft: -dotSize / 2,
      }}
    />
  </motion.div>
);

const SkillsSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  const skillCategories = [
    {
      icon: Code2, title: "Frontend Development",
      accent: "text-blue-400",
      glowColor: "rgba(59,130,246,0.25)",
      gradientFrom: "#3b82f6", gradientTo: "#06b6d4",
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
      icon: Database, title: "Backend Development",
      accent: "text-emerald-400",
      glowColor: "rgba(16,185,129,0.25)",
      gradientFrom: "#10b981", gradientTo: "#34d399",
      skills: [
        { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" /> },
        { name: "Express.js", icon: <FaNodeJs className="text-[#339933]" /> },
        { name: "PostgreSQL", icon: <SiPostgresql className="text-[#336791]" /> },
        { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
        { name: "System Design", icon: <Database className="text-emerald-400" /> },
        { name: "GraphQL", icon: <SiGraphql className="text-[#E10098]" /> },
      ],
    },
    {
      icon: Layout, title: "State & ORM",
      accent: "text-purple-400",
      glowColor: "rgba(139,92,246,0.25)",
      gradientFrom: "#8b5cf6", gradientTo: "#a78bfa",
      skills: [
        { name: "Redux", icon: <SiRedux className="text-[#764ABC]" /> },
        { name: "React Router", icon: <FaReact className="text-[#61DAFB]" /> },
        { name: "Prisma ORM", icon: <SiPrisma className="text-white" /> },
        { name: "Mongoose", icon: <SiMongoose className="text-[#880000]" /> },
        { name: "JWT & Auth", icon: <Workflow className="text-yellow-400" /> },
      ],
    },
    {
      icon: Cloud, title: "Cloud & DevOps",
      accent: "text-orange-400",
      glowColor: "rgba(249,115,22,0.25)",
      gradientFrom: "#f97316", gradientTo: "#fb923c",
      skills: [
        { name: "AWS", icon: <FaAws className="text-[#FF9900]" /> },
        { name: "Docker", icon: <FaDocker className="text-[#2496ED]" /> },
        { name: "Git & GitHub", icon: <FaGitAlt className="text-[#F05032]" /> },
        { name: "Vercel", icon: <SiVercel className="text-white" /> },
        { name: "CI/CD", icon: <Workflow className="text-green-400" /> },
        { name: "Netlify", icon: <SiNetlify className="text-[#00C7B7]" /> },
      ],
    },
    {
      icon: Cpu, title: "AI & Python",
      accent: "text-pink-400",
      glowColor: "rgba(236,72,153,0.25)",
      gradientFrom: "#ec4899", gradientTo: "#f472b6",
      skills: [
        { name: "Python", icon: <FaPython className="text-[#3776AB]" /> },
        { name: "LLMs & RAG", icon: <TbBrandOpenai className="text-white" /> },
        { name: "LangChain", icon: <Globe className="text-[#3776AB]" /> },
        { name: "Claude (Anthropic)", icon: <Brain className="text-[#CC9B7A]" /> },
        { name: "Claude Code", icon: <Terminal className="text-orange-400" /> },
        { name: "OpenAI Codex", icon: <TbBrandOpenai className="text-[#74A57F]" /> },
        { name: "Context Engineering", icon: <Cpu className="text-[#FF69B4]" /> },
      ],
    },
    {
      icon: Terminal, title: "Tools & Technologies",
      accent: "text-yellow-400",
      glowColor: "rgba(234,179,8,0.25)",
      gradientFrom: "#eab308", gradientTo: "#facc15",
      skills: [
        { name: "VS Code", icon: <TbBrandVscode className="text-[#007ACC]" /> },
        { name: "Cursor IDE", icon: <TbBrandVscode className="text-[#007ACC]" /> },
        { name: "Vite", icon: <SiVite className="text-[#646CFF]" /> },
        { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" /> },
        { name: "Netlify", icon: <SiNetlify className="text-[#00C7B7]" /> },
        { name: "Anti-gravity", icon: <Cpu className="text-purple-400" /> },
      ],
    },
  ];

  const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <section id="skills" className="relative py-20 sm:py-32 bg-[#020610] overflow-hidden noise-overlay">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.06)_0%,transparent_70%)]" />
      </div>

      <FloatingOrb delay={0} x="8%" y="15%" size={220} color="rgba(59,130,246,0.07)" />
      <FloatingOrb delay={3} x="78%" y="58%" size={180} color="rgba(6,182,212,0.06)" />
      <FloatingOrb delay={6} x="48%" y="78%" size={200} color="rgba(139,92,246,0.06)" />
      <FloatingOrb delay={1.5} x="68%" y="8%" size={150} color="rgba(236,72,153,0.05)" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 32, filter: "blur(12px)" }}
          animate={isHeaderInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={isHeaderInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            >
              <Cpu className="w-4 h-4" />
            </motion.div>
            <span>Technical Expertise</span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 22 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.3 }}
          >
            Skills &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
              Technologies
            </span>
          </motion.h2>

          <motion.p
            className="text-gray-400 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.42 }}
          >
            My day-to-day toolkit —{" "}
            <span className="text-blue-400 font-semibold">
              <AnimatedCounter target={totalSkills} suffix="+" />
            </span>{" "}
            technologies I use to build production-ready apps.
          </motion.p>
        </motion.div>

        {/* Icon Cloud with orbital rings */}
        <motion.div
          className="flex justify-center items-center mb-20 sm:mb-24"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={isHeaderInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div
            className="relative flex items-center justify-center"
            style={{ width: 380, height: 380 }}
          >
            {/* Ambient pulsing glow */}
            <motion.div
              className="absolute inset-[-30px] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(6,182,212,0.06) 50%, transparent 70%)",
                filter: "blur(20px)",
              }}
              animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0.9, 0.45] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Ring 1 — close, fast, blue dot */}
            <OrbitalRing size={300} duration={10} color="rgba(59,130,246,0.22)" dotColor="#60a5fa" dotSize={7} />

            {/* Ring 2 — medium, reverse, cyan dot */}
            <OrbitalRing size={340} duration={18} reverse color="rgba(6,182,212,0.14)" dotColor="#22d3ee" dotSize={5} />

            {/* Ring 3 — outer, slow, purple dot */}
            <OrbitalRing size={380} duration={28} color="rgba(139,92,246,0.11)" dotColor="#a78bfa" dotSize={4} />

            {/* Ring 4 — dashed, very slow, pink dot */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 420, height: 420,
                top: "50%", left: "50%",
                marginTop: -210, marginLeft: -210,
                border: "1px dashed rgba(236,72,153,0.14)",
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            >
              <div
                className="absolute rounded-full"
                style={{
                  width: 4, height: 4,
                  background: "#f472b6",
                  boxShadow: "0 0 8px #f472b6, 0 0 16px #f472b6",
                  top: -2, left: "50%", marginLeft: -2,
                }}
              />
            </motion.div>

            {/* Second dot on ring 1, offset 180° */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 300, height: 300,
                top: "50%", left: "50%",
                marginTop: -150, marginLeft: -150,
              }}
              animate={{ rotate: [180, 540] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <div
                className="absolute rounded-full"
                style={{
                  width: 5, height: 5,
                  background: "#38bdf8",
                  boxShadow: "0 0 8px #38bdf8, 0 0 18px #38bdf8",
                  top: -2.5, left: "50%", marginLeft: -2.5,
                }}
              />
            </motion.div>

            {/* Tick marks on Ring 1 */}
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <div
                key={deg}
                className="absolute pointer-events-none"
                style={{
                  width: 300, height: 300,
                  top: "50%", left: "50%",
                  marginTop: -150, marginLeft: -150,
                  transform: `rotate(${deg}deg)`,
                }}
              >
                <div
                  className="absolute"
                  style={{
                    width: 2, height: 8,
                    background: "rgba(59,130,246,0.5)",
                    top: -4, left: "50%", marginLeft: -1,
                    borderRadius: 1,
                  }}
                />
              </div>
            ))}

            {/* Icon Cloud */}
            <div className="relative z-10">
              <IconCloudDemo />
            </div>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={index}
              index={index}
              icon={category.icon}
              title={category.title}
              skills={category.skills}
              accent={category.accent}
              glowColor={category.glowColor}
              gradientFrom={category.gradientFrom}
              gradientTo={category.gradientTo}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
