
import { Box, Button } from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel } from "@mui/material";
import { useState } from "react";

const Discform = () => {
  const [discTitle, setDiscTitle] = useState("");
  const handleTitleChange = (e) => {
    setDiscTitle(e.target.value);
  };
  const [discPost, setDiscPost] = useState("");
  const handlePostChange = (e) => {
    setDiscPost(e.target.value);
  };
  const handleSubmit = () => {
    fetch("/api/post/disc", {
      body: JSON.stringify({
        title: discTitle,
        content: discPost,
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
            value={discTitle}
            onChange={handleTitleChange}
          />
        </FormControl>
        <TextField
          id="outlined-multiline-static"
          label="Make a Discussion Post"
          multiline
          rows={4}
          defaultValue="Text Here"
          sx={{ width: "50%" }}
          value={discPost}
          onChange={handlePostChange}
          style={{
            backgroundColor: "#90708c",
            outlineColor: "#755a71",
          }}
        />
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </Box>
    </Box>
  );
};

export default Discform; // Ensure it's exported as default
