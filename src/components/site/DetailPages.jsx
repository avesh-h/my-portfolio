import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SiteNav from "./SiteNav";
import { Footer } from "./Sections";
import { C, FONT, Container, Chip, Button, RichText } from "./tokens";
import { projectsContent } from "../../static/projectsData";
import certificationsData from "../../static/certificationsData.json";

/* ------------------------------------------------------------------ *
 * Website-mode detail pages (project + certificate).
 * Shared layout: nav → breadcrumb → header → hero → [content | sticky aside]
 * → previous / next → footer. Aside stacks above content on small screens.
 * ------------------------------------------------------------------ */

const Page = styled(Box)({
  minHeight: "100vh",
  fontFamily: FONT,
  color: C.text,
  background: "rgba(11,12,16,0.52)",
});

const Crumb = styled(Link)({
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "8px 14px 8px 10px",
  borderRadius: "999px",
  border: `1px solid ${C.border}`,
  background: C.surface,
  color: C.muted,
  fontSize: "0.85rem",
  textDecoration: "none",
  transition: "color .15s, border-color .15s, background .15s, gap .15s",
  "&:hover, &:focus-visible": {
    color: C.text,
    borderColor: "rgba(108,155,255,0.55)",
    background: "rgba(108,155,255,0.08)",
    gap: "11px",
    outline: "none",
  },
});

const Cols = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) 340px",
  gap: "44px",
  alignItems: "start",
  marginTop: "40px",
  [theme.breakpoints.down("md")]: { gridTemplateColumns: "minmax(0, 1fr)", gap: "28px", marginTop: "28px" },
}));

// Aside is first in the DOM-visual order on small screens, sticky on desktop.
const Aside = styled(Box)(({ theme }) => ({
  position: "sticky",
  top: "88px",
  order: 2,
  border: `1px solid ${C.border}`,
  background: "rgba(17,19,24,0.7)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  padding: "22px",
  display: "flex",
  flexDirection: "column",
  gap: "18px",
  [theme.breakpoints.down("md")]: { position: "static", order: -1 },
}));

const Meta = ({ label, children }) => (
  <Box>
    <Box sx={{ fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: C.muted, mb: "6px" }}>
      {label}
    </Box>
    <Box sx={{ fontSize: "0.92rem", color: C.text, lineHeight: 1.6 }}>{children}</Box>
  </Box>
);

const SectionTitle = ({ children }) => (
  <Box component="h2" sx={{ m: "0 0 14px", fontSize: "1.2rem", fontWeight: 600, color: C.text }}>
    {children}
  </Box>
);

const Block = ({ title, children }) => (
  <Box component="section" sx={{ mb: "36px" }}>
    <SectionTitle>{title}</SectionTitle>
    {children}
  </Box>
);

const Points = ({ items }) => (
  <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
    {items.map((t, i) => (
      <Box
        component="li"
        key={i}
        sx={{
          display: "flex", gap: "12px", p: "14px 16px", borderRadius: "12px", color: "#B4B6C2",
          fontSize: "0.92rem", lineHeight: 1.7, border: `1px solid ${C.border}`, background: C.surface,
        }}
      >
        <CheckCircleOutlineIcon sx={{ fontSize: 20, color: C.blue, mt: "3px", flexShrink: 0 }} />
        <span><RichText text={t} /></span>
      </Box>
    ))}
  </Box>
);

