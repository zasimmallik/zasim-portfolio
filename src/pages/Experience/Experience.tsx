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
      {/* Timeline Dot with ripple glow */}
      <div className="absolute left-4 md:left-1/2 z-20 transform -translate-x-1/2">
        {/* Ripple effect ring */}
        {isLatest && isVisible && (
          <div className="absolute inset-0 w-4 h-4 rounded-full bg-cyan-400/30 animate-[ripple-glow_2s_ease-in-out_infinite]" />
        )}
        <div
          className={`w-4 h-4 rounded-full border-4 border-[#010410] transition-all duration-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.8)] ${isLatest
              ? 'bg-cyan-400 group-hover:bg-cyan-300 scale-125 group-hover:scale-[1.75]'
              : 'bg-blue-500 group-hover:scale-150 group-hover:bg-cyan-400'
            }`}
        />
      </div>

      {/* Content Card */}
      <div className="w-full md:w-[calc(50%-30px)] pl-12 md:pl-0">
        <div className={`relative p-6 sm:p-8 rounded-2xl bg-slate-900/50 border backdrop-blur-xl shadow-lg transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl overflow-hidden ${isLatest
            ? 'border-cyan-500/20 group-hover:border-cyan-500/40 group-hover:shadow-cyan-500/10'
            : 'border-slate-800/50 group-hover:border-blue-500/30 group-hover:shadow-blue-500/10'
          }`}>

          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-cyan-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:via-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>

          {/* Header */}
          <div className="relative z-10 flex flex-col gap-4 mb-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl border transition-colors duration-300 ${isLatest
                    ? 'bg-cyan-500/10 border-cyan-500/20 group-hover:bg-cyan-500/20'
                    : 'bg-blue-500/10 border-blue-500/20 group-hover:bg-blue-500/20'
                  }`}>
                  <Icon className={`w-6 h-6 transition-colors ${isLatest
                      ? 'text-cyan-400 group-hover:text-cyan-300'
                      : 'text-blue-400 group-hover:text-cyan-300'
                    }`} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-200 group-hover:text-blue-200 transition-colors">
                  {title}
                </h3>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${isLatest
                  ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
                  : 'bg-blue-500/10 text-blue-300 border-blue-500/20'
                }`}>
                <Calendar className="w-3.5 h-3.5" />
                {period}
                {isLatest && (
                  <span className="relative flex h-1.5 w-1.5 ml-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
                  </span>
                )}
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-400 text-sm sm:text-base">
              <Building2 className="w-4 h-4 text-slate-500" />
              <span className="font-medium text-slate-300">{company}</span>
            </div>
          </div>

          {/* Description */}
          <p className={`relative z-10 text-slate-400 leading-relaxed text-sm sm:text-base border-l-2 pl-4 transition-colors duration-300 ${isLatest
              ? 'border-cyan-700/50 group-hover:border-cyan-500/50'
              : 'border-slate-700 group-hover:border-blue-500/50'
            }`}>
            {description}
          </p>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-bl-full -mr-10 -mt-10 transition-all duration-500 group-hover:bg-blue-500/10"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-cyan-500/5 rounded-tr-full -ml-10 -mb-10 transition-all duration-500 group-hover:bg-cyan-500/10"></div>
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
    <div ref={lineRef} className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 transform md:-translate-x-1/2 overflow-hidden">
      {/* Static background line */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 via-slate-800/30 to-blue-500/0" />
      {/* Animated fill line */}
      <div
        className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-500/70 via-cyan-500/50 to-blue-500/70 transition-all duration-300 ease-out"
        style={{
          height: `${fillHeight}%`,
          boxShadow: '0 0 8px rgba(59,130,246,0.4), 0 0 20px rgba(59,130,246,0.2)',
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
        "Now I'm building my own products. I lead development on two AI-driven SaaS platforms — from ideation and LLM integration to frontend, backend, and getting it all into production.",
    },
    {
      icon: Layers,
      title: "Full-Stack Web Developer",
      company: "Independent",
      period: "2024 – Present",
      description:
        "Went independent and started owning projects end to end — React, Next.js, Node.js, PostgreSQL, Prisma. I handled everything from architecture decisions and API design to deployment. Lots of trial and error, but that's how you learn.",
    },
    {
      icon: Code2,
      title: "Junior Frontend Developer",
      company: "Programming Hero",
      period: "2022 – 2023",
      description:
        "This was my first real dev role. I got to work on responsive UIs, tackle accessibility, and learn that writing maintainable code matters just as much as getting things to work.",
    },
  ];

  return (
    <section id="experience" className="relative py-20 sm:py-32 bg-[#020610] overflow-hidden noise-overlay">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-900/5 via-[#010410] to-[#010410]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <Activity className="w-4 h-4" />
            <span>Career Journey</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Experience</span>
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed">
            The path that got me here — and the roles that shaped how I think and build.
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
