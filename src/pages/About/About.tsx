import { useState, useEffect } from 'react';
import { FaLinkedinIn, FaGithub, FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa';
import HeroImg from '../../assets/images/hero.jpg?url';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="about" className="py-20 sm:py-28 md:py-32 lg:py-40 text-white bg-[#04081A] relative overflow-hidden">
      {/* Enhanced background effects - More subtle and premium */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-900/5 via-[#020617] to-[#020617]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`grid lg:grid-cols-12 gap-12 lg:gap-20 items-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

          {/* Left Side - Image (5 columns) */}
          <div className="lg:col-span-5 relative group order-2 lg:order-1">
            <div className="relative z-10">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-700"></div>
              <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-slate-900/50 backdrop-blur-sm shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src={HeroImg}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-all duration-700"
                  alt="Zasim Mallik"
                  width={800}
                  height={1000}
                  loading="lazy"
                />
              </div>
            </div>

            {/* Decorative elements behind image */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-blue-500/10 rounded-full blur-[1px] animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute -top-10 -right-10 w-24 h-24 border border-cyan-500/10 rounded-full blur-[1px] animate-[spin_8s_linear_infinite_reverse]"></div>
          </div>

          {/* Right Side - Content (7 columns) */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-10 order-1 lg:order-2">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/10 text-blue-400 text-xs sm:text-sm font-medium tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                About Me
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Software Engineer |<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"> Full Stack Developer </span>
              </h2>

              <div className="space-y-6 text-base sm:text-lg text-slate-400 leading-relaxed">
                <p>
                  Hello! I&apos;m <span className="text-slate-200 font-semibold">Zasim Mallik</span>, a Software Engineer and Full Stack Developer based in Bangladesh. My journey in tech is driven by a relentless curiosity and a desire to build tools that matter.
                </p>
                <p>
                  I specialize in building robust, scalable web applications using modern technologies like <span className="text-blue-300">Next.js</span>, <span className="text-blue-300">TypeScript</span>, and <span className="text-blue-300">Python</span>. Beyond code, I&apos;m exploring the frontiers of AI to create smarter, more intuitive SaaS solutions.
                </p>
                <p>
                  Self-taught and independent, I value clarity, efficiency, and continuous learning. Every project is an opportunity to push boundaries and deliver excellence.
                </p>
              </div>
            </div>

            {/* Quote / Philosophy */}
            <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 backdrop-blur-md overflow-hidden group hover:border-blue-500/20 transition-colors duration-500">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <svg className="w-16 h-16 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" /></svg>
              </div>
              <blockquote className="relative z-10">
                <p className="text-lg sm:text-xl font-medium text-slate-300 italic mb-4">
                  &quot;I&apos;m a builder at heart, driven by clarity, discipline, and the commitment to create meaningful technology.&quot;
                </p>
                <footer className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20">
                    ZM
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Zasim Mallik</div>
                    <div className="text-blue-400 text-xs">Founder, ILM AI</div>
                  </div>
                </footer>
              </blockquote>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 pt-2">
              {[
                { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/zasimmallik/", label: "LinkedIn", color: "hover:bg-[#0077b5]" },
                { icon: FaGithub, href: "https://github.com/zasimmallik", label: "GitHub", color: "hover:bg-[#333]" },
                { icon: FaTwitter, href: "https://x.com/zasimmallik", label: "Twitter", color: "hover:bg-[#1da1f2]" },
                { icon: FaInstagram, href: "https://www.instagram.com/zasimmallik/", label: "Instagram", color: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-orange-500" },
                { icon: FaFacebookF, href: "https://www.facebook.com/zasimmallik.Z/", label: "Facebook", color: "hover:bg-[#1877f2]" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 transition-all duration-300 hover:text-white hover:scale-110 hover:-translate-y-1 hover:shadow-lg ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

