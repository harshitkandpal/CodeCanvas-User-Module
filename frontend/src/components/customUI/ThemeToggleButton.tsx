import { useTheme } from "@/context/theme-context"
import { Sun, SunMoon } from "lucide-react";

export const ThemeToggleButton : React.FC = () => {
    const {theme, toggleTheme} = useTheme();
    return(
        
        <div
            className="bg-secondary" 
            onClick={toggleTheme}>
            {theme === "light"?<Sun size={24} strokeWidth={1} className=""/>:<SunMoon size={24} strokeWidth={1} className=""/>}
        </div>
    )
}   