import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

export default function Projects() {
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
          Projects
        </div>
        <div className="font-extralight text-base md:text-4xl text-neutral-200 py-4 text-center">
          Here are some of the projects I've worked on.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard
            title="Pet Clinic Web App"
            description="Web application for a pet clinic."
            imageUrl="/images/project1.jpg"
            projectUrl="https://github.com/cgerard321/champlain_petclinic"
            techStack={["React", "Tailwind CSS", "Node.js"]}
          />
          <ProjectCard
            title="CCLEAN inc. Web App"
            description="Web application for a cleaning company to manage their services."
            imageUrl="/images/project2.jpg"
            projectUrl="https://github.com/ThomasBedard/ccleaninc"
            techStack={["Java", "SpringBoot", "MySQL"]}
          />
          <ProjectCard
            title="Brain MRI classification"
            description="An app that leverages AI to classify brain MRI images."
            imageUrl="/images/project3.jpg"
            projectUrl="https://github.com/tonyang660/brainmridetector"
            techStack={["Python", "AI", "Machine Learning"]}
          />
        </div>
      </motion.div>
    </div>
  );
}
