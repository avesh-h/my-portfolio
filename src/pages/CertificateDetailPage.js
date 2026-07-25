import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import DetailShell, {
  Title,
  MetaLine,
  SectionLabel,
  Paragraph,
  HighlightList,
  BrowserFrame,
} from "../components/DetailShell";
import certificationsData from "../static/certificationsData.json";

const slugify = (name) =>
  (name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .split("-")
    .filter(Boolean)
    .slice(0, 3)
    .join("-");

const CertificateDetailPage = () => {
  const { certificateId } = useParams();
  const certificate = certificationsData.find(
    (cert) => cert.id === parseInt(certificateId, 10)
  );

  if (!certificate) {
    return (
      <DetailShell
        pathLabel="~/certifications"
        command={`open certifications/${certificateId}`}
        sections={[
          <Paragraph>
            <span style={{ color: "#FF6B6B" }}>not found:</span> no certificate
            with that id.
          </Paragraph>,
        ]}
      />
    );
  }

  const slug = slugify(certificate.name);

  const sections = [
    <Box>
      <Title>{certificate.name}</Title>
      <MetaLine start={certificate.issuer} end={certificate.date} />
    </Box>,

    certificate.image && (
      <BrowserFrame
        src={certificate.image}
        alt={certificate.name}
        label={`certificate · ${certificate.issuer}`}
        link={certificate.url}
        actionLabel="verify certificate ↗"
      />
    ),

    certificate.description && (
      <Box>
        <SectionLabel>About this Certification</SectionLabel>
        <Paragraph>{certificate.description}</Paragraph>
      </Box>
    ),

    certificate.keyPoints?.length > 0 && (
      <Box>
        <SectionLabel>Key Learnings</SectionLabel>
        <HighlightList items={certificate.keyPoints} />
      </Box>
    ),
  ].filter(Boolean);

  return (
    <DetailShell
      pathLabel={`~/certifications/${slug}`}
      command={`open certifications/${slug}`}
      sections={sections}
    />
  );
};

export default CertificateDetailPage;
