import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleHover = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <>
      {/* Main Glow Dot */}
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 rounded-full bg-primary pointer-events-none z-[100] mix-blend-screen hidden md:block"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isHovering ? 1.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          boxShadow: "0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary))",
        }}
      />

      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-secondary pointer-events-none z-[100] hidden md:block"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        style={{
          boxShadow: "0 0 30px hsl(var(--secondary) / 0.5)",
        }}
      />

      {/* Blur Glow Trail */}
      <motion.div
        className="fixed top-0 left-0 w-20 h-20 rounded-full pointer-events-none z-[90] hidden md:block"
        animate={{
          x: mousePosition.x - 40,
          y: mousePosition.y - 40,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.4 }}
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)/0.2), transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Hover Text */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[110] text-xs font-semibold text-white hidden md:block"
          animate={{
            x: mousePosition.x + 12,
            y: mousePosition.y + 12,
            opacity: 1,
          }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          View
        </motion.div>
      )}
    </>
  );
};