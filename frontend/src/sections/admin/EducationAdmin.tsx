import { useEffect, useState } from "react";
import { Education, LocalizedContent, getAllEducation, createEducation, deleteEducation } from "../../../db_connect";

export default function EducationAdmin() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [newEducation, setNewEducation] = useState<Education>({
    institution: { en: "", fr: "" },
    degree: { en: "", fr: "" },
    field_of_study: { en: "", fr: "" },
    start_date: "",
    end_date: "",
    description: { en: "", fr: "" },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const data = await getAllEducation();
        setEducations(data);
      } catch (err) {
        console.error("Error fetching education:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  const handleCreateEducation = async () => {
    try {
      const data = await createEducation(newEducation);
      setEducations([...educations, data]);
      
      // Reset form
      setNewEducation({
        institution: { en: "", fr: "" },
        degree: { en: "", fr: "" },
        field_of_study: { en: "", fr: "" },
        start_date: "",
        end_date: "",
        description: { en: "", fr: "" },
      });
    } catch (err) {
      console.error("Error creating education:", err);
    }
  };

  const handleDeleteEducation = async (id?: string) => {
    if (!id) return;
    
    try {
      const success = await deleteEducation(id);
      if (success) {
        setEducations((prevEducations) => prevEducations.filter((edu) => edu._id !== id));
      }
    } catch (err) {
      console.error("Error deleting education:", err);
    }
  };

  const handleInputChange = (
    field: keyof Education, 
    value: string | LocalizedContent,
    language?: "en" | "fr"
  ) => {
    if (
      field === "institution" || 
      field === "degree" || 
      field === "field_of_study" || 
      field === "description"
    ) {
      if (language) {
        setNewEducation({
          ...newEducation,
          [field]: {
            ...(newEducation[field] as LocalizedContent || { en: "", fr: "" }),
            [language]: value
          }
        });
      }
    } else {
      setNewEducation({ ...newEducation, [field]: value });
    }
  };

  if (loading) {
    return <div className="p-4 text-white">Loading education data...</div>;
  }

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white">Manage Education</h2>

      <div className="mt-4 space-y-4">
        {educations.map((education) => (
          <div
            key={education._id}
            className="bg-gray-700 p-4 rounded flex justify-between"
          >
            <div className="text-white">
              <div><strong>EN:</strong> {education.institution.en}</div>
              <div><strong>FR:</strong> {education.institution.fr}</div>
            </div>
            <button
              onClick={() => handleDeleteEducation(education._id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-white">Add New Education</h3>
        
        <div className="mt-4">
          <h4 className="text-white">Institution</h4>
          <input
            type="text"
            placeholder="Institution (English)"
            className="w-full p-2 rounded mt-2"
            value={newEducation.institution.en}
            onChange={(e) => handleInputChange("institution", e.target.value, "en")}
          />
          <input
            type="text"
            placeholder="Institution (French)"
            className="w-full p-2 rounded mt-2"
            value={newEducation.institution.fr}
            onChange={(e) => handleInputChange("institution", e.target.value, "fr")}
          />
        </div>

        <div className="mt-4">
          <h4 className="text-white">Degree</h4>
          <input
            type="text"
            placeholder="Degree (English)"
            className="w-full p-2 rounded mt-2"
            value={newEducation.degree?.en || ""}
            onChange={(e) => handleInputChange("degree", e.target.value, "en")}
          />
          <input
            type="text"
            placeholder="Degree (French)"
            className="w-full p-2 rounded mt-2"
            value={newEducation.degree?.fr || ""}
            onChange={(e) => handleInputChange("degree", e.target.value, "fr")}
          />
        </div>

        <div className="mt-4">
          <h4 className="text-white">Field of Study</h4>
          <input
            type="text"
            placeholder="Field of Study (English)"
            className="w-full p-2 rounded mt-2"
            value={newEducation.field_of_study.en}
            onChange={(e) => handleInputChange("field_of_study", e.target.value, "en")}
          />
          <input
            type="text"
            placeholder="Field of Study (French)"
            className="w-full p-2 rounded mt-2"
            value={newEducation.field_of_study.fr}
            onChange={(e) => handleInputChange("field_of_study", e.target.value, "fr")}
          />
        </div>

        <div className="mt-4">
          <h4 className="text-white">Dates</h4>
          <div className="flex space-x-2">
            <div className="flex-1">
              <label className="block text-white text-sm">Start Date</label>
              <input
                type="date"
                className="w-full p-2 rounded mt-1"
                value={newEducation.start_date}
                onChange={(e) => handleInputChange("start_date", e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-white text-sm">End Date (optional)</label>
              <input
                type="date"
                className="w-full p-2 rounded mt-1"
                value={newEducation.end_date || ""}
                onChange={(e) => handleInputChange("end_date", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-white">Description</h4>
          <textarea
            placeholder="Description (English)"
            className="w-full p-2 rounded mt-2"
            rows={3}
            value={newEducation.description?.en || ""}
            onChange={(e) => handleInputChange("description", e.target.value, "en")}
          />
          <textarea
            placeholder="Description (French)"
            className="w-full p-2 rounded mt-2"
            rows={3}
            value={newEducation.description?.fr || ""}
            onChange={(e) => handleInputChange("description", e.target.value, "fr")}
          />
        </div>

        <button
          onClick={handleCreateEducation}
          className="bg-green-500 text-white p-2 rounded mt-4"
        >
          Create Education
        </button>
      </div>
    </div>
  );
}