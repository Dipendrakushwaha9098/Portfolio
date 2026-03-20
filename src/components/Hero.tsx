import { Suspense, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import { BrainModel } from "./canvas/BrainModel";

const Hero = () => {
  const ref = useRef();

  const { scrollY } = useScroll();

  const yText = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative w-full h-screen mx-auto flex flex-col justify-center items-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />

          <Suspense fallback={null}>
            <BrainModel />
            <Preload all />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.8}
          />
        </Canvas>
      </div>

      {/* Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 z-0" />

      {/* Content */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center justify-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-8xl font-bold mb-6 tracking-tight leading-tight"
        >
          Hi, I'm <br className="md:hidden" />
          <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-[gradient_4s_linear_infinite] bg-[length:200%_auto]">
            Dipendra Kushwaha
          </span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-xl md:text-3xl text-muted-foreground font-medium mb-10"
        >
          Frontend Developer • AI Enthusiast
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
            transition={{
              duration: 1.8,
              repeat: Infinity,
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;