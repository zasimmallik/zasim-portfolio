import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import IconCloudDemo from "@/components/globe";
import { Code2, Database, Layout, Cpu, Cloud, LucideIcon, Terminal, Globe, Workflow } from "lucide-react";
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

const SkillCard = ({ icon: Icon, title, skills, color, index }: SkillCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative h-full transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Animated gradient glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/0 via-cyan-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:via-cyan-500/20 group-hover:to-purple-500/20 rounded-2xl blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

      <Card className="relative h-full bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 group-hover:border-blue-500/30 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-blue-500/10 overflow-hidden">
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent group-hover:via-blue-500/10 animate-shimmer" />

        <CardContent className="p-6 sm:p-7 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className={`relative p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 group-hover:border-blue-500/30 transition-all duration-300 group-hover:scale-110 ${color}`}>
              <div className="absolute inset-0 bg-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Icon className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
              {title}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill: Skill, idx: number) => (
              <Badge
                key={idx}
                variant="outline"
                className="relative bg-gray-800/40 hover:bg-gray-700/60 text-gray-300 hover:text-white border-gray-700/50 hover:border-blue-500/30 px-3 py-1.5 text-xs sm:text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10 cursor-default"
              >
                <span className="mr-2 text-base opacity-80 group-hover:opacity-100 transition-opacity">{skill.icon}</span>
                {skill.name}
              </Badge>
            ))}
          </div>
        </CardContent>

        {/* Decorative corner gradients */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-bl-full -mr-8 -mt-8 transition-all duration-500 group-hover:bg-blue-500/10" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-cyan-500/5 rounded-tr-full -ml-8 -mb-8 transition-all duration-500 group-hover:bg-cyan-500/10" />
      </Card>
    </div>
  );
};

const SkillsSection = () => {
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    setHeaderVisible(true);
  }, []);

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
      ],
    },
  ];

  return (
    <section id="skills" className="relative py-20 sm:py-32 bg-[#04081A] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#04081A] to-[#04081A]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 sm:mb-20 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <Cpu className="w-4 h-4" />
            <span>Technical Expertise</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Technologies</span>
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </div>

        {/* Icon Cloud */}
        <div className={`flex justify-center items-center mb-20 transition-all duration-1000 delay-300 ${headerVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full"></div>
            <IconCloudDemo />
          </div>
        </div>

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

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;

