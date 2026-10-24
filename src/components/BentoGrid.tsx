import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Cpu,
  Sparkles,
  Layers,
  Globe,
  Activity,
  Terminal,
  Zap,
  Box,
  Sliders,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  Code2,
} from "lucide-react";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
  delay?: number;
}

const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className = "",
  accentColor = "#38bdf8",
  delay = 0,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, isHovered: false });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, isHovered: false }));
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative ${className}`}
    >
      {/* Ambient background glow beneath card */}
      <div
        className="absolute -inset-1 rounded-3xl opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500 pointer-events-none -z-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accentColor}44 0%, transparent 70%)`,
        }}
      />

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-full w-full rounded-3xl overflow-hidden p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ease-out group-hover:-translate-y-1.5"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.012) 100%)",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow:
            "0 20px 45px -15px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.12)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Subtle top specular line */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent 5%, ${accentColor}66 50%, transparent 95%)`,
          }}
        />

        {/* Cursor-responsive radial highlight on desktop */}
        {!shouldReduceMotion && (
          <div
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, ${accentColor}18, transparent 75%)`,
            }}
          />
        )}

        {/* Card content */}
        <div className="relative z-10 flex flex-col h-full justify-between">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export const BentoGrid: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeToggle, setActiveToggle] = useState<"performance" | "cinematic">("cinematic");
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // IST: UTC+5:30
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setLocalTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="capabilities"
      className="relative w-full py-28 px-6 md:py-36 md:px-16 overflow-hidden"
    >
      {/* Background radial ambient lights */}
      <div
        className="pointer-events-none absolute top-1/4 -left-48 w-96 h-96 rounded-full blur-[140px] opacity-25"
        style={{ background: "#38bdf8" }}
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-48 w-[450px] h-[450px] rounded-full blur-[150px] opacity-20"
        style={{ background: "#a855f7" }}
      />
      <div
        className="pointer-events-none absolute bottom-10 left-1/3 w-80 h-80 rounded-full blur-[130px] opacity-15"
        style={{ background: "#06b6d4" }}
      />

      {/* Subtle background tech grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(ellipse 65% 55% at 50% 50%, #000 60%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 65% 55% at 50% 50%, #000 60%, transparent 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20 text-center max-w-3xl mx-auto animate-float-subtle"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-4 text-xs font-mono tracking-[0.25em] uppercase text-primary">
            <Sparkles size={13} className="text-primary animate-pulse" />
            <span>Architecture & Capabilities</span>
          </div>

          <h2 className="font-cursive text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-wide leading-tight">
            Engineered for <span className="gradient-text">Impact & Scale</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/60 leading-relaxed font-light">
            A cohesive bento matrix showcasing my full-stack architecture, autonomous AI agents,
            3D graphics, and cloud-native engineering.
          </p>
        </motion.div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-12 gap-5 md:gap-6">
          {/* ========================================================= */}
          {/* CARD 1: Full-Stack Systems & Architecture (7 cols on lg) */}
          {/* ========================================================= */}
          <BentoCard
            className="col-span-12 lg:col-span-7"
            accentColor="#38bdf8"
            delay={0.05}
          >
            <div>
              {/* Header row */}
              <div className="flex items-center justify-between gap-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/25 text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                    <Cpu size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono tracking-widest uppercase text-sky-400 font-semibold block">
                      Core Discipline
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Full-Stack Systems & Architecture
                    </h3>
                  </div>
                </div>

                <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>ONLINE</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6 font-light max-w-xl">
                Designing end-to-end modern web applications with sub-100ms APIs, bulletproof
                type safety, scalable database schemas, and clean component architecture.
              </p>

              {/* Interactive Pipeline Architecture Diagram */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/[0.08] backdrop-blur-md mb-6">
                <div className="flex items-center justify-between text-xs font-mono text-white/40 mb-3 px-1">
                  <span>DATA FLOW TELEMETRY</span>
                  <span className="text-sky-400 font-medium">99.98% SLA</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 relative">
                  {[
                    { label: "Edge Client", sub: "React / Next.js", color: "#38bdf8" },
                    { label: "API Gateway", sub: "FastAPI / Node", color: "#10b981" },
                    { label: "AI Orchestrator", sub: "LLMs / Agents", color: "#a855f7" },
                    { label: "Persistence", sub: "MongoDB / Vector", color: "#f59e0b" },
                  ].map((node, i) => (
                    <div
                      key={node.label}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/20 transition-colors flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono text-white/40">0{i + 1}</span>
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: node.color, boxShadow: `0 0 6px ${node.color}` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-white truncate">{node.label}</span>
                      <span className="text-[11px] font-mono text-white/50 truncate mt-0.5">
                        {node.sub}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics Footer */}
            <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-5 sm:gap-8">
                <div>
                  <div className="text-xs font-mono text-white/40 uppercase">Latency</div>
                  <div className="text-base sm:text-lg font-bold text-white font-mono">&lt; 45ms</div>
                </div>
                <div className="h-7 w-px bg-white/10" />
                <div>
                  <div className="text-xs font-mono text-white/40 uppercase">Type Safety</div>
                  <div className="text-base sm:text-lg font-bold text-sky-400 font-mono">100% E2E</div>
                </div>
                <div className="h-7 w-px bg-white/10" />
                <div>
                  <div className="text-xs font-mono text-white/40 uppercase">Uptime</div>
                  <div className="text-base sm:text-lg font-bold text-emerald-400 font-mono">99.98%</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {["TypeScript", "React", "Node.js", "FastAPI"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.04] text-white/70 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* ========================================================= */}
          {/* CARD 2: AI Engineering & Neural Workflows (5 cols on lg) */}
          {/* ========================================================= */}
          <BentoCard
            className="col-span-12 lg:col-span-5"
            accentColor="#a855f7"
            delay={0.12}
          >
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/25 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  <Terminal size={22} />
                </div>
                <div>
                  <span className="text-[11px] font-mono tracking-widest uppercase text-purple-400 font-semibold block">
                    Intelligence Layer
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    AI & Autonomous Agents
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6 font-light">
                Weaving LLMs, embeddings, and vector databases into real-time applications with
                adaptive reasoning loops and context awareness.
              </p>

              {/* Futuristic Prompt / Token Stream Terminal */}
              <div className="p-4 rounded-2xl bg-black/50 border border-purple-500/20 font-mono text-xs text-white/80 space-y-2.5 mb-6 shadow-[inset_0_1px_20px_rgba(168,85,247,0.06)]">
                <div className="flex items-center justify-between text-[11px] text-white/40 border-b border-white/[0.08] pb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    <span className="ml-1 text-white/50">agent_runtime.py</span>
                  </div>
                  <span className="text-purple-400 font-medium">streaming</span>
                </div>

                <div className="text-white/60">
                  <span className="text-purple-400">&gt;</span> dispatch_agent(model="gpt-4o", rag=True)
                </div>
                <div className="text-emerald-400/90 flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  <span>Retrieved 5 contextual nodes from Vector DB</span>
                </div>
                <div className="text-white/80 bg-white/[0.03] p-2.5 rounded-lg border border-white/5 leading-relaxed">
                  Synthesizing personalized developer roadmap with dynamic token streaming...
                  <span className="inline-block w-1.5 h-3.5 bg-purple-400 ml-1.5 animate-pulse align-middle" />
                </div>
              </div>
            </div>

            {/* AI Tags */}
            <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {["OpenAI API", "LangChain", "Vector RAG", "Python"].map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span className="text-xs font-mono text-white/40">Tokens / sec: 84</span>
            </div>
          </BentoCard>

          {/* ========================================================= */}
          {/* CARD 3: Interactive 3D & Creative WebGL (4 cols on lg)   */}
          {/* ========================================================= */}
          <BentoCard
            className="col-span-12 md:col-span-6 lg:col-span-4"
            accentColor="#06b6d4"
            delay={0.18}
          >
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  <Box size={22} />
                </div>
                <div>
                  <span className="text-[11px] font-mono tracking-widest uppercase text-cyan-400 font-semibold block">
                    Spatial Web
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Interactive 3D & WebGL
                  </h3>
                </div>
              </div>

              <p className="text-sm text-white/70 leading-relaxed mb-5 font-light">
                Crafting GPU-accelerated WebGL environments with Three.js that elevate flat interfaces
                into interactive, memorable digital dimensions.
              </p>

              {/* 3D Wireframe Visualizer */}
              <div className="relative h-32 rounded-2xl bg-black/40 border border-cyan-500/20 flex items-center justify-center overflow-hidden mb-5 group-hover:border-cyan-500/40 transition-colors">
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at center, #06b6d4 0%, transparent 70%)",
                  }}
                />

                {/* Animated Wireframe Orbit Rings */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40 animate-spin" style={{ animationDuration: "14s" }} />
                  <div className="absolute w-16 h-16 rounded-full border border-cyan-300/30 animate-spin" style={{ animationDuration: "9s", animationDirection: "reverse" }} />
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-sky-400 shadow-[0_0_20px_rgba(6,182,212,0.6)] transform rotate-45 animate-pulse" />
                </div>

                <div className="absolute bottom-2.5 right-3 px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-[10px] font-mono text-cyan-300">
                  60 FPS VSYNC
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs font-mono text-white/50">Shader Art & Shaders</span>
              <div className="flex gap-1.5">
                {["Three.js", "GLSL"].map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-cyan-300 border border-cyan-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* ========================================================= */}
          {/* CARD 4: Ergonomic UX & Micro-Interactions (4 cols on lg) */}
          {/* ========================================================= */}
          <BentoCard
            className="col-span-12 md:col-span-6 lg:col-span-4"
            accentColor="#f59e0b"
            delay={0.24}
          >
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  <Sliders size={22} />
                </div>
                <div>
                  <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400 font-semibold block">
                    Design Engineering
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Micro-Interactions & UX
                  </h3>
                </div>
              </div>

              <p className="text-sm text-white/70 leading-relaxed mb-5 font-light">
                Physics-based spring curves, tactile feedback, and seamless layout transitions
                designed with relentless attention to user ergonomics.
              </p>

              {/* Interactive Widget */}
              <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/20 mb-5">
                <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-3">
                  <span>MOTION PRESET</span>
                  <span className="text-amber-400 capitalize">{activeToggle} Mode</span>
                </div>

                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-white/[0.03] border border-white/5">
                  <button
                    onClick={() => setActiveToggle("performance")}
                    className={`py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 ${
                      activeToggle === "performance"
                        ? "bg-amber-500 text-black font-semibold shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    Performance
                  </button>
                  <button
                    onClick={() => setActiveToggle("cinematic")}
                    className={`py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 ${
                      activeToggle === "cinematic"
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    Cinematic 3D
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-white/40 px-1">
                  <span>stiffness: {activeToggle === "cinematic" ? "260" : "420"}</span>
                  <span>damping: {activeToggle === "cinematic" ? "24" : "32"}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs font-mono text-white/50">Fluid Micro-Animations</span>
              <div className="flex gap-1.5">
                {["Framer Motion", "Tailwind"].map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-amber-300 border border-amber-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* ========================================================= */}
          {/* CARD 5: Global Deployment & Distributed Ops (4 cols on lg) */}
          {/* ========================================================= */}
          <BentoCard
            className="col-span-12 lg:col-span-4"
            accentColor="#10b981"
            delay={0.3}
          >
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <Globe size={22} />
                </div>
                <div>
                  <span className="text-[11px] font-mono tracking-widest uppercase text-emerald-400 font-semibold block">
                    Cloud & Availability
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Global DevOps & Cloud
                  </h3>
                </div>
              </div>

              <p className="text-sm text-white/70 leading-relaxed mb-5 font-light">
                Automated continuous delivery via Docker, Vercel edge networks, and git-ops
                workflows with zero-downtime releases.
              </p>

              {/* Live Timezone & Availability Widget */}
              <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 mb-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                    <span className="text-xs font-mono font-medium text-emerald-400">
                      OPEN FOR CONTRACT / ROLES
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-white/40">IST (UTC+5:30)</span>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-xs text-white/60">Local Clock:</span>
                  <span className="text-base sm:text-lg font-mono font-bold text-white">
                    {localTime || "10:30:00 PM"}
                  </span>
                </div>

                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-white/50">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-emerald-400" />
                    Edge CDN Active
                  </span>
                  <span className="text-emerald-400">18ms TTFB</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs font-mono text-white/50">Continuous Delivery</span>
              <div className="flex gap-1.5">
                {["Docker", "Vercel", "Git"].map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-emerald-300 border border-emerald-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
