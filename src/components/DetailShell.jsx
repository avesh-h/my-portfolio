import { keyframes } from "@emotion/react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ------------------------------------------------------------------ *
 * Shared "expanded Mac window" shell for detail pages (projects,
 * certifications). Same chrome as the terminal home, but wider and
 * scrollable. Back to the terminal via the red dot, the ← cd ~ row,
 * or the Esc key.
 * ------------------------------------------------------------------ */

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Screen = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  width: "100%",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  padding: "5vh 1.5rem 7vh",
  background:
    "radial-gradient(1100px 560px at 50% -12%, rgba(122,162,247,0.10), transparent 60%), rgba(11,12,16,0.70)",
  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
  [theme.breakpoints.down("sm")]: { padding: "3vh 0.85rem 5vh" },
}));

const Window = styled(Box)({
  width: "100%",
  maxWidth: "1040px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(17,19,24,0.72)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  boxShadow: "0 30px 80px -24px rgba(0,0,0,0.65)",
  overflow: "hidden",
});

const TitleBar = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "12px 16px",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
});
const Dot = styled("button")(({ tone, interactive }) => ({
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  background: tone,
  border: "none",
  padding: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: 1,
  "& span": {
    opacity: 0,
    fontSize: "9px",
    fontWeight: 700,
    color: "rgba(0,0,0,0.55)",
    transform: "translateY(-0.5px)",
    transition: "opacity 0.15s ease",
  },
  ...(interactive ? { "&:hover span": { opacity: 1 } } : {}),
}));
const TitleText = styled("span")({
  marginLeft: "8px",
  color: "#7A7D89",
  fontSize: "0.8rem",
  letterSpacing: "0.02em",
});

const Body = styled(Box)(({ theme }) => ({
  padding: "28px 30px 30px",
  [theme.breakpoints.down("sm")]: { padding: "20px 18px 22px" },
}));

const EchoLine = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "8px",
  fontSize: "0.9rem",
  marginBottom: "24px",
  [theme.breakpoints.down("sm")]: { fontSize: "0.78rem", gap: "6px", marginBottom: "18px" },
}));
const Path = styled("span")({ color: "#7AA2F7", fontWeight: 600 });
const Tilde = styled("span")({ color: "#7A7D89" });
const Arrow = styled("span")({ color: "#E8A06B", fontWeight: 700 });
const Echo = styled("span")({ color: "#E6E6E3" });

const Section = styled(Box)({
  marginBottom: "26px",
  animation: `${fadeUp} 0.45s ease both`,
});

const BackRow = styled("button")({
  font: "inherit",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  marginTop: "6px",
  padding: "8px 14px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.02)",
  color: "#C7C9D1",
  fontSize: "0.85rem",
  transition: "border-color 0.2s, background 0.2s, color 0.2s",
  "&:hover": {
    borderColor: "rgba(232,160,107,0.6)",
    background: "rgba(232,160,107,0.08)",
    color: "#F0F0EE",
  },
  "& .muted": { color: "#565963" },
});

const DetailShell = ({ pathLabel, command, sections }) => {
  const navigate = useNavigate();
  const goHome = () => navigate("/");

  useEffect(() => {
    window.scrollTo(0, 0);
    const onKey = (e) => {
      if (e.key === "Escape") goHome();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Screen>
      <Window>
        <TitleBar>
          <Dot tone="#FF5F56" interactive onClick={goHome} aria-label="Back to terminal">
            <span>×</span>
          </Dot>
          <Dot tone="#FFBD2E" as="span" />
          <Dot tone="#27C93F" as="span" />
          <TitleText>avesh@portfolio — {pathLabel}</TitleText>
        </TitleBar>

        <Body>
          <EchoLine>
            <Path>avesh@portfolio</Path>
            <Tilde>~</Tilde>
            <Arrow>❯</Arrow>
            <Echo>{command}</Echo>
          </EchoLine>

          {sections.map((node, i) => (
            <Section key={i} style={{ animationDelay: `${Math.min(i * 70, 560)}ms` }}>
              {node}
            </Section>
          ))}

          <BackRow onClick={goHome}>
            <Arrow style={{ color: "#E8A06B" }}>←</Arrow> cd ~{" "}
            <span className="muted">back to terminal</span>
          </BackRow>
        </Body>
      </Window>
    </Screen>
  );
};

export default DetailShell;

/* ----------------------- content building blocks ------------------ */

export const Title = styled("h1")({
  margin: 0,
  fontSize: "clamp(1.5rem, 4vw, 2.4rem)",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  lineHeight: 1.2,
  color: "#F5F5F2",
  wordBreak: "break-word",
});

const MetaWrap = styled("p")({
  margin: "12px 0 0",
  fontSize: "0.85rem",
  color: "#7A7D89",
});
export const MetaLine = ({ start, end, status }) => (
  <MetaWrap>
    {start}
    {end ? ` — ${end}` : ""}
    {status ? (
      <>
        {"  ·  "}
        <span style={{ color: status === "Completed" ? "#4ade80" : "#facc15" }}>
          {status}
        </span>
      </>
    ) : null}
  </MetaWrap>
);

export const SectionLabel = styled("div")({
  color: "#7A7D89",
  fontSize: "0.72rem",
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  marginBottom: "12px",
});

export const Paragraph = styled("p")({
  margin: 0,
  fontSize: "0.92rem",
  lineHeight: 1.85,
  color: "#C7C9D1",
});

const renderRich = (text) =>
  text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} style={{ color: "#F0F0EE", fontWeight: 700 }}>
        {part.slice(2, -2)}
      </strong>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );

