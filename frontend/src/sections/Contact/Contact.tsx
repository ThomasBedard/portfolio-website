import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/contexts/translations";
export default function Contact() {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
      className="relative flex flex-col gap-4 items-center justify-center px-4 h-screen"
      id="contact"
    >
      <div className="text-3xl md:text-7xl font-bold text-center bg-gradient-to-b from-white to-neutral-400 text-transparent bg-clip-text">
        {t.contactMe}
      </div>

      <ContactForm />
    </motion.div>
  );
}
