import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Send,
  Github,
  Linkedin,
  Mail,
  MapPin,
  CheckCircle,
  AlertCircle,
  Copy,
  Check,
  Loader2,
  ExternalLink,
} from "lucide-react";
import emailjs from "@emailjs/browser";

// ─── Contact info ─────────────────────────────────────────────────────────────
const EMAIL = "dipendrakushwaha2846@gmail.com";
const LOCATION = "Indore, Madhya Pradesh, IN";
const GITHUB_URL = "https://github.com/Dipendrakushwaha9098";
const LINKEDIN_URL = "https://www.linkedin.com/in/dipendra-kushwaha-735b08293";

// ─── Social cards data ────────────────────────────────────────────────────────
const socialLinks = [
  {
    icon: Mail,
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    accent: "#F05032",
    bg: "rgba(240,80,50,0.07)",
    copyable: true,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/DipendraKushwaha",
    href: LINKEDIN_URL,
    accent: "#0A66C2",
    bg: "rgba(10,102,194,0.07)",
    copyable: false,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/DipendraKushwaha9098",
    href: "https://github.com/Dipendrakushwaha9098",
    accent: "#e6edf3",
    bg: "rgba(230,237,243,0.06)",
    copyable: false,
  },
  {
    icon: MapPin,
    label: "Location",
    value: LOCATION,
    href: "#",
    accent: "#FFD43B",
    bg: "rgba(255,212,59,0.07)",
    copyable: false,
  },
];

// ─── Field character limits ───────────────────────────────────────────────────
const LIMITS = { name: 80, email: 120, message: 1500 };

// ─── Types ────────────────────────────────────────────────────────────────────
type FormState = { name: string; email: string; message: string };
type FormErrors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "loading" | "success" | "error";

// Maps EmailJS input name attrs → FormState keys
const nameToKey: Record<string, keyof FormState> = {
  from_name: "name",
  reply_to: "email",
  message: "message",
};

// ─── Validation ───────────────────────────────────────────────────────────────
function validate(v: FormState): FormErrors {
  const e: FormErrors = {};
  if (!v.name.trim()) e.name = "Full name is required.";
  else if (v.name.trim().length < 2) e.name = "Name must be at least 2 characters.";
  if (!v.email.trim()) e.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))
    e.email = "Please enter a valid email address.";
  if (!v.message.trim()) e.message = "Message is required.";
  else if (v.message.trim().length < 20) e.message = "Message must be at least 20 characters.";
  return e;
}

