import React from "react";
import { Box, Typography } from "@mui/material";
import { useUser } from "../context/UserContext";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between", 
        alignItems: "center",
        padding: "10px",
      }}
    >
      {/* Left Side (keeps space even if no user is logged in) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          width: "150px", // Set fixed width to prevent shifting
        }}
      >
        {user ? (
          <>
            <Avatar
              sx={{ bgcolor: "#FF8581" }}
              onClick={() => handleNavigation("profile")}
            >
              {user.username.charAt(0).toUpperCase()} {/* Show first letter */}
            </Avatar>
            <Chip
              label={user.username}
              onClick={() => handleNavigation("profile")}
            />
          </>
        ) : (
          <Box sx={{ width: "150px" }} /> // Empty box to keep spacing
        )}
      </Box>

      <Typography variant="h3" sx={{ flexGrow: 1, textAlign: "center" }}>
        SpawnCamp
      </Typography>

      {/* Right Side */}
      <Box sx={{ width: "150px", padding: "10px" }}></Box>
    </Box>
  );
}

