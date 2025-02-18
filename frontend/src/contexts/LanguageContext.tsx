import { createContext, useContext, useState, ReactNode } from "react";

// Define available languages
type Language = "en" | "fr";

// Context Type
interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

// Create Context
const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

// Provider Component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem("language") as Language) || "en";
  });

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom Hook to use the context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
