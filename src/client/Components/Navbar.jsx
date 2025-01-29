import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { useUser } from "../context/UserContext";


export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const handleNavigation = (path) => {
    navigate(path);
  };
 const handleLoginLogout = () => {
    if (user) {
      logout();
    } else {
      handleNavigation("/login");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        padding: "20px",
      }}
    >
      <Button variant="contained" onClick={() => handleLoginLogout()}>
        {user ? "Logout" : "Login"}
      </Button>
      <Button variant="contained" disabled= {!user} onClick={() => handleNavigation("/post")}>
        Make a Post
      </Button>
      <Button variant="contained" onClick={() => handleNavigation("/")}>
        Home
      </Button>
    </Box>
  );
}
