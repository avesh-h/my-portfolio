import React from "react";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import projectsData from "../json/projectsData.json";
import MuiHeading from "../components/mui/MuiHeading";

const styles = {
  cardContainer: {
    backgroundColor: "#111",
    color: "#fff",
    marginBottom: 1,
    border: "none",
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
};

const ProjectListingPage = () => {
  return (
    <Container sx={{ marginTop: "20px", padding: 0 }}>
      <MuiHeading>Projects</MuiHeading>
      <Grid container spacing={1}>
        {projectsData.projects.map((project, index) => (
          <Grid item xs={12} key={`${project.id}-${index}`}>
            <Card variant="outlined" sx={styles.cardContainer}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  <Link
                    to={`/project/${project.id}`}
                    style={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.name}
                  </Link>
                </Typography>
                <Typography variant="body2">{project.summary}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProjectListingPage;
