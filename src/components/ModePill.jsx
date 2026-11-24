import { styled } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";

/* Fixed top-left pill in terminal mode that switches back to the website.
 * Same glass style as SocialBar / DetailShell's BackPill. */
const Pill = styled("button")({
  position: "fixed",
  top: "14px",
  left: "20px",
  zIndex: 1200,
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  height: "50px",
  padding: "0 18px 0 14px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(17,19,24,0.72)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  boxShadow: "0 10px 30px -12px rgba(0,0,0,0.6)",
  color: "#C7C9D1",
  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
  fontSize: "0.85rem",
  cursor: "pointer",
  transition: "color .18s ease, border-color .18s ease, background .18s ease",
  "& svg": { fontSize: "18px", color: "#E8A06B" },
  "&:hover, &:focus-visible": {
    color: "#F0F0EE",
    borderColor: "rgba(232,160,107,0.6)",
    background: "rgba(232,160,107,0.10)",
    outline: "none",
  },
  "@media (max-width:600px)": { left: "10px", top: "10px" },
  "@media (max-width:360px)": { padding: "0 12px 0 10px", gap: "6px" },
});

const ModePill = () => {
  const navigate = useNavigate();
  return (
    <Pill
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        navigate("/");
      }}
      aria-label="Switch to website view"
    >
      <LanguageIcon />
      <span>Website</span>
    </Pill>
  );
};

export default ModePill;
