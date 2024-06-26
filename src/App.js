import React, {useState, useEffect, createContext} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Exercises from './pages/Exercises';
import Register from './pages/Register';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import axios from 'axios';
import LoginForm from "./components/login/LoginForm";

// Definice UserContext mimo komponentu App
export const UserContext = createContext(null);

function App() {
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
            setLoggedInUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLoginSuccess = (user) => {
        setLoggedInUser(user);
        localStorage.setItem('loggedInUser', JSON.stringify(user));
    };

    const handleLogout = () => {
        setLoggedInUser(null);
        localStorage.removeItem('loggedInUser');
    };

    return (
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}> {/* Vložení hodnot do UserContext */}
            <Router>
                <div>
                    <Navigation loggedInUser={loggedInUser} onLogout={handleLogout} />
                    <Routes>
                        <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/exercises" element={<Exercises />} />
                        <Route path="/aboutus" element={<AboutUs />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
