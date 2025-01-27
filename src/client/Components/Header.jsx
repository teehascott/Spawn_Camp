import React from "react";
import { Box, Typography } from "@mui/material";
import { useUser } from "../context/UserContext";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Chip from "@mui/material/Chip";

export default function Header() {
  const { user, loading, fetchUser, logout } = useUser();
  console.log(user);
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
            <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
            <Chip label={user?.username} />
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
