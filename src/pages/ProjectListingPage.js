import React from "react";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import projectsData from "../static/projectsData.json";
import MuiHeading from "../components/mui/MuiHeading";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const styles = {
  cardContainer: {
    backgroundColor: "#111",
    color: "#fff",
    marginBottom: 1,
    // border: "none",
    background: "rgb(185 183 183 / 5%)" /* Transparent white background */,
    backdropFilter: "blur(15px)" /* Blur effect */,
    borderRadius: "15px" /* Optional: rounded corners */,
    padding: "20px" /* Optional: padding inside the card */,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
};

const ProjectListingPage = () => {
  return (
    <Container>
      <MuiHeading>Projects</MuiHeading>
      <Grid container spacing={1}>
        {projectsData.projects.map((project, index) => (
          <Grid item xs={12} key={`${project.id}-${index}`}>
            <Link
              to={`/project/${project.id}`}
              style={styles.link}
              rel="noopener noreferrer"
            >
              <Card variant="outlined" sx={styles.cardContainer}>
                <CardContent
                  sx={{
                    padding: 0,
                    paddingBottom: "0 !important",
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    {project.name}
                  </Typography>
                  <Typography variant="body2">{project.summary}</Typography>
                </CardContent>
                <ArrowOutwardIcon />
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProjectListingPage;
