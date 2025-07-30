import { CircleUserRound, Divide } from "lucide-react"
import { ThemeToggleButton } from "./ThemeToggleButton"
import { Link } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import logo from "@/assets/main.svg"

export const Navbar : React.FC = () => {
    const {isLoggedIn} = useAuth()

    return (
        <nav className="flex px-2 justify-center items-center bg-background text-foreground border-2">
            <div className="w-24 flex justify-around items-center">
                {isLoggedIn && <div>item</div>}
                <Link to="/"><img src={logo} alt="CodeCanvas Logo" className="w-12 h-12" /></Link>
            </div>
            <div className="grow"></div>
            <div className="flex justify-around items-center">
                <div className="w-3xs flex justify-around items-center">                    
                    <div>item</div>
                    <div>item</div>
                    <div><ThemeToggleButton/></div>
                </div>
                <div><Link to={isLoggedIn?"profile":"login"}>
                        {/* <img src="" alt="" srcset="" /> */}
                        <CircleUserRound
                            size={48}
                            strokeWidth={1}
                        />
                </Link></div>
            </div>
        </nav>
    )
}