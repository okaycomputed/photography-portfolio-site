import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const LanguageContext = createContext();

// Export the context as a usable hook
export const useLanguageContext = () => useContext(LanguageContext)

// Provider component
export function LanguageProvider({children}) {
    const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");

    // Save language to localStorage when it changes
    useEffect(() => {
        localStorage.setItem("lang", lang);
    }, [lang]);

    return (
        <LanguageContext.Provider value={{lang, setLang}}>
            {children}
        </LanguageContext.Provider>
    );
}