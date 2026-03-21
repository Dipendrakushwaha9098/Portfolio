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
    tag: "01 / Craft",
    title: "Frontend Engineering",
    desc: "Crafting fast, responsive, pixel-perfect web apps with React, TypeScript, and Tailwind — every interaction considered.",
    col: "col-span-2",
    row: "row-span-1",
  },
  {
    tag: "02 / Dimension",
    title: "Interactive 3D",
    desc: "Building immersive WebGL experiences with Three.js that blur the line between web and reality.",
    col: "col-span-1",
    row: "row-span-2",
  },
  {
    tag: "03 / Intelligence",
    title: "AI Integration",
    desc: "Weaving AI into beautiful UI/UX — making products smarter without losing the human touch.",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    tag: "04 / Stack",
    title: "Full Stack",
    desc: "From database to deployment — Node, Express, MongoDB, and beyond.",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    tag: "05 / Deploy",
    title: "DevOps & Tools",
    desc: "Git, Docker, Vercel — shipping with confidence and speed.",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    tag: "06 / Design",
    title: "UI / UX Sense",
    desc: "Design-aware development — animations, layout, and micro-interactions that delight.",
    col: "col-span-1",
    row: "row-span-1",
  },
];
 
const use3DTilt = (strength = 12) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
 
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
    });
  }, [strength]);
 
  const onMouseLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });
  }, []);
 
  return { ref, tilt, onMouseMove, onMouseLeave };
};
 
const card3DStyle = (rx: number, ry: number) => ({
  transform: `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0px)`,
  transition: "transform 0.15s ease-out, box-shadow 0.15s ease-out",
});
 
const StatCard = ({ stat, index }: { stat: (typeof stats)[0]; index: number }) => {
  const { ref, tilt, onMouseMove, onMouseLeave } = use3DTilt(10);
 
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative rounded-2xl flex flex-col justify-between p-5 overflow-hidden cursor-default"
        style={{
          ...card3DStyle(tilt.rx, tilt.ry),
          minHeight: "110px",
          background: "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: `
            0 1px 0 rgba(255,255,255,0.1) inset,
            0 -1px 0 rgba(0,0,0,0.5) inset,
            0 20px 60px rgba(0,0,0,0.6),
            0 4px 16px rgba(0,0,0,0.4),
            0 1px 4px rgba(0,0,0,0.3)
          `,
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.07) 0%, transparent 65%)`,
            transition: "background 0.1s ease-out",
          }}
        />
        <div
          className="absolute top-0 left-0 w-px h-full"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.15), transparent)" }}
        />
        <span className="text-3xl font-bold text-white relative z-10">{stat.value}</span>
        <p className="text-xs font-mono tracking-widest uppercase relative z-10" style={{ color: "rgba(255,255,255,0.35)" }}>
          {stat.label}
        </p>
      </div>
    </motion.div>
  );
};
 
const HighlightCard = ({ item, index }: { item: (typeof highlights)[0]; index: number }) => {
  const isTall = item.row === "row-span-2";
  const isWide = item.col === "col-span-2";
  const { ref, tilt, onMouseMove, onMouseLeave } = use3DTilt(8);
 
  return (
    <motion.div
      className={`${item.col} ${item.row}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative rounded-2xl overflow-hidden cursor-default h-full"
        style={{
          ...card3DStyle(tilt.rx, tilt.ry),
          minHeight: isTall ? "220px" : "105px",
          background: "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.015) 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: `
            0 1px 0 rgba(255,255,255,0.09) inset,
            0 -1px 0 rgba(0,0,0,0.45) inset,
            0 24px 64px rgba(0,0,0,0.55),
            0 6px 20px rgba(0,0,0,0.35),
            0 1px 6px rgba(0,0,0,0.25)
          `,
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
            transition: "background 0.1s ease-out",
          }}
        />
        <div
          className="absolute top-0 left-0 w-px h-full"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.12), transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
          style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.25), transparent)" }}
        />
        <div className="relative z-10 flex flex-col justify-between h-full p-5">
          <p className="text-xs font-mono tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.22)" }}>
            {item.tag}
          </p>
          <div>
            <h4
              className="font-bold leading-tight mb-2 text-white"
              style={{ fontSize: isTall ? "1.3rem" : isWide ? "1.1rem" : "1rem" }}
            >
              {item.title}
            </h4>
            {(isTall || isWide) && (
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
                {item.desc}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
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
      className="relative w-full py-24 px-6 md:py-32 md:px-16 overflow-hidden"
    >
      <motion.div style={{ y }} className="max-w-4xl mx-auto">
 
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-xs font-mono tracking-[0.3em] uppercase mb-3" style={{ color: "rgba(255,255,255,0.25)" }}>
            sys.whoami()
          </p>
          <h2 className="text-5xl md:text-7xl font-bold text-white">
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
            className="absolute top-0 left-0 h-px w-full"
            style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.2), transparent)" }}
          />
          <p className="text-xs font-mono tracking-[0.2em] uppercase mb-4" style={{ color: "rgba(255,255,255,0.2)" }}>
            00 / Identity
          </p>
          <p className="text-lg md:text-xl leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>
            I'm a <span className="font-semibold text-white">passionate Full Stack Developer</span> and{" "}
            <span className="font-semibold text-white">AI enthusiast</span> with over{" "}
            <span className="font-semibold text-white">3 years</span> of hands-on experience building
            modern, interactive, and high-performance web applications. I focus on writing{" "}
            <span className="font-semibold text-white">clean, maintainable code</span> and creating
            seamless user experiences that feel intuitive and engaging.
          </p>
          <p className="text-lg md:text-xl leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>
            I enjoy turning complex problems into simple, elegant solutions — whether it's designing{" "}
            <span className="font-semibold text-white">scalable backend systems</span>, crafting{" "}
            <span className="font-semibold text-white">pixel-perfect user interfaces</span>, or integrating{" "}
            <span className="font-semibold text-white">AI-powered features</span> that make products
            smarter and more efficient. With{" "}
            <span className="font-semibold text-white">3+ projects delivered</span>, I have developed a
            strong understanding of both frontend and backend development.
          </p>
          <p className="text-lg md:text-xl leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
            I'm always exploring new technologies and pushing my limits — from creating immersive{" "}
            <span className="font-semibold text-white">Three.js experiences</span> to developing
            full-stack <span className="font-semibold text-white">SaaS applications</span>. I believe
            great software is built at the intersection of{" "}
            <span className="font-semibold text-white">technical excellence</span> and{" "}
            <span className="font-semibold text-white">thoughtful design</span>, and I strive to bring
            that balance into everything I build.
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
            <p className="text-xs font-mono tracking-[0.25em] uppercase mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>
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