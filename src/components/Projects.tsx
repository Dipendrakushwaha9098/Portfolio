import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "AyurSutra Panchakarma, The Patient Management System",
    description:
      "A modern wellness platform designed for Ayurvedic Panchakarma treatments. It allows users to explore therapies, book consultations, and learn about traditional healing methods.",
    tags: ["React", "Tailwind", "UI/UX"],
    github: "#",
    live: "#",
    color: "#4CAF50",
  },
  {
    title: "AI Resume Analyzer",
    description:
      "A fully responsive fitness website designed for gyms and trainers with modern UI and smooth animations.",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "#",
    live: "#",
    color: "#F05032",
  },
  {
    title: "SkillPilot AI",
    description:
      "Generates personalized learning roadmaps using AI to help users achieve career goals efficiently.",
    tags: ["React", "Node.js", "AI"],
    github: "https://github.com/Dipendrakushwaha9098/SkillPilot-ai.git",
    live: "#",
    color: "#FFD43B",
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
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        scale,
        opacity,
        transformOrigin: "top center",
        transformStyle: "preserve-3d",
        zIndex: 10 - index,
      }}
      className="h-screen sticky top-0 flex items-center justify-center px-6"
    >
      {/* CARD */}
      <motion.div
        whileHover={{
          scale: 1.02,
          boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 25px ${project.color}`,
        }}
        transition={{ duration: 0.3 }}
        className="relative max-w-4xl w-full p-10 rounded-3xl"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: `1px solid ${project.color}`,
          backdropFilter: "blur(8px)",
        }}
      >
        {/* CONTENT */}
        <div className="relative z-10">
          {/* Title */}
          <h2
            className="text-4xl md:text-5xl mb-6"
            style={{ color: project.color }}
          >
            {project.title}
          </h2>

          {/* Description */}
          <p className="text-lg text-white/80 mb-6">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-6">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-4 py-1 rounded-full text-sm"
                style={{
                  background: `${project.color}30`,
                  border: `1px solid ${project.color}`,
                  color: project.color,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <a
              href={project.github}
              target="_blank"
              className="flex items-center gap-2 px-5 py-2 rounded-full transition"
              style={{
                border: `1px solid ${project.color}`,
                color: project.color,
              }}
            >
              <Github size={18} />
              Code
            </a>

            <a
              href={project.live}
              target="_blank"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            >
              <ExternalLink size={18} />
              Live
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" style={{ perspective: "1400px" }}>
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} index={index} />
      ))}
    </section>
  );
};

export default Projects;
