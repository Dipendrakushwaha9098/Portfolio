import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "3+", label: "Projects Built", accent: "#61DAFB", bg: "#0d2a33" },
  { value: "2+", label: "Years Coding", accent: "#FFD43B", bg: "#2a2200" },
  { value: "5+", label: "Tech Stacks", accent: "#47A248", bg: "#081a08" },
  { value: "∞", label: "Ideas Brewing", accent: "#F05032", bg: "#2e0e08" },
];

const highlights = [
  {
    tag: "01 / Craft",
    title: "Frontend Engineering",
    desc: "Crafting fast, responsive, pixel-perfect web apps with React, TypeScript, and Tailwind — every interaction considered.",
    accent: "#61DAFB",
    bg: "#0d2a33",
    col: "col-span-2",
    row: "row-span-1",
  },
  {
    tag: "02 / Dimension",
    title: "Interactive 3D",
    desc: "Building immersive WebGL experiences with Three.js that blur the line between web and reality.",
    accent: "#FFFFFF",
    bg: "#1a1a1a",
    col: "col-span-1",
    row: "row-span-2",
  },
  {
    tag: "03 / Intelligence",
    title: "AI Integration",
    desc: "Weaving AI into beautiful UI/UX — making products smarter without losing the human touch.",
    accent: "#FFD43B",
    bg: "#2a2200",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    tag: "04 / Stack",
    title: "Full Stack",
    desc: "From database to deployment — Node, Express, MongoDB, and beyond.",
    accent: "#68A063",
    bg: "#0d1f0c",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    tag: "05 / Deploy",
    title: "DevOps & Tools",
    desc: "Git, Docker, Vercel — shipping with confidence and speed.",
    accent: "#2496ED",
    bg: "#071828",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    tag: "06 / Design",
    title: "UI / UX Sense",
    desc: "Design-aware development — animations, layout, and micro-interactions that delight.",
    accent: "#F05032",
    bg: "#2e0e08",
    col: "col-span-1",
    row: "row-span-1",
  },
];

