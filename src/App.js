import logo from './logo.svg';
import './App.css';
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";

import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Exercises from "./pages/Exercises";
import React, {useState} from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
        <Router>
            <div>
                <Navigation isLoggedIn={isLoggedIn} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/exercises" element={<Exercises />} />
                    <Route path="/aboutus" element={<AboutUs />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
