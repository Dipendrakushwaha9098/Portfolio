import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Send, Github, Linkedin, Mail, MapPin } from "lucide-react";

const socialLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "dipendrakushwaha2846@gmail.com",
    href: "mailto:dipendrakushwaha2846@gmail.com",
    accent: "#F05032",
    bg: "#2e0e08",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/DipendraKushwaha",
    href: "https://www.linkedin.com/in/dipendra-kushwaha-735b08293?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    accent: "#0A66C2",
    bg: "#071828",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/DipendraKushwaha9098",
    href: "https://github.com/Dipendrakushwaha9098",
    accent: "#FFFFFF",
    bg: "#111111",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Indore, Madhya Pradesh, IN",
    href: "#",
    accent: "#FFD43B",
    bg: "#2a2200",
  },
];

const SocialCard = ({
  item,
  index,
}: {
  item: (typeof socialLinks)[0];
  index: number;
}) => {
  const Icon = item.icon;
  return (
    <motion.a
      href={item.href}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ scale: 1.04, zIndex: 10 }}
      className="relative rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between p-5"
      style={{
        background: item.bg,
        border: `1px solid ${item.accent}22`,
        minHeight: "110px",
        textDecoration: "none",
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 h-0.5 w-full opacity-70"
        style={{ background: `linear-gradient(90deg, ${item.accent}, transparent)` }}
      />
      {/* Radial glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 30% 40%, ${item.accent}28 0%, transparent 65%)`,
        }}
      />

      {/* Icon */}
      <div
        className="flex items-center justify-center rounded-xl w-10 h-10 relative z-10"
        style={{
          background: `${item.accent}18`,
          border: `1px solid ${item.accent}30`,
        }}
      >
        <Icon size={18} style={{ color: item.accent }} />
      </div>

      {/* Text */}
      <div className="relative z-10">
        <p
          className="text-xs font-mono tracking-widest uppercase mb-0.5"
          style={{ color: `${item.accent}66` }}
        >
          {item.label}
        </p>
        <p
          className="text-sm font-semibold truncate"
          style={{ color: item.accent }}
        >
          {item.value}
        </p>
        <div className="flex gap-1 mt-1.5">
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className="rounded-full"
              style={{
                width: 4,
                height: 4,
                background: i === 0 ? item.accent : `${item.accent}40`,
              }}
            />
          ))}
        </div>
      </div>
    </motion.a>
  );
};

const Contact = () => {
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const fieldStyle = (name: string) => ({
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    background: focused === name ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
    border: `1px solid ${focused === name ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.07)"}`,
    outline: "none",
    color: "rgba(255,255,255,0.85)",
    fontSize: "14px",
    fontFamily: "inherit",
    transition: "all 0.25s ease",
    boxShadow: focused === name ? "0 0 0 3px rgba(255,255,255,0.04)" : "none",
  });

  return (
    <section
      ref={ref}
      id="contact"
      className="relative w-full py-24 px-6 md:py-32 md:px-16 overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div style={{ y }} className="max-w-4xl mx-auto relative z-10">

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
            sys.contact()
          </p>
          <h2 className="text-5xl md:text-7xl font-bold">
            Get In <span className="gradient-text">Touch</span>
          </h2>
        </motion.div>

        {/* Social cards grid */}
        <div
          className="flex items-end justify-between mb-5"
        >
          <div>
            <p
              className="text-xs font-mono tracking-[0.25em] uppercase mb-1"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              01 / Connect
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Find Me Here
            </h3>
          </div>
          <div
            className="flex-1 mx-6 h-px"
            style={{ background: "rgba(255,255,255,0.07)" }}
          />
          <span
            className="text-xs font-mono"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            {socialLinks.length} channels
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {socialLinks.map((item, i) => (
            <SocialCard key={item.label} item={item} index={i} />
          ))}
        </div>

        {/* Form section header */}
        <div className="flex items-end justify-between mb-5">
          <div>
            <p
              className="text-xs font-mono tracking-[0.25em] uppercase mb-1"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              02 / Message
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Send a Message
            </h3>
          </div>
          <div
            className="flex-1 mx-6 h-px"
            style={{ background: "rgba(255,255,255,0.07)" }}
          />
        </div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden p-8"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Top accent bar */}
          <div
            className="absolute top-0 left-0 h-0.5 w-full opacity-60"
            style={{
              background: "linear-gradient(90deg, #61DAFB, #68A063, #FFD43B, transparent)",
            }}
          />

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name + Email row */}
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                style={fieldStyle("name")}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                style={fieldStyle("email")}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
              />
            </div>

            {/* Subject */}
            <input
              type="text"
              placeholder="Subject"
              required
              style={fieldStyle("subject")}
              onFocus={() => setFocused("subject")}
              onBlur={() => setFocused(null)}
            />

            {/* Message */}
            <textarea
              rows={5}
              placeholder="Your Message..."
              required
              style={{ ...fieldStyle("message"), resize: "none" }}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
            />

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-base overflow-hidden group transition-all duration-300"
              style={{
                background: submitted
                  ? "#081a08"
                  : "rgba(255,255,255,0.05)",
                border: submitted
                  ? "1px solid #47A24844"
                  : "1px solid rgba(255,255,255,0.1)",
                color: submitted ? "#47A248" : "rgba(255,255,255,0.85)",
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)",
                }}
              />
              {/* Top accent bar on button */}
              <div
                className="absolute top-0 left-0 h-0.5 w-full opacity-60"
                style={{
                  background: submitted
                    ? "linear-gradient(90deg, #47A248, transparent)"
                    : "linear-gradient(90deg, #61DAFB, #FFD43B, transparent)",
                }}
              />
              {submitted ? (
                <span className="font-mono tracking-widest text-sm uppercase">
                  ✓ Message Sent
                </span>
              ) : (
                <>
                  <span className="font-mono tracking-widest text-sm uppercase relative z-10">
                    Send Message
                  </span>
                  <Send
                    size={16}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10"
                  />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;