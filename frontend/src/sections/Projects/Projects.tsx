import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/contexts/translations";

const API_URL = import.meta.env.VITE_API_URL + "/projects";

type MultilingualField = {
  en: string;
  fr: string;
};

interface Project {
  _id: string;
  title: MultilingualField;
  description: MultilingualField;
  image_url: string;
  project_url: string;
  tech_stack: string[];
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch projects");
        }
        return res.json();
      })
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <div
      id="projects"
      className="relative flex flex-col gap-4 items-center justify-center px-4 h-screen bg-grid-white/[0.2]"
    >
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-6xl"
      >
        <div className="text-3xl md:text-7xl font-bold text-center bg-gradient-to-b text-white">
          {t.projects}
        </div>
        <div className="font-extralight text-base md:text-4xl text-neutral-200 py-4 text-center">
          {t.projectDesc}
        </div>

        {/* Render Projects Dynamically */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard
                key={project._id}
                title={project.title[language]}
                description={project.description[language]}
                imageUrl={project.image_url}
                projectUrl={project.project_url}
                techStack={project.tech_stack}
              />
            ))
          ) : (
            <p className="text-white text-center w-full">{t.loadingProjects}</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
