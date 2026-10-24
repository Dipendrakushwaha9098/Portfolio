import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  const [activeSection, setActiveSection] = useState("home");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => setVisible(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Top scroll progress bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] h-[3px] origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #38bdf8, #a855f7, #f43f5e)",
          boxShadow: "0 0 12px rgba(56,189,248,0.7)",
        }}
      />

      {/* ── Side section navigation dots ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-5"
      >
        {sections.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              aria-label={`Scroll to ${label}`}
              className="group relative flex items-center justify-end gap-3"
            >
              {/* Label tooltip */}
              <span
                className="absolute right-full mr-3 px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wider text-white/80 whitespace-nowrap pointer-events-none
                  opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {label}
              </span>

              {/* Dot */}
              <div className="relative flex items-center justify-center w-5 h-5">
                {/* Outer ring on active */}
                {isActive && (
                  <motion.div
                    layoutId="activeDotRing"
                    className="absolute inset-0 rounded-full border"
                    style={{ borderColor: "#38bdf8" }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <motion.div
                  animate={{
                    width: isActive ? 10 : 6,
                    height: isActive ? 10 : 6,
                    background: isActive
                      ? "linear-gradient(135deg, #38bdf8, #a855f7)"
                      : "rgba(255,255,255,0.25)",
                    boxShadow: isActive ? "0 0 8px rgba(56,189,248,0.8)" : "none",
                  }}
                  transition={{ duration: 0.25 }}
                  className="rounded-full group-hover:scale-125 transition-transform duration-200"
                />
              </div>
            </button>
          );
        })}

        {/* Vertical connector line */}
        <div
          className="absolute top-2.5 bottom-2.5 right-[9px] w-px -z-10"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
      </motion.div>

      {/* ── Scroll-to-top button ── */}
      <motion.button
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.7 }}
        transition={{ duration: 0.35, ease: "backOut" }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        className="fixed bottom-8 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center group"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="text-white/70 group-hover:text-white transition-colors group-hover:-translate-y-0.5 transition-transform duration-200"
        >
          <path
            d="M8 12V4M8 4L4 8M8 4L12 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>
    </>
  );
};
