import {createContext, useContext, useState,type ReactNode} from "react"

interface AuthContextType {
    isLoggedIn : boolean;
    login:(accessToken: string, refreshToken: string) => void;
    logout: () => void;
    getAccessToken: () => string | null;
    getRefreshToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({children}:AuthProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (accessToken: string, refreshToken: string) => {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        setIsLoggedIn(true);
    }
    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setIsLoggedIn(false);
    }

    const getAccessToken = () => localStorage.getItem("access_token");
    const getRefreshToken = () => localStorage.getItem("refresh_token");

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout, getAccessToken, getRefreshToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
}