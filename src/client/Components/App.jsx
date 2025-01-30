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
import SingleDisc from "./SingleDisc";
import Loginform from "./Loginform";

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#2fa885", // Dark Greenish Blue
      },
      secondary: {
        main: "#FF8581", // Coral
      },
      background: {
        default: "#2fa885",
        paper: "#050505",
      },
      text: {
        primary: "#ffffff",
        secondary: "#eeeeee",
      },
    },
    typography: {
      fontFamily: "Smooch Sans, Roboto, Arial, sans-serif",
      fontSize: 22,
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
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Loginform />} />
                <Route path="/post" element={<Makepost />} />
                <Route path="/post/game">
                  <Route path="" element={<Gameform />} />
                  <Route path=":gameId" element={<SingleGame />} />
                </Route>
                <Route path="/post/disc" >
                <Route path="" element={<Discform />} />
                <Route path=":discId" element={<SingleDisc />} />
                </Route>
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
