import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";



export default function Makepost() {
    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
      };
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "10px",
          padding: "20px",
          height: "500px",
        }}
      >

        <Button variant="contained" onClick={() => handleNavigation("/post/game")}>
          Make a Game Post
        </Button>
        <Button variant="contained" onClick={() => handleNavigation("/post/disc")}>
          Make a Discussion Post
        </Button>
      </Box>
    );
  }
  