import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const NavbarProfileButton = () => {
  const navigate = useNavigate();

  // User data and authentication state
  const [user, setUser] = useState(null);

  // Fetch user data from the database using Prisma
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace this logic with your actual API call or backend integration
        const response = await fetch("/api/user"); // Your backend API endpoint
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setUser(null);
      }
    };

    fetchUserData();
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="navbar-profile-button">
      {user ? (
        // Display profile avatar and username if logged in
        <div className="profile-info" onClick={() => handleNavigate("/profile")}>
          <img
            src={user.avatar || "https://via.placeholder.com/40"} // Fallback to placeholder
            alt="Profile Avatar"
            className="avatar"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              marginRight: "10px",
              cursor: "pointer",
            }}
          />
          <span>{user.username}</span>
        </div>
      ) : (
        // Display login/register options if not logged in
        <div className="auth-buttons">
          <button
            onClick={() => handleNavigate("/login")}
            className="login-button"
          >
            Log In
          </button>
          <button
            onClick={() => handleNavigate("/register")}
            className="register-button"
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
};

const UserProfile = () => {
  const { username } = useParams(); // Extract the username from the route
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace this with your actual API endpoint
        const response = await fetch(`/api/users/${username}/${id}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [username]);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <img src={user.avatar} alt={`${user.username}'s avatar`} />
    </div>
  );
};

export default { NavbarProfileButton, UserProfile };