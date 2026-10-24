import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const skillCategories = [
  {
    category: "Frontend",
    tag: "UI & Interfaces",
    accent: "#38bdf8",
    skills: [
      { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
      { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
      { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
      { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/E34F26" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "Three.js", icon: "https://cdn.simpleicons.org/threedotjs/AAAAAA" },
    ],
  },
  {
    category: "Backend",
    tag: "Server & APIs",
    accent: "#10b981",
    skills: [
      { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/68A063" },
      { name: "Express", icon: "https://cdn.simpleicons.org/express/CCCCCC" },
      { name: "Python", icon: "https://cdn.simpleicons.org/python/FFD43B" },
      { name: "FastAPI", icon: "https://cdn.simpleicons.org/fastapi/009688" },
      { name: "C++", icon: "https://cdn.simpleicons.org/cplusplus/00599C" },
      { name: "C", icon: "https://cdn.simpleicons.org/c/A8B9CC" },
    ],
  },
  {
    category: "Database",
    tag: "Data & Storage",
    accent: "#818cf8",
    skills: [
      { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
      { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
    ],
  },
  {
    category: "Tools & DevOps",
    tag: "Workflow & Deploy",
    accent: "#f43f5e",
    skills: [
      { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
      { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
      { name: "GitHub", icon: "https://cdn.simpleicons.org/github/CCCCCC" },
      { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/CCCCCC" },
      { name: "Postman", icon: "https://cdn.simpleicons.org/postman/FF6C37" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
    ],
  },
];

interface SkillItem {
  name: string;
  icon: string;
}

const FloatingSkillCard = ({
  skill,
  accent,
  index,
}: {
  skill: SkillItem;
  accent: string;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, isHovered: false });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setTilt({
      rx: (0.5 - y) * 22,
      ry: (x - 0.5) * 22,
      gx: Math.round(x * 100),
      gy: Math.round(y * 100),
      isHovered: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, isHovered: false });
  }, []);

  // Float animation staggered delay based on index
  const floatDelay = `${(index % 6) * 0.45}s`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 25 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: 0.45,
        delay: (index % 6) * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="perspective-1000"
      style={{
        animation: "float-slow 6s ease-in-out infinite",
        animationDelay: floatDelay,
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative group p-4 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer preserve-3d transition-transform duration-200 ease-out"
        style={{
          background: tilt.isHovered
            ? `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 70%)`
            : "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          border: `1px solid ${tilt.isHovered ? `${accent}88` : "rgba(255,255,255,0.08)"}`,
          backdropFilter: "blur(12px)",
          transform: tilt.isHovered
            ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(20px) scale(1.06)`
            : "rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)",
          boxShadow: tilt.isHovered
            ? `0 20px 40px -10px rgba(0,0,0,0.7), 0 0 25px ${accent}44, inset 0 1px 0 rgba(255,255,255,0.2)`
            : "0 10px 25px -5px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Dynamic Specular Shimmer */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, ${accent}33 0%, transparent 60%)`,
          }}
        />

        {/* 3D Elevated Icon */}
        <div
          className="relative z-10 w-10 h-10 flex items-center justify-center rounded-xl p-1.5 transition-transform duration-200"
          style={{
            transform: tilt.isHovered ? "translateZ(30px) scale(1.1)" : "translateZ(0px)",
            filter: tilt.isHovered ? `drop-shadow(0 0 8px ${accent})` : "none",
          }}
        >
          <img
            src={skill.icon}
            alt={skill.name}
            className="w-8 h-8 object-contain transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* 3D Elevated Text */}
        <span
          className="relative z-10 text-sm font-semibold text-white/85 group-hover:text-white transition-colors tracking-wide text-center"
          style={{
            transform: tilt.isHovered ? "translateZ(20px)" : "translateZ(0px)",
          }}
        >
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} id="skills" className="relative py-28 px-6 md:px-16 w-full overflow-hidden">
      <motion.div style={{ y }} className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20 animate-float-subtle"
        >
          <p className="text-sm font-mono tracking-[0.3em] uppercase text-primary mb-3 font-medium">
            TECHNICAL ARSENAL
          </p>
          <h2 className="font-cursive text-5xl md:text-7xl font-bold text-white tracking-wide">
            Skills <span className="gradient-text">Stack</span>
          </h2>
        </motion.div>

        {/* Categories */}
        <div className="flex flex-col gap-16">
          {skillCategories.map((cat, index) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              className="relative p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
            >
              {/* Header */}
              <div className="flex items-end justify-between mb-6">
                <div>
                  <h3 className="text-2xl md:text-4xl font-bold text-white flex items-center gap-2.5">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: cat.accent, boxShadow: `0 0 10px ${cat.accent}` }}
                    />
                    {cat.category}
                  </h3>
                </div>
                <div className="flex-1 mx-6 h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
                <span className="text-sm font-mono text-white/50 bg-white/5 px-3.5 py-1 rounded-full border border-white/5">
                  {cat.skills.length} skills
                </span>
              </div>

              {/* 3D Floating Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {cat.skills.map((skill, sIdx) => (
                  <FloatingSkillCard
                    key={skill.name}
                    skill={skill}
                    accent={cat.accent}
                    index={sIdx}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;