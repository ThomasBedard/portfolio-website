import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
      className="relative flex flex-col gap-4 items-center justify-center px-4 h-screen"
    >
      <div className="text-3xl md:text-7xl font-bold text-center bg-gradient-to-b from-white to-neutral-400 text-transparent bg-clip-text">
        About Me
      </div>
      <div className="font-extralight text-base md:text-4xl text-neutral-200 py-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div>ProjectCard</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div>ProjectCard</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div>ProjectCard</div>
        </div>
      </div>
    </motion.div>
  );
}
