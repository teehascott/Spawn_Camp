// src/client/Components/Gameform.jsx
import { Box, Button } from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel } from "@mui/material";
import { useState } from "react";

const Gameform = () => {
  const [gameTitle, setGameTitle] = useState("");
  const handleTitleChange = (e) => {
    setGameTitle(e.target.value);
  };
  const [gameName, setGameName] = useState("");
  const handleNameChange = (e) => {
    setGameName(e.target.value);
  };
  const [gameURL, setGameURL] = useState("");
  const handleURLChange = (e) => {
    setGameURL(e.target.value);
  };
  const [gamePost, setGamePost] = useState("");
  const handlePostChange = (e) => {
    setGamePost(e.target.value);
  };
  const handleSubmit = () => {
    fetch("/api/post/game", {
      body: JSON.stringify({
        title: gameTitle,
        gameName: gameName,
        gameURL: gameURL,
        content: gamePost,
        userId: 1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
  })
  .then((response) => console.log(response.json()))
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
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          padding: "20px",
          flexDirection: "column",
        }}
      >
        <FormControl>
          <InputLabel></InputLabel>
          <TextField
            label="Title"
            variant="outlined"
            value={gameTitle}
            onChange={handleTitleChange}
          />
        </FormControl>
        <FormControl>
          <InputLabel></InputLabel>
          <TextField
            label="Game Name"
            variant="outlined"
            value={gameName}
            onChange={handleNameChange}
          />
        </FormControl>
        <FormControl>
          <InputLabel></InputLabel>
          <TextField
            label="Game URL"
            variant="outlined"
            value={gameURL}
            onChange={handleURLChange}
          />
        </FormControl>
        <TextField
          id="outlined-multiline-static"
          label="Make a Game Post"
          multiline
          rows={4}
          defaultValue="Text Here"
          sx={{ width: "50%" }}
          value={gamePost}
          onChange={handlePostChange}
        />
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </Box>
    </Box>
  );
};

export default Gameform; // Ensure it's exported as default
