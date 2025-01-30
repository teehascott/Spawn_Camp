import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";

export default function GameList() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    fetch("/api/post/game", {}).then((response) => {
      response.json().then((data) => {
        console.log(data);
        setGames(data);
      });
    });
  }, []);
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
        padding: "10px",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {games.map((game) => {
        return (
          <Card key={game.gameId} style={{ minWidth: "350px", minHeight: "150px"}} onClick={() => handleNavigation(`post/game/${game.gameId}`)}>
            <CardContent style={{
            backgroundColor: "#ff8581",
            outlineColor: "#fffdbda",
          }}>
              <Typography variant="h5">{game.title}</Typography>
              <Typography variant="h6">{game.gameName}</Typography>
              <Typography variant="h6">{game.gameURL}</Typography>
              <Typography variant="body1">{game.content}</Typography>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}
