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
      name: "Contact",
      link: "#",
    },
  ];
  return (
    <BrowserRouter>
      <FloatingNav navItems={navItems} />
    </BrowserRouter>
  );
}
