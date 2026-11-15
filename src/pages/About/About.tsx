import { useState, useEffect, useRef } from 'react';
import { FaLinkedinIn, FaGithub, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import HeroImg from '../../assets/images/Main image.jpg?url';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-triggered animation via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 sm:py-28 md:py-32 lg:py-40 text-slate-900 dark:text-white bg-[#ECEEF2] dark:bg-[#050507] relative overflow-hidden transition-colors duration-150"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-[6fr_7fr] gap-12 lg:gap-20 items-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

          {/* Left Side - Image */}
          <div className="relative group order-2 lg:order-1 max-w-md mx-auto lg:max-w-none w-full">
            <div className="relative z-10">
              <div className="relative rounded-2xl overflow-hidden border border-[#D6DAE2] dark:border-[#22242D] bg-white dark:bg-[#13141A] shadow-xl dark:shadow-2xl transition-all duration-200">
                <img
                  src={HeroImg}
                  className="w-full h-auto object-cover"
                  alt="Zasim Mallik"
                  width={800}
                  height={1000}
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8 sm:space-y-10 order-1 lg:order-2 w-full">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#13141A] dark:bg-[#ECEEF2] border border-[#22242D] dark:border-[#D6DAE2] text-[#ECEEF2] dark:text-[#090A0C] text-xs font-semibold tracking-wider uppercase font-mono shadow-sm transition-all duration-200">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-600 animate-pulse shrink-0"></span>
                About Me
              </div>

              <h2 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-950 dark:text-white leading-tight">
                <span className="block sm:whitespace-nowrap">Software Engineer | Founder</span>
                <span className="block text-slate-600 dark:text-slate-400 font-normal">of Zeraql &amp; Rizmiq</span>
              </h2>

              <div className="space-y-6 text-base sm:text-lg text-slate-700 dark:text-slate-400 leading-relaxed">
                <p>
                  Hey! I&apos;m <span className="text-slate-950 dark:text-slate-200 font-semibold">Zasim Mallik</span>, a self-taught developer from Bangladesh. I got into programming out of curiosity, and what started with basic web pages eventually grew into building full products that people actually use.
                </p>
                <p>
                  Right now, I&apos;m focused on <span className="text-slate-950 dark:text-white font-semibold">Zeraql</span> and <span className="text-slate-950 dark:text-white font-semibold">Rizmiq</span> — two AI-powered SaaS platforms I&apos;m developing end to end. My stack revolves around <span className="text-slate-900 dark:text-slate-200 font-medium">Next.js</span>, <span className="text-slate-900 dark:text-slate-200 font-medium">TypeScript</span>, and <span className="text-slate-900 dark:text-slate-200 font-medium">Python</span>, and I genuinely enjoy the challenge of making complex systems feel simple for users.
                </p>
                <p>
                  I learn best by building. Every project, every bug, every late-night debugging session has taught me something no textbook could. That hands-on approach is what drives everything I do.
                </p>
              </div>
            </div>

            {/* Quote / Philosophy */}
            <div className="relative p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#13141A] border border-[#D6DAE2] dark:border-[#22242D] shadow-xs transition-all duration-200">
              {/* Left accent stripe */}
              <div className="absolute left-0 top-5 bottom-5 w-[3px] rounded-full bg-blue-600 dark:bg-blue-400" />
              {/* Large decorative quote mark */}
              <div className="absolute top-2 right-4 text-6xl font-serif text-slate-200 dark:text-[#22242D] leading-none select-none">&ldquo;</div>
              <blockquote className="relative z-10 pl-4">
                <p className="text-sm sm:text-base font-normal text-slate-800 dark:text-slate-300 leading-relaxed tracking-wide mb-3">
                  &ldquo;Time is the most precious resource in human life. We build software to save it and make things work faster, easing daily tasks and making the world a better place.&rdquo;
                </p>
                <footer className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs flex items-center justify-center shrink-0 ring-2 ring-blue-500/20 shadow-xs">
                    ZM
                  </div>
                  <div>
                    <div className="text-slate-950 dark:text-slate-100 font-semibold text-xs sm:text-sm tracking-wide">Zasim Mallik</div>
                    <div className="text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs font-semibold tracking-wider uppercase font-mono">Software Engineer &amp; Founder</div>
                  </div>
                </footer>
              </blockquote>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-2">
              {[
                { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/zasimmallik/", label: "LinkedIn" },
                { icon: FaGithub, href: "https://github.com/zasimmallik", label: "GitHub" },
                { icon: FaXTwitter, href: "https://x.com/zasimmallik", label: "X" },
                { icon: FaInstagram, href: "https://www.instagram.com/zasimmallik/", label: "Instagram" },
                { icon: FaFacebookF, href: "https://www.facebook.com/zasimmallik.Z/", label: "Facebook" }
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-white dark:bg-[#13141A] border border-[#D6DAE2] dark:border-[#22242D] flex items-center justify-center text-slate-600 dark:text-[#A1A1AA] hover:text-slate-950 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500 hover:-translate-y-0.5 transition-all duration-150 shadow-xs"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
