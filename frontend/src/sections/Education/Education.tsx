import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import EducationCard from "./EducationCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/contexts/translations";

const API_URL = import.meta.env.VITE_API_URL + "/education";

type MultilingualField = {
  en: string;
  fr: string;
};

type EducationType = {
  _id: string;
  institution: MultilingualField;
  degree?: MultilingualField;
  field_of_study: MultilingualField;
  start_date: string;
  end_date?: string;
  description?: MultilingualField;
};

export default function Education() {
  const [education, setEducation] = useState<EducationType[]>([]);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: EducationType[]) => setEducation(data))
      .catch((err) => console.error("Error fetching education data:", err));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
      className="relative flex flex-col gap-4 items-center justify-center px-4 h-screen"
      id="education"
    >
      <div className="text-3xl md:text-7xl font-bold text-center bg-gradient-to-b from-white to-neutral-400 text-transparent bg-clip-text">
        {t.educationAndCertifications}
      </div>
      <div className="font-extralight text-base md:text-4xl text-neutral-200 py-4">
        {t.educationDescription}
      </div>

      {/* Grid for Education Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {education.length > 0 ? (
          education.map((edu) => (
            <EducationCard key={edu._id} education={edu} />
          ))
        ) : (
          <p className="text-center text-white">{t.loadingEducation}</p>
        )}
      </div>
    </motion.div>
  );
}
