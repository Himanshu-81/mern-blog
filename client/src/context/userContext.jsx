import { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLogin, setUserLogin] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserLogin(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUserLogin(true);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    setUserLogin(false);
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ userLogin, user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
