import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Homescreen from "./screens/Homescreen";
import Bookingscreen from "./screens/Bookingscreen";
import Registerscreen from "./screens/Registerscreen";
import Loginscreen from "./screens/Loginscreen";
import Profilescreen from "./screens/Profilescreen";
import Adminscreen from "./screens/Adminscreen";
import Landingscreen from "./screens/Landingscreen";


function App() {

  return (
    <div className="App">
          <Router>
<Navbar/>
        <Routes>
        <Route path="/home" element={<Homescreen/>} />
        <Route  path='/book/:placeid/:fromdate/:fromtime' exact Component={Bookingscreen}/>
        <Route path="/register" exact Component={Registerscreen}/>
        <Route path="/login" exact Component={Loginscreen}/>
        <Route path="/profile" exact Component={Profilescreen}/>
        <Route path="/admin" exact Component={Adminscreen}/>
        <Route path="/" exact Component={Landingscreen}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
