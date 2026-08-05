import IconCloud from "./ui/icon-cloud";

const slugs = [
  // Languages
  "typescript",
  "javascript",
  "python",
  "html5",
  "css3",
  // Frontend
  "react",
  "nextdotjs",
  "tailwindcss",
  // Backend
  "nodedotjs",
  "express",
  "fastapi",
  // Databases
  "postgresql",
  "mongodb",
  "prisma",
  // AI & LLM
  "openai",
  "langchain",
  // DevOps & Cloud
  "docker",
  "git",
  "github",
  "amazonaws",
  "vercel",
  "railway",
  "render",
  "nginx",
  // Auth & Payments
  "stripe",
  "clerk",
  // Dev Tools
  "visualstudiocode",
  "bun",
  "postman",
  "npm",
  "figma",
];

function IconCloudDemo() {
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg px-4 sm:px-10 lg:px-20 pb-10 sm:pb-20 pt-4 sm:pt-8 bg-transparent">
      <IconCloud iconSlugs={slugs} />
    </div>
  );
}

export default IconCloudDemo;

