// DetailedProjectPageWrapper.js

import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import DetailedProjectPage from "./DetailedProjectPage";
import { projectsContent } from "../static/projectsData.js";

const DetailedProjectPageWrapper = () => {
  const { projectId } = useParams();
  const project = projectsContent?.projects?.find(
    (p) => p.id === parseInt(projectId, 10)
  );
  return (
    <Box sx={{ background: "transparent", minHeight: "100vh" }}>
      {project ? (
        <DetailedProjectPage project={project} />
      ) : (
        <Typography variant="h6" color="error" sx={{ px: 4, py: 4 }}>
          Project not found.
        </Typography>
      )}
    </Box>
  );
};

export default DetailedProjectPageWrapper;
