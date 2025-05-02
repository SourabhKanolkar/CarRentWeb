import "../src/dist/styles.css";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Navbar from "../src/components/Navbar";
import { Route, Routes } from "react-router-dom";
import Models from "./Pages/Models";
import TestimonialsPage from "./Pages/TestimonialsPage";
import Team from "./Pages/Team";
import Contact from "./Pages/Contact";
import Register from "./Pages/Register";
import BikePage from "./Pages/BikePage";
import Login from "./Pages/Login";

import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
    <>

      {/* <Navbar /> */}
      {location.pathname !== "/" && <Navbar />}
      <Routes>
      <Route  path="/" element={<Login />} />
      <Route path="Register" element={<Register />}></Route>
        <Route path="home" element={<Home />}/>
        <Route path="about" element={<About />} />
        <Route path="models" element={<Models />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="team" element={<Team />} />
        <Route path="contact" element={<Contact />} />
        <Route path="bikemodel" element={<BikePage />} />
     
        
      </Routes>
    </>
  );
}

export default App;
