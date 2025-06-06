import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/contexts/translations";

export default function About() {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
      className="relative flex flex-col gap-4 items-center justify-center px-4 h-screen"
      id="about"
    >
      <div className="text-3xl md:text-7xl font-bold text-center bg-gradient-to-b from-white to-neutral-400 text-transparent bg-clip-text">
        {t.aboutMe}
      </div>
      <div className="font-extralight text-base md:text-4xl text-neutral-200 py-4">
        {t.aboutDescription}
      </div>
      <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-5xl">
        {/* Left side: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/images/me.jpg"
            alt="Picture of me"
            className="w-96 h-96 object-cover rounded-full shadow-lg border-4 border-white"
          />
        </div>
        {/* Right side: Description */}
        <div className="w-full md:w-1/2 text-neutral-200 text-base md:text-lg">
          <p>{t.aboutIntro}</p>
          <p className="mt-4">{t.aboutPhilosophy}</p>
        </div>
      </div>
    </motion.div>
  );
}
