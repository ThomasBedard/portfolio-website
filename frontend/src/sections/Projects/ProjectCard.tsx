import { motion } from "framer-motion";

type ProjectCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl?: string;
  techStack?: string[];
};

export default function ProjectCard({
  title,
  description,
  imageUrl,
  projectUrl,
  techStack = [],
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="rounded-xl overflow-hidden shadow-lg bg-white"
    >
      {/* Image Section with Overlay */}
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        {projectUrl && (
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-50 transition duration-300"
          >
            <span className="text-white text-lg opacity-0 hover:opacity-100 transition duration-300">
              View Project
            </span>
          </a>
        )}
      </div>
      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
