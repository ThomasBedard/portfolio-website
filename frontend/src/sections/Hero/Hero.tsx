import { motion } from "framer-motion";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { saveAs } from "file-saver";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/contexts/translations";

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language];

  const handleDownloadCV = () => {
    const cvFileName =
      language === "fr" ? "ThomasResumeFR.pdf" : "ThomasResumeENG.pdf";
    saveAs(`/pdf/${cvFileName}`, cvFileName);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/images/HeroBackground.jpg')] bg-cover bg-center blur-sm"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center h-full px-4"
        id="home"
      >
        <div className="text-3xl md:text-7xl font-bold text-center bg-gradient-to-b from-white to-neutral-300 text-transparent bg-clip-text">
          {t.heroTitle}
        </div>

        <div className="font-extralight text-base md:text-4xl text-neutral-200 py-4">
          {t.heroSubtitle}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-white rounded-full w-50 text-black px-4 py-2">
            <a
              href="#about"
              className="text-black no-underline hover:text-black"
            >
              {t.learnMore}
            </a>
          </button>
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            onClick={handleDownloadCV}
            className="bg-black text-white flex items-center space-x-2 border-2 border-opacity-5 border-gray-500"
          >
            <span>{t.downloadCV}</span>
          </HoverBorderGradient>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-6 mt-6">
          {/* GitHub */}
          <a
            href="https://github.com/ThomasBedard"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/github.png"
              alt="GitHub"
              className="w-8 h-8 transition-transform transform hover:scale-110"
            />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/thomas-bedard-54a396293"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/linkedin.png"
              alt="LinkedIn"
              className="w-8 h-8 transition-transform transform hover:scale-110"
            />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
