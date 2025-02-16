import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero/Hero";
import Projects from "./sections/Projects/Projects";
import Education from "./sections/Education/Education";
import Contact from "./sections/Contact/Contact";
import About from "./sections/About/About";
import Testimonials from "./sections/Testimonials/Testimonials";
import Admin from "./sections/Admin";

function App() {
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

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Education />
      <Contact />
      <Testimonials />

      {/* ✅ Only show the admin section if the user is an admin */}
      {isAdmin && <Admin />}
    </>
  );
}

export default App;
