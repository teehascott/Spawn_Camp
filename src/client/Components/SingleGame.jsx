import { Box, Button, CardHeader } from "@mui/material";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { FormControlLabel, Checkbox } from "@mui/material";

const SingleGame = () => {
  const [game, setGame] = useState(null);
  const [comments, setComments] = useState([]);
  const [gameComment, setGameComment] = useState("");
  const { user } = useUser();
  const { gameId } = useParams();
  const parsedGameId = Number(gameId);

  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    fetch("/api/post/game")
      .then((response) => response.json())
      .then((data) => {
        const foundGame = data.find((game) => game.gameId === parsedGameId);
        setGame(foundGame);
      })
      .catch((error) => console.error("Error fetching game:", error));
  }, [parsedGameId]);

  useEffect(() => {
    refreshComments(); // Always fetch comments even when logged out

    if (user && !isNaN(parsedGameId)) {
      fetch(`/api/user/${user.id}/bookmarks/${parsedGameId}`)
        .then((response) => response.json())
        .then((data) => {
          setBookmarked(data);
        })
        .catch((error) => console.error("Error fetching bookmarks:", error));
    }
  }, [user, parsedGameId]);

  const refreshComments = () => {
    fetch(`/api/game/${parsedGameId}/comments`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setComments(data.sort((a, b) => b.id - a.id));
        } else {
          console.error("Unexpected API response:", data);
          setComments([]);
        }
      })
      .catch((error) => console.error("Error fetching comments:", error));
  };

  const handleSubmit = () => {
    if (!user) {
      alert("You must be logged in to post a comment!");
      return;
    }

    fetch("/api/comments", {
      body: JSON.stringify({
        gameId: parsedGameId,
        content: gameComment,
        userId: user.id,
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    })
      .then(() => refreshComments())
      .catch((error) => console.error("Error submitting comment:", error));
  };

  const toggleBookmark = async (event) => {
    if (!user) {
      alert("You must be logged in to bookmark this game!");
      return;
    }

    if (!event.target.checked) {
      await fetch(`/api/user/${user.id}/bookmarks/${parsedGameId}`, {
        method: "DELETE",
      });
      setBookmarked(false);
    } else {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, gameId: parsedGameId }),
      });
      if (res.ok) setBookmarked(true);
    }
  };

  if (!game) {
    return <Typography variant="h5">Loading game...</Typography>;
  }

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
          <CardHeader title={game.title} />
          <CardContent>
            <Typography variant="h6">{game.gameName}</Typography>
            <Typography variant="h6">{game.gameURL}</Typography>
            <Typography variant="body1">{game.content}</Typography>
          </CardContent>
        </Card>

        {/* Show comment input only if logged in */}
        {user ? (
          <>
            <TextField
              id="outlined-multiline-static"
              label="Make a Comment"
              multiline
              rows={4}
              sx={{ width: "50%" }}
              value={gameComment}
              onChange={(e) => setGameComment(e.target.value)}
              style={{
                backgroundColor: "#fffd98",
                outlineColor: "#fffc4b",
                text: "#050505",
              }}
            />
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>

            <FormControlLabel
              control={
                <Checkbox checked={bookmarked} onChange={toggleBookmark} />
              }
              label="Bookmarked"
            />
          </>
        ) : (
          <Typography variant="body2" color="#FF8581">
            You must be logged in to comment.
          </Typography>
        )}

        {/* Comments always show */}
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
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent
                  style={{
                    backgroundColor: "#114b5f",
                    outlineColor: "#0e3d4d",
                    minWidth: "200px",
                    minHeight: "75px",
                  }}
                >
                  <Typography variant="body1">{comment.content}</Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No comments yet.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SingleGame;
