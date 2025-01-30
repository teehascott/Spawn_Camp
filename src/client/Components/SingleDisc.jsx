import { Box, Button, CardHeader } from "@mui/material";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";

const SingleDisc = () => {
  const [disc, setDisc] = useState(null);
  const [comments, setComments] = useState([]);
  const [discComment, setDiscComment] = useState("");
  const { user } = useUser();
  const { discId } = useParams();


  const parsedDiscId = Number(discId);
  if (isNaN(parsedDiscId)) {
    console.error("Invalid discussion ID:", discId);
  }

  useEffect(() => {
    fetch("/api/post/disc")
      .then((response) => response.json())
      .then((data) => {
        const foundDisc = data.find((disc) => disc.id === parsedDiscId);
        setDisc(foundDisc);
      })
      .catch((error) => console.error("Error fetching discussion:", error));
  }, [parsedDiscId]);

  useEffect(() => {
    if (isNaN(parsedDiscId)) return;
    refreshComments(); // Always fetch comments even when logged out
  }, [parsedDiscId]);

  const refreshComments = () => {
    fetch(`/api/disc/${parsedDiscId}/comments`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data.sort((a, b) => b.id - a.id));
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
        discId: parsedDiscId,
        content: discComment,
        userId: user.id,
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    })
      .then(() => refreshComments())
      .catch((error) => console.error("Error submitting comment:", error));
  };

  if (!disc) {
    return <Typography variant="h5">Loading discussion...</Typography>;
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
          <CardHeader title={disc.title} />
          <CardContent>
            <Typography variant="body1">{disc.content}</Typography>
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
              value={discComment}
              onChange={(e) => setDiscComment(e.target.value)}
              style={{
                backgroundColor: "#fffd98",
                outlineColor: "#fffc4b",
              }}
              
            />
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </>
        ) : (
          <Typography variant="body2" color="#FF8581">
            You must be logged in to comment.
          </Typography>
        )}
        {/* Comments always show*/}
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
          {comments.map((comment) => (
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
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SingleDisc;
