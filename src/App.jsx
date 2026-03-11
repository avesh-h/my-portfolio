import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Hero from "./pages/Hero";
import DetailedProjectPageWrapper from "./pages/DetailedProjectPageWrapper";
import useGetQuery from "./useGetQuery";

const App = () => {
  const data = useGetQuery({
    url: "https://jsonplaceholder.typicode.com/todos",
  });
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
