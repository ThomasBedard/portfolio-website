import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { FloatingNav } from "../components/ui/floating-navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/contexts/translations";

export default function Navbar() {
  const { isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const { language } = useLanguage();
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

  // Update navigation items dynamically based on selected language
  const t = translations[language];

  const navItems = [
    { name: t.home, link: "#home" },
    { name: t.aboutMe, link: "#about" },
    { name: t.projects, link: "#projects" },
    { name: t.education, link: "#education" },
    { name: t.contactMe, link: "#contact" },
    { name: t.comments, link: "#comments" },
  ];

  if (isAdmin) {
    navItems.push({ name: t.admin, link: "#admin" });
  }

  return <FloatingNav navItems={navItems} />;
}
