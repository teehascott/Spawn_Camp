import { Box, Button, CardHeader } from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

const SingleDisc = () => {
  const [disc, setDisc] = useState([]);
  const [comments, setComments] = useState([]);
  const routeParams = useParams();
  const discId = parseInt(routeParams["discId"]);
  console.log(discId);
  const [discComment, setDiscComment] = useState("");
  const handleCommentChange = (e) => {
    setDiscComment(e.target.value);
  };
  useEffect(() => {
    refreshComments();
    fetch("/api/post/disc", {}).then((response) => {
      response.json().then((data) => {
        console.log(data);
        const foundDisc = data.find((disc) => disc.discId === discId);
        console.log(foundDisc);
        setDisc(foundDisc);
      });
    });
  }, []);
  const refreshComments = () => {
    fetch(`/api/disc/${discId}/comments`, {}).then((response) => {
      response.json().then((data) => {
        console.log(data);
        setComments(data.sort((a, b) => b.id - a.id));
      });
    });
  };
  const handleSubmit = () => {
    fetch("/api/comments", {
      body: JSON.stringify({
        discId: discId,
        content: discComment,
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
          <CardHeader title={disc?.title}></CardHeader>
          <CardContent>
            <Typography variant="body1">{disc?.content}</Typography>
          </CardContent>
        </Card>
        <TextField
          id="outlined-multiline-static"
          label="Make a Comment"
          multiline
          rows={4}
          sx={{ width: "50%" }}
          value={discComment}
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
export default SingleDisc;