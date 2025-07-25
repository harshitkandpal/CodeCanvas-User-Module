import { CircleUserRound } from "lucide-react"
import { ThemeToggleButton } from "./ThemeToggleButton"

export const Navbar : React.FC = () => {

    return (
        <nav className="flex px-2 justify-center items-center bg-secondary text-foreground">
            <div className="w-32 flex justify-around items-center">
                <div>item</div>
                <div>item</div>
            </div>
            <div className="grow"></div>
            <div className="flex justify-around items-center">
                <div className="w-3xs flex justify-around items-center">                    <div>item</div>
                    <div>item</div>
                    <div><ThemeToggleButton/></div>
                </div>
                <div>
                    {/* <img src="" alt="" srcset="" /> */}
                    <CircleUserRound
                        size={48}
                        strokeWidth={1}
                    />
                </div>
            </div>
        </nav>
    )
}