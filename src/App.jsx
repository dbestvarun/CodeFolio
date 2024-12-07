import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Change Switch to Routes
import LoginPage from './Components/LogIn/LoginPage.jsx';
import Header from "./Components/Header/Header.jsx";
import Sidebar from './Components/Sidebar/Sidebar.jsx';
import Main from './ui/Main.jsx';
import Content from './ui/Content.jsx';
import Profile from './Components/Profile/Profile.jsx';
import VerifyPage from './Components/LogIn/VerifyPage.jsx'; // Import the VerifyPage
import Calendar from './Components/Statistics/Calendar.jsx';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Authentication state
  const [userEmail, setUserEmail] = useState(null); // Store the user's email

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogin = (email) => {
    setIsLoggedIn(true); 
    setUserEmail(email); 
    console.log('User logged in:', email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false); 
    setUserEmail(null); 
  };

  return (
    <Router>
      <div className={`${darkMode ? "dark" : ""}`}>
        <Routes>
          {/* Route for the Login Page */}
          <Route path="/" element={isLoggedIn ? (
            <>
              {/* Render Dashboard when logged in */}
              <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} toggleSidebar={toggleSidebar} handleLogout={handleLogout} />
              <Sidebar isSidebarOpen={isSidebarOpen} />
              <Main isSidebarOpen={isSidebarOpen}>
                <Content>
                  < Calendar />
                </Content>
                <Profile userEmail={userEmail} /> {/* Pass userEmail to Profile if needed */}
              </Main>
            </>
          ) : (
            <LoginPage handleLogin={handleLogin} />
          )} />
          {/* Route for the Verify Page */}
          <Route path="/verify" element={<VerifyPage handleLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
