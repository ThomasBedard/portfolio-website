import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

type MultilingualField = {
  en: string;
  fr: string;
};

type EducationProps = {
  education: {
    institution: MultilingualField;
    degree?: MultilingualField;
    field_of_study: MultilingualField;
    start_date: string;
    end_date?: string;
    description?: MultilingualField;
  };
};

export default function EducationCard({ education }: EducationProps) {
  const { language } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="bg-white rounded-lg shadow-lg p-6 border border-gray-300"
    >
      <h3 className="text-xl font-semibold text-gray-800">
        {education.institution[language]}
      </h3>
      {education.degree && (
        <p className="text-sm text-gray-600">{education.degree[language]}</p>
      )}
      <p className="text-sm text-gray-700">
        {education.field_of_study[language]}
      </p>
      <p className="text-xs text-gray-500 mt-2">
        {new Date(education.start_date).getFullYear()} -{" "}
        {education.end_date
          ? new Date(education.end_date).getFullYear()
          : "Present"}
      </p>
      {education.description && (
        <p className="text-gray-700 mt-4 text-sm">
          {education.description[language]}
        </p>
      )}
    </motion.div>
  );
}
