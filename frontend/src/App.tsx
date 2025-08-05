import { Navbar } from "./components/customUI/Navbar";
import { HomePage } from "./pages/home/HomePage";
import { HomePageLoggedIn } from "./pages/home/HomePageLoggedIn";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { RegistrationPage } from "./pages/register/page";
import { LoginPage } from "./pages/login/page";
import { Community } from "./pages/community/Community";

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
      <Route path="/register" element={<RegistrationPage/>}/>
      <Route path="/login" element = {<LoginPage/>}/>
      <Route path="/community" element = {<Community/>}/>
      </Routes>


    </div>

  );
}

export default App;
