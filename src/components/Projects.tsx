import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useRef } from "react";


const projects = [
  {
    title: "AyurSutra Panchakarma, The Patient Management System",
    description:
      "A modern wellness platform designed for Ayurvedic Panchakarma treatments. It allows users to explore therapies, book consultations, and learn about traditional healing methods. Built with a clean UI and smooth navigation for better user experience. Focused on bridging ancient Ayurveda with modern digital accessibility.",
    tags: ["React", "Tailwind", "UI/UX"],
    github: "#",
    live: "#",
    color: "#61DAFB",
  },
  {
    title: "Gym Website",
    description:
      "A fully responsive fitness website designed for gyms and trainers. It includes sections like membership plans, trainer profiles, and workout programs. The UI is optimized for engagement with smooth animations and bold design. Built to provide a strong digital presence for fitness businesses.",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Dipendrakushwaha9098/gym-website.git", 
    live: "https://gym-website-swart-three.vercel.app",
    color: "#F05032",
  },
  {
    title: "SkillPilot AI",
    description:
      "An AI-powered platform that generates personalized learning roadmaps for users. It analyzes user goals and provides structured skill paths with recommendations. Built with modern frontend tools and integrated AI APIs. Designed to help learners stay focused and achieve career goals efficiently.",
    tags: ["React", "Node.js", "AI"],
    github: "https://github.com/Dipendrakushwaha9098/SkillPilot-ai.git",
    live: "#",
    status: "in-progress",
    color: "#FFD43B",
  },
];

type Project = (typeof projects)[0];

const ProjectCard = ({ 
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
 
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        opacity,
        position: "sticky",
        top: `${60 + index * 24}px`,
        zIndex: index + 1,
        border: `1px solid ${project.color}33`,
      }}
      className="group relative p-10 rounded-3xl bg-card/60 backdrop-blur-xl transition-all duration-500 overflow-hidden"
      whileHover={{ scale: 1.02 }}
    >
      {/* Top Accent */}
      <div
        className="absolute top-0 left-0 h-0.5 w-full"
        style={{
          background: `linear-gradient(90deg, ${project.color}, transparent)`,
        }}
      />

      {/* Hover Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 rounded-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at 20% 50%, ${project.color}12 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 flex flex-col gap-6">

        {/* Index + Status */}
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-mono"
            style={{ color: `${project.color}88` }}
          >
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>

          {project.status === "in-progress" && (
            <motion.span
              className="px-3 py-1 text-xs rounded-full flex items-center gap-1.5"
              style={{
                background: "#2a220088",
                border: "1px solid #FFD43B44",
                color: "#FFD43B",
              }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: "#FFD43B",
                  boxShadow: "0 0 6px #FFD43B",
                }}
              />
              In Progress
            </motion.span>
          )}
        </div>

        {/* Title */}
        <h3
          className="text-3xl md:text-4xl font-bold transition-colors duration-300"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLHeadingElement).style.color =
              project.color;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLHeadingElement).style.color = "inherit";
          }}
        >
          {project.title}
        </h3>

        {/* Divider */}
        <div
          className="w-full h-px"
          style={{
            background: `linear-gradient(90deg, ${project.color}44, transparent)`,
          }}
        />

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed text-lg">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-3">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-4 py-1 text-sm rounded-full"
              style={{
                background: `${project.color}15`,
                border: `1px solid ${project.color}33`,
                color: project.color,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-2">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
            style={{
              background: `${project.color}18`,
              border: `1px solid ${project.color}44`,
              color: project.color,
            }}
          >
            <Github size={18} />
            Code
          </a>

          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            <ExternalLink size={18} />
            Live
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative w-full py-24 px-6 flex justify-center overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/10 blur-[100px] rounded-full" />

      <div className="max-w-5xl w-full relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-28 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        {/* Stacked Cards */}
        <div className="flex flex-col gap-6 pb-32">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              total={projects.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
