import React, { createContext, useState, useContext } from "react";

// Create UserContext
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading] = useState(true);

  // Log out user
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for accessing UserContext
export const useUser = () => useContext(UserContext);

export default UserContext;
