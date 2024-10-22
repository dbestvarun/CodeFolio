import { useState } from 'react';
import LoginPage from './Components/LoginPage.jsx';
import Header from "./Components/Header/Header.jsx";
import Sidebar from './Components/Sidebar/Sidebar.jsx';
import Main from './ui/main.jsx';
import Content from './ui/Content.jsx';
import Profile from './Components/Profile/Profile.jsx';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Authentication state

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true); // Simulate login (replace with actual login logic)
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Simulate logout
  };

  return (
    <div className={`${darkMode && "dark"}`}>
      {isLoggedIn ? (
        <>
          {/* Render Dashboard when logged in */}
          <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} toggleSidebar={toggleSidebar} />
          <Sidebar isSidebarOpen={isSidebarOpen} />
          <Main isSidebarOpen={isSidebarOpen}>
            <Content>
              Main Content
            </Content>
              <Profile />
          </Main>
        </>
      ) : (
        // Render LoginPage if not logged in
        <LoginPage handleLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
