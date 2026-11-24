import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DownloadIcon from "@mui/icons-material/Download";
import { C, FONT, Container, Section, Chip, Button, RichText } from "./tokens";
import { personalDetails } from "../../static/profileSection";
import { projectsContent } from "../../static/projectsData";
import { techStackData } from "../../static/techStackData";
import experienceContent from "../../static/experienceSection.json";
import certifications from "../../static/certificationsData.json";
import ConnectModal from "../ConnectModal";

/* ----------------------------- shared ----------------------------- */
const Heading = ({ title, sub }) => (
  <Box sx={{ mb: "30px", fontFamily: FONT }}>
    <Box component="h2" sx={{ m: 0, fontSize: "clamp(1.5rem, 3.4vw, 2rem)", fontWeight: 600, color: C.text }}>
      {title}
    </Box>
    {sub && <Box component="p" sx={{ m: "8px 0 0", color: C.muted, fontSize: "0.95rem" }}>{sub}</Box>}
  </Box>
);

const Card = styled(Box)({
  border: `1px solid ${C.border}`,
  background: C.surface,
  borderRadius: "16px",
  transition: "transform .22s ease, border-color .22s ease, background .22s ease",
});

const Grid = styled(Box)({
  display: "grid",
  gap: "22px",
  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
});

/* ------------------------------ intro ------------------------------ */
export const Intro = () => (
  <Container sx={{ pt: { xs: "36px", md: "48px" }, textAlign: "center", fontFamily: FONT }}>
    <Box
      component="p"
      sx={{
        m: "0 auto",
        maxWidth: "720px",
        fontSize: "clamp(1.15rem, 2.6vw, 1.55rem)",
        lineHeight: 1.5,
        color: C.text,
        fontWeight: 500,
      }}
    >
      I build fast, reliable web apps and AI-powered tools.
    </Box>
    <Box component="p" sx={{ m: "14px auto 0", maxWidth: "640px", color: C.muted, lineHeight: 1.8, fontSize: "0.98rem" }}>
      Four years of shipping e-commerce platforms, full-stack products and automation bots with React, Node.js and AWS.
    </Box>
    <Box sx={{ mt: "26px", display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
      <Button variant="primary" href="#projects">
        View my work <ArrowForwardIcon sx={{ fontSize: 18 }} />
      </Button>
      <Button href="/resume.pdf" target="_blank" rel="noopener noreferrer">
        <DownloadIcon sx={{ fontSize: 18 }} /> Résumé
      </Button>
    </Box>
    <Box sx={{ mt: "22px", display: "flex", gap: "6px", justifyContent: "center" }}>
      {personalDetails.socialLinks.map((s) => (
        <Box
          key={s.name}
          component="a"
          href={s.link}
          aria-label={s.name}
          title={s.name}
          {...(!s.link.startsWith("mailto:") && { target: "_blank", rel: "noopener noreferrer" })}
          sx={{
            width: 42, height: 42, display: "inline-flex", alignItems: "center", justifyContent: "center",
            borderRadius: "50%", color: C.muted, transition: "color .18s, background .18s",
            "&:hover, &:focus-visible": { color: C.text, background: C.surfaceHover, outline: "none" },
          }}
        >
          {s.icon}
        </Box>
      ))}
    </Box>
  </Container>
);

/* ----------------------------- projects ---------------------------- */
const ProjectCard = styled(Link)({
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  borderRadius: "16px",
  border: `1px solid ${C.border}`,
  background: C.surface,
  color: "inherit",
  textDecoration: "none",
  fontFamily: FONT,
  transition: "transform .22s ease, border-color .22s ease, box-shadow .22s ease",
  "& img": { transition: "transform .5s ease" },
  "&:hover, &:focus-visible": {
    transform: "translateY(-4px)",
    borderColor: "rgba(108,155,255,0.55)",
    boxShadow: "0 24px 50px -28px rgba(76,134,255,0.55)",
    outline: "none",
  },
  "&:hover img, &:focus-visible img": { transform: "scale(1.05)" },
  "&:hover .more, &:focus-visible .more": { color: C.blue, gap: "10px" },
});

export const Projects = () => (
  <Section id="projects">
    <Container>
      <Heading title="Projects" sub="A selection of things I've built. Click any card for details." />
      <Grid>
        {projectsContent.projects.map((p) => (
          <ProjectCard key={p.id} to={`/project/${p.id}`} aria-label={`${p.name} — view details`}>
            <Box sx={{ aspectRatio: "16 / 10", overflow: "hidden", background: "#12141B" }}>
              {p.image && (
                <img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
                />
              )}
            </Box>
            <Box sx={{ p: "18px 18px 20px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
              <Box sx={{ fontWeight: 600, fontSize: "1.02rem", color: C.text, lineHeight: 1.35,
                display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {p.name}
              </Box>
              <Box sx={{ color: C.muted, fontSize: "0.86rem", lineHeight: 1.65,
                display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {p.summary}
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "6px", mt: "auto", pt: "4px" }}>
                {p.technologies.slice(0, 4).map((t) => <Chip key={t}>{t}</Chip>)}
                {p.technologies.length > 4 && <Chip>+{p.technologies.length - 4}</Chip>}
              </Box>
              <Box className="more" sx={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.85rem",
                color: C.text, transition: "gap .2s, color .2s" }}>
                View details <ArrowForwardIcon sx={{ fontSize: 16 }} />
              </Box>
            </Box>
          </ProjectCard>
        ))}
      </Grid>
    </Container>
  </Section>
);

/* ---------------------------- experience --------------------------- */
const VISIBLE = 3;

const Job = ({ job, last }) => {
  const [open, setOpen] = useState(false);
  const items = job.responsibilities || [];
  const shown = open ? items : items.slice(0, VISIBLE);
  return (
    <Box sx={{ position: "relative", pl: { xs: "22px", sm: "30px" }, pb: last ? 0 : "34px", fontFamily: FONT,
      borderLeft: last ? "1px solid transparent" : `1px solid ${C.border}`, ml: "6px" }}>
      <Box sx={{ position: "absolute", left: "-6px", top: "6px", width: 11, height: 11, borderRadius: "50%",
        background: C.blue, boxShadow: "0 0 0 4px rgba(108,155,255,0.15)" }} />
      <Box sx={{ fontWeight: 600, fontSize: "1.05rem", color: C.text }}>
        {job.title} <Box component="span" sx={{ color: C.blue, fontWeight: 500 }}>· {job.company}</Box>
      </Box>
      <Box sx={{ color: C.muted, fontSize: "0.82rem", m: "4px 0 12px" }}>{job.duration}</Box>
      <Box component="ul" sx={{ m: 0, pl: "18px", color: "#B4B6C2", fontSize: "0.9rem", lineHeight: 1.75,
        display: "flex", flexDirection: "column", gap: "6px" }}>
        {shown.map((r, i) => <li key={i}><RichText text={r} /></li>)}
      </Box>
      {items.length > VISIBLE && (
        <Box component="button" type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}
          sx={{ mt: "10px", p: 0, background: "none", border: "none", color: C.blue, cursor: "pointer",
            fontFamily: FONT, fontSize: "0.84rem", "&:hover": { textDecoration: "underline" } }}>
          {open ? "Show less" : `Show ${items.length - VISIBLE} more`}
        </Box>
      )}
    </Box>
  );
};

export const Experience = () => {
  const jobs = experienceContent.experienceData;
  return (
    <Section id="experience">
      <Container>
        <Heading title="Experience" sub="Where I've worked." />
        <Box sx={{ maxWidth: "820px" }}>
          {jobs.map((j, i) => <Job key={`${j.company}-${i}`} job={j} last={i === jobs.length - 1} />)}
        </Box>
      </Container>
    </Section>
  );
};

/* ------------------------------ skills ----------------------------- */
export const Skills = () => (
  <Section id="skills">
    <Container>
      <Heading title="Skills" sub="Tools I reach for day to day." />
      <Grid sx={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))", gap: "16px" }}>
        {techStackData.map((g) => (
          <Card key={g.category} sx={{ p: "18px 18px 20px", fontFamily: FONT }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mb: "12px" }}>
              <Box sx={{ width: 9, height: 9, borderRadius: "50%", background: g.color }} />
              <Box sx={{ fontWeight: 600, fontSize: "0.95rem", color: C.text }}>{g.category}</Box>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
              {g.items.map((t) => <Chip key={t}>{t}</Chip>)}
            </Box>
          </Card>
        ))}
      </Grid>
    </Container>
  </Section>
);

/* -------------------------- certifications ------------------------- */
export const Certifications = () => (
  <Section id="certifications">
    <Container>
      <Heading title="Certifications" sub="Credentials I've earned." />
      <Grid>
        {certifications.map((c) => {
          const aws = c.issuer === "Amazon Web Services";
          return (
            <Card
              key={c.id}
              component={Link}
              to={`/certificate/${c.id}`}
              sx={{
                display: "block", p: "20px", textDecoration: "none", color: "inherit", fontFamily: FONT,
                ...(aws && { borderColor: "rgba(232,160,107,0.45)", background: "rgba(232,160,107,0.05)" }),
                "&:hover, &:focus-visible": { transform: "translateY(-3px)", borderColor: aws ? C.amber : C.blue, outline: "none" },
              }}
            >
              <Box sx={{ fontSize: "0.76rem", color: aws ? C.amber : C.blue, mb: "8px", letterSpacing: "0.04em" }}>
                {c.issuer}
              </Box>
              <Box sx={{ fontWeight: 600, color: C.text, lineHeight: 1.4, mb: "8px" }}>{c.name}</Box>
              <Box sx={{ color: C.muted, fontSize: "0.82rem" }}>{c.date}</Box>
            </Card>
          );
        })}
      </Grid>
    </Container>
  </Section>
);

/* ------------------------------ about ------------------------------ */
export const About = () => (
  <Section id="about">
    <Container>
      <Heading title="About me" />
      <Box sx={{ maxWidth: "720px", color: "#B4B6C2", lineHeight: 1.85, fontSize: "1rem", fontFamily: FONT,
        display: "flex", flexDirection: "column", gap: "14px" }}>
        <p style={{ margin: 0 }}>
          I'm a full-stack developer with four years of experience building web products with React, Next.js, Node.js and
          AWS. I enjoy turning messy requirements into simple, fast interfaces that people actually like using.
        </p>
        <p style={{ margin: 0 }}>
          Lately I've been focused on AI: building agents and automations with LangChain and OpenAI, and using tools like
          Claude Code to ship faster without cutting corners.
        </p>
      </Box>
    </Container>
  </Section>
);

/* ----------------------------- contact ----------------------------- */
export const Contact = () => {
  const [open, setOpen] = useState(false);
  const mail = personalDetails.socialLinks.find((s) => s.name === "mail");
  const linkedin = personalDetails.socialLinks.find((s) => s.name === "linkedin");
  const github = personalDetails.socialLinks.find((s) => s.name === "github");
  return (
    <Section id="contact">
      <Container>
        <Box sx={{ textAlign: "center", p: { xs: "36px 20px", sm: "52px 32px" }, borderRadius: "20px", fontFamily: FONT,
          border: `1px solid ${C.border}`,
          background: "radial-gradient(600px 220px at 50% 0%, rgba(108,155,255,0.12), transparent 70%), rgba(255,255,255,0.02)" }}>
          <Box component="h2" sx={{ m: 0, fontSize: "clamp(1.5rem, 3.4vw, 2rem)", fontWeight: 600, color: C.text }}>
            Let's work together
          </Box>
          <Box component="p" sx={{ m: "10px auto 24px", maxWidth: "520px", color: C.muted, lineHeight: 1.7 }}>
            Have a project, a role or just a question? I'd love to hear from you.
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
            <Button as="button" variant="primary" type="button" onClick={() => setOpen(true)}>Send a message</Button>
            {mail && <Button href={mail.link}>Email me</Button>}
            {linkedin && <Button href={linkedin.link} target="_blank" rel="noopener noreferrer">LinkedIn</Button>}
            {github && <Button href={github.link} target="_blank" rel="noopener noreferrer">GitHub</Button>}
          </Box>
        </Box>
      </Container>
      <ConnectModal open={open} onClose={() => setOpen(false)} />
    </Section>
  );
};

export const Footer = () => (
  <Box component="footer" sx={{ mt: "64px", py: "26px", borderTop: `1px solid ${C.border}`, fontFamily: FONT }}>
    <Container sx={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", justifyContent: "space-between",
      color: C.muted, fontSize: "0.82rem" }}>
      <span>© {new Date().getFullYear()} {personalDetails.name}</span>
      <Link to="/terminal" style={{ color: C.muted, textDecoration: "none" }}>Prefer the terminal? Switch mode →</Link>
    </Container>
  </Box>
);
