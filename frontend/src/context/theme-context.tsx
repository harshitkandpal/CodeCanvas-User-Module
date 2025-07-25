import React, {createContext, useContext, useEffect, useState} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getInitialTheme = (): Theme => {
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
        return localStorage.getItem("theme") as Theme;
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
};

export const ThemeProvider: React.FC<{ children: React.ReactNode}> = ({ children}) => {
    const [theme, setThemeState] = useState<Theme>(getInitialTheme());

    useEffect(()=>{
        document.documentElement.className = theme;
        if (typeof localStorage !== "undefined") {
            localStorage.setItem("theme", theme);
        }
    },[theme]);

    const setTheme = (newTheme: Theme) => setThemeState(newTheme);
    const toggleTheme = () => setThemeState(((prev) => prev === "light" ? "dark" : "light"));

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};