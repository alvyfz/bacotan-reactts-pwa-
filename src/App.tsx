import React, { FC } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import FirstPage from "./pages/FirstPage";
import { Grid } from "@mui/material";

const App: FC = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={4}>
          {" "}
        </Grid>
        <Grid item xs={4}>
          {" "}
          <Routes>
            <Route path="/" element={<FirstPage />} />
          </Routes>
        </Grid>
        <Grid item xs={4}>
          {" "}
        </Grid>
      </Grid>
    </>
  );
};

export default App;
