import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Hero from "./pages/Hero";
import DetailedProjectPageWrapper from "./pages/DetailedProjectPageWrapper";

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route
          path={"/project/:projectId"}
          element={<DetailedProjectPageWrapper />}
        />
      </Routes>
    </Router>
  );
};

export default App;
