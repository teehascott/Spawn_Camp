import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { useUser } from "../context/UserContext";

const Loginform = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // ✅ Keeps track of errors
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = () => {
    fetch("/api/auth/login", {
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid email or password"); // ✅ Handle failed logins properly
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUser(data);
        navigate("/profile");
      })
      .catch((error) => {
        setErrorMessage(
          error.message || "Something went wrong. Please try again."
        );
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
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </FormControl>

        {/* ✅ Display error message if it exists */}
        {errorMessage && (
          <Typography color="error" variant="body2">
            {errorMessage}
          </Typography>
        )}

        <Button variant="contained" onClick={handleSubmit}>
          Log in
        </Button>
      </Box>
    </Box>
  );
};

export default Loginform;
