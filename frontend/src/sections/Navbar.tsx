import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { FloatingNav } from "../components/ui/floating-navbar";

export default function Navbar() {
  const { isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
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

  const navItems = [
    { name: "Home", link: "#home" },
    { name: "About", link: "#about" },
    { name: "Projects", link: "#projects" },
    { name: "Education", link: "#education" },
    { name: "Contact", link: "#contact" },
    { name: "Comments", link: "#comments" },
  ];

  // ✅ Only add "Admin" tab if the user is an admin
  if (isAdmin) {
    navItems.push({ name: "Admin", link: "#admin" });
  }

  return <FloatingNav navItems={navItems} />;
}
