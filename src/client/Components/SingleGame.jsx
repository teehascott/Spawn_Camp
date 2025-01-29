import { Box, Button, CardHeader } from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { FormControlLabel, Checkbox } from "@mui/material";

const SingleGame = () => {
  const [game, setGame] = useState([]);
  const [comments, setComments] = useState([]);
  const routeParams = useParams();
  const gameId = parseInt(routeParams["gameId"]);
  console.log(gameId);
  const [gameComment, setGameComment] = useState("");
  const { user } = useUser();
  const handleCommentChange = (e) => {
    setGameComment(e.target.value);
  };
  useEffect(() => {
    if(!user) return;
    refreshComments();
    fetch("/api/post/game", {}).then((response) => {
      response
        .json()
        .then((data) => {
          console.log(data);
          const foundGame = data.find((game) => game.gameId === gameId);
          console.log(foundGame);
          setGame(foundGame);
        })
        .then(() => {
          fetch(`/api/user/${user.id}/bookmarks/${gameId}`, {}).then(
            (response) => {
              response.json().then((data) => {
                setBookmarked(data);
              });
            }
          );
        });
    });
  }, [user]);
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
    })
      .then((response) => console.log(response.json()))
      .then(() => {
        refreshComments();
      });
  };

  const [bookmarked, setBookmarked] = useState(false);
  const toggleBookmark = async (event) => {
    if (!event.target.checked) {
      // Remove bookmark
      await fetch(`/api/user/${user.id}/bookmarks/${gameId}`, {
        method: "DELETE",
      });
      setBookmarked(false);
    } else {
      // Add bookmark
      console.log(user);
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, gameId }),
      });
      if (res.ok) setBookmarked(true);
    }
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
        <FormControlLabel
          control={<Checkbox checked={bookmarked} onChange={toggleBookmark} />}
          label="Bookmarked"
        />
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
                <CardContent
                  style={{
                    backgroundColor: "#333333",
                    minWidth: "200px",
                    minHeight: "75px",
                  }}
                >
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
