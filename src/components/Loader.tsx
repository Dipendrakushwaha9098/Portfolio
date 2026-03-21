import { motion } from "framer-motion";


export const Loader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
    >
      {/* Background Glow Pulse */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex items-center justify-center">
        
        {/* Outer Ring */}
        <motion.div
          className="absolute w-36 h-36 rounded-full border-t-2 border-primary border-r-2 border-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{
            boxShadow: "0 0 25px hsl(var(--primary))",
          }}
        />

        {/* Inner Ring */}
        <motion.div
          className="absolute w-24 h-24 rounded-full border-b-2 border-secondary border-l-2 border-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          style={{
            boxShadow: "0 0 25px hsl(var(--secondary))",
          }}
        />

        {/* Center Text */}
        <motion.div
          className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-widest"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.9, 1.1, 1], opacity: 1 }}
          transition={{ duration: 1 }}
        >
          DK
        </motion.div>

        
        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full"
            initial={{ opacity: 0 }}
            animate={{
              y: [-20, -60],
              opacity: [0, 1, 0],
              x: [0, (i % 2 === 0 ? 20 : -20)],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};
