import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL + "/education";

// Define TypeScript types
type EducationType = {
  _id?: string;
  institution: string;
  degree?: string;
  field_of_study: string;
  start_date: string;
  end_date?: string;
  description?: string;
};

export default function EducationAdmin() {
  const [education, setEducation] = useState<EducationType[]>([]);
  const [newEducation, setNewEducation] = useState<EducationType>({
    institution: "",
    degree: "",
    field_of_study: "",
    start_date: "",
    end_date: "",
    description: "",
  });

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: EducationType[]) => setEducation(data))
      .catch((err) => console.error("Error fetching education:", err));
  }, []);

  const handleCreateEducation = () => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEducation),
    })
      .then((res) => res.json())
      .then((data: EducationType) => setEducation([...education, data]))
      .catch((err) => console.error("Error creating education:", err));
  };

  const handleDeleteEducation = (id: string) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() =>
        setEducation((prevEducation) =>
          prevEducation.filter((edu) => edu._id !== id)
        )
      )
      .catch((err) => console.error("Error deleting education:", err));
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white">Manage Education</h2>

      <div className="mt-4 space-y-4">
        {education.map((edu) => (
          <div
            key={edu._id}
            className="bg-gray-700 p-4 rounded flex justify-between"
          >
            <span className="text-white">{edu.institution}</span>
            <button
              onClick={() => handleDeleteEducation(edu._id!)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-white">Add New Education</h3>
        <input
          type="text"
          placeholder="Institution"
          className="w-full p-2 rounded mt-2"
          value={newEducation.institution}
          onChange={(e) =>
            setNewEducation({ ...newEducation, institution: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Degree"
          className="w-full p-2 rounded mt-2"
          value={newEducation.degree || ""}
          onChange={(e) =>
            setNewEducation({ ...newEducation, degree: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Field of Study"
          className="w-full p-2 rounded mt-2"
          value={newEducation.field_of_study}
          onChange={(e) =>
            setNewEducation({ ...newEducation, field_of_study: e.target.value })
          }
        />
        <input
          type="date"
          placeholder="Start Date"
          className="w-full p-2 rounded mt-2"
          value={newEducation.start_date}
          onChange={(e) =>
            setNewEducation({ ...newEducation, start_date: e.target.value })
          }
        />
        <input
          type="date"
          placeholder="End Date"
          className="w-full p-2 rounded mt-2"
          value={newEducation.end_date || ""}
          onChange={(e) =>
            setNewEducation({ ...newEducation, end_date: e.target.value })
          }
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 rounded mt-2"
          value={newEducation.description || ""}
          onChange={(e) =>
            setNewEducation({ ...newEducation, description: e.target.value })
          }
        ></textarea>
        <button
          onClick={handleCreateEducation}
          className="bg-green-500 text-white p-2 rounded mt-2"
        >
          Create
        </button>
      </div>
    </div>
  );
}
