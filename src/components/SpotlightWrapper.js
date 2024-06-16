import { Box, styled, useMediaQuery } from "@mui/material";
import { useState } from "react";

const Spotlight = styled("div")(({ size }) => {
  return {
    position: "absolute",
    width: size,
    height: size,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 80%)",
    zIndex: "999",
    transform: "translate(-50%, -50%)",
    transition: "transform 0.1s ease-out",
    pointerEvents: "none",
  };
});

// const SpotlightCtx = createContext();

// const Container = styled(Box)({
//   height: "100vh",
//   background: "#111",
//   display: "flex",
//   alignItems: "flex-start",
//   justifyContent: "center",
//   position: "relative",
//   overflowX: "hidden",
//   paddingRight: "8rem",
//   paddingLeft: "8rem",
//   paddingTop: "3rem",
// });

export const SpotlightWrapper = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const isLargeScreen = useMediaQuery("(min-width:900px)");

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };
  return (
    <>
      {/* <Container onMouseMove={handleMouseMove}> */}
      {isLargeScreen ? (
        <Box
          onMouseMove={handleMouseMove}
          position={"relative"}
          overflow={"hidden"}
        >
          {children}
          <Spotlight
            size="200px"
            style={{ top: position.y, left: position.x }}
          />
          <Spotlight
            size="400px"
            style={{ top: position.y, left: position.x }}
          />
          <Spotlight
            size="600px"
            style={{ top: position.y, left: position.x }}
          />
          <Spotlight
            size="800px"
            style={{ top: position.y, left: position.x }}
          />
        </Box>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
