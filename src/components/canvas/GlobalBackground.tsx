import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { BrainModel } from "./BrainModel";

export const GlobalBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Deep cosmic base gradient */}
      <div className="absolute inset-0 bg-[#030712]" />

      {/* Ambient glowing cosmic nebulae */}
      <div
        className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full blur-[140px] opacity-60 transition-transform duration-700 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(56,189,248,0.22) 0%, rgba(56,189,248,0) 70%)",
          transform: `translate3d(0, ${scrollY * 0.08}px, 0)`,
        }}
      />
      <div
        className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full blur-[160px] opacity-50 transition-transform duration-700 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, rgba(168,85,247,0) 70%)",
          transform: `translate3d(0, ${-scrollY * 0.06}px, 0)`,
        }}
      />
      <div
        className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] rounded-full blur-[160px] opacity-40 transition-transform duration-700 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0) 70%)",
          transform: `translate3d(0, ${-scrollY * 0.04}px, 0)`,
        }}
      />

      {/* Cyber Grid Layer for depth */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* 3D Three.js Canvas with minimal starry constellation */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />

          <Suspense fallback={null}>
            <BrainModel />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>

      {/* Vignette overlay to frame the screen gracefully */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
    </div>
  );
};
