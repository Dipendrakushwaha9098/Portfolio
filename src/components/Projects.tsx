import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { ExternalLink, Github, Sparkles } from "lucide-react";

const projects = [
  {
    title: "CareConnect, Patient Management",
    tagline: "Healthcare & Ayurvedic Wellness Platform",
    description:
      "A modern wellness platform designed for Ayurvedic Panchakarma treatments. It allows users to explore therapies, book consultations, and learn about traditional healing methods.",
    tags: ["React", "Tailwind CSS", "UI/UX", "Node.js"],
    github: "https://github.com/Dipendrakushwaha9098",
    live: "#",
    color: "#38bdf8",
  },
  {
    title: "AI Resume Analyzer",
    tagline: "Intelligent Career Assessment Suite",
    description:
      "A high-performance AI resume parsing and matching system with real-time scoring, ATS optimization feedback, and automated skill-gap analysis.",
    tags: ["React", "Python", "FastAPI", "OpenAI"],
    github: "https://github.com/Dipendrakushwaha9098",
    live: "#",
    color: "#f43f5e",
  },
  {
    title: "SkillPilot AI",
    tagline: "Adaptive Personalized Learning Roadmaps",
    description:
      "Generates interactive personalized learning roadmaps using AI models to help aspiring developers achieve their target career goals step-by-step.",
    tags: ["React", "TypeScript", "Node.js", "AI Models"],
    github: "https://github.com/Dipendrakushwaha9098/SkillPilot-ai.git",
    live: "#",
    color: "#eab308",
  },
];

type Project = (typeof projects)[0];

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, isHovered: false });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0.8, 1]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setTilt({
      rx: (0.5 - y) * 14,
      ry: (x - 0.5) * 14,
      gx: Math.round(x * 100),
      gy: Math.round(y * 100),
      isHovered: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, isHovered: false });
  }, []);

  return (
    <motion.div
      ref={containerRef}
      style={{
        rotateX,
        scale,
        opacity,
        transformOrigin: "top center",
        transformStyle: "preserve-3d",
        zIndex: 10 - index,
      }}
      className="min-h-screen sticky top-0 flex items-center justify-center px-6 py-12"
    >
      {/* 3D FLOATING CARD */}
      <div
        className="w-full max-w-4xl perspective-1200"
        style={{
          animation: "float-slow 7s ease-in-out infinite",
          animationDelay: `${index * 0.8}s`,
        }}
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full p-8 md:p-12 rounded-3xl preserve-3d cursor-default transition-all duration-300 ease-out overflow-hidden"
          style={{
            background: tilt.isHovered
              ? `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.08) 0%, rgba(15,23,42,0.7) 100%)`
              : "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(10,15,30,0.8) 100%)",
            border: `1px solid ${tilt.isHovered ? `${project.color}99` : "rgba(255,255,255,0.12)"}`,
            backdropFilter: "blur(20px)",
            transform: tilt.isHovered
              ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(30px) scale(1.02)`
              : "rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)",
            boxShadow: tilt.isHovered
              ? `0 35px 70px -15px rgba(0,0,0,0.8), 0 0 40px ${project.color}35, inset 0 1px 0 rgba(255,255,255,0.2)`
              : `0 20px 50px -10px rgba(0,0,0,0.6), 0 0 20px ${project.color}15, inset 0 1px 0 rgba(255,255,255,0.08)`,
          }}
        >
          {/* Ambient 3D Glow Orb behind card */}
          <div
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-[90px] opacity-25 pointer-events-none transition-opacity duration-500"
            style={{ backgroundColor: project.color }}
          />

          {/* Dynamic Specular Shimmer */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, ${project.color}25 0%, transparent 65%)`,
            }}
          />

          {/* CARD CONTENT WITH 3D DEPTH LAYERS */}
          <div className="relative z-10 preserve-3d">
            {/* Tagline */}
            <div
              className="flex items-center gap-2 mb-3"
              style={{ transform: tilt.isHovered ? "translateZ(20px)" : "translateZ(0px)" }}
            >
              <Sparkles size={18} style={{ color: project.color }} />
              <span
                className="text-sm font-mono tracking-widest uppercase font-semibold"
                style={{ color: project.color }}
              >
                {project.tagline}
              </span>
            </div>

            {/* Title */}
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-5 tracking-tight"
              style={{
                color: "#ffffff",
                transform: tilt.isHovered ? "translateZ(35px)" : "translateZ(0px)",
                textShadow: tilt.isHovered ? `0 0 25px ${project.color}66` : "none",
              }}
            >
              {project.title}
            </h2>

            {/* Description */}
            <p
              className="text-lg md:text-xl text-white/75 mb-8 leading-relaxed max-w-2xl"
              style={{ transform: tilt.isHovered ? "translateZ(25px)" : "translateZ(0px)" }}
            >
              {project.description}
            </p>

            {/* Tags */}
            <div
              className="flex flex-wrap gap-2.5 mb-8"
              style={{ transform: tilt.isHovered ? "translateZ(30px)" : "translateZ(0px)" }}
            >
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full text-sm font-mono font-medium transition-all duration-300"
                  style={{
                    background: `${project.color}18`,
                    border: `1px solid ${project.color}55`,
                    color: project.color,
                    boxShadow: tilt.isHovered ? `0 0 12px ${project.color}22` : "none",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div
              className="flex flex-wrap gap-4"
              style={{ transform: tilt.isHovered ? "translateZ(40px)" : "translateZ(0px)" }}
            >
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 px-7 py-3 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105"
                style={{
                  background: `${project.color}22`,
                  border: `1px solid ${project.color}`,
                  color: "#ffffff",
                  boxShadow: `0 0 15px ${project.color}33`,
                }}
              >
                <Github size={18} />
                Source Code
              </a>

              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 px-7 py-3 rounded-full bg-white/10 text-white font-semibold text-base hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/15"
              >
                <ExternalLink size={18} />
                Live Demo
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="relative w-full" style={{ perspective: "1400px" }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center pt-24 pb-8 relative z-10 animate-float-subtle"
      >
        <p className="text-sm font-mono tracking-[0.3em] uppercase text-primary mb-3">
          FEATURED WORK
        </p>
        <h2 className="font-cursive text-5xl md:text-7xl font-bold text-white tracking-wide">
          Selected <span className="gradient-text">Projects</span>
        </h2>
      </motion.div>

      <div className="relative">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
