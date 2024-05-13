import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

const Container = styled(Box)({
  minHeight: "60vh",
  background: "#111",
  display: "flex",
  alignItems: "start",
  justifyContent: "left",
  flexDirection: "column",
  padding: "2rem",
});

const Heading = styled(Typography)({
  color: "#fff",
  fontSize: "2rem",
  fontWeight: "bold",
  marginBottom: "1rem",
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

const Description = styled(Typography)({
  color: "#fff",
  fontSize: "1.2rem",
});

const Responsibilities = styled("ul")({
  color: "#fff",
  fontSize: "1.2rem",
  listStyleType: "inside",
  paddingLeft: "1rem",
});

const ExperiencePage = () => {
  const experienceData = [
    {
      title: "Frontend Developer",
      company: "ABC Company",
      duration: "May 2018 - Present",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      responsibilities: [
        "Developed responsive user interfaces using HTML, CSS, and JavaScript.",
        "Implemented new features and enhancements based on project requirements.",
        "Collaborated with backend developers to integrate frontend with server-side logic.",
      ],
    },
    {
      title: "UI/UX Designer",
      company: "XYZ Corporation",
      duration: "January 2016 - April 2018",
      description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      responsibilities: [
        "Designed user-friendly interfaces for web and mobile applications.",
        "Conducted user research and usability testing to iterate on design solutions.",
        "Worked closely with development teams to ensure design feasibility and implementation.",
      ],
    },
    {
      title: "Software Engineer",
      company: "123 Tech Solutions",
      duration: "June 2014 - December 2015",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      responsibilities: [
        "Developed and maintained backend services using Node.js and Express.js.",
        "Implemented RESTful APIs to support various client applications.",
        "Participated in code reviews and collaborated with team members on architectural decisions.",
      ],
    },
    {
      title: "Web Developer Intern",
      company: "Tech Start-up",
      duration: "Summer 2013",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      responsibilities: [
        "Assisted in the development of web applications using HTML, CSS, and JavaScript.",
        "Learned and applied best practices for front-end development under the guidance of senior developers.",
        "Contributed to team meetings and discussions on project requirements and solutions.",
      ],
    },
  ];

  return (
    <Container>
      <Heading>Experience</Heading>
      {experienceData.map((experience, index) => (
        <ExperienceItem key={index}>
          <JobTitle>{experience.title}</JobTitle>
          <Company>{experience.company}</Company>
          <Duration>{experience.duration}</Duration>
          <Description>{experience.description}</Description>
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
