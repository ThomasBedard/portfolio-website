import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import ProjectAdmin from "./admin/ProjectAdmin";
import EducationAdmin from "./admin/EducationAdmin";
import CommentAdmin from "./admin/CommentAdmin";

export default function Admin() {
  const { isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const [selectedTab, setSelectedTab] = useState("projects");
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdminPermission = async () => {
      try {
        const token = await getAccessTokenSilently({ detailedResponse: true });
        if (!token) return;

        const decodedToken = JSON.parse(atob(token.access_token.split(".")[1]));
        const userPermissions = decodedToken.permissions || [];

        setIsAdmin(userPermissions.includes("admin"));
      } catch (error) {
        console.error("Error fetching token:", error);
        setIsAdmin(false);
      }
    };

    if (isAuthenticated && !isLoading) {
      checkAdminPermission();
    }
  }, [isAuthenticated, isLoading, getAccessTokenSilently]);

  if (!isAdmin) {
    return null; // ✅ Don't show anything to normal users
  }

  return (
    <div id="admin" className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-white mb-4">
        Admin Dashboard
      </h1>
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            selectedTab === "projects"
              ? "bg-blue-500 text-white"
              : "bg-gray-700"
          }`}
          onClick={() => setSelectedTab("projects")}
        >
          Projects
        </button>
        <button
          className={`px-4 py-2 rounded ${
            selectedTab === "education"
              ? "bg-blue-500 text-white"
              : "bg-gray-700"
          }`}
          onClick={() => setSelectedTab("education")}
        >
          Education
        </button>
        <button
          className={`px-4 py-2 rounded ${
            selectedTab === "comments"
              ? "bg-blue-500 text-white"
              : "bg-gray-700"
          }`}
          onClick={() => setSelectedTab("comments")}
        >
          Comments
        </button>
      </div>

      {/* Render corresponding admin sections */}
      {selectedTab === "projects" && <ProjectAdmin />}
      {selectedTab === "education" && <EducationAdmin />}
      {selectedTab === "comments" && <CommentAdmin />}
    </div>
  );
}
