import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import MuiHeading from "../components/mui/MuiHeading";
import experienceContent from "../static/experienceSection.json";

const Container = styled(Box)({
  display: "flex",
  alignItems: "start",
  justifyContent: "center",
  flexDirection: "column",
  paddingTop: "1rem",
});

const ExperienceItem = styled(Box)({
  marginBottom: "2rem",
});

const JobTitle = styled(Typography)({
  color: "#fff",
  fontSize: "1.5rem",
  fontWeight: "bold",
});

const Company = styled(Typography)({
  color: "#fff",
  fontSize: "1.2rem",
  fontStyle: "italic",
});

const Duration = styled(Typography)({
  color: "#fff",
  fontSize: "1.2rem",
});

const Responsibilities = styled("ul")({
  color: "#fff",
  fontSize: "1rem",
  listStyleType: "inside",
  fontFamily: "Montserrat",
  fontWeight: "200",
});

const ExperiencePage = () => {
  return (
    <Container>
      <MuiHeading>Experience</MuiHeading>
      {experienceContent?.experienceData.map((experience, index) => (
        <ExperienceItem key={index}>
          <JobTitle>{experience.title}</JobTitle>
          <Company>{experience.company}</Company>
          <Duration>{experience.duration}</Duration>
          {/* <MuiParagraph>{experience.description}</MuiParagraph> */}
          <Responsibilities>
            {experience.responsibilities.map((responsibility, i) => (
              <li key={i}>{responsibility}</li>
            ))}
          </Responsibilities>
        </ExperienceItem>
      ))}
    </Container>
  );
};

export default ExperiencePage;
