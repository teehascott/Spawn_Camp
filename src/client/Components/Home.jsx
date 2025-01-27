import React from "react";
import { Box, Card, Typography } from "@mui/material";
import GameList from "./GameList";
import DiscList from "./DiscList";

export default function Home() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "10px",
      }}
    >
      <GameList />
      <DiscList />
    </Box>
  );
}
