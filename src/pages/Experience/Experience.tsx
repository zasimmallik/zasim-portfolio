import React, { useState, useEffect, useRef } from "react";
import { Code2, Activity, Cpu, Layers, LucideIcon, Calendar, Building2 } from "lucide-react";

interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description: string;
  icon: LucideIcon;
  index: number;
  isLatest: boolean;
}

const ExperienceCard = ({
  title,
  company,
  period,
  description,
  icon: Icon,
  index,
  isLatest,
}: ExperienceCardProps) => {
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

  // Cards on odd indexes slide from right, even from left (on md+)
  const slideDirection = index % 2 === 0 ? 'md:translate-x-0' : 'md:translate-x-0';
  const slideFrom = index % 2 === 0 ? 'md:-translate-x-10' : 'md:translate-x-10';

  return (
    <div
      ref={cardRef}
      className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${isVisible
          ? `opacity-100 translate-y-0 ${slideDirection}`
          : `opacity-0 translate-y-20 ${slideFrom}`
        } transition-all duration-1000 ease-out`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Timeline Dot */}
      <div className="absolute left-4 md:left-1/2 z-20 transform -translate-x-1/2 flex items-center justify-center">
        <div
          className={`rounded-full transition-all duration-200 ${isLatest
              ? 'w-3.5 h-3.5 bg-slate-900 dark:bg-white ring-4 ring-[#DFE4EC] dark:ring-[#050507]'
              : 'w-2.5 h-2.5 bg-slate-400 dark:bg-slate-600 ring-4 ring-[#DFE4EC] dark:ring-[#050507]'
            }`}
        />
      </div>

      {/* Content Card with Tactile Elevation */}
      <div className="w-full md:w-[calc(50%-24px)] lg:w-[calc(50%-30px)] pl-10 xs:pl-12 md:pl-0">
        <div className="relative p-5 sm:p-7 lg:p-8 rounded-2xl bg-[#F3F5F9] dark:bg-[#13141A] border border-[#C5CDD9] dark:border-[#22242D] shadow-[0_12px_32px_-8px_rgba(15,23,42,0.09),0_2px_8px_-1px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_42px_-10px_rgba(15,23,42,0.14),0_4px_12px_-2px_rgba(15,23,42,0.06)] dark:shadow-xl transition-all duration-200 group-hover:-translate-y-1 group-hover:border-slate-400 dark:group-hover:border-slate-600 overflow-hidden">
          {/* Header */}
          <div className="relative z-10 flex flex-col gap-3 sm:gap-4 mb-4">
            <div className="flex items-start sm:items-center justify-between flex-wrap gap-2.5">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="p-2 sm:p-2.5 rounded-xl border border-[#C5CDD9] dark:border-[#22242D] bg-[#E7ECF3] dark:bg-[#1A1B22] text-slate-800 dark:text-slate-200 shrink-0">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-lg xs:text-xl sm:text-2xl md:text-xl lg:text-2xl font-bold text-slate-950 dark:text-white transition-colors leading-snug">
                  {title}
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold border border-[#C5CDD9] dark:border-[#22242D] bg-[#E7ECF3] dark:bg-[#1A1B22] text-slate-700 dark:text-[#A1A1AA] font-mono shrink-0">
                <Calendar className="w-3.5 h-3.5" />
                {period}
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              <Building2 className="w-4 h-4 text-slate-500" />
              <span className="font-semibold text-slate-800 dark:text-slate-300">{company}</span>
            </div>
          </div>

          {/* Description */}
          <p className="relative z-10 text-slate-700 dark:text-slate-400 leading-relaxed text-sm sm:text-base border-l-2 border-slate-300 dark:border-[#22242D] pl-4">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

// Animated timeline line that fills on scroll
const AnimatedTimelineLine = () => {
  const [fillHeight, setFillHeight] = useState(0);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!lineRef.current) return;
      const rect = lineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much of the line is above the viewport center
      const lineTop = rect.top;
      const lineHeight = rect.height;
      const viewportCenter = windowHeight * 0.6;

      if (lineTop > viewportCenter) {
        setFillHeight(0);
      } else if (lineTop + lineHeight < viewportCenter) {
        setFillHeight(100);
      } else {
        const progress = ((viewportCenter - lineTop) / lineHeight) * 100;
        setFillHeight(Math.min(Math.max(progress, 0), 100));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={lineRef} className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px transform md:-translate-x-1/2 overflow-hidden">
      {/* Static background line */}
      <div className="absolute inset-0 bg-[#C5CDD9] dark:bg-[#22242D]" />
      {/* Animated fill line */}
      <div
        className="absolute top-0 left-0 right-0 bg-slate-900 dark:bg-white transition-all duration-300 ease-out"
        style={{
          height: `${fillHeight}%`,
        }}
      />
    </div>
  );
};

const ExperienceSection = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      icon: Cpu,
      title: "Founder & AI SaaS Developer",
      company: "Zeraql & Rizmiq",
      period: "2025 – Present",
      description:
        "Architecting and building two AI-native SaaS platforms from the ground up. Leading end-to-end product engineering across system architecture, LLM orchestration, full-stack implementation, and production infrastructure.",
    },
    {
      icon: Layers,
      title: "Full-Stack Web Developer",
      company: "Independent",
      period: "2024 – Present",
      description:
        "Delivered full-stack web applications end to end using React, Next.js, Node.js, PostgreSQL, and Prisma. Owned the complete engineering lifecycle from database modeling and API design to authentication and cloud deployment.",
    },
    {
      icon: Code2,
      title: "Junior Frontend Developer",
      company: "Programming Hero",
      period: "2022 – 2023",
      description:
        "Built responsive, accessible user interfaces and reusable component systems. Developed a strong foundation in clean, maintainable code, modern frontend workflows, and collaborative software development.",
    },
  ];

  return (
    <section id="experience" className="relative py-20 sm:py-32 bg-[#DFE4EC] dark:bg-[#050507] overflow-hidden transition-colors duration-150">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#13141A] dark:bg-[#F3F5F9] border border-[#22242D] dark:border-[#C5CDD9] text-[#F3F5F9] dark:text-[#090A0C] text-xs font-semibold font-mono uppercase tracking-wider mb-6 shadow-sm transition-all duration-200">
            <Activity className="w-3.5 h-3.5 text-blue-400 dark:text-blue-600 shrink-0" />
            <span>Career Journey</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-950 dark:text-white mb-6 tracking-tight">
            Professional Experience
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
            The milestones and engineering roles that shaped how I design, build, and ship software.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Animated Vertical Line */}
          <AnimatedTimelineLine />

          {/* Experience Cards */}
          <div className="space-y-12 md:space-y-20">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={index}
                {...exp}
                index={index}
                isLatest={index === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
