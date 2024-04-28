import React, { useEffect, useState } from "react";
import { Outlet, Routes } from "react-router-dom";
import Sidemenu from ".././../components/sidemenu/Sidemenu";
import Topbar from ".././../components/topbar/Topbar";
import { useTheme } from "../../../dataLayer/context/themeContext/ThemeContext";
import { Footer } from "../../components/footer/Footer";
import BackButton from "../../components/backbutton/BackButton";
function PanelLayout() {
  const [isExpanded, setIsExpanded] = useState(true);
  useEffect(() => {
    if (window.screen.width < 786) {
      setIsExpanded(false)
    }
    else {
      setIsExpanded(true)

    }
  }, [])

  const { theme } = useTheme();
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div
      className={theme === "light" ? "app" : "darkMode app"}
      style={{ backgroundColor: "f3f3f9" }}
    >
      <Sidemenu
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        toggleSidebar={toggleSidebar}
      />
      <div
        className={` ${theme === "light" ? "content " : "darkMode content"}`}
        style={{ overflow: "auto" }}
      >
        <main className="">
          <Topbar
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            toggleSidebar={toggleSidebar}
          />
          <Outlet />
          <div className="push"></div>
        </main>
        <Footer />


      </div>

    </div>
  );
}

export default PanelLayout;

// import React, { useContext } from 'react';
// import Sidebar from '../common/sidebar/Sidebar';
// import TopBar from '../common/topbar/TopBar';
// import { Outlet } from 'react-router-dom';
// import useOnlineStatus from '../../hooks/isOnline/useOnlineStatus ';
// import { AuthContext } from '../../contexts/authContext/authContext';
// import useServiceWorker from '../../useSw';

// const Layout = () => {
//   const isOnline = useOnlineStatus();
//   const { authState } = useContext(AuthContext);
//   const isLoggedIn = authState?.token ? true : false ?? false;
//   console.log(isOnline, isLoggedIn, 'sw.js', Date.now());
//   const {
//     usingSW,
//     swRegistration,
//     svcworker,
//     sendSWMessage,
//     sendStatusUpdate,
//   } = useServiceWorker(isOnline, isLoggedIn);
//   return (
//     <div className='app'>
//       <Sidebar />
//       <main
//         className='content h-screen bg-[#f8fafc]'
//         style={{ overflow: 'auto' }}
//       >
//         <TopBar />
//         {isOnline ? null : (
//           <span
//             role='img'
//             aria-label='Offline'
//             style={{
//               position: 'fixed',
//               bottom: 0,
//               right: 0,
//               padding: '15px',
//               background: 'red',
//               color: 'white',
//               zIndex: 1000,
//             }}
//           >
//             ⚠️ You are offline
//           </span>
//         )}
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default Layout;
