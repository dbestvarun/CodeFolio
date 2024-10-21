import { useState } from 'react';
import LoginPage from './Components/LoginPage.jsx';
import Header from "./Components/Header/Header.jsx";
import Sidebar from './Components/Sidebar/Sidebar.jsx';
import Main from './ui/main.jsx';
import Content from './ui/Content.jsx';
import Profile from './Components/Profile/Profile.jsx';

const App = ()=> {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleDarkMode=()=>{
    setDarkMode(!darkMode);
  };

  const toggleSidebar = ()=>{
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className={`${darkMode && "dark"}` }>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen ={isSidebarOpen} />

      <Main>
        <Content>
          Main Content
        </Content>
        <Profile />
      </Main>
    </div>
  )
}

export default App;
