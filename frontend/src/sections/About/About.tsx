import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
      className="relative flex flex-col gap-4 items-center justify-center px-4 h-screen"
      id="about"
    >
      <div className="text-3xl md:text-7xl font-bold text-center bg-gradient-to-b from-white to-neutral-400 text-transparent bg-clip-text">
        About Me
      </div>
      <div className="font-extralight text-base md:text-4xl text-neutral-200 py-4">
        A bit about myself
      </div>
      <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-5xl">
        {/* Left side: Image */}
        <div className="w-full md:w-1/2">
          <img
            src="/images/me.jpg"
            alt="Picture of me"
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
        {/* Right side: Description */}
        <div className="w-full md:w-1/2 text-neutral-200 text-base md:text-lg">
          <p>
            Hello, I’m Thomas Bedard, a passionate software developer and
            designer with a knack for creating engaging digital experiences.
            With expertise in both front-end and back-end technologies, I strive
            to build projects that are not only visually appealing but also
            functionally robust.
          </p>
          <p className="mt-4">
            I believe in the power of design and technology to transform ideas
            into reality. Whether it’s building web applications, designing user
            interfaces, or solving complex technical challenges, I’m always
            excited to learn and innovate.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
