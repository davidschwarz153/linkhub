import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import { WelcomePopup } from "./components/WelcomePopup";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (!hasSeenWelcome) {
      setShowWelcomePopup(true);
      localStorage.setItem("hasSeenWelcome", "true");
    }
  }, []);

  const handleCloseWelcome = () => {
    setShowWelcomePopup(false);
  };

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        {showWelcomePopup && <WelcomePopup onClose={handleCloseWelcome} />}
      </Router>
    </ThemeProvider>
  );
};

export default App;
