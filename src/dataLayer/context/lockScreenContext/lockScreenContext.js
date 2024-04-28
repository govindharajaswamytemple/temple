import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialValue = {
  isActive: true,
  isLocked: false,
  setIsActive: () => {},
  setIsLocked: () => {},
};

export const lockScreenContext = createContext(initialValue);

export const LockScreenProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let inActivityTimer;

    const handleActivity = () => {
      setIsActive(true);
      clearTimeout(inActivityTimer);

      inActivityTimer = setTimeout(() => {
        setIsLocked(true);
        console.log(`Locked inside: ${isLocked}`);
      }, 1800000);
    };

    document.addEventListener("mousemove", handleActivity);
    document.addEventListener("keydown", handleActivity);

    return () => {
      document.removeEventListener("mousemove", handleActivity);
      document.removeEventListener("keydown", handleActivity);
      clearTimeout(inActivityTimer);
    };
  }, [isLocked]);

  useEffect(() => {
    if (isLocked) {
      navigate("/auth/lockscreen");
    }
    setIsLocked(false);
  }, [isLocked]); // isLocked as a dependency

  const value = {
    isActive,
    isLocked,
    setIsLocked,
  };

  return (
    <lockScreenContext.Provider value={value}>
      {children}
    </lockScreenContext.Provider>
  );
};

export const useLockScreenContext = () => {
  const context = useContext(lockScreenContext);
  if (!context) {
    console.error("Context is used out of the lockScreenContext boundary");
    return;
  }
};
