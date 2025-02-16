import { motion } from "framer-motion";

type EducationProps = {
  education: {
    institution: string;
    degree?: string;
    field_of_study: string;
    start_date: string;
    end_date?: string;
    description?: string;
  };
};

export default function EducationCard({ education }: EducationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="bg-white rounded-lg shadow-lg p-6 border border-gray-300"
    >
      <h3 className="text-xl font-semibold text-gray-800">
        {education.institution}
      </h3>
      {education.degree && (
        <p className="text-sm text-gray-600">{education.degree}</p>
      )}
      <p className="text-sm text-gray-700">{education.field_of_study}</p>
      <p className="text-xs text-gray-500 mt-2">
        {new Date(education.start_date).getFullYear()} -{" "}
        {education.end_date
          ? new Date(education.end_date).getFullYear()
          : "Present"}
      </p>
      {education.description && (
        <p className="text-gray-700 mt-4 text-sm">{education.description}</p>
      )}
    </motion.div>
  );
}
