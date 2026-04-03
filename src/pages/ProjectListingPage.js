import { keyframes } from "@emotion/react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import MuiHeading from "../components/mui/MuiHeading";
import projectsData from "../static/projectsData.json";

const rotateBorder = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const CardWrapper = styled(Box)({
  position: "relative",
  borderRadius: "16px",
  padding: "1px",
  overflow: "hidden",
  marginBottom: "12px",
  // "&::before": {
  //   content: '""',
  //   position: "absolute",
  //   width: "200%",
  //   height: "200%",
  //   top: "-50%",
  //   left: "-50%",
  //   background:
  //     "conic-gradient(from 0deg, transparent 0%, transparent 65%, rgba(255,255,255,0.55) 80%, transparent 95%)",
  //   animation: `${rotateBorder} 8s linear infinite`,
  // },
});

const CardBody = styled(Box)({
  position: "relative",
  background: "transparent",
  borderRadius: "15px",
  padding: "20px 24px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  border: "1px solid rgba(255, 255, 255, 0.36)",
});

const TopRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
});

const TechChip = styled(Box)({
  display: "inline-block",
  padding: "3px 10px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.15)",
  background: "rgba(255,255,255,0.04)",
  color: "rgba(255,255,255,0.6)",
  fontSize: "0.72rem",
  fontFamily: "Montserrat",
  marginRight: "6px",
  marginTop: "6px",
});

const ProjectListingPage = () => {
  return (
    <Box sx={{ paddingTop: "1rem" }}>
      <MuiHeading>Projects</MuiHeading>
      {projectsData.projects.map((project) => (
        <Link
          key={project.id}
          to={`/project/${project.id}`}
          style={{ textDecoration: "none", color: "white", display: "block" }}
        >
          <CardWrapper>
            <CardBody>
              <TopRow>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, color: "#fff", lineHeight: 1.3 }}
                >
                  {project.name}
                </Typography>
                <ArrowOutwardIcon
                  sx={{ color: "rgba(255,255,255,0.5)", flexShrink: 0, mt: "4px" }}
                />
              </TopRow>

              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.7,
                  fontSize: "0.88rem",
                  fontFamily: "Montserrat",
                }}
              >
                {project.description}
              </Typography>

              <Box sx={{ mt: "2px" }}>
                {project.technologies.slice(0, 5).map((tech) => (
                  <TechChip key={tech}>{tech}</TechChip>
                ))}
                {project.technologies.length > 5 && (
                  <TechChip>+{project.technologies.length - 5} more</TechChip>
                )}
              </Box>
            </CardBody>
          </CardWrapper>
        </Link>
      ))}
    </Box>
  );
};

export default ProjectListingPage;