const HLList = styled("ul")({ listStyle: "none", margin: 0, padding: 0 });
const HLItem = styled("li")({
  display: "flex",
  gap: "12px",
  alignItems: "flex-start",
  marginBottom: "12px",
  fontSize: "0.88rem",
  lineHeight: 1.75,
  color: "#B3B6BF",
  "& .mark": { color: "#E8A06B", flexShrink: 0 },
});
export const HighlightList = ({ items }) => (
  <HLList>
    {items.map((it, i) => (
      <HLItem key={i}>
        <span className="mark">→</span>
        <span>{renderRich(it)}</span>
      </HLItem>
    ))}
  </HLList>
);

const ChipsWrap = styled(Box)({ display: "flex", flexWrap: "wrap", gap: "8px" });
const OneChip = styled("span")({
  display: "inline-block",
  padding: "4px 11px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.03)",
  color: "#9AA0AE",
  fontSize: "0.74rem",
});
export const TechChips = ({ items = [] }) => (
  <ChipsWrap>
    {items.map((t) => (
      <OneChip key={t}>{t}</OneChip>
    ))}
  </ChipsWrap>
);

/* framed "browser/device" preview with the screenshot + open-live action */
const FrameWrap = styled(Box)({
  borderRadius: "10px",
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(0,0,0,0.25)",
});
const FrameBar = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "9px 12px",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  background: "rgba(255,255,255,0.03)",
});
const MiniDot = styled("span")(({ t }) => ({
  width: "9px",
  height: "9px",
  borderRadius: "50%",
  background: t,
}));
const FrameUrl = styled("span")({
  marginLeft: "8px",
  color: "#7A7D89",
  fontSize: "0.75rem",
});
const FrameImg = styled("img")({
  width: "100%",
  display: "block",
  maxHeight: "420px",
  objectFit: "cover",
  objectPosition: "top",
});
const FrameFoot = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  padding: "12px",
  borderTop: "1px solid rgba(255,255,255,0.06)",
  background: "rgba(255,255,255,0.02)",
});
const OpenLink = styled("a")({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "8px 16px",
  borderRadius: "8px",
  border: "1px solid rgba(232,160,107,0.5)",
  background: "rgba(232,160,107,0.08)",
  color: "#E8A06B",
  fontSize: "0.82rem",
  textDecoration: "none",
  transition: "background 0.2s, border-color 0.2s",
  "&:hover": {
    background: "rgba(232,160,107,0.16)",
    borderColor: "rgba(232,160,107,0.8)",
  },
});
export const BrowserFrame = ({ src, alt, label, link, actionLabel = "open live ↗" }) => (
  <FrameWrap>
    <FrameBar>
      <MiniDot t="#FF5F56" />
      <MiniDot t="#FFBD2E" />
      <MiniDot t="#27C93F" />
      {label && <FrameUrl>{label}</FrameUrl>}
    </FrameBar>
    {src && <FrameImg src={src} alt={alt} loading="lazy" />}
    {link && (
      <FrameFoot>
        <OpenLink href={link} target="_blank" rel="noopener noreferrer">
          {actionLabel}
        </OpenLink>
      </FrameFoot>
    )}
  </FrameWrap>
);
