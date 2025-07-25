import { Navbar } from "./components/customUI/Navbar";
import { HomePage } from "./pages/home/HomePage";
import { HomePageLoggedIn } from "./pages/home/HomePageLoggedIn";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";


function App() {
  
  const {isLoggedIn} = useAuth();
  
  return (
    <>
      <Navbar/>
      <Routes>
        {isLoggedIn ? 
          <Route path="/" element={<HomePageLoggedIn/>}/> : 
          <Route path="/" element={<HomePage/>}/>
        }
      </Routes>
    </>

  );
}

export default App;
