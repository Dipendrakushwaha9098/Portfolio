import { GraduationCap, BookOpen, Award, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Experience = () => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const timeline = [
    {
      icon: GraduationCap,
      title: "Bachelor of Engineering - Computer Science & Engineering",
      organization: "Chameli Devi Group of Institutions",
      period: "2023 - 2027",
      description:
        "Currently pursuing B.E. in CSE with focus on software development and modern technologies.",
    },
    {
      icon: BookOpen,
      title: "Frontend Development Specialization",
      organization: "Self Learning",
      period: "2023 - Present",
      description:
        "Mastering React, animations, UI/UX, and modern frontend tools.",
    },
    {
      icon: Award,
      title: "Web Development Projects",
      organization: "Personal Work",
      period: "2023 - Present",
      description:
        "Built multiple real-world projects including AI apps and full-stack systems.",
    },
    {
      icon: BookOpen,
      title: "AI & ML Exploration",
      organization: "Online Learning",
      period: "2024 - Present",
      description:
        "Exploring machine learning, AI tools, and real-world applications.",
    },
  ];

  return (
    <section ref={ref} id="experience" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My journey in tech, learning, and building impactful projects
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">

          {/* Animated Line */}
          <div className="absolute left-4 md:left-1/2 w-[2px] bg-border h-full -translate-x-1/2" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-1/2 w-[2px] bg-gradient-to-b from-primary to-secondary -translate-x-1/2 origin-top"
          />

          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -80 : 80,
              }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative mb-16"
            >
              {/* Dot */}
              <div className="absolute left-2 md:left-1/2 w-5 h-5 bg-primary rounded-full border-4 border-background -translate-x-1/2 z-10 shadow-glow" />

              {/* Card */}
              <div
                className={`ml-12 md:ml-0 ${
                  index % 2 === 0
                    ? "md:pr-[50%] md:pr-10"
                    : "md:pl-[50%] md:pl-10"
                }`}
              >
                <Card className="bg-card/60 backdrop-blur-xl border border-border shadow-elegant hover:shadow-glow transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-6">
                    
                    {/* Top */}
                    <div className="flex items-center gap-3 mb-3">
                      <item.icon className="text-primary" size={22} />
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar size={14} /> {item.period}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold mb-1">
                      {item.title}
                    </h3>
                    <p className="text-primary mb-2 text-sm">
                      {item.organization}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-20"
        >
          <Card className="bg-card/60 backdrop-blur-xl border border-border shadow-elegant max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4">
                Currently Looking For
              </h3>
              <p className="text-muted-foreground mb-6">
                Seeking internships and opportunities in frontend, full-stack, and AI development.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {["Frontend", "Full Stack", "AI/ML", "Internships"].map(
                  (tag, i) => (
                    <span
                      key={i}
                      className="px-4 py-1 bg-primary/10 text-primary rounded-full text-sm hover:shadow-glow transition"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;