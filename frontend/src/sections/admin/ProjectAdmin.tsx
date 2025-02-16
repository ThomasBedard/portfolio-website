import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL + "/projects";

// Define TypeScript types
type ProjectType = {
  _id: string;
  title: string;
  description: string;
  image_url: string;
  project_url: string;
  tech_stack: string[];
};

export default function ProjectAdmin() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [newProject, setNewProject] = useState<ProjectType>({
    _id: "",
    title: "",
    description: "",
    image_url: "",
    project_url: "",
    tech_stack: [],
  });

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: ProjectType[]) => setProjects(data)) // Fix `data` type
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  const handleCreateProject = () => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProject),
    })
      .then((res) => res.json())
      .then((data: ProjectType) => setProjects([...projects, data])) // Fix `data` type
      .catch((err) => console.error("Error creating project:", err));
  };

  const handleDeleteProject = (id: string) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() =>
        setProjects((prevProjects) => prevProjects.filter((p) => p._id !== id))
      )
      .catch((err) => console.error("Error deleting project:", err));
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white">Manage Projects</h2>

      <div className="mt-4 space-y-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-gray-700 p-4 rounded flex justify-between"
          >
            <span className="text-white">{project.title}</span>
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
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 rounded mt-2"
          value={newProject.title}
          onChange={(e) =>
            setNewProject({ ...newProject, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          className="w-full p-2 rounded mt-2"
          value={newProject.description}
          onChange={(e) =>
            setNewProject({ ...newProject, description: e.target.value })
          }
        />
        <button
          onClick={handleCreateProject}
          className="bg-green-500 text-white p-2 rounded mt-2"
        >
          Create
        </button>
      </div>
    </div>
  );
}
