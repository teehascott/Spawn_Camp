import React from "react";
import { Box, Typography } from "@mui/material";
import { useUser } from "../context/UserContext";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user } = useUser();
  console.log(user);
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {user && (
          <>
            <Avatar
              sx={{ bgcolor: deepOrange[500] }}
              onClick={() => handleNavigation("profile")}
            >
              N
            </Avatar>
            <Chip
              label={user?.username}
              onClick={() => handleNavigation("profile")}
            />
          </>
        )}
      </Box>
      <Typography variant="h3">SpawnCamp</Typography>
      <Box
        sx={{
          width: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      ></Box>
    </Box>
  );
}
