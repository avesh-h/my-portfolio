import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import TerminalIcon from "@mui/icons-material/Terminal";
import { C, FONT, Container } from "./tokens";
import { personalDetails } from "../../static/profileSection";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

const Bar = styled("header")({
  position: "sticky",
  top: 0,
  zIndex: 1100,
  background: "rgba(11,12,16,0.78)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  borderBottom: `1px solid ${C.border}`,
});

const Row = styled(Box)({
  height: "64px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
});

const Brand = styled("a")({
  fontFamily: FONT,
  fontWeight: 600,
  fontSize: "1.02rem",
  color: C.text,
  textDecoration: "none",
  whiteSpace: "nowrap",
});

const Links = styled("nav")(({ theme }) => ({
  display: "flex",
  gap: "4px",
  [theme.breakpoints.down("md")]: { display: "none" },
}));

const NavLink = styled("a")({
  padding: "8px 12px",
  borderRadius: "8px",
  fontFamily: FONT,
  fontSize: "0.86rem",
  color: C.muted,
  textDecoration: "none",
  transition: "color .15s, background .15s",
  "&:hover, &:focus-visible": { color: C.text, background: C.surfaceHover, outline: "none" },
});

const Actions = styled(Box)({ display: "flex", alignItems: "center", gap: "8px" });

const ModeButton = styled("button")({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  height: "38px",
  padding: "0 14px",
  borderRadius: "999px",
  border: `1px solid ${C.border}`,
  background: C.surface,
  color: C.text,
  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
  fontSize: "0.78rem",
  cursor: "pointer",
  transition: "border-color .15s, background .15s",
  "& svg": { fontSize: "18px", color: C.amber },
  "&:hover, &:focus-visible": {
    borderColor: "rgba(232,160,107,0.6)",
    background: "rgba(232,160,107,0.08)",
    outline: "none",
  },
  "@media (max-width:420px)": { padding: "0 11px", "& .label": { display: "none" } },
});

const Burger = styled("button")(({ theme }) => ({
  display: "none",
  width: "40px",
  height: "40px",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "10px",
  border: `1px solid ${C.border}`,
  background: C.surface,
  color: C.text,
  cursor: "pointer",
  [theme.breakpoints.down("md")]: { display: "inline-flex" },
}));

const Drawer = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column",
    padding: "8px 0 14px",
    borderTop: `1px solid ${C.border}`,
  },
}));

const DrawerLink = styled(NavLink)({ padding: "12px 8px", fontSize: "0.95rem" });

const SiteNav = ({ onHome = true }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const close = () => setOpen(false);
  // On the home page links smooth-scroll in place; elsewhere they go home first.
  const linkProps = (l) =>
    onHome
      ? { href: l.href }
      : {
          href: `/${l.href}`,
          onClick: (e) => {
            e.preventDefault();
            close();
            navigate({ pathname: "/", hash: l.href });
          },
        };

  return (
    <Bar>
      <Container>
        <Row>
          <Brand
            href={onHome ? "#top" : "/"}
            onClick={(e) => {
              close();
              if (!onHome) {
                e.preventDefault();
                navigate("/");
              }
            }}
          >
            {personalDetails.name}
          </Brand>
          <Links aria-label="Sections">
            {LINKS.map((l) => (
              <NavLink key={l.href} {...linkProps(l)}>
                {l.label}
              </NavLink>
            ))}
          </Links>
          <Actions>
            <ModeButton
              type="button"
              onClick={() => navigate("/terminal")}
              aria-label="Switch to terminal mode"
            >
              <TerminalIcon />
              <span className="label">Terminal mode</span>
            </ModeButton>
            <Burger
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </Burger>
          </Actions>
        </Row>
        {open && (
          <Drawer component="nav" aria-label="Sections">
            {LINKS.map((l) => (
              <DrawerLink key={l.href} {...linkProps(l)} onClick={linkProps(l).onClick || close}>
                {l.label}
              </DrawerLink>
            ))}
          </Drawer>
        )}
      </Container>
    </Bar>
  );
};

export default SiteNav;