// ─── SocialCard ───────────────────────────────────────────────────────────────
const SocialCard = ({ item, index }: { item: (typeof socialLinks)[0]; index: number }) => {
  const [copied, setCopied] = useState(false);
  const Icon = item.icon;
  const isLocation = item.label === "Location";

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const inner = (
    <div
      className="perspective-1000"
      style={{
        animation: "float-slow 6.5s ease-in-out infinite",
        animationDelay: `${(index % 4) * 0.5}s`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ scale: 1.04, y: -4 }}
        className="relative rounded-2xl overflow-hidden flex flex-col justify-between p-5 group preserve-3d transition-all duration-200"
        style={{
          background: item.bg,
          border: `1px solid ${item.accent}30`,
          minHeight: "118px",
          cursor: isLocation ? "default" : "pointer",
          backdropFilter: "blur(12px)",
          boxShadow: `0 15px 35px -10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)`,
        }}
      >
        <div
          className="absolute top-0 left-0 h-0.5 w-full"
          style={{ background: `linear-gradient(90deg, ${item.accent}cc, transparent)` }}
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 40% 40%, ${item.accent}25 0%, transparent 70%)`,
          }}
        />

        <div className="flex items-start justify-between relative z-10 preserve-3d">
          <div
            className="flex items-center justify-center rounded-xl w-10 h-10 transition-transform duration-200 group-hover:translate-z-20"
            style={{ background: `${item.accent}18`, border: `1px solid ${item.accent}30`, boxShadow: `0 0 15px ${item.accent}20` }}
          >
            <Icon size={17} style={{ color: item.accent }} />
          </div>
          {item.copyable && (
            <motion.button
              onClick={handleCopy}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Copy email to clipboard"
              className="p-1.5 rounded-lg transition-colors"
              style={{ background: copied ? `${item.accent}22` : "transparent", color: item.accent }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </motion.button>
          )}
          {!isLocation && !item.copyable && (
            <ExternalLink size={13} style={{ color: `${item.accent}55` }} className="mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          )}
        </div>

        <div className="relative z-10 mt-2 preserve-3d">
          <p className="text-xs font-mono tracking-[0.25em] uppercase mb-1" style={{ color: `${item.accent}90` }}>
            {item.label}
          </p>
          <p className="text-base font-semibold truncate group-hover:translate-z-10 transition-transform" style={{ color: item.accent }}>
            {item.value}
          </p>
          {copied && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs mt-1 font-mono" style={{ color: `${item.accent}` }}>
              Copied to clipboard!
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
  );

  if (isLocation) return inner;
  return (
    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{ textDecoration: "none" }}>
      {inner}
    </a>
  );
};

// ─── Field wrapper ────────────────────────────────────────────────────────────
const Field = ({
  label, id, error, focused, children, charCount, limit,
}: {
  label: string; id: string; error?: string; focused: boolean;
  children: React.ReactNode; charCount?: number; limit?: number;
}) => (
  <div className="flex flex-col gap-1.5">
    <div className="flex justify-between items-baseline">
      <label htmlFor={id} className="text-sm font-mono tracking-wider uppercase font-medium"
        style={{ color: focused ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.45)" }}>
        {label}
      </label>
      {charCount !== undefined && limit !== undefined && (
        <span className="text-xs font-mono tabular-nums"
          style={{ color: charCount > limit * 0.85 ? (charCount >= limit ? "#f87171" : "#fbbf24") : "rgba(255,255,255,0.3)" }}>
          {charCount}/{limit}
        </span>
      )}
    </div>
    {children}
    <AnimatePresence>
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }} className="text-xs flex items-center gap-1 mt-0.5"
          style={{ color: "#f87171" }} role="alert">
          <AlertCircle size={11} />
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

// ─── Contact section ──────────────────────────────────────────────────────────
const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const [values, setValues] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const isLoading = status === "loading";

  const inputStyle = (name: string, hasError: boolean): React.CSSProperties => ({
    width: "100%",
    padding: "14px 18px",
    borderRadius: "12px",
    background: focused === name ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.025)",
    border: `1px solid ${hasError ? "rgba(248,113,113,0.5)" : focused === name ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)"}`,
    outline: "none",
    color: "rgba(255,255,255,0.92)",
    fontSize: "16px",
    fontFamily: "inherit",
    transition: "all 0.25s ease",
    boxShadow: focused === name ? "0 0 0 3px rgba(255,255,255,0.03)" : "none",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const key = nameToKey[name] ?? (name as keyof FormState);
    if (value.length > LIMITS[key]) return;
    setValues(prev => {
      const next = { ...prev, [key]: value };
      // inline validation for touched fields
      setTouched(t => {
        if (t[key]) setErrors(err => ({ ...err, [key]: validate(next)[key] }));
        return t;
      });
      return next;
    });
  };

  const handleBlur = (name: keyof FormState) => {
    setFocused(null);
    setTouched(prev => ({ ...prev, [name]: true }));
    const partial = validate(values);
    setErrors(prev => ({ ...prev, [name]: partial[name] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const ve = validate(values);
    if (Object.keys(ve).length > 0) { setErrors(ve); return; }

    setStatus("loading");
    setErrorMsg("");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      setErrorMsg("EmailJS is not configured. Please set the environment variables and try again.");
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: values.name,
          reply_to: values.email,
          message: values.message,
        },
        { publicKey }
      );
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
      setTouched({});
      setErrors({});
    } catch (err: unknown) {
      if (err && typeof err === "object") {
        const e = err as { status?: number; text?: string; message?: string };
        console.error("[Contact] EmailJS error — status:", e.status, "text:", e.text ?? e.message, "full:", err);
        const serverDetail = e.text || e.message;
        if (serverDetail) {
          setErrorMsg(`EmailJS: ${serverDetail}`);
        } else if (e.status === 401 || e.status === 403) {
          setErrorMsg("EmailJS: Unauthorized — check your Public Key in the .env file.");
        } else if (e.status === 404) {
          setErrorMsg("EmailJS: Service or Template not found — check your Service ID and Template ID in the .env file.");
        } else {
          setErrorMsg(`Something went wrong (${e.status ?? "network error"}). Please try again or email me directly.`);
        }
      } else {
        console.error("[Contact] EmailJS unknown error:", err);
        setErrorMsg("Something went wrong while sending your message. Please try again or contact me directly via email.");
      }
      setStatus("error");
    }
  };

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] } },
  };

  return (
    <section ref={sectionRef} id="contact" className="relative w-full py-24 px-5 md:py-32 md:px-16 overflow-hidden" aria-label="Contact section">

      {/* Ambient glows */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <motion.div style={{ y }} className="max-w-5xl mx-auto relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="font-cursive text-5xl md:text-7xl font-bold leading-tight mb-5 tracking-wide">
            Let's Build <span className="gradient-text">Something Amazing</span>
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
            Open to full-time roles, freelance projects, and exciting collaborations. Recruiters, clients, and fellow developers — drop me a message!
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.65fr] gap-8 items-start">

          {/* ── Info panel ── */}
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} className="flex flex-col gap-4">
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-1.5">Find Me Here</h3>
              <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>Available for opportunities across the globe.</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {socialLinks.map((item, i) => (
                <motion.div key={item.label} variants={itemVariants}>
                  <SocialCard item={item} index={i} />
                </motion.div>
              ))}
            </div>

            {/* Availability badge */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl"
              style={{ background: "rgba(71,162,72,0.08)", border: "1px solid rgba(71,162,72,0.25)" }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-sm font-mono font-medium" style={{ color: "rgba(71,162,72,0.95)" }}>Available for new opportunities</span>
            </motion.div>
          </motion.div>

          {/* ── Form card ── */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden p-8 md:p-10 animate-float-subtle"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 25px 60px -15px rgba(0,0,0,0.8), 0 0 35px rgba(56,189,248,0.1), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          >
            {/* Accent bar */}
            <div className="absolute top-0 left-0 h-0.5 w-full opacity-70"
              style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)), transparent)" }} />

            <div className="mb-7">
              <h3 className="text-2xl md:text-3xl font-bold text-white">Send a Message</h3>
            </div>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center text-center py-12 gap-5"
                >
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}>
                    <CheckCircle size={56} style={{ color: "#47A248" }} strokeWidth={1.5} />
                  </motion.div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                    <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                      Thanks for reaching out. I'll get back to you as soon as possible — usually within 24–48 hours.
                    </p>
                  </div>
                  <motion.button
                    onClick={() => setStatus("idle")}
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="text-xs font-mono tracking-widest uppercase px-5 py-2.5 rounded-lg"
                    style={{ background: "rgba(71,162,72,0.12)", border: "1px solid rgba(71,162,72,0.3)", color: "#47A248" }}
                  >
                    Send Another
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form" onSubmit={handleSubmit} noValidate
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-5" aria-label="Contact form"
                >
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Full Name" id="contact-name" error={touched.name ? errors.name : undefined} focused={focused === "name"} charCount={values.name.length} limit={LIMITS.name}>
                      <input
                        id="contact-name" name="from_name" type="text" autoComplete="name"
                        placeholder="Your full name" value={values.name} maxLength={LIMITS.name}
                        onChange={handleChange} onFocus={() => setFocused("name")} onBlur={() => handleBlur("name")}
                        disabled={isLoading} style={inputStyle("name", !!(touched.name && errors.name))}
                        aria-invalid={!!(touched.name && errors.name)}
                      />
                    </Field>
                    <Field label="Email Address" id="contact-email" error={touched.email ? errors.email : undefined} focused={focused === "email"} charCount={values.email.length} limit={LIMITS.email}>
                      <input
                        id="contact-email" name="reply_to" type="email" autoComplete="email"
                        placeholder="your@email.com" value={values.email} maxLength={LIMITS.email}
                        onChange={handleChange} onFocus={() => setFocused("email")} onBlur={() => handleBlur("email")}
                        disabled={isLoading} style={inputStyle("email", !!(touched.email && errors.email))}
                        aria-invalid={!!(touched.email && errors.email)}
                      />
                    </Field>
                  </div>


                  {/* Message */}
                  <Field label="Message" id="contact-message" error={touched.message ? errors.message : undefined} focused={focused === "message"} charCount={values.message.length} limit={LIMITS.message}>
                    <textarea
                      id="contact-message" name="message" rows={6}
                      placeholder="Tell me about your project, role, or idea..."
                      value={values.message} maxLength={LIMITS.message}
                      onChange={handleChange} onFocus={() => setFocused("message")} onBlur={() => handleBlur("message")}
                      disabled={isLoading} style={{ ...inputStyle("message", !!(touched.message && errors.message)), resize: "none" }}
                      aria-invalid={!!(touched.message && errors.message)}
                    />
                  </Field>

                  {/* Error banner */}
                  <AnimatePresence>
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                        className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm"
                        style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" }}
                        role="alert"
                      >
                        <AlertCircle size={16} className="mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{errorMsg}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit button */}
                  <motion.button
                    type="submit" disabled={isLoading}
                    whileHover={!isLoading ? { scale: 1.02 } : {}}
                    whileTap={!isLoading ? { scale: 0.98 } : {}}
                    className="relative w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-semibold text-sm overflow-hidden group transition-colors duration-300"
                    style={{
                      background: isLoading ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: isLoading ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.9)",
                      cursor: isLoading ? "not-allowed" : "pointer",
                    }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)" }} />
                    <div className="absolute top-0 left-0 h-0.5 w-full opacity-70"
                      style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)), transparent)" }} />

                    {isLoading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span className="font-mono tracking-widest text-sm uppercase font-semibold">Sending…</span>
                      </>
                    ) : status === "error" ? (
                      <>
                        <Send size={17} />
                        <span className="font-mono tracking-widest text-sm uppercase font-semibold">Retry</span>
                      </>
                    ) : (
                      <>
                        <span className="font-mono tracking-widest text-sm uppercase font-semibold relative z-10">Send Message</span>
                        <Send size={17} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform relative z-10" />
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-xs font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>
                    Your message is sent directly to my inbox via EmailJS. No data is stored.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
