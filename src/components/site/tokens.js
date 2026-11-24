import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";

/* Design tokens + layout primitives for the website mode (dark by default). */
export const C = {
  bg: "#0B0C10",
  surface: "rgba(255,255,255,0.03)",
  surfaceHover: "rgba(255,255,255,0.055)",
  border: "rgba(255,255,255,0.09)",
  text: "#EDEEF2",
  muted: "#9496A3",
  blue: "#6C9BFF",
  amber: "#E8A06B",
};

export const FONT = "'Poppins', 'Montserrat', system-ui, sans-serif";

export const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "1120px",
  margin: "0 auto",
  padding: "0 24px",
  [theme.breakpoints.down("sm")]: { padding: "0 16px" },
}));

export const Section = styled("section")(({ theme }) => ({
  padding: "72px 0 8px",
  scrollMarginTop: "72px",
  [theme.breakpoints.down("sm")]: { padding: "52px 0 4px" },
}));

export const Chip = styled("span")({
  display: "inline-block",
  padding: "3px 10px",
  borderRadius: "999px",
  border: `1px solid ${C.border}`,
  background: C.surface,
  color: "#C3C5CF",
  fontSize: "0.74rem",
  lineHeight: 1.6,
  whiteSpace: "nowrap",
});

export const Button = styled("a")(({ variant }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  height: "44px",
  padding: "0 22px",
  borderRadius: "999px",
  fontFamily: FONT,
  fontSize: "0.9rem",
  fontWeight: 500,
  textDecoration: "none",
  cursor: "pointer",
  border: "1px solid transparent",
  transition: "transform .18s ease, background .18s ease, border-color .18s ease",
  ...(variant === "primary"
    ? { background: C.blue, color: "#0B0C10", "&:hover": { background: "#8AB0FF", transform: "translateY(-1px)" } }
    : {
        background: "transparent",
        color: C.text,
        borderColor: "rgba(255,255,255,0.2)",
        "&:hover": { borderColor: C.blue, background: "rgba(108,155,255,0.08)", transform: "translateY(-1px)" },
      }),
  "&:focus-visible": { outline: `2px solid ${C.blue}`, outlineOffset: "2px" },
}));

/* Renders **bold** markers used across the static content files. */
export const RichText = ({ text }) =>
  String(text)
    .split(/(\*\*[^*]+\*\*)/g)
    .map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i} style={{ color: C.text, fontWeight: 600 }}>
          {part.slice(2, -2)}
        </strong>
      ) : (
        <React.Fragment key={i}>{part}</React.Fragment>
      )
    );
