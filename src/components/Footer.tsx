import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";


const socials = [
  {
    icon: Github,
    href: "https://github.com/Dipendrakushwaha9098",
    label: "GitHub",
    accent: "#FFFFFF",
    bg: "#111111",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/dipendra-kushwaha-735b08293?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    label: "LinkedIn",
    accent: "#0A66C2",
    bg: "#071828",
  },
  {
    icon: Mail,
    href: "dipendrakushwaha2846@gmail.com",
    label: "Email",
    accent: "#F05032",
    bg: "#2e0e08",
  },
];


const navLinks = ["About", "Skills", "Projects", "Contact"];

const Footer = () => {
  return (
    <footer className="relative w-full pt-12 pb-8 px-6 md:px-16 overflow-hidden"
      style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">

          {/* Branding */}
          <div>
            <p
              className="text-xs font-mono tracking-[0.3em] uppercase mb-1"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              sys.exit(0)
            </p>
            <h2 className="text-2xl md:text-3xl font-bold gradient-text">
              Dipendra Kushwaha
            </h2>
            <p
              className="text-sm font-mono mt-1"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Full Stack Developer & AI Enthusiast
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex gap-2 flex-wrap">
            {navLinks.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-xl text-sm font-mono tracking-wider transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.4)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.85)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.15)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.02)";
                }}
              >
                {link}
              </motion.a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-8"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Social bento cards */}
          <div className="flex gap-3">
            {socials.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.a
                  key={s.label}
                  href={s.href}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                  whileHover={{ scale: 1.08, zIndex: 10 }}
                  className="relative flex flex-col items-center justify-center gap-1.5 rounded-xl overflow-hidden cursor-pointer group"
                  style={{
                    background: s.bg,
                    border: `1px solid ${s.accent}22`,
                    width: 72,
                    height: 72,
                    textDecoration: "none",
                  }}
                  aria-label={s.label}
                >
                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-0 h-0.5 w-full opacity-70"
                    style={{ background: `linear-gradient(90deg, ${s.accent}, transparent)` }}
                  />
                  {/* Glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${s.accent}28 0%, transparent 70%)`,
                    }}
                  />
                  <Icon
                    size={18}
                    className="relative z-10 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: s.accent }}
                  />
                  <span
                    className="relative z-10 text-xs font-mono"
                    style={{ color: `${s.accent}77` }}
                  >
                    {s.label}
                  </span>
                </motion.a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-right">
            <p
              className="text-xs font-mono"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              © {new Date().getFullYear()} Dipendra Kushwaha
            </p>
            <p
              className="text-xs font-mono mt-0.5"
              style={{ color: "rgba(255,255,255,0.12)" }}
            >
              Built with React & Framer Motion
            </p>
          </div>

        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
