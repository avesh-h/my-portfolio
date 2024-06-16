import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import MuiHeading from "../components/mui/MuiHeading";
import MuiParagraph from "../components/mui/MuiParagraph";

const Container = styled(Box)({
  display: "flex",
  alignItems: "start",
  justifyContent: "start",
  flexDirection: "column",
});

const AboutPage = () => {
  const aboutData = {
    heading: "About Me",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id elit ac nulla hendrerit sagittis. Nullam mattis tincidunt augue, eget fermentum purus commodo vel.",
      "Integer semper, est in dignissim eleifend, ligula justo consectetur est, eu dignissim metus lectus vel turpis.",
      "Fusce congue ex sed magna ultrices, et fringilla elit tempus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    ],
  };

  return (
    <Container>
      <MuiHeading>{aboutData.heading}</MuiHeading>
      {aboutData.paragraphs.map((paragraph, index) => (
        <MuiParagraph key={index}>{paragraph}</MuiParagraph>
      ))}
    </Container>
  );
};

export default AboutPage;
