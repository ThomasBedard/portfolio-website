import { useEffect, useState } from "react";
import { Project, LocalizedContent, getAllProjects, createProject, deleteProject } from "../../../db_connect";

export default function ProjectAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<Project>({
    title: { en: "", fr: "" },
    description: { en: "", fr: "" },
    image_url: "",
    project_url: "",
    tech_stack: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleCreateProject = async () => {
    try {
      const data = await createProject(newProject);
      setProjects([...projects, data]);
      
      // Reset form
      setNewProject({
        title: { en: "", fr: "" },
        description: { en: "", fr: "" },
        image_url: "",
        project_url: "",
        tech_stack: [],
      });
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  const handleDeleteProject = async (id?: string) => {
    if (!id) return;
    
    try {
      const success = await deleteProject(id);
      if (success) {
        setProjects((prevProjects) => prevProjects.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  const handleInputChange = (
    field: keyof Project, 
    value: string | string[] | LocalizedContent,
    language?: "en" | "fr"
  ) => {
    if (field === "title" || field === "description") {
      if (language) {
        setNewProject({
          ...newProject,
          [field]: {
            ...newProject[field] as LocalizedContent,
            [language]: value
          }
        });
      }
    } else {
      setNewProject({ ...newProject, [field]: value });
    }
  };

  if (loading) {
    return <div className="p-4 text-white">Loading projects...</div>;
  }

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white">Manage Projects</h2>

      <div className="mt-4 space-y-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-gray-700 p-4 rounded flex justify-between"
          >
            <div className="text-white">
              <div><strong>EN:</strong> {project.title.en}</div>
              <div><strong>FR:</strong> {project.title.fr}</div>
            </div>
            <button
              onClick={() => handleDeleteProject(project._id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-white">Add New Project</h3>
        
        <div className="mt-4">
          <h4 className="text-white">Title</h4>
          <input
            type="text"
            placeholder="Title (English)"
            className="w-full p-2 rounded mt-2"
            value={newProject.title.en}
            onChange={(e) => handleInputChange("title", e.target.value, "en")}
          />
          <input
            type="text"
            placeholder="Title (French)"
            className="w-full p-2 rounded mt-2"
            value={newProject.title.fr}
            onChange={(e) => handleInputChange("title", e.target.value, "fr")}
          />
        </div>

        <div className="mt-4">
          <h4 className="text-white">Description</h4>
          <textarea
            placeholder="Description (English)"
            className="w-full p-2 rounded mt-2"
            rows={3}
            value={newProject.description.en}
            onChange={(e) => handleInputChange("description", e.target.value, "en")}
          />
          <textarea
            placeholder="Description (French)"
            className="w-full p-2 rounded mt-2"
            rows={3}
            value={newProject.description.fr}
            onChange={(e) => handleInputChange("description", e.target.value, "fr")}
          />
        </div>

        <div className="mt-4">
          <h4 className="text-white">URLs</h4>
          <input
            type="text"
            placeholder="Image URL"
            className="w-full p-2 rounded mt-2"
            value={newProject.image_url}
            onChange={(e) => handleInputChange("image_url", e.target.value)}
          />
          <input
            type="text"
            placeholder="Project URL"
            className="w-full p-2 rounded mt-2"
            value={newProject.project_url}
            onChange={(e) => handleInputChange("project_url", e.target.value)}
          />
        </div>

        <div className="mt-4">
          <h4 className="text-white">Tech Stack</h4>
          <input
            type="text"
            placeholder="Tech Stack (comma-separated)"
            className="w-full p-2 rounded mt-2"
            value={newProject.tech_stack.join(", ")}
            onChange={(e) =>
              handleInputChange(
                "tech_stack",
                e.target.value.split(",").map((tech) => tech.trim())
              )
            }
          />
        </div>

        <button
          onClick={handleCreateProject}
          className="bg-green-500 text-white p-2 rounded mt-4"
        >
          Create Project
        </button>
      </div>
    </div>
  );
}