import React, { useState } from 'react'
import { Outlet, Routes } from 'react-router-dom'
import { Sidemenu } from '../common/sidemenu/Sidemenu'
import { Topbar } from '../common/topbar/Topbar';
import { useTheme } from '../../context/themeContext/ThemeContext';



function PublicAuth() {
  const [isExpanded, setIsExpanded] = useState(true);
  const { theme } = useTheme();
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };


  return (
    <div
      className={theme === "light" ? "App" : "darkMode App"}
      style={{ backgroundColor: "f3f3f9" }}
    >
      <Sidemenu
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        toggleSidebar={toggleSidebar}
      />
      <div style={{ marginBottom: "50px", backgroundColor: "white" }}></div>
      <main
        className={theme === "light" ? "content" : "darkMode content"}
        style={{ overflow: "auto" }}
      >
        <Topbar
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          toggleSidebar={toggleSidebar}
        />
         <div className="mt-5 pt-5">
          {/* hdsbjvbfj  */}
          <Outlet/>
         </div>
      </main>

    </div>

  )
}

export default PublicAuth;