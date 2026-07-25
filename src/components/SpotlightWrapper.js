import { useMediaQuery } from "@mui/material";
import { createContext, useContext } from "react";

// The mouse "torch" spotlight was removed in favor of a custom premium cursor
// (see components/CustomCursor.jsx). This now only provides screen-size context
// that the legacy Hero (/classic) still consumes.
const SpotlightCtx = createContext({
  isLargeScreen: true,
  setIsSpotlightVisiblity: () => {},
});

export const SpotlightWrapper = ({ children }) => {
  const isLargeScreen = useMediaQuery("(min-width:900px)");
  return (
    <SpotlightCtx.Provider
      value={{ isLargeScreen, setIsSpotlightVisiblity: () => {} }}
    >
      {children}
    </SpotlightCtx.Provider>
  );
};

export const useSpotlightContext = () => useContext(SpotlightCtx);