const StatCard = ({
  stat,
  index,
}: {
  stat: (typeof stats)[0];
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.07, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    whileHover={{ scale: 1.05, zIndex: 10 }}
    className="relative rounded-2xl overflow-hidden cursor-default group flex flex-col justify-between p-5"
    style={{
      background: stat.bg,
      border: `1px solid ${stat.accent}22`,
      minHeight: "110px",
    }}
  >
    <div
      className="absolute top-0 left-0 h-0.5 w-full opacity-70"
      style={{ background: `linear-gradient(90deg, ${stat.accent}, transparent)` }}
    />
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{
        background: `radial-gradient(circle at 30% 40%, ${stat.accent}30 0%, transparent 65%)`,
      }}
    />
    <span className="text-3xl font-bold relative z-10" style={{ color: stat.accent }}>
      {stat.value}
    </span>
    <div className="relative z-10">
      <p className="text-sm font-mono tracking-widest uppercase" style={{ color: `${stat.accent}88` }}>
        {stat.label}
      </p>
      <div className="flex gap-1 mt-1.5">
        {[...Array(3)].map((_, i) => (
          <span
            key={i}
            className="rounded-full"
            style={{ width: 4, height: 4, background: i === 0 ? stat.accent : `${stat.accent}40` }}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

const HighlightCard = ({
  item,
  index,
}: {
  item: (typeof highlights)[0];
  index: number;
}) => {
  const isTall = item.row === "row-span-2";
  const isWide = item.col === "col-span-2";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ scale: 1.03, zIndex: 10 }}
      className={`${item.col} ${item.row} relative rounded-2xl overflow-hidden cursor-default group`}
      style={{
        background: item.bg,
        border: `1px solid ${item.accent}22`,
        minHeight: isTall ? "220px" : "105px",
      }}
    >
      <div
        className="absolute top-0 left-0 h-0.5 w-full opacity-70"
        style={{ background: `linear-gradient(90deg, ${item.accent}, transparent)` }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 30% 40%, ${item.accent}28 0%, transparent 65%)`,
        }}
      />
      <div className="relative z-10 flex flex-col justify-between h-full p-5">
        <p className="text-xs font-mono tracking-[0.2em] uppercase" style={{ color: `${item.accent}55` }}>
          {item.tag}
        </p>
        <div>
          <h4
            className="font-bold leading-tight mb-2"
            style={{ fontSize: isTall ? "1.3rem" : isWide ? "1.1rem" : "1rem", color: item.accent }}
          >
            {item.title}
          </h4>
          {(isTall || isWide) && (
            <p className="text-sm leading-relaxed" style={{ color: `${item.accent}70` }}>
              {item.desc}
            </p>
          )}
          <div className="flex gap-1 mt-3">
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                className="rounded-full"
                style={{ width: 4, height: 4, background: i === 0 ? item.accent : `${item.accent}40` }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const About = () => {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={ref}
      id="about"
      className="relative w-full py-24 px-6 md:py-32 md:px-16 overflow-hidden"
    >
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div style={{ y }} className="max-w-4xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p
            className="text-xs font-mono tracking-[0.3em] uppercase mb-3"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            sys.whoami()
          </p>
          <h2 className="text-5xl md:text-7xl font-bold">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        {/* Bio block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden p-8 mb-6"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div
            className="absolute top-0 left-0 h-0.5 w-full opacity-60"
            style={{ background: "linear-gradient(90deg, #61DAFB, #68A063, transparent)" }}
          />
          <p
            className="text-xs font-mono tracking-[0.2em] uppercase mb-4"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            00 / Identity
          </p>
          <p
            className="text-lg md:text-xl leading-relaxed mb-4"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            I'm a{" "}
            <span className="font-semibold text-white">passionate Full Stack Developer</span>{" "}
            and{" "}
            <span className="font-semibold" style={{ color: "#FFD43B" }}>AI enthusiast</span>{" "}
            who loves building modern, interactive, and high-performance web applications. I care
            deeply about{" "}
            <span className="font-semibold" style={{ color: "#61DAFB" }}>clean code</span>,{" "}
            <span className="font-semibold" style={{ color: "#68A063" }}>great UX</span>, and
            experiences that feel alive.
          </p>
          <p
            className="text-lg md:text-xl leading-relaxed mb-4"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            I enjoy turning complex problems into simple, elegant solutions — whether that's
            architecting a{" "}
            <span className="font-semibold" style={{ color: "#47A248" }}>scalable backend</span>,
            crafting a{" "}
            <span className="font-semibold" style={{ color: "#F05032" }}>pixel-perfect interface</span>,
            or integrating{" "}
            <span className="font-semibold" style={{ color: "#FFD43B" }}>AI-powered features</span>{" "}
            that genuinely make products smarter and more useful.
          </p>
          <p
            className="text-lg md:text-xl leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            With{" "}
            <span className="font-semibold text-white">3+ years</span> of hands-on experience
            and{" "}
            <span className="font-semibold" style={{ color: "#61DAFB" }}>15+ projects</span>{" "}
            shipped, I'm always exploring what's next — from{" "}
            <span className="font-semibold" style={{ color: "#FFFFFF" }}>Three.js 3D worlds</span>{" "}
            to full-stack SaaS products. I believe great software is built at the intersection of
            technical depth and{" "}
            <span className="font-semibold" style={{ color: "#2496ED" }}>thoughtful design</span>.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true }}
          className="grid grid-cols-4 gap-3 mb-6"
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </motion.div>

        {/* Highlights bento */}
        <div className="flex items-end justify-between mb-5">
          <div>
            <p
              className="text-xs font-mono tracking-[0.25em] uppercase mb-1"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              What I do
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-white">Capabilities</h3>
          </div>
          <div className="flex-1 mx-6 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
          <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.2)" }}>
            {highlights.length} domains
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 auto-rows-[120px]">
          {highlights.map((item, i) => (
            <HighlightCard key={item.title} item={item} index={i} />
          ))}
        </div>

      </motion.div>
    </section>
  );
};

export default About;