import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download } from "lucide-react";

import resumePDF from "@/assets/Dipendra_Kushwaha__Resume_.pdf";
const Hero = () => {
  const ref = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();

  const yText = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative w-full h-screen mx-auto flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Content */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center justify-center animate-float-subtle"
      >
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight"
        >
          Hi, I'm <br className="md:hidden" />
          <span className="font-cursive text-6xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-[gradient_4s_linear_infinite] bg-[length:200%_auto] inline-block px-2 py-1">
            Dipendra Kushwaha
          </span>
        </motion.h1>


        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-xl md:text-3xl text-muted-foreground font-medium mb-10"
        >
          Full Stack Developer • AI Enthusiast
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-5"
        >
          <a
            href="#projects"
            className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
          >
            View Projects
          </a>

          <a
            href="#contact"
            className="px-8 py-4 rounded-full border border-secondary text-foreground font-semibold text-lg hover:bg-secondary/20 hover:shadow-[0_0_25px_hsl(var(--secondary)/0.4)] transition-all duration-300 hover:-translate-y-1"
          >
            Contact Me
          </a>

          <a
            href={resumePDF}
            download="Dipendra_Kushwaha_Resume.pdf"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-foreground font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
          >
            <Download size={20} />
            Resume
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >

        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          Scroll
        </span>

        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center p-1">
          <motion.div
            className="w-1.5 h-3 bg-primary rounded-full"
            animate={{ y: [0, 15, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
