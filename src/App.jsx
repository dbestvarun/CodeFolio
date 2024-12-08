import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Change Switch to Routes
import LoginPage from './Components/LogIn/LoginPage.jsx';
import Header from "./Components/Header/Header.jsx";
import Sidebar from './Components/Sidebar/Sidebar.jsx';
import Main from './ui/Main.jsx';
import Content from './ui/Content.jsx';
import Profile from './Components/Profile/Profile.jsx';
import VerifyPage from './Components/LogIn/VerifyPage.jsx'; // Import the VerifyPage
import StatsCards from './Components/Statistics/StatsCards.jsx';
import ActivityHeatmap from './Components/Statistics/ActivityHeatmap.jsx';
import RatingGraph from './Components/Statistics/RatingGraph.jsx';
import { ProgressCircles } from './Components/Statistics/ProgressCircles.jsx';
import NewPlatformPage from './Components/Profile/NewPlatformPage.jsx'
const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication state
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
          <Route path="/" element={isLoggedIn ? (
            <>
              {/* Render Dashboard when logged in */}
              <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} toggleSidebar={toggleSidebar} handleLogout={handleLogout} />
              <Sidebar isSidebarOpen={isSidebarOpen} />
              <Main isSidebarOpen={isSidebarOpen}>
                <Content>
                <div className="flex">
                    {/* <ProfileSidebar /> */}
                    <div className="flex-1   p-6 space-y-6">
                      <StatsCards />
                      <ActivityHeatmap />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <RatingGraph />
                        <ProgressCircles />
                      </div>
                    </div>
                  </div>
                </Content>
                <Profile  /> {/* Pass userEmail to Profile if needed */}
              </Main>
            </>
          ) : (
            <LoginPage handleLogin={handleLogin} />
          )} />
          {/* Route for the Verify Page */}
          <Route path="/verify" element={<VerifyPage handleLogin={handleLogin} />} />
          <Route path="/profile" element={<NewPlatformPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
