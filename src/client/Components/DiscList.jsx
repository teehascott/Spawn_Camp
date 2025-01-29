import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";

export default function DiscList() {
  const [discs, setDisc] = useState([]);
  useEffect(() => {
    fetch("/api/post/disc", {}).then((response) => {
      response.json().then((data) => {
        console.log(data);
        setDisc(data);
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
      {discs.map((disc) => {
        return (
          <Card key={disc.id} style={{backgroundColor: "#333333", minWidth: "350px", minHeight: "150px"}} onClick={() => handleNavigation(`post/disc/${disc.id}`)}>
            <CardContent>
              <Typography variant="h5">{disc.title}</Typography>
              <Typography variant="body1">{disc.content}</Typography>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}
