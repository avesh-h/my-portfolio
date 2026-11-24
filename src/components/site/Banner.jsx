import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { C, FONT } from "./tokens";
import { personalDetails } from "../../static/profileSection";
import certifications from "../../static/certificationsData.json";

/* Wide hero banner modelled on the LinkedIn cover: name + title + tech line,
 * a divider, and the AWS Developer Associate badge (links to Credly).
 * Row on tablet/desktop, stacked on phones. Built in code so it stays sharp. */
const TECH = ["React.js", "Next.js", "Node.js", "AWS"];
const awsCert = certifications.find((c) => c.issuer === "Amazon Web Services");

const Wrap = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: "20px",
  border: `1px solid ${C.border}`,
  background:
    "radial-gradient(700px 260px at 50% 0%, rgba(76,141,255,0.16), transparent 70%), linear-gradient(135deg,#0E1634 0%,#0A1022 55%,#0E1A3C 100%)",
  boxShadow: "0 30px 80px -40px rgba(60,110,255,0.35)",
  padding: "44px 32px",
  [theme.breakpoints.down("md")]: { padding: "36px 20px", borderRadius: "16px" },
}));

const Content = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "48px",
  [theme.breakpoints.down("md")]: { flexDirection: "column", gap: "26px" },
}));

const Text = styled(Box)({ textAlign: "center", fontFamily: FONT });

const NameText = styled("h1")({
  margin: 0,
  fontSize: "clamp(2rem, 5.2vw, 3.5rem)",
  fontWeight: 700,
  letterSpacing: "-0.01em",
  lineHeight: 1.1,
  color: "#F4F6FF",
});

const Title = styled("p")({
  margin: "10px 0 16px",
  fontSize: "clamp(0.85rem, 1.6vw, 1.1rem)",
  letterSpacing: "0.06em",
  color: "#B9C3E6",
});

const TechRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "14px",
  "&::before, &::after": {
    content: '""',
    flex: "0 1 56px",
    height: "1px",
    background: "rgba(140,170,255,0.45)",
  },
  "@media (max-width:900px)": { "&::before, &::after": { display: "none" } },
  "& span": { fontSize: "clamp(0.72rem, 1.4vw, 0.88rem)", color: "#D5DCF5", whiteSpace: "nowrap" },
  "& i": { width: "4px", height: "4px", borderRadius: "50%", background: C.blue, display: "block" },
});

const TechList = styled(Box)({
  display: "flex",
  flexWrap: "nowrap",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px 12px",
  "@media (max-width:420px)": { gap: "6px 8px" },
});

const Divider = styled(Box)(({ theme }) => ({
  alignSelf: "stretch",
  width: "1px",
  minHeight: "130px",
  background: "linear-gradient(transparent, rgba(150,175,255,0.5), transparent)",
  [theme.breakpoints.down("md")]: {
    alignSelf: "auto",
    width: "min(240px, 70%)",
    height: "1px",
    minHeight: 0,
    background: "linear-gradient(90deg, transparent, rgba(150,175,255,0.5), transparent)",
  },
}));

const BadgeLink = styled("a")(({ theme }) => ({
  display: "block",
  flexShrink: 0,
  width: "150px",
  transition: "transform .25s ease, filter .25s ease",
  filter: "drop-shadow(0 10px 24px rgba(47,123,255,0.35))",
  "&:hover, &:focus-visible": { transform: "translateY(-3px) scale(1.03)", outline: "none" },
  [theme.breakpoints.down("md")]: { width: "118px" },
}));

/* Circuit-board accents, echoing the LinkedIn cover (hidden on small screens). */
const Circuit = styled("svg")(({ theme }) => ({
  position: "absolute",
  top: 0,
  height: "100%",
  width: "30%",
  opacity: 0.55,
  pointerEvents: "none",
  [theme.breakpoints.down("md")]: { opacity: 0.3, width: "46%" },
}));

const CircuitPaths = ({ flip }) => (
  <g
    fill="none"
    stroke="#4C86FF"
    strokeWidth="1.2"
    strokeLinecap="round"
    transform={flip ? "translate(300 0) scale(-1 1)" : undefined}
  >
    <path d="M0 60 H90 L110 80 H200" />
    <path d="M0 110 H60 L80 130 H170" />
    <path d="M0 160 H120 L140 140 H230 L250 160" />
    <path d="M0 210 H80 L100 230 H190" />
    <circle cx="200" cy="80" r="3.5" fill="#4C86FF" />
    <circle cx="170" cy="130" r="3.5" fill="#4C86FF" />
    <circle cx="250" cy="160" r="3.5" fill="#4C86FF" />
    <circle cx="190" cy="230" r="3.5" fill="#4C86FF" />
  </g>
);

const Badge = () => (
  <svg viewBox="0 0 120 138" role="img" aria-label="AWS Certified Developer Associate badge">
    <defs>
      <linearGradient id="hexEdge" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#58B0FF" />
        <stop offset="1" stopColor="#2F5BFF" />
      </linearGradient>
    </defs>
    <polygon points="60,3 115,34.5 115,103.5 60,135 5,103.5 5,34.5" fill="url(#hexEdge)" />
    <polygon points="60,10 109,38 109,100 60,128 11,100 11,38" fill="#0B1533" />
    <polygon points="60,16 104,41 104,97 60,122 16,97 16,41" fill="#0F1D44" stroke="#3E6DDB" strokeWidth="0.8" />
    <g fontFamily={FONT} textAnchor="middle">
      <text x="60" y="48" fontSize="15" fontWeight="700" fill="#F4F6FF">aws</text>
      <text x="60" y="60" fontSize="8.5" fill="#B9C3E6">certified</text>
      <line x1="34" y1="68" x2="86" y2="68" stroke="#3E6DDB" strokeWidth="0.8" />
      <text x="60" y="82" fontSize="12.5" fontWeight="700" fill="#FFFFFF">Developer</text>
      <line x1="34" y1="90" x2="86" y2="90" stroke="#3E6DDB" strokeWidth="0.8" />
      <text x="60" y="103" fontSize="8" letterSpacing="1.4" fill="#B9C3E6">ASSOCIATE</text>
    </g>
  </svg>
);

const Banner = () => (
  <Wrap id="top">
    <Circuit viewBox="0 0 300 280" preserveAspectRatio="xMinYMid slice" sx={{ left: 0 }} aria-hidden="true">
      <CircuitPaths />
    </Circuit>
    <Circuit viewBox="0 0 300 280" preserveAspectRatio="xMinYMid slice" sx={{ right: 0 }} aria-hidden="true">
      <CircuitPaths flip />
    </Circuit>

    <Content>
      <Text>
        <NameText>{personalDetails.name}</NameText>
        <Title>Software Developer</Title>
        <TechRow>
          <TechList>
            {TECH.map((t, i) => (
              <React.Fragment key={t}>
                {i > 0 && <i aria-hidden="true" />}
                <span>{t}</span>
              </React.Fragment>
            ))}
          </TechList>
        </TechRow>
      </Text>

      {awsCert && (
        <>
          <Divider aria-hidden="true" />
          <BadgeLink
            href={awsCert.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Verify AWS Certified Developer – Associate on Credly"
            title="Verify on Credly"
          >
            <Badge />
          </BadgeLink>
        </>
      )}
    </Content>
  </Wrap>
);

export default Banner;
