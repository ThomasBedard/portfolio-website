import { motion } from "framer-motion";

export default function Testimonials() {
  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
      className="relative flex flex-col gap-4 items-center justify-center px-4 h-screen"
      id="comments"
    >
      <div className="text-3xl md:text-7xl font-bold text-center bg-gradient-to-b from-white to-neutral-400 text-transparent bg-clip-text">
        Comment Section
      </div>
      <div className="font-extralight text-base md:text-4xl text-neutral-200 py-4">
        Here you can tell me about your thoughts.
      </div>
    </motion.div>
  );
}
