import React from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

const DetailedProjectPage = ({ project }) => {
  return (
    <Box
      sx={{
        height: "100vh",
        background: "#111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        overflow: "hidden",
        padding: "3rem 8rem"
      }}
    >
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{ maxWidth: 800, background: "#111", color: "white", border: "none", boxShadow: "none" }}>
          <CardMedia
            component="img"
            height="300"
            image={project.image}
            alt={`${project.name} image`}
          />
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {project.name}
            </Typography>
            <Typography variant="body1" paragraph>
              {project.description}
            </Typography>
            <Box mt={3}>
              <Typography variant="h6" gutterBottom>
                Project Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ color: "white" }}>
                    <strong>Start Date:</strong> {project.startDate}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ color: "white" }}>
                    <strong>End Date:</strong> {project.endDate}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ color: "white" }}>
                    <strong>Status:</strong> {project.status}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ color: "white" }}>
                    <strong>Technologies Used:</strong> {project.technologies.join(', ')}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default DetailedProjectPage;
