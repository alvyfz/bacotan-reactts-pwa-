import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import { Grid } from "@mui/material";
import "./App.css";
import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import { indigo } from "@mui/material/colors";
import FirstPage from "./firstPage/FirstPage";
const App: FC = () => {
  const theme: Theme = createTheme({
    palette: {
      primary: {
        main: "#3E62C1",
        dark: indigo[600],
        light: "#6A8CE5",
      },
      secondary: {
        main: "#C19D3E",
        dark: "#B1850F",
        light: "#E9BF50",
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container className="mainContainer">
          <Grid item xs={0} md={4}>
            {" "}
          </Grid>
          <Grid item xs={12} md={4} className="mainGrid">
            {" "}
            <Routes>
              <Route path="/" element={<FirstPage />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Grid>
          <Grid item xs={0} md={4}>
            {" "}
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default App;
