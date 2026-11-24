import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { useLocation } from "react-router-dom";
import { personalDetails } from "../static/profileSection";

/* Global social links — rendered once in App.jsx so it shows on every route.
 * Fixed pill, top-right on every screen size. Pages reserve
 * the space above their content (see Screen padding in TerminalHome/DetailShell). */
const Bar = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: "14px",
  right: "20px",
  zIndex: 1200,
  display: "flex",
  alignItems: "center",
  gap: "2px",
  padding: "4px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(17,19,24,0.72)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  boxShadow: "0 10px 30px -12px rgba(0,0,0,0.6)",
  [theme.breakpoints.down("sm")]: {
    // right-aligned so detail pages can fit the "cd .." pill on the left
    right: "10px",
    top: "10px",
  },
}));

const IconLink = styled("a")({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  color: "#9A9DA9",
  transition: "color .18s ease, background .18s ease, transform .18s ease",
  "& svg": { fontSize: "20px !important" },
  "&:hover, &:focus-visible": {
    color: "#E8A06B",
    background: "rgba(232,160,107,0.12)",
    transform: "translateY(-1px)",
    outline: "none",
  },
  "@media (max-width:360px)": { width: "36px", height: "36px" },
});

const SocialBar = () => {
  const { pathname } = useLocation();
  // The legacy /classic page already renders its own social icons.
  if (pathname.startsWith("/classic")) return null;

  return (
    <Bar component="nav" aria-label="Social links">
      {personalDetails.socialLinks.map((s) => {
        const external = !s.link.startsWith("mailto:");
        return (
          <IconLink
            key={s.name}
            href={s.link}
            aria-label={s.name}
            title={s.name}
            {...(external && { target: "_blank", rel: "noopener noreferrer" })}
          >
            {s.icon}
          </IconLink>
        );
      })}
    </Bar>
  );
};

export default SocialBar;
