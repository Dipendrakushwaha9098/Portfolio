import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const skillCategories = [ 
  {
    category: "Frontend",
    tag: "01 / UI & Interfaces",
    bento: [
      { name: "React",      icon: "https://cdn.simpleicons.org/react/61DAFB",      col: "col-span-2", row: "row-span-1", accent: "#61DAFB", bg: "#0d2a33" },
      { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/FFFFFF",  col: "col-span-1", row: "row-span-2", accent: "#3178C6", bg: "#162840" },
      { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E",  col: "col-span-1", row: "row-span-1", accent: "#F7DF1E", bg: "#2a2600" },
      { name: "Tailwind",   icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4", col: "col-span-1", row: "row-span-1", accent: "#06B6D4", bg: "#051e22" },
      { name: "HTML5",      icon: "https://cdn.simpleicons.org/html5/E34F26",       col: "col-span-1", row: "row-span-1", accent: "#E34F26", bg: "#2c0f06" },
      { name: "CSS3",       icon: "https://cdn.simpleicons.org/css3/1572B6",        col: "col-span-1", row: "row-span-1", accent: "#1572B6", bg: "#071828" },
      { name: "Three.js",   icon: "https://cdn.simpleicons.org/threedotjs/FFFFFF",  col: "col-span-1", row: "row-span-1", accent: "#FFFFFF", bg: "#1a1a1a" },
    ],
  },
  {
    category: "Backend",
    tag: "02 / Server & APIs",
    bento: [
      { name: "Node.js",  icon: "https://cdn.simpleicons.org/nodedotjs/68A063",  col: "col-span-2", row: "row-span-1", accent: "#68A063", bg: "#0d1f0c" },
      { name: "Express",  icon: "https://cdn.simpleicons.org/express/FFFFFF",    col: "col-span-1", row: "row-span-2", accent: "#CCCCCC", bg: "#181818" },
      { name: "Python",   icon: "https://cdn.simpleicons.org/python/FFD43B",     col: "col-span-1", row: "row-span-1", accent: "#FFD43B", bg: "#2a2200" },
      { name: "REST API", icon: "https://cdn.simpleicons.org/fastapi/009688",    col: "col-span-1", row: "row-span-1", accent: "#009688", bg: "#01110f" },
      { name: "C++",      icon: "https://cdn.simpleicons.org/cplusplus/00599C",  col: "col-span-1", row: "row-span-1", accent: "#00599C", bg: "#001525" },
      { name: "C",        icon: "https://cdn.simpleicons.org/c/A8B9CC",          col: "col-span-1", row: "row-span-1", accent: "#A8B9CC", bg: "#181e22" },
    ],
  },
  {
    category: "Database",
    tag: "03 / Data & Storage",
    bento: [
      { name: "MongoDB",    icon: "https://cdn.simpleicons.org/mongodb/47A248",    col: "col-span-2", row: "row-span-1", accent: "#47A248", bg: "#081a08" },
      { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1", col: "col-span-1", row: "row-span-2", accent: "#4169E1", bg: "#0c1230" },
      { name: "MySQL",      icon: "https://cdn.simpleicons.org/mysql/4479A1",      col: "col-span-1", row: "row-span-1", accent: "#4479A1", bg: "#091520" },
      { name: "Redis",      icon: "https://cdn.simpleicons.org/redis/FF4438",      col: "col-span-1", row: "row-span-1", accent: "#FF4438", bg: "#2a0804" },
      { name: "Prisma",     icon: "https://cdn.simpleicons.org/prisma/FFFFFF",     col: "col-span-1", row: "row-span-1", accent: "#CCCCCC", bg: "#111111" },
    ],
  },
  {
    category: "Tools & DevOps",
    tag: "04 / Workflow & Deploy",
    bento: [
      { name: "Git",     icon: "https://cdn.simpleicons.org/git/F05032",     col: "col-span-2", row: "row-span-1", accent: "#F05032", bg: "#2e0e08" },
      { name: "Docker",  icon: "https://cdn.simpleicons.org/docker/2496ED",  col: "col-span-1", row: "row-span-2", accent: "#2496ED", bg: "#071828" },
      { name: "GitHub",  icon: "https://cdn.simpleicons.org/github/FFFFFF",  col: "col-span-1", row: "row-span-1", accent: "#FFFFFF", bg: "#111111" },
      { name: "Vercel",  icon: "https://cdn.simpleicons.org/vercel/FFFFFF",  col: "col-span-1", row: "row-span-1", accent: "#FFFFFF", bg: "#0a0a0a" },
      { name: "Postman", icon: "https://cdn.simpleicons.org/postman/FF6C37", col: "col-span-1", row: "row-span-1", accent: "#FF6C37", bg: "#2a1508" },
      { name: "VS Code", icon: "https://cdn.simpleicons.org/visualstudiocode/007ACC", col: "col-span-1", row: "row-span-1", accent: "#007ACC", bg: "#021520" },
    ],
  },
]; 


const BentoCard = ({
  skill,
  index,
}: {
  skill: (typeof skillCategories)[0]["bento"][0];
  index: number;
}) => {
  const isTall = skill.row === "row-span-2";
  const isWide = skill.col === "col-span-2";

  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ scale: 1.04, zIndex: 10 }}
      className={`${skill.col} ${skill.row} relative rounded-2xl overflow-hidden cursor-default group`}
      style={{
        background: skill.bg,
        border: `1px solid ${skill.accent}22`,
        minHeight: isTall ? "220px" : "105px",
      }}
    > 
      {/* Radial glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 30% 40%, ${skill.accent}30 0%, transparent 65%)`,
        }}
      />

      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 h-0.5 w-full opacity-70"
        style={{ background: `linear-gradient(90deg, ${skill.accent}, transparent)` }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-5">
        {/* Icon box */}
        <div
          className="flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
          style={{
            width: isTall ? 56 : 44,
            height: isTall ? 56 : 44,
            background: `${skill.accent}18`,
            border: `1px solid ${skill.accent}30`,
          }}
        > 
          <img
            src={skill.icon}
            alt={skill.name}
            style={{
              width: isTall ? 32 : 26,
              height: isTall ? 32 : 26,
              objectFit: "contain",
              filter: `drop-shadow(0 0 6px ${skill.accent}88)`,
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        
        {/* Name + dots */}
        <div>
          <p
            className="font-bold tracking-tight leading-none"
            style={{
              fontSize: isTall ? "1.25rem" : isWide ? "1.1rem" : "0.95rem",
              color: skill.accent,
            }}
          >
            {skill.name}
          </p>
          <div className="flex gap-1 mt-1.5">
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                className="rounded-full"
                style={{
                  width: 4,
                  height: 4,
                  background: i === 0 ? skill.accent : `${skill.accent}40`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};


const Skills = () => {
  return (
    <section id="skills" className="relative py-24 px-6 md:px-16">

      {/* Section Heading */}
      <div className="text-center mb-20">
        <h2 className="text-5xl md:text-7xl font-bold">
          Skills <span className="gradient-text">Stack</span>
        </h2>
      </div>

      {/* Category Blocks */}
      <div className="max-w-4xl mx-auto flex flex-col gap-16">
        {skillCategories.map((cat, ci) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: ci * 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Category Header */}
            <div className="flex items-end justify-between mb-5">
              <div>
                <p
                  className="text-xs font-mono tracking-[0.25em] uppercase mb-1"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  {cat.tag}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  {cat.category}
                </h3>
              </div>
              {/* Divider line */}
              <div
                className="flex-1 mx-6 h-px"
                style={{ background: "rgba(255,255,255,0.07)" }}
              />
              <span
                className="text-xs font-mono"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                {cat.bento.length} skills
              </span>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-4 gap-3 auto-rows-[110px]">
              {cat.bento.map((skill, si) => (
                <BentoCard key={skill.name} skill={skill} index={si} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
