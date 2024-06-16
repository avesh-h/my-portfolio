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
import MuiParagraph from "../components/mui/MuiParagraph";
import MuiHeading from "../components/mui/MuiHeading";

const buttonStyles = {
  fontFamily: "inherit",
  border: "none",
  color: "#fff",
  transition: "transform 0.3s",
  backgroundColor: "transparent",
};

const Container = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: "#111",
  display: "flex",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  padding: "3rem 8rem",
  [theme.breakpoints.down("lg")]: {
    padding: "3rem 3rem",
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    padding: "2rem",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "1rem",
  },
  gap: "1rem",
}));

const LeftSide = styled(Box)(({ theme }) => ({
  flex: "1 0 50%",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    padding: "0.5rem",
  },
}));

const RightSide = styled(Box)(({ theme }) => ({
  flex: "1 0 50%",
  overflowY: "auto",
  maxHeight: "calc(100vh - 6rem)",
  scrollbarWidth: "none",
  [theme.breakpoints.down("md")]: {
    padding: "0.5rem",
    maxHeight: "fit-content",
  },
}));

const SmallHorizontalLine = styled("hr")(({ isHover }) => ({
  width: isHover ? "60px" : "40px",
  borderTop: "1px solid #fff",
  margin: "8px 0",
  transition: "width 0.3s",
}));

const ButtonContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "left",
  margin: "1rem 0",
});

const ButtonText = styled(Typography)({
  transition: "transform 0.3s",
});

const SocialIconContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "left",
  marginTop: "2rem",
  gap: "1rem",
  [theme.breakpoints.down("sm")]: {
    marginTop: "1rem",
  },
}));

const SocialIcon = styled(Link)(({ theme }) => ({
  marginRight: "1rem",
  cursor: "pointer",
  color: "#fff",
  fontSize: "24px",
  [theme.breakpoints.down("sm")]: {
    marginRight: "0.5rem",
  },
}));

const PersonalDetails = styled("div")(({ theme }) => ({
  "& > *": {
    color: "#fff",
    marginBottom: "25px",
  },
}));

const Hero = () => {
  const [isMenuHover, setIsMenuHover] = useState({
    about: false,
    projects: false,
    experience: false,
  });

  const personalDetails = {
    name: "Avesh Hasanfatta",
    dep: "Full stack Developer",
    ability:
      "I am a passionate Full stack developer with expertise in React.js and modern web development technologies. I love building user-friendly and visually appealing web applications.",
  };

  const SocialLinks = useCallback(() => {
    return [
      {
        name: "github",
        link: "https://github.com/avesh-h",
        icon: <GitHubIcon sx={{ fontSize: 24 }} />,
      },
      {
        name: "linkedin",
        link: "https://www.linkedin.com/in/avesh-h/",
        icon: <LinkedInIcon sx={{ fontSize: 24 }} />,
      },
      {
        name: "x",
        link: "https://twitter.com/Aves_hh",
        icon: <XIcon sx={{ fontSize: 24 }} />,
      },
      {
        name: "mail",
        link: "mailto:aveshhasanfatta1155@gmail.com",
        icon: <MailIcon sx={{ fontSize: 24 }} />,
      },
      {
        name: "instagram",
        link: "https://www.instagram.com/aves_h_h/",
        icon: <InstagramIcon sx={{ fontSize: 24 }} />,
      },
    ];
  }, []);

  const handleMenuHover = (menu) => {
    setIsMenuHover((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const menuButtons = ["about", "projects", "experience"];

  return (
    <Container>
      <LeftSide>
        <PersonalDetails>
          <MuiHeading
            variant="h1"
            style={{
              fontWeight: "600",
              marginBottom: 0,
              fontSize: "2.5rem",
            }}
          >
            {personalDetails.name}
          </MuiHeading>
          <MuiParagraph
            variant="h5"
            component="h2"
            style={{
              paddingTop: "1.2rem",
              fontWeight: "400",
              fontSize: "1.3rem",
            }}
          >
            {personalDetails.dep}
          </MuiParagraph>
          <MuiParagraph
            variant="h6"
            component="h2"
            style={{ marginTop: "25px" }}
          >
            {personalDetails.ability}
          </MuiParagraph>
        </PersonalDetails>
        <Typography style={{ marginTop: "25px", marginBottom: "20px" }}>
          {menuButtons?.map((menu, index) => (
            <ButtonContainer key={`${menu}-${index}`}>
              <SmallHorizontalLine isHover={isMenuHover?.[menu]} />
              <Button
                variant="outlined"
                style={buttonStyles}
                onMouseEnter={() => handleMenuHover(menu)}
                onMouseLeave={() => handleMenuHover(menu)}
              >
                <ButtonText variant="button">{menu?.toUpperCase()}</ButtonText>
              </Button>
            </ButtonContainer>
          ))}
          <SocialIconContainer>
            {SocialLinks()?.map((social, index) => (
              <SocialIcon
                to={social?.link}
                target="_blank"
                key={`${social?.name}-${index}`}
              >
                {social?.icon}
              </SocialIcon>
            ))}
          </SocialIconContainer>
        </Typography>
      </LeftSide>
      <RightSide>
        <Box>
          <AboutPage />
          <ExperiencePage />
          <ProjectListingPage />
        </Box>
      </RightSide>
    </Container>
  );
};

export default Hero;
