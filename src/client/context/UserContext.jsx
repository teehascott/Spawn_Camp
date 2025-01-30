import React, { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";


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

// Remove children warming
UserProvider.propTypes = {
  children: PropTypes.node,
};

// Custom hook for accessing UserContext
export const useUser = () => useContext(UserContext);

export default UserContext;
