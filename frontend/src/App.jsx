import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import Services from "./Services";
import Login from "./Login";
import Registeration from "./Registeration";
import Dashboard from "./Dashboard";
import ProfileForm from "./SendDataWithimage";
import MyProfile from './MyProfile';


function App() {
  return (
    <div>
      
    <BrowserRouter>
      <Routes>
       
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registeration/>}/>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<ProfileForm/>} />
        <Route path="/my-profile" element={<MyProfile />} />

      
       
       
    
      </Routes>
    </BrowserRouter>
   
    </div>

  );
}

export default App;
