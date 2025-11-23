import React, { useState, useEffect, useRef } from "react";
import { Code2, Activity, Cpu, Layers, LucideIcon, Calendar, Building2 } from "lucide-react";

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

  return (
    <div
      ref={cardRef}
      className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        } transition-all duration-1000 ease-out`}
    >
      {/* Timeline Dot */}
      <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-[#020617] z-20 transform -translate-x-1/2 group-hover:scale-150 group-hover:bg-cyan-400 transition-all duration-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.8)]"></div>

      {/* Content Card */}
      <div className="w-full md:w-[calc(50%-30px)] pl-12 md:pl-0">
        <div className="relative p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-blue-500/30 backdrop-blur-xl shadow-lg transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-blue-500/10 overflow-hidden">

          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-cyan-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:via-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>

          {/* Header */}
          <div className="relative z-10 flex flex-col gap-4 mb-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-blue-400 group-hover:text-cyan-300 transition-colors" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-200 group-hover:text-blue-200 transition-colors">
                  {title}
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20">
                <Calendar className="w-3.5 h-3.5" />
                {period}
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-400 text-sm sm:text-base">
              <Building2 className="w-4 h-4 text-slate-500" />
              <span className="font-medium text-slate-300">{company}</span>
            </div>
          </div>

          {/* Description */}
          <p className="relative z-10 text-slate-400 leading-relaxed text-sm sm:text-base border-l-2 border-slate-700 pl-4 group-hover:border-blue-500/50 transition-colors duration-300">
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
      period: "2022 – 2023",
      description:
        "Contributed to building responsive and accessible user interfaces. Improved UI components using HTML, CSS, JavaScript, and front-end design principles. Collaborated within structured workflows and learned practical engineering discipline.",
    },
    {
      icon: Layers,
      title: "Full-Stack Web Developer",
      company: "Independent",
      period: "2024 – Present",
      description:
        "Developing full-stack applications using React, Next.js, Node.js, Express, PostgreSQL, Prisma. Working across front-end, back-end, API design, authentication, and deployment. Building internal projects and prototypes to strengthen real-world problem-solving skills.",
    },
    {
      icon: Cpu,
      title: "Founder & AI SaaS Developer",
      company: "ILM AI",
      period: "2025 – Present",
      description:
        "Designing and developing AI-driven SaaS products. Implementing LLM features, automation workflows, and modern AI frameworks. Handling product development end-to-end — from idea to working prototypes.",
    },
  ];

  return (
    <section id="experience" className="relative py-20 sm:py-32 bg-[#04081A] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-900/5 via-[#020617] to-[#020617]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <Activity className="w-4 h-4" />
            <span>Career Journey</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Experience</span>
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed">
            &quot;Shaped by initiative, real problem-solving, and building products that matter.&quot;
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0 transform md:-translate-x-1/2"></div>

          {/* Experience Cards */}
          <div className="space-y-12 md:space-y-20">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} {...exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

