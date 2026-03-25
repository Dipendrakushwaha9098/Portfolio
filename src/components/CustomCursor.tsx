import { useEffect, useRef } from "react";


export const CustomCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
 
  const trail = useRef<{ x: number; y: number }[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const opacity = useRef(0);
 
  const TRAIL_LENGTH = 40;
 
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
 
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
 
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      opacity.current = Math.min(1, opacity.current + 0.2);
    };
 
    window.addEventListener("mousemove", onMove);
 
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      trail.current.push({ x: mouse.current.x, y: mouse.current.y });
    }
 
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
 
      opacity.current = Math.max(0, opacity.current - 0.015);
 
      trail.current[0].x += (mouse.current.x - trail.current[0].x) * 0.25;
      trail.current[0].y += (mouse.current.y - trail.current[0].y) * 0.25;
 
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        trail.current[i].x += (trail.current[i - 1].x - trail.current[i].x) * 0.25;
        trail.current[i].y += (trail.current[i - 1].y - trail.current[i].y) * 0.25;
      }
 
      if (opacity.current > 0) {
        ctx.beginPath();
        ctx.moveTo(trail.current[0].x, trail.current[0].y);
 
        for (let i = 1; i < TRAIL_LENGTH - 1; i++) {
          const xc = (trail.current[i].x + trail.current[i + 1].x) / 2;
          const yc = (trail.current[i].y + trail.current[i + 1].y) / 2;
          ctx.quadraticCurveTo(trail.current[i].x, trail.current[i].y, xc, yc);
        }
 
        const last = trail.current[TRAIL_LENGTH - 1];
        ctx.lineTo(last.x, last.y);
 
        const grad = ctx.createLinearGradient(
          trail.current[TRAIL_LENGTH - 1].x,
          trail.current[TRAIL_LENGTH - 1].y,
          trail.current[0].x,
          trail.current[0].y
        );
 
        grad.addColorStop(0, "rgba(99,179,237,0)");
        grad.addColorStop(1, `rgba(99,179,237,${opacity.current * 0.7})`);
 
        ctx.strokeStyle = grad;
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }
 
      rafRef.current = requestAnimationFrame(draw);
    };
 
    rafRef.current = requestAnimationFrame(draw);
 
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

 
  return (
    <>
      <style>{`* { cursor: auto !important; }`}</style>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 pointer-events-none z-[999]"
        style={{ mixBlendMode: "screen" }}
      />
    </>
  );
};
