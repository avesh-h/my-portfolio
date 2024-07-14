import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import MuiHeading from "../components/mui/MuiHeading";
import MuiParagraph from "../components/mui/MuiParagraph";
import aboutContent from "../static/aboutSection.json";

const Container = styled(Box)({
  display: "flex",
  alignItems: "start",
  justifyContent: "start",
  flexDirection: "column",
});

const AboutPage = () => {
  return (
    <Container>
      <MuiHeading>{aboutContent.heading}</MuiHeading>
      {aboutContent.paragraphs.map((paragraph, index) => (
        <MuiParagraph key={index}>{paragraph}</MuiParagraph>
      ))}
    </Container>
  );
};

export default AboutPage;
