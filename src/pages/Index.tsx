import { useState, useEffect, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { CustomCursor } from "@/components/CustomCursor";
import { Loader } from "@/components/Loader";
import { GlobalBackground } from "@/components/canvas/GlobalBackground";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-foreground overflow-hidden selection:bg-primary/30 relative">
      <CustomCursor />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" />
        ) : (
          <div key="content" className="relative w-full min-h-screen">
            {/* Global 3D & Cosmic Background for the ENTIRE website */}
            <GlobalBackground />

            {/* Scroll progress bar + side nav dots */}
            <ScrollProgress />

            <Navbar />
            <main className="relative z-10 flex flex-col items-center w-full">
              <Suspense fallback={null}>
                <Hero />
              </Suspense>
              <About />
              <Skills />
              <Projects />
              <Contact />
            </main>
            <div className="relative z-10">
              <Footer />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
