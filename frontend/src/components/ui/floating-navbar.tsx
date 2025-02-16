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
    saveAs("/pdf/ThomasResume.pdf", "ThomasResume.pdf");
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex flex-wrap max-w-full md:max-w-fit fixed top-10 inset-x-0 mx-auto border border-white/[0.2] rounded-full bg-black shadow-md z-[5000] px-4 md:px-8 py-2 items-center justify-center gap-2 md:space-x-4",
          className
        )}
      >
        {/* Section Links */}
        {navItems.map((navItem, index) => (
          <a
            key={index}
            href={navItem.link}
            className="text-neutral-50 text-xs md:text-sm flex items-center hover:text-neutral-300"
          >
            <span>{navItem.icon}</span>
            <span className="ml-1">{navItem.name}</span>
          </a>
        ))}

        {/* Download CV Button */}
        <button
          onClick={handleDownloadCV}
          className="border text-xs md:text-sm font-medium border-white/[0.2] text-white px-3 py-1 md:px-4 md:py-2 rounded-full"
        >
          Download CV
        </button>

        {/* Auth0 Login/Logout Buttons */}
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </motion.div>
    </AnimatePresence>
  );
};
