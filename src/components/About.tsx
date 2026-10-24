import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useCallback } from "react";

const stats = [
  { value: "3+", label: "Projects Built" },
  { value: "2+", label: "Years Coding" },
  { value: "5+", label: "Tech Stacks" },
  { value: "∞", label: "Ideas Brewing" },
];

const highlights = [
  {
    tag: "Craft",
    title: "Full Stack Developer",
    desc: "Crafting fast, responsive, pixel-perfect web apps with React, TypeScript, and Tailwind — every interaction considered.",
    col: "col-span-2",
    row: "row-span-1",
    accent: "#38bdf8",
  },
  {
    tag: "Dimension",
    title: "Interactive 3D",
    desc: "Building immersive WebGL experiences with Three.js that blur the line between web and reality.",
    col: "col-span-1",
    row: "row-span-2",
    accent: "#a855f7",
  },
  {
    tag: "Intelligence",
    title: "AI Integration",
    desc: "Weaving AI into beautiful UI/UX — making products smarter without losing the human touch.",
    col: "col-span-1",
    row: "row-span-1",
    accent: "#eab308",
  },
  {
    tag: "Stack",
    title: "Full Stack",
    desc: "From database to deployment — Node, Express, MongoDB, and beyond.",
    col: "col-span-1",
    row: "row-span-1",
    accent: "#10b981",
  },
  {
    tag: "Deploy",
    title: "DevOps & Tools",
    desc: "Git, Docker, Vercel — shipping with confidence and speed.",
    col: "col-span-1",
    row: "row-span-1",
    accent: "#f43f5e",
  },
  {
    tag: "Design",
    title: "UI / UX Sense",
    desc: "Design-aware development — animations, layout, and micro-interactions that delight.",
    col: "col-span-1",
    row: "row-span-1",
    accent: "#06b6d4",
  },
];

const use3DTilt = (strength = 14) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, isHovered: false });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: (0.5 - y) * strength,
      ry: (x - 0.5) * strength,
      gx: Math.round(x * 100),
      gy: Math.round(y * 100),
      isHovered: true,
    });
  }, [strength]);

  const onMouseLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, isHovered: false });
  }, []);

  return { ref, tilt, onMouseMove, onMouseLeave };
};

