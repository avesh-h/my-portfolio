import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

const Container = styled(Box)({
  minHeight: "60vh",
  background: "#111",
  display: "flex",
  alignItems: "start",
  justifyContent: "start",
  flexDirection: "column",
  padding: "2rem",
});

const Heading = styled(Typography)({
  color: "#fff",
  fontSize: "2rem",
  fontWeight: "bold",
  marginBottom: "1rem",
});

const Paragraph = styled(Typography)({
  color: "#fff",
  fontSize: "1.2rem",
  marginBottom: "1rem",
  textAlign: "start",
});

const AboutPage = () => {
  const aboutData = {
    heading: "About Me",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id elit ac nulla hendrerit sagittis. Nullam mattis tincidunt augue, eget fermentum purus commodo vel.",
      "Integer semper, est in dignissim eleifend, ligula justo consectetur est, eu dignissim metus lectus vel turpis.",
      "Fusce congue ex sed magna ultrices, et fringilla elit tempus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
    ]
  };

  return (
    <Container>
      <Heading>{aboutData.heading}</Heading>
      {aboutData.paragraphs.map((paragraph, index) => (
        <Paragraph key={index}>{paragraph}</Paragraph>
      ))}
    </Container>
  );
};

export default AboutPage;
