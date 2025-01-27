import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Profile from "./Profile";
import Home from "./Home";
import Makepost from "./Makepost";
import Gameform from "./Gameform";
import Discform from "./Discform";
import Footer from "./Footer";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Header from "./Header";
import { UserProvider } from "../context/UserContext";
import SingleGame from "./SingleGame";

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#673ab7", // Deep purple
      },
      secondary: {
        main: "#ff9100", // Amber
      },
      background: {
        default: "#121212",
        paper: "#1e1e1e",
      },
      text: {
        primary: "#ffffff",
        secondary: "#eeeeee",
      },
    },
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
      fontSize: 16,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <UserProvider>
          <Container>
            <Paper style={{}}>
              <Header />
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:username/:id" element={<Profile />} />
                <Route path="/post" element={<Makepost />} />
                <Route path="/post/game">
                  <Route path="" element={<Gameform />} />
                  <Route path=":gameId" element={<SingleGame />} />
                </Route>
                <Route path="/post/disc" element={<Discform />} />
              </Routes>
              <Footer />
            </Paper>
          </Container>
        </UserProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
