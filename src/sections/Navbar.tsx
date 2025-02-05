import { FloatingNav } from "../components/ui/floating-navbar";
import { BrowserRouter } from "react-router-dom";

export default function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "#",
    },
    {
      name: "About",
      link: "#",
    },
    {
      name: "Projects",
      link: "#",
    },
    {
      name: "Education",
      link: "#",
    },
    {
      name: "Contact",
      link: "#",
    },
    {
      name: "Comments",
      link: "#",
    },
  ];
  return (
    <BrowserRouter>
      <FloatingNav navItems={navItems} />
    </BrowserRouter>
  );
}
