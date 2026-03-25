import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Hero from "./pages/Hero";
import DetailedProjectPageWrapper from "./pages/DetailedProjectPageWrapper";
import CertificateDetailPage from "./pages/CertificateDetailPage";

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
        <Route
          path={"/certificate/:certificateId"}
          element={<CertificateDetailPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