const StatCard = ({ stat, index }: { stat: (typeof stats)[0]; index: number }) => {
  const { ref, tilt, onMouseMove, onMouseLeave } = use3DTilt(14);
  const floatDelay = `${(index % 4) * 0.5}s`;

  return (
    <div
      className="perspective-1000"
      style={{
        animation: "float-slow 6s ease-in-out infinite",
        animationDelay: floatDelay,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.92 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          ref={ref}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="relative rounded-2xl flex flex-col justify-between p-5 overflow-hidden cursor-default preserve-3d transition-transform duration-200 ease-out"
          style={{
            minHeight: "110px",
            background: tilt.isHovered
              ? `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(56,189,248,0.12) 0%, rgba(255,255,255,0.03) 70%)`
              : "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
            border: `1px solid ${tilt.isHovered ? "rgba(56,189,248,0.4)" : "rgba(255,255,255,0.1)"}`,
            backdropFilter: "blur(14px)",
            transform: tilt.isHovered
              ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(20px) scale(1.04)`
              : "rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)",
            boxShadow: tilt.isHovered
              ? "0 20px 40px -10px rgba(0,0,0,0.8), 0 0 25px rgba(56,189,248,0.25), inset 0 1px 0 rgba(255,255,255,0.2)"
              : "0 10px 30px -5px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Top highlight line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.4), transparent)" }}
          />

          {/* 3D Elevated Value */}
          <span
            className="text-3xl font-extrabold text-white relative z-10 transition-transform duration-200"
            style={{
              transform: tilt.isHovered ? "translateZ(30px)" : "translateZ(0px)",
              textShadow: tilt.isHovered ? "0 0 15px rgba(56,189,248,0.6)" : "none",
            }}
          >
            {stat.value}
          </span>

          <p
            className="text-xs font-mono tracking-widest uppercase relative z-10 text-white/50"
            style={{
              transform: tilt.isHovered ? "translateZ(15px)" : "translateZ(0px)",
            }}
          >
            {stat.label}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const HighlightCard = ({ item, index }: { item: (typeof highlights)[0]; index: number }) => {
  const isTall = item.row === "row-span-2";
  const isWide = item.col === "col-span-2";
  const { ref, tilt, onMouseMove, onMouseLeave } = use3DTilt(12);
  const floatDelay = `${(index % 5) * 0.55}s`;

  return (
    <div
      className={`${item.col} ${item.row} perspective-1000`}
      style={{
        animation: index % 2 === 0 ? "float-slow 7s ease-in-out infinite" : "float-reverse 6.5s ease-in-out infinite",
        animationDelay: floatDelay,
      }}
    >
      <motion.div
        className="h-full"
        initial={{ opacity: 0, y: 32, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          ref={ref}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="relative rounded-2xl overflow-hidden cursor-default h-full preserve-3d transition-all duration-200 ease-out"
          style={{
            minHeight: isTall ? "220px" : "110px",
            background: tilt.isHovered
              ? `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, ${item.accent}18 0%, rgba(255,255,255,0.02) 75%)`
              : "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 100%)",
            border: `1px solid ${tilt.isHovered ? `${item.accent}77` : "rgba(255,255,255,0.1)"}`,
            backdropFilter: "blur(14px)",
            transform: tilt.isHovered
              ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(24px) scale(1.03)`
              : "rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)",
            boxShadow: tilt.isHovered
              ? `0 25px 50px -10px rgba(0,0,0,0.8), 0 0 25px ${item.accent}33, inset 0 1px 0 rgba(255,255,255,0.2)`
              : "0 10px 30px -5px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Dynamic Specular Shimmer */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, ${item.accent}25 0%, transparent 60%)`,
              opacity: tilt.isHovered ? 1 : 0,
              transition: "opacity 0.2s ease-out",
            }}
          />

          <div className="relative z-10 flex flex-col justify-between h-full p-5 preserve-3d">
            <p
              className="text-xs font-mono tracking-[0.2em] uppercase font-semibold"
              style={{
                color: item.accent,
                transform: tilt.isHovered ? "translateZ(15px)" : "translateZ(0px)",
              }}
            >
              {item.tag}
            </p>

            <div className="preserve-3d">
              <h4
                className="font-bold leading-tight mb-2 text-white transition-transform duration-200"
                style={{
                  fontSize: isTall ? "1.3rem" : isWide ? "1.15rem" : "1rem",
                  transform: tilt.isHovered ? "translateZ(25px)" : "translateZ(0px)",
                  textShadow: tilt.isHovered ? `0 0 15px ${item.accent}55` : "none",
                }}
              >
                {item.title}
              </h4>
              {(isTall || isWide) && (
                <p
                  className="text-sm leading-relaxed text-white/50"
                  style={{ transform: tilt.isHovered ? "translateZ(15px)" : "translateZ(0px)" }}
                >
                  {item.desc}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const About = () => {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={ref}
      id="about"
      className="relative w-full py-28 px-6 md:py-36 md:px-16 overflow-hidden"
    >
      <motion.div style={{ y }} className="max-w-4xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-14 text-center md:text-left animate-float-subtle"
        >
          <h2 className="font-cursive text-5xl md:text-7xl font-bold text-white tracking-wide">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        {/* 3D Floating Bio block */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-40px" }}
          className="relative rounded-3xl overflow-hidden p-8 md:p-10 mb-8 backdrop-blur-2xl animate-float-subtle"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 25px 60px -15px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
          <div
            className="absolute top-0 left-0 h-0.5 w-full"
            style={{ background: "linear-gradient(90deg, #38bdf8, #a855f7, transparent)" }}
          />
          <p className="text-lg md:text-xl leading-relaxed mb-5 text-white/70">
            I'm a passionate Full Stack Developer and AI enthusiast with over 3 years of hands-on experience building modern, interactive, and high-performance web applications. I focus on writing clean, maintainable code and creating seamless user experiences that feel intuitive and engaging.
          </p>
          <p className="text-lg md:text-xl leading-relaxed mb-5 text-white/70">
            I enjoy turning complex problems into simple, elegant solutions — whether it's designing scalable backend systems, crafting pixel-perfect user interfaces, or integrating AI-powered features that make products smarter and more efficient. With 3+ projects delivered, I have developed a strong understanding of both frontend and backend development.
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-white/70">
            I'm always exploring new technologies and pushing my limits — from creating immersive Three.js experiences to developing full-stack SaaS applications. I believe great software is built at the intersection of technical excellence and thoughtful design.
          </p>
        </motion.div>

        {/* 3D Floating Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </motion.div>

        {/* Highlights bento */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end justify-between mb-6"
        >
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">Capabilities</h3>
          </div>
          <div className="flex-1 mx-6 h-px bg-white/10" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-auto">
          {highlights.map((item, i) => (
            <HighlightCard key={item.title} item={item} index={i} />
          ))}
        </div>

      </motion.div>
    </section>
  );
};

export default About;
