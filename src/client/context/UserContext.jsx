import React, { createContext, useState, useEffect, useContext } from 'react';

// Create UserContext
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data
  const fetchUser = async () => {
    setUser({ username: 'test' });
    setLoading(false);
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   setLoading(false);
    //   return;
    // }

    // try {
    //   const response = await fetch('/api/auth/me', {
    //     method: 'GET',
    //     headers: { Authorization: `Bearer ${token}` },
    //   });

    //   if (!response.ok) throw new Error('Failed to fetch user');
    //   const userData = await response.json();
    //   setUser(userData);
    // } catch (err) {
    //   console.error(err.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  // Log out user
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, fetchUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for accessing UserContext
export const useUser = () => useContext(UserContext);

export default UserContext;