const Hero = ({ src, alt, label }) => (
  <Box sx={{ mt: "30px", borderRadius: "16px", overflow: "hidden", border: `1px solid ${C.border}`,
    background: "rgba(17,19,24,0.8)", boxShadow: "0 40px 80px -50px rgba(76,134,255,0.5)" }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: "7px", p: "11px 14px", borderBottom: `1px solid ${C.border}` }}>
      {["#FF5F56", "#FFBD2E", "#27C93F"].map((c) => (
        <Box key={c} sx={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
      ))}
      <Box sx={{ ml: "8px", color: C.muted, fontSize: "0.76rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {label}
      </Box>
    </Box>
    <img src={src} alt={alt} style={{ display: "block", width: "100%", maxHeight: "560px", objectFit: "cover", objectPosition: "top" }} />
  </Box>
);

const Neighbor = ({ to, dir, title }) => (
  <Link
    to={to}
    style={{ textDecoration: "none", color: "inherit", flex: "1 1 280px", minWidth: 0,
      textAlign: dir === "next" ? "right" : "left" }}
  >
    <Box
      sx={{
        p: "16px 18px", borderRadius: "14px", border: `1px solid ${C.border}`, background: C.surface,
        transition: "border-color .2s, background .2s, transform .2s",
        "&:hover": { borderColor: "rgba(108,155,255,0.55)", background: C.surfaceHover, transform: "translateY(-2px)" },
      }}
    >
      <Box sx={{ fontSize: "0.74rem", color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase", mb: "6px",
        display: "flex", alignItems: "center", gap: "6px", justifyContent: dir === "next" ? "flex-end" : "flex-start" }}>
        {dir === "prev" && <ArrowBackIcon sx={{ fontSize: 15 }} />}
        {dir === "prev" ? "Previous" : "Next"}
        {dir === "next" && <ArrowForwardIcon sx={{ fontSize: 15 }} />}
      </Box>
      <Box sx={{ fontWeight: 600, fontSize: "0.98rem", color: C.text, lineHeight: 1.4,
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {title}
      </Box>
    </Box>
  </Link>
);

/* Shared page frame */
const Frame = ({ backTo, backLabel, children }) => {
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <Page>
      <SiteNav onHome={false} />
      <Container sx={{ pt: { xs: "22px", md: "34px" }, pb: "8px" }}>
        <Crumb to={backTo}>
          <ArrowBackIcon sx={{ fontSize: 17 }} /> {backLabel}
        </Crumb>
        {children}
      </Container>
      <Footer />
    </Page>
  );
};

const Header = ({ eyebrow, title, lead }) => (
  <Box sx={{ mt: "30px" }}>
    {eyebrow}
    <Box component="h1" sx={{ m: "10px 0 0", fontSize: "clamp(1.7rem, 4.6vw, 2.8rem)", fontWeight: 700,
      letterSpacing: "-0.01em", lineHeight: 1.15, color: "#F4F6FF" }}>
      {title}
    </Box>
    {lead && (
      <Box component="p" sx={{ m: "14px 0 0", maxWidth: "760px", color: C.muted, fontSize: "1.02rem", lineHeight: 1.7 }}>
        {lead}
      </Box>
    )}
  </Box>
);

const NotFound = ({ what, backTo, backLabel }) => (
  <Frame backTo={backTo} backLabel={backLabel}>
    <Box sx={{ py: "80px", textAlign: "center" }}>
      <Box component="h1" sx={{ m: 0, fontSize: "1.6rem", fontWeight: 600 }}>Not found</Box>
      <Box component="p" sx={{ color: C.muted, mt: "10px" }}>There's no {what} with that id.</Box>
    </Box>
  </Frame>
);

const Neighbors = ({ prev, next }) =>
  (prev || next) && (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px", mt: "20px", pb: "8px" }}>
      {prev ? <Neighbor dir="prev" {...prev} /> : <Box sx={{ flex: "1 1 280px" }} />}
      {next ? <Neighbor dir="next" {...next} /> : <Box sx={{ flex: "1 1 280px" }} />}
    </Box>
  );

/* ------------------------------ project ------------------------------ */
export const WebsiteProjectDetail = () => {
  const { projectId } = useParams();
  const list = projectsContent.projects;
  const idx = list.findIndex((p) => p.id === parseInt(projectId, 10));
  const p = list[idx];
  const BACK = { backTo: "/#projects", backLabel: "All projects" };

  if (!p) return <NotFound what="project" {...BACK} />;

  const prevP = list[idx - 1];
  const nextP = list[idx + 1];
  const dates = [p.startDate, p.endDate].filter(Boolean).join(" – ");
  const host = p.link ? p.link.replace(/^https?:\/\//, "").replace(/\/$/, "") : p.name;

  return (
    <Frame {...BACK}>
      <Header
        eyebrow={<Chip sx={{ color: C.blue, borderColor: "rgba(108,155,255,0.4)" }}>{p.status || "Project"}</Chip>}
        title={p.name}
        lead={p.summary}
      />
      {p.image && <Hero src={p.image} alt={`${p.name} screenshot`} label={host} />}

      <Cols>
        <Box>
          {p.description && (
            <Block title="Overview">
              <Box component="p" sx={{ m: 0, color: "#B4B6C2", lineHeight: 1.85, fontSize: "0.98rem" }}>
                {p.description}
              </Box>
            </Block>
          )}
          {p.highlights?.length > 0 && (
            <Block title="Key highlights">
              <Points items={p.highlights} />
            </Block>
          )}
        </Box>

        <Aside>
          {p.link && (
            <Button variant="primary" href={p.link} target="_blank" rel="noopener noreferrer" sx={{ width: "100%" }}>
              Visit live site <OpenInNewIcon sx={{ fontSize: 17 }} />
            </Button>
          )}
          {dates && <Meta label="Duration">{dates}</Meta>}
          {p.status && <Meta label="Status">{p.status}</Meta>}
          {p.technologies?.length > 0 && (
            <Meta label="Tech stack">
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "7px", mt: "4px" }}>
                {p.technologies.map((t) => <Chip key={t}>{t}</Chip>)}
              </Box>
            </Meta>
          )}
        </Aside>
      </Cols>

      <Neighbors
        prev={prevP && { to: `/project/${prevP.id}`, title: prevP.name }}
        next={nextP && { to: `/project/${nextP.id}`, title: nextP.name }}
      />
    </Frame>
  );
};

/* ---------------------------- certificate ---------------------------- */
export const WebsiteCertificateDetail = () => {
  const { certificateId } = useParams();
  const list = certificationsData;
  const idx = list.findIndex((c) => c.id === parseInt(certificateId, 10));
  const c = list[idx];
  const BACK = { backTo: "/#certifications", backLabel: "All certifications" };

  if (!c) return <NotFound what="certificate" {...BACK} />;

  const prevC = list[idx - 1];
  const nextC = list[idx + 1];

  return (
    <Frame {...BACK}>
      <Header
        eyebrow={<Chip sx={{ color: C.amber, borderColor: "rgba(232,160,107,0.4)" }}>{c.issuer}</Chip>}
        title={c.name}
        lead={`Issued ${c.date}`}
      />
      {c.image && <Hero src={c.image} alt={`${c.name} certificate`} label={`certificate · ${c.issuer}`} />}

      <Cols>
        <Box>
          {c.description && (
            <Block title="About this certification">
              <Box component="p" sx={{ m: 0, color: "#B4B6C2", lineHeight: 1.85, fontSize: "0.98rem" }}>
                {c.description}
              </Box>
            </Block>
          )}
          {c.keyPoints?.length > 0 && (
            <Block title="Key learnings">
              <Points items={c.keyPoints} />
            </Block>
          )}
        </Box>

        <Aside>
          {c.url && (
            <Button variant="primary" href={c.url} target="_blank" rel="noopener noreferrer" sx={{ width: "100%" }}>
              Verify certificate <OpenInNewIcon sx={{ fontSize: 17 }} />
            </Button>
          )}
          <Meta label="Issued by">{c.issuer}</Meta>
          <Meta label="Date">{c.date}</Meta>
          {c.skills?.length > 0 && (
            <Meta label="Skills">
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "7px", mt: "4px" }}>
                {c.skills.map((s) => <Chip key={s}>{s}</Chip>)}
              </Box>
            </Meta>
          )}
        </Aside>
      </Cols>

      <Neighbors
        prev={prevC && { to: `/certificate/${prevC.id}`, title: prevC.name }}
        next={nextC && { to: `/certificate/${nextC.id}`, title: nextC.name }}
      />
    </Frame>
  );
};
