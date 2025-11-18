import { useState, useEffect } from 'react';
import { FaLinkedinIn, FaGithub, FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa';
import HeroImg from '../../assets/images/hero.jpg?url';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 lg:py-32 text-white bg-[#04081A] relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-950/5 to-transparent"></div>
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Two Column Layout */}
        <div className={`grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Left Side - Image */}
          <div className="space-y-6 sm:space-y-8">
            {/* Title above image */}
            <div>
              <div className="inline-block mb-3">
                <span className="text-xs sm:text-sm font-semibold tracking-widest text-blue-400 uppercase">About</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 tracking-tight leading-tight bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Software Engineer | Full-Stack Dev
              </h2>
              <div className="w-20 sm:w-24 h-0.5 sm:h-1 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full"></div>
            </div>
            
            {/* Image with enhanced effects */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500 animate-gradient"></div>
              <div className="relative bg-linear-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-1.5 border border-gray-700/50 group-hover:border-blue-500/30 transition-all duration-500">
                <img
                  src={HeroImg}
                  className="rounded-xl shadow-2xl w-full h-auto object-cover"
                  alt="Zasim Mallik - Software Engineer"
                  width={1207}
                  height={929}
                />
              </div>
            </div>
          </div>

          {/* Right Side - About Content */}
          <div className="space-y-4 sm:space-y-6 lg:pt-0">
            {/* Introduction with enhanced styling */}
            <div className="space-y-4 sm:space-y-5">
              <div className="relative pl-4 border-l-2 border-blue-500/50">
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  Hello, I'm <span className="font-semibold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Zasim Mallik</span> Software Engineer and Full Stack Developer.
                </p>
              </div>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                I build modern, reliable web applications with a focus on clean architecture, performance, and real-world usability. My work blends full-stack development with early AI SaaS development, aiming to create products that solve practical problems and offer lasting value.
              </p>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                I'm a self-taught developer from Bangladesh on an independent path. Right now, I'm sharpening my skills in Next.js, TypeScript, backend engineering, and Python-based AI systems as I work toward my first AI SaaS product.
              </p>
            </div>

            {/* Enhanced Quote Section */}
            <div className="relative mt-6 sm:mt-8 group">
              <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500/20 to-cyan-500/20 rounded-xl sm:rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-linear-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 group-hover:border-blue-500/30 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 transition-all duration-500">
                <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="text-blue-400/40 text-5xl sm:text-6xl md:text-7xl leading-none shrink-0 font-serif select-none">"</div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed pt-1 sm:pt-2">
                    I'm a builder at heart, driven by clarity, discipline, and the commitment to create meaningful technology. Every step I take brings me closer to creating products that make a real impact.
                  </p>
                </div>

                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-700/50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-cyan-500 flex items-center justify-center font-bold text-white text-sm shrink-0">
                    ZM
                  </div>
                  <div>
                    <cite className="block font-semibold text-white not-italic mb-0.5 text-sm sm:text-base">
                    Zasim Mallik, Founder of ILM AI
                    </cite>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Social Media Section */}
            <div className="pt-6 sm:pt-8">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <span className="w-1 h-6 sm:h-7 bg-linear-to-b from-blue-500 to-cyan-500 rounded-full"></span>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white">
                  Connect with me
                </h3>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href="https://www.linkedin.com/in/zasimmallik/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-11 sm:w-13 h-11 sm:h-13 bg-gray-800/80 hover:bg-linear-to-br hover:from-blue-600 hover:to-blue-700 border border-gray-700 hover:border-blue-400 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 group-hover:text-white transition-colors duration-300 relative z-10" />
                </a>
                <a
                  href="https://github.com/zasimmallik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-11 sm:w-13 h-11 sm:h-13 bg-gray-800/80 hover:bg-linear-to-br hover:from-gray-700 hover:to-gray-800 border border-gray-700 hover:border-gray-500 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-500/50"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 group-hover:text-white transition-colors duration-300 relative z-10" />
                </a>
                <a
                  href="https://x.com/zasimmallik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-11 sm:w-13 h-11 sm:h-13 bg-gray-800/80 hover:bg-linear-to-br hover:from-black hover:to-gray-900 border border-gray-700 hover:border-gray-500 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  aria-label="Twitter/X"
                >
                  <FaTwitter className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 group-hover:text-white transition-colors duration-300 relative z-10" />
                </a>
                <a
                  href="https://www.instagram.com/zasimmallik/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-11 sm:w-13 h-11 sm:h-13 bg-gray-800/80 hover:bg-linear-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 border border-gray-700 hover:border-pink-400 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/50"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 group-hover:text-white transition-colors duration-300 relative z-10" />
                </a>
                <a
                  href="https://www.facebook.com/zasimmallik.Z/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-11 sm:w-13 h-11 sm:h-13 bg-gray-800/80 hover:bg-linear-to-br hover:from-blue-700 hover:to-blue-800 border border-gray-700 hover:border-blue-400 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 group-hover:text-white transition-colors duration-300 relative z-10" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </section>
  );
}

