import React from 'react';
import { Container, Typography } from '@mui/material';

const DetailedProjectPage = ({ project }) => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {project.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {project.description}
      </Typography>
    </Container>
  );
};

export default DetailedProjectPage;
