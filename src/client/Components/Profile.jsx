import { Box, Button, CardHeader } from "@mui/material";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import moment from "moment"; 
import { useUser } from "../context/UserContext";
import Confetti from "react-confetti"; 
import { useWindowSize } from "react-use"; 

const Profile = () => {
  const { user } = useUser();
  const { width, height } = useWindowSize(); // Get screen size for confetti
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [particleCount, setParticleCount] = useState(0); // Controls confetti fade-out

  useEffect(() => {
    if (!user) return;
    refreshComments();

    // Confetti effect
    setParticleCount(600); // Set initial confetti amount
    let fadeOut = setInterval(() => {
      setParticleCount((count) => Math.max(count - 20, 0)); // Decrease particles gradually
    }, 200); // Every 200ms reduce particles

    setTimeout(() => {
      clearInterval(fadeOut); 
      setParticleCount(0);
    }, 4000); // Fully fade out in 4 seconds

    return () => clearInterval(fadeOut); 
  }, [user]);

  const handleCommentChange = (e) => setUserComment(e.target.value);

  const refreshComments = () => {
    fetch(`/api/user/${user.id}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data.sort((a, b) => b.id - a.id)));
  };

  const handleSubmit = () => {
    fetch("/api/comments", {
      body: JSON.stringify({
        userId: user.id,
        content: userComment,
        profileId: user.id,
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    }).then(() => {
      setShowCommentForm(false);
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
      {/* Confetti Effect (Fades Out) */}
      {particleCount > 0 && <Confetti width={width} height={height} numberOfPieces={particleCount} />}

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
          <CardHeader title={`${user?.username || "Unknown User"}'s Profile`} />
          <CardContent style={{
                    backgroundColor: "#114b5f",
                    outlineColor: "#755a71",
                  }}>
            <Typography variant="h6">{user?.username}</Typography>
            <Typography variant="h6">
              Joined: {user?.joinedOn ? moment(user.joinedOn).format("MMMM D, YYYY") : "Unknown"}
            </Typography>
            <Typography variant="body1">
              <p>Bio:</p>{user?.bio}</Typography>
          </CardContent>
        </Card>

        <Button variant="contained" onClick={() => setShowCommentForm((prev) => !prev)}>
          {showCommentForm ? "Cancel" : "Write a Comment"}
        </Button>

        {showCommentForm && (
          <>
            <TextField
              id="outlined-multiline-static"
              label="Make a Comment"
              multiline
              rows={4}
              sx={{ width: "50%" }}
              value={userComment}
              onChange={handleCommentChange}
            />
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </>
        )}

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
            const timeAgo = moment(comment.createdAt).fromNow();
            return (
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
                  <Typography variant="caption" color="textSecondary">
                    {timeAgo}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
