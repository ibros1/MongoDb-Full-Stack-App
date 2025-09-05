import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("expirationTime");
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedExpirationTime = localStorage.getItem("expirationTime");
    const currentTime = new Date().getTime();
    if (currentTime < storedExpirationTime) {
      setUser(storedUser);
    } else {
      logout();
    }
  }, []);

  const login = (userData, expiresIn) => {
    const expirationTime = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("expirationTime", expirationTime.toString());

    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const UseUser = () => {
  return useContext(UserContext);
};

export default UserContext;
