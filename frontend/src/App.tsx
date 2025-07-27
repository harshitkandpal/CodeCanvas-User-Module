import { Navbar } from "./components/customUI/Navbar";
import { HomePage } from "./pages/home/HomePage";
import { HomePageLoggedIn } from "./pages/home/HomePageLoggedIn";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Register } from "./pages/register/Register";
import { Login } from "./pages/login/Login";


function App() {
  
  const {isLoggedIn} = useAuth();
  
  return (
    <div className="min-h-screen">
      <Navbar/>
      <Routes>
        {isLoggedIn ? 
          <Route path="/" element={<HomePageLoggedIn/>}/> : 
          <Route path="/" element={<HomePage/>}/>
        }
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element = {<Login/>}/>
      </Routes>


    </div>

  );
}

export default App;
