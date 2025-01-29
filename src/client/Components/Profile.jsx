import { Box, Button, CardHeader } from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useUser } from "../context/UserContext";


const Profile = () => {
  const { user } = useUser();
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState("");
  const handleCommentChange = (e) => {
    setUserComment(e.target.value);
  };
  useEffect(() => {
    if (!user) return;
    console.log(user);
    refreshComments();
  }, [user]);
  const refreshComments = () => {
    fetch(`/api/user/${user.id}/comments`, {}).then((response) => {
      response.json().then((data) => {
        console.log(data);
        setComments(data.sort((a, b) => b.id - a.id));
      });
    });
  };
  const handleSubmit = () => {
    fetch("/api/comments", {
      body: JSON.stringify({
        userId: user.id,
        content: userComment,
        profileId: user.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
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
          <CardHeader title={`${user?.username || "Unknown User"}'s Profile`} />

          <CardContent>
            <Typography variant="h6">{user?.username}</Typography>
            <Typography variant="h6">{user?.joinedOn}</Typography>
            <Typography variant="body1">{user?.bio}</Typography>
          </CardContent>
        </Card>
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
export default Profile;
