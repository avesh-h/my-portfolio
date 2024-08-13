import React from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";

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
        padding: { xs: "1rem", sm: "3rem 8rem" }, // Adjusted padding for mobile and tablet views
      }}
    >
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Card
          sx={{
            maxWidth: 800,
            background: "#111",
            color: "white",
            border: "none",
            boxShadow: "none",
          }}
        >
          <Box>
            <CardMedia
              component="img"
              height="300"
              image={project.image}
              alt={`${project.name} image`}
              sx={{ objectFit: "contain" }}
            />
          </Box>
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
                    <strong>Start Date :</strong> {project.startDate}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ color: "white" }}>
                    <strong>End Date :</strong> {project.endDate}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ color: "white" }}>
                    <strong>Status :</strong> {project.status}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <strong>Link : </strong>
                  <Link
                    to={project.link}
                    variant="body2"
                    target="_blank"
                    style={{
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {project.link}
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ color: "white", mb: 2 }}>
                    <strong>Technologies Used:</strong>{" "}
                  </Typography>
                  {project?.technologies?.map((p, i) => {
                    return (
                      <Chip
                        label={p}
                        variant="outlined"
                        key={`${p}-${i}`}
                        sx={{ color: "white", ml: 1.5, my: 1 }}
                      />
                    );
                  })}
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
