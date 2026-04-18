import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const skillCategories = [
  {
    category: "Frontend",
    tag: "01 / UI & Interfaces",
    skills: [
      { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
      { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
      { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
      { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/E34F26" },
      { name: "CSS3", icon: "https://cdn.simpleicons.org/css3/1572B6" },
      { name: "Three.js", icon: "https://cdn.simpleicons.org/threedotjs/AAAAAA" },
    ],
  },
  {
    category: "Backend",
    tag: "02 / Server & APIs",
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
    tag: "03 / Data & Storage",
    skills: [
      { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
      { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
    ],
  },
  {
    category: "Tools & DevOps",
    tag: "04 / Workflow & Deploy",
    skills: [
      { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
      { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
      { name: "GitHub", icon: "https://cdn.simpleicons.org/github/CCCCCC" },
      { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/CCCCCC" },
      { name: "Postman", icon: "https://cdn.simpleicons.org/postman/FF6C37" },
      { name: "VS Code", icon: "https://cdn.simpleicons.org/visualstudiocode/007ACC" },
    ],
  },
];

const Skills = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      ref={ref}
      id="skills"
      className="relative py-24 px-6 md:px-16"
    >
      <motion.div style={{ y }} className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl text-white">
            Skills <span className="gradient-text">Stack</span>
          </h2>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-16">
          {skillCategories.map((cat, index) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              {/* Header */}
              <div className="flex items-end justify-between mb-5">
                <div>
                  <p className="text-xs text-white/30 mb-1">
                    {cat.tag}
                  </p>
                  <h3 className="text-2xl md:text-3xl text-white">
                    {cat.category}
                  </h3>
                </div>
                <div className="flex-1 mx-6 h-px bg-white/10" />
                <span className="text-xs text-white/30">
                  {cat.skills.length} skills
                </span>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center gap-2 hover:scale-105 transition"
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-8 h-8"
                    />
                    <span className="text-xs text-white/70">
                      {skill.name}
                    </span>
                  </div>
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