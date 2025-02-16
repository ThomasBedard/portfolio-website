import { FloatingNav } from "../components/ui/floating-navbar";
import { BrowserRouter } from "react-router-dom";

export default function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "#home",
    },
    {
      name: "About",
      link: "#about",
    },
    {
      name: "Projects",
      link: "#projects",
    },
    {
      name: "Education",
      link: "#education",
    },
    {
      name: "Contact",
      link: "#contact",
    },
    {
      name: "Comments",
      link: "#comments",
    },
  ];
  return (
    <BrowserRouter>
      <FloatingNav navItems={navItems} />
    </BrowserRouter>
  );
}
