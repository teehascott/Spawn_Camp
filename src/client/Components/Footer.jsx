import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <footer>
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
      <Button variant="contained" onClick={() => handleNavigation("/")}>
        Home
      </Button>
      <div>
          © 2025 by Forever Sleep Gaming
          </div>
    </Box>
    </footer>
  );
}
