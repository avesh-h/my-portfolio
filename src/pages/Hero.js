import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailIcon from "@mui/icons-material/Mail";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AboutPage from "./AboutPage";
import ExperiencePage from "./ExperiencePage";
import ProjectListingPage from "./ProjectListingPage";

const buttonStyles = {
  fontFamily: "inherit",
  border: "none",
  color: "#fff",
  transition: "transform 0.3s",
};

const Container = styled(Box)({
  height: "100vh",
  background: "#111",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  paddingRight: "8rem",
  paddingLeft: "8rem",
  paddingTop: "3rem",
});

const Spotlight = styled("div")(({ size }) => ({
  position: "absolute",
  width: size,
  height: size,
  borderRadius: "50%",
  background:
    "radial-gradient(circle, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 80%)",
  zIndex: "999",
  transform: "translate(-50%, -50%)",
  transition: "transform 0.1s ease-out",
  pointerEvents: "none",
}));

const SideContainer = styled(Box)({
  flex: 1,
  padding: "16px",
});

const PersonalDetailsContainer = styled(SideContainer)({
  textAlign: "left",
  paddingTop: "2.5rem",
});

const LeftSide = styled(PersonalDetailsContainer)({});

const RightSide = styled(SideContainer)({
  textAlign: "left",
  overflowY: "auto",
  maxHeight: "calc(100vh - 100px)",
  "&::-webkit-scrollbar": {
    width: 0,
  },
  scrollbarWidth: "none",
  padding: "2rem",
});

const SmallHorizontalLine = styled("hr")(({ isHover }) => ({
  width: isHover ? "60px" : "40px",
  borderTop: "1px solid #fff",
  margin: "8px 0",
  transition: "width 0.3s",
}));

const ButtonContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  marginTop: "12px",
});

const ButtonText = styled(Typography)({
  transition: "transform 0.3s",
});

const SocialIconContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  marginTop: "8rem",
});

const SocialIcon = styled("span")({
  marginRight: "3rem",
  cursor: "pointer",
  color: "#fff",
});

// Common styled component for personal details
const PersonalDetails = styled("div")({
  "& > *": {
    color: "#fff",
    marginBottom: "25px",
  },
});

const Hero = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isAboutHover, setIsAboutHover] = useState(false);
  const [isProjectsHover, setIsProjectsHover] = useState(false);
  const [isExperienceHover, setIsExperienceHover] = useState(false);

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleAboutHover = (hover) => {
    setIsAboutHover(hover);
  };

  const handleProjectsHover = (hover) => {
    setIsProjectsHover(hover);
  };

  const handleExperienceHover = (hover) => {
    setIsExperienceHover(hover);
  };

  const personalDetails = {
    name: "FirstName SureName",
    dep: "Frontend Developer",
    ability:
      "I am a passionate Frontend Developer with expertise in React.js and modern web development technologies. I love building user-friendly and visually appealing web applications.",
  };

  return (
    <Container onMouseMove={handleMouseMove}>
      <LeftSide>
        <PersonalDetails>
          <Typography
            variant="h4"
            component="h1"
            style={{ fontWeight: "bold", marginTop: "25px" }}
          >
            {personalDetails.name}
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            style={{ fontWeight: "bold", marginTop: "25px" }}
          >
            {personalDetails.dep}
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            style={{ fontWeight: "bold", marginTop: "25px" }}
          >
            {personalDetails.ability}
          </Typography>
        </PersonalDetails>
        <Typography style={{ marginTop: "25px", marginBottom: "20px" }}>
          <ButtonContainer>
            <SmallHorizontalLine isHover={isAboutHover} />
            <Button
              variant="outlined"
              style={buttonStyles}
              onMouseEnter={() => handleAboutHover(true)}
              onMouseLeave={() => handleAboutHover(false)}
            >
              <ButtonText variant="button">ABOUT</ButtonText>
            </Button>
          </ButtonContainer>
          <ButtonContainer>
            <SmallHorizontalLine isHover={isProjectsHover} />
            <Button
              variant="outlined"
              style={buttonStyles}
              onMouseEnter={() => handleProjectsHover(true)}
              onMouseLeave={() => handleProjectsHover(false)}
            >
              <ButtonText variant="button">PROJECTS</ButtonText>
            </Button>
          </ButtonContainer>
          <ButtonContainer>
            <SmallHorizontalLine isHover={isExperienceHover} />
            <Button
              variant="outlined"
              style={buttonStyles}
              onMouseEnter={() => handleExperienceHover(true)}
              onMouseLeave={() => handleExperienceHover(false)}
            >
              <ButtonText variant="button">EXPERIENCE</ButtonText>
            </Button>
          </ButtonContainer>
          <SocialIconContainer>
            <SocialIcon>
              <GitHubIcon sx={{ fontSize: 30 }} />
            </SocialIcon>
            <SocialIcon>
              <InstagramIcon sx={{ fontSize: 30 }} />
            </SocialIcon>
            <SocialIcon>
              <MailIcon sx={{ fontSize: 30 }} />
            </SocialIcon>
            <SocialIcon>
              <LinkedInIcon sx={{ fontSize: 30 }} />
            </SocialIcon>
          </SocialIconContainer>
        </Typography>
      </LeftSide>
      <RightSide>
        <Box>
          <AboutPage />
        </Box>
        <Box>
          <ExperiencePage />
        </Box>
        <ProjectListingPage />
      </RightSide>
      <Spotlight size="200px" style={{ top: position.y, left: position.x }} />
      <Spotlight size="400px" style={{ top: position.y, left: position.x }} />
      <Spotlight size="600px" style={{ top: position.y, left: position.x }} />
      <Spotlight size="800px" style={{ top: position.y, left: position.x }} />
    </Container>
  );
};

export default Hero;
