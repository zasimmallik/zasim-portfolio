import React, { useState, useEffect } from "react";
import { Code2, Activity, Cpu, Layers, Binary, LucideIcon } from "lucide-react";

interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

const ExperienceCard = ({
  title,
  company,
  period,
  description,
  icon: Icon,
  index,
}: ExperienceCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={`group relative overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Animated gradient glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/30 group-hover:via-blue-500/30 group-hover:to-purple-500/30 rounded-2xl blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

      {/* Glass morphism card */}
      <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-8 h-full border border-gray-700/50 group-hover:border-blue-500/30 shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-blue-500/20">
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent group-hover:via-blue-500/10 animate-shimmer rounded-xl sm:rounded-2xl" />

        {/* Icon with enhanced effects */}
        <div className="relative mb-5 sm:mb-6">
          <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl opacity-50 group-hover:opacity-100 animate-pulse transition-all duration-500" />
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl border border-gray-700/50 group-hover:border-cyan-500/50 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
            <Icon className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3 sm:space-y-4 relative z-10">
          <h3 className="text-xl sm:text-2xl md:text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-gray-300 bg-clip-text text-transparent leading-tight">
            {title}
          </h3>
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-3">
            <span className="font-semibold text-blue-400 text-base sm:text-lg">{company}</span>
            <span className="text-xs sm:text-sm font-mono bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full w-fit text-gray-300">
              {period}
            </span>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
            <p className="text-gray-300 text-sm sm:text-base pl-4 sm:pl-5 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-4 right-4 w-16 h-16 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
          <div className="absolute top-0 right-0 w-5 sm:w-7 h-[2px] bg-gradient-to-l from-cyan-500 to-transparent rounded-full" />
          <div className="absolute top-0 right-0 w-[2px] h-5 sm:h-7 bg-gradient-to-t from-cyan-500 to-transparent rounded-full" />
        </div>
        <div className="absolute bottom-4 left-4 w-16 h-16 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 w-5 sm:w-7 h-[2px] bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
          <div className="absolute bottom-0 left-0 w-[2px] h-5 sm:h-7 bg-gradient-to-b from-purple-500 to-transparent rounded-full" />
        </div>
      </div>
    </div>
  );
};

const ExperienceSection = () => {
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    setHeaderVisible(true);
  }, []);

  const experiences = [
    {
      icon: Code2,
      title: "Junior Frontend Developer",
      company: "Programming Hero",
      period: "2022 ??? 2023",
      description:
        "Contributed to building responsive and accessible user interfaces. Improved UI components using HTML, CSS, JavaScript, and front-end design principles. Collaborated within structured workflows and learned practical engineering discipline.",
    },
    {
      icon: Layers,
      title: "Full-Stack Web Developer",
      company: "Independent",
      period: "2024 ??? Present",
      description:
        "Developing full-stack applications using React, Next.js, Node.js, Express, PostgreSQL, Prisma. Working across front-end, back-end, API design, authentication, and deployment. Building internal projects and prototypes to strengthen real-world problem-solving skills.",
    },
    {
      icon: Cpu,
      title: "Founder & AI SaaS Developer",
      company: "ILM AI",
      period: "2025 ??? Present",
      description:
        "Designing and developing AI-driven SaaS products. Implementing LLM features, automation workflows, and modern AI frameworks. Handling product development end-to-end ??? from idea to working prototypes.",
    },
  ];

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 md:py-24 lg:py-32 bg-[#04081A]">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent pointer-events-none" />
      
      {/* Grid background with fade */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(50,50,70,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(50,50,70,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-400/20 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Floating gradient orbs */}
      <div className="absolute top-1/4 left-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

      {/* Content container */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className={`flex flex-col items-center space-y-4 sm:space-y-5 md:space-y-6 mb-12 sm:mb-14 md:mb-16 lg:mb-20 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-2">
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-cyan-400 uppercase">Career Journey</span>
          </div>
          
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-center leading-tight px-4">
              Professional Experience
            </h2>
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-2xl -z-10 rounded-full" />
          </div>

          <p className="text-base sm:text-lg md:text-xl text-gray-400 font-light text-center max-w-3xl px-4 leading-relaxed">
            "Shaped by initiative, real problem-solving, and building products that matter."
          </p>

          <div className="flex justify-center mt-4">
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
          </div>
        </div>

        {/* Experience grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 max-w-7xl mx-auto">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          50% {
            transform: translateY(-100px) translateX(50px);
            opacity: 0.5;
          }
          90% {
            opacity: 0.3;
          }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        .animate-float {
          animation: float 10s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default ExperienceSection;

