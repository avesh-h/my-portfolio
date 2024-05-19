// DetailedProjectPageWrapper.js

import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import DetailedProjectPage from './DetailedProjectPage';
import projectsData from '../json/projectsData.json';

const DetailedProjectPageWrapper = () => {
  const { projectId } = useParams();
  const project = projectsData.projects.find(p => p.id === parseInt(projectId, 10));
  console.log(projectId);
  return (
    <div>
      {project ? (
        <DetailedProjectPage project={project} />
      ) : (
        <Typography variant="h6" color="error">
          Project not found.
        </Typography>
      )}
    </div>
  );
};

export default DetailedProjectPageWrapper;
