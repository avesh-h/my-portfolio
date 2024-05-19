import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailIcon from "@mui/icons-material/Mail";
import XIcon from "@mui/icons-material/X";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import AboutPage from "./AboutPage";
import ExperiencePage from "./ExperiencePage";
import ProjectListingPage from "./ProjectListingPage";

const buttonStyles = {
  fontFamily: "inherit",
  border: "none",
  color: "#fff",
  transition: "transform 0.3s",
  backgroundColor: "transparent",
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

const SocialIcon = styled(Link)({
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
  const [isMenuHover, setIsMenuHover] = useState({
    about: false,
    projects: false,
    experience: false,
  });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const personalDetails = {
    name: "FirstName SureName",
    dep: "Frontend Developer",
    ability:
      "I am a passionate Frontend Developer with expertise in React.js and modern web development technologies. I love building user-friendly and visually appealing web applications.",
  };

  const SocialLinks = useCallback(() => {
    return [
      {
        name: "github",
        link: "https://github.com/avesh-h",
        icon: <GitHubIcon sx={{ fontSize: 30 }} />,
      },
      {
        name: "linkedin",
        link: "https://www.linkedin.com/in/avesh-h/",
        icon: <LinkedInIcon sx={{ fontSize: 30 }} />,
      },
      {
        name: "x",
        link: "https://twitter.com/Aves_hh",
        icon: <XIcon sx={{ fontSize: 30 }} />,
      },
      {
        name: "mail",
        link: "mailto:aveshhasanfatta1155@gmail.com",
        icon: <MailIcon sx={{ fontSize: 30 }} />,
      },
      {
        name: "instagram",
        link: "https://www.instagram.com/aves_h_h/",
        icon: <InstagramIcon sx={{ fontSize: 30 }} />,
      },
    ];
  }, []);

  const handleMenuHover = (menu) => {
    setIsMenuHover((prev) => {
      return { ...prev, [menu]: !prev[menu] };
    });
  };

  //about,projects,experience Menus
  const menuButtons = ["about", "projects", "experience"];

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
          {menuButtons?.map((menu, index) => {
            return (
              <ButtonContainer key={`${menu}-${index}`}>
                <SmallHorizontalLine isHover={isMenuHover?.[menu]} />
                <Button
                  variant="outlined"
                  style={buttonStyles}
                  onMouseEnter={() => handleMenuHover(menu)}
                  onMouseLeave={() => handleMenuHover(menu)}
                >
                  <ButtonText variant="button">
                    {menu?.toUpperCase()}
                  </ButtonText>
                </Button>
              </ButtonContainer>
            );
          })}
          <SocialIconContainer>
            {SocialLinks()?.map((social, index) => {
              return (
                <SocialIcon
                  to={social?.link}
                  target="_blank"
                  key={`${social?.name}-${index}`}
                >
                  {social?.icon}
                </SocialIcon>
              );
            })}
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
