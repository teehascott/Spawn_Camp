import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, FormControl, InputLabel } from "@mui/material";
import { useUser } from "../context/UserContext";

const Loginform = () => {
  const [email, setEmail] = useState(""); // Updated to "email" for clarity
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); //errorMessage,
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    fetch("/api/auth/login", {
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUser(data);
        navigate("/profile");
      })
      .catch((error) => {
        setErrorMessage(
          error.message || "Something went wrong. Please try again."
        );
      })
      .finally(() => {});
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
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
          />
        </FormControl>
        <FormControl>
          <InputLabel></InputLabel>
          <TextField
            label="Password"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
          />
        </FormControl>
        <Button variant="contained" onClick={handleSubmit}>
          Log in
        </Button>
      </Box>
    </Box>
  );
};
export default Loginform;
