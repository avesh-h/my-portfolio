import { Box } from "@mui/material";
import React from "react";
import DetailShell, {
  Title,
  MetaLine,
  SectionLabel,
  Paragraph,
  HighlightList,
  TechChips,
  BrowserFrame,
} from "../components/DetailShell";

const slugify = (name) =>
  (name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .split("-")
    .filter(Boolean)
    .slice(0, 3)
    .join("-");

const domainOf = (link) => {
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
};

const DetailedProjectPage = ({ project }) => {
  const slug = slugify(project.name);

  const sections = [
    <Box>
      <Title>{project.name}</Title>
      <MetaLine
        start={project.startDate}
        end={project.endDate}
        status={project.status}
      />
    </Box>,

    project.image && (
      <BrowserFrame
        src={project.image}
        alt={project.name}
        label={domainOf(project.link)}
        link={project.link}
        actionLabel="open live ↗"
      />
    ),

    project.description && <Paragraph>{project.description}</Paragraph>,

    project.highlights?.length > 0 && (
      <Box>
        <SectionLabel>Key Highlights</SectionLabel>
        <HighlightList items={project.highlights} />
      </Box>
    ),

    project.technologies?.length > 0 && (
      <Box>
        <SectionLabel>Stack</SectionLabel>
        <TechChips items={project.technologies} />
      </Box>
    ),
  ].filter(Boolean);

  return (
    <DetailShell
      pathLabel={`~/projects/${slug}`}
      command={`open projects/${slug}`}
      sections={sections}
    />
  );
};

export default DetailedProjectPage;
