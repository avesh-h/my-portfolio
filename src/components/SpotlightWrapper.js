import { Box, styled, useMediaQuery } from "@mui/material";
import { createContext, useContext, useState } from "react";

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

const SpotlightCtx = createContext();

export const SpotlightWrapper = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isSpotlightVisiblity, setIsSpotlightVisiblity] = useState(true);

  const isLargeScreen = useMediaQuery("(min-width:900px)");

  const handleMouseMove = (e) => {
    if (!isSpotlightVisiblity) {
      setIsSpotlightVisiblity(true);
    }
    setPosition({ x: e.clientX, y: e.clientY });
  };
  return (
    <SpotlightCtx.Provider
      value={{ setIsSpotlightVisiblity, isSpotlightVisiblity, isLargeScreen }}
    >
      {isLargeScreen ? (
        <Box
          onMouseMove={handleMouseMove}
          position={"relative"}
          overflow={"hidden"}
        >
          {children}
          {isSpotlightVisiblity ? (
            <>
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
            </>
          ) : null}
        </Box>
      ) : (
        <>{children}</>
      )}
    </SpotlightCtx.Provider>
  );
};
export const useSpotlightContext = () => {
  return useContext(SpotlightCtx);
};
