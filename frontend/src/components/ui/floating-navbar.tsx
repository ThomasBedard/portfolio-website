"use client";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import LoginButton from "./login-button";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./logout-button";
import { saveAs } from "file-saver";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { isAuthenticated } = useAuth0();

  const handleDownloadCV = () => {
    saveAs("public/pdf/ThomasResume.pdf", "ThomasResume.pdf");
  };

  return (
    <AnimatePresence mode="wait">
      {/* Static Navbar (No scroll behavior) */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-white/[0.2] rounded-full bg-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        {/* Fixed: Add Unique Key Prop */}
        {navItems.map((navItem, index) => (
          <a
            key={index} // Unique key added here
            href={navItem.link}
            className={cn(
              "relative text-neutral-50 items-center flex space-x-1 hover:text-neutral-300"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </a>
        ))}

        {/* Download CV Button */}
        <button
          onClick={handleDownloadCV}
          className="border text-sm font-medium relative border-white/[0.2] text-white px-4 py-2 rounded-full"
        >
          <span>Download CV</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
        </button>

        {/* Auth0 Login/Logout Buttons */}
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </motion.div>
    </AnimatePresence>
  );
};
