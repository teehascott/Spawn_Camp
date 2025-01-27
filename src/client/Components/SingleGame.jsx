import { Box, Button, CardHeader } from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

const SingleGame = () => {
  const [game, setGame] = useState([]);
  const [comments, setComments] = useState([]);
  const routeParams = useParams();
  const gameId = parseInt(routeParams["gameId"]);
  console.log(gameId);
  const [gameComment, setGameComment] = useState("");
  const handleCommentChange = (e) => {
    setGameComment(e.target.value);
  };
  useEffect(() => {
    refreshComments();
    fetch("/api/post/game", {}).then((response) => {
      response.json().then((data) => {
        console.log(data);
        const foundGame = data.find((game) => game.gameId === gameId);
        console.log(foundGame);
        setGame(foundGame);
      });
    });
  }, []);
  const refreshComments = () => {
    fetch(`/api/game/${gameId}/comments`, {}).then((response) => {
      response.json().then((data) => {
        console.log(data);
        setComments(data.sort((a, b) => b.id - a.id));
      });
    });
  };
  const handleSubmit = () => {
    fetch("/api/comments", {
      body: JSON.stringify({
        gameId: gameId,
        content: gameComment,
        userId: 1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((response) => console.log(response.json()))
    .then(() => {
    refreshComments();
    });
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
        <Card>
          <CardHeader title={game?.title}></CardHeader>
          <CardContent>
            <Typography variant="h6">{game?.gameName}</Typography>
            <Typography variant="h6">{game?.gameURL}</Typography>
            <Typography variant="body1">{game?.content}</Typography>
          </CardContent>
        </Card>
        <TextField
          id="outlined-multiline-static"
          label="Make a Comment"
          multiline
          rows={4}
          sx={{ width: "50%" }}
          value={gameComment}
          onChange={handleCommentChange}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
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
          {comments.map((comment) => {
            return (
              <Card key={comment.id}>
                <CardContent style={{backgroundColor: "#333333", minWidth: "200px", minHeight: "75px" }}>
                  <Typography variant="body1">{comment.content}</Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
export default SingleGame;
