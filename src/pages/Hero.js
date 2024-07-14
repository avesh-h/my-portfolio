import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MuiHeading from "../components/mui/MuiHeading";
import MuiParagraph from "../components/mui/MuiParagraph";
import { useSpotlightContext } from "../components/SpotlightWrapper";
import { personalDetails } from "../static/profileSection";
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

const Container = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: "#111",
  display: "flex",
  justifyContent: "center",
  position: "relative",
  scrollbarWidth: "none",
  overflowY: "auto",
  padding: "3rem 8rem",
  maxHeight: "calc(100vh - 6rem)",
  [theme.breakpoints.down("lg")]: {
    padding: "3rem 3rem",
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    padding: "2rem",
    maxHeight: "none",
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
  position: "sticky",
  top: 0,
  [theme.breakpoints.down("sm")]: {
    padding: "0.5rem",
  },
}));

const RightSide = styled(Box)(({ theme }) => ({
  flex: "1 0 50%",
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

  const currentSectionRef = useRef({});

  const { setIsSpotlightVisiblity, isLargeScreen } = useSpotlightContext();

  const handleMenuHover = (menu) => {
    setIsMenuHover((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const menuButtons = ["about", "experience", "projects"];

  const handleMenuClick = (menu) => {
    setIsSpotlightVisiblity(false);
    currentSectionRef?.current?.[menu]?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        console.log("entry", entry.target.id);
        if (entry.isIntersecting) {
          setIsMenuHover((prev) => {
            if (entry.target.id === "about") {
              return {
                about: true,
                experience: false,
                projects: false,
              };
            } else if (entry.target.id === "experience") {
              return {
                about: false,
                experience: true,
                projects: false,
              };
            } else {
              return {
                about: false,
                experience: false,
                projects: true,
              };
            }
          });
        }
      });
    };

    // The Intersection Observer API lets code register a callback function that is executed whenever a particular element enters or exits an intersection with another element (or the viewport)

    const observer = new IntersectionObserver(observerCallback, options);

    //Get array of all span elements
    const sections = Object.values(currentSectionRef.current);

    //Then observe and it watch that when the your element will intersect with root element that you mentioned.
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

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
        <Box style={{ marginTop: "25px", marginBottom: "20px" }}>
          {isLargeScreen
            ? menuButtons?.map((menu, index) => (
                <ButtonContainer key={`${menu}-${index}`}>
                  <SmallHorizontalLine isHover={isMenuHover?.[menu]} />
                  <Button
                    variant="outlined"
                    style={buttonStyles}
                    onMouseEnter={() => handleMenuHover(menu)}
                    onMouseLeave={() => handleMenuHover(menu)}
                    onClick={() => handleMenuClick(menu)}
                  >
                    <ButtonText variant="button">
                      {menu?.toUpperCase()}
                    </ButtonText>
                  </Button>
                </ButtonContainer>
              ))
            : null}
          <SocialIconContainer>
            {personalDetails?.socialLinks?.map((social, index) => (
              <SocialIcon
                to={social?.link}
                target="_blank"
                key={`${social?.name}-${index}`}
              >
                {social?.icon}
              </SocialIcon>
            ))}
          </SocialIconContainer>
        </Box>
      </LeftSide>
      <RightSide>
        <Box>
          <span
            id="about"
            ref={(ele) => (currentSectionRef.current["about"] = ele)}
          >
            <AboutPage />
          </span>
          <span
            id="experience"
            ref={(ele) => (currentSectionRef.current["experience"] = ele)}
          >
            <ExperiencePage />
          </span>
          <span
            id="projects"
            ref={(ele) => (currentSectionRef.current["projects"] = ele)}
          >
            <ProjectListingPage />
          </span>
        </Box>
      </RightSide>
    </Container>
  );
};

export default Hero;
