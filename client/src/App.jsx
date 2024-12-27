
import {  Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import AboutMe from './components/AboutMe';
import AboutThisApp from './components/AboutThisApp';
import { useEffect, useState } from 'react';
import MobileMsg from './components/MobileMsg';
import Loader from './components/Loader';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {

    const [isMobile, setIsMobile] = useState(false);
   
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768); // Threshold for mobile screens
      };
  
      handleResize(); // Initial check
      window.addEventListener("resize", handleResize); // Check on resize
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 15000); // Simulate a 5-second loading period
      return () => clearTimeout(timer);
    }, []);

    useEffect(()=>{

    })
  
    if (isMobile) {
      return <MobileMsg />;
    }
  
    
  
    if (loading) {
      return <Loader />;
    }

  return (
      <>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/aboutthisapp" element={<AboutThisApp/>} />
      </Routes>
      <Footer />
      </>
  );
};

export default App;
