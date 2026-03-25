import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import certificationsData from "../static/certificationsData.json";

const CertificateDetailPage = () => {
  const { certificateId } = useParams();
  const navigate = useNavigate();
  
  const certificate = certificationsData.find(
    (cert) => cert.id === parseInt(certificateId, 10)
  );

  if (!certificate) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "#111",
          color: "white",
          px: { xs: 2, sm: 4, md: 8 },
          py: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Box sx={{ maxWidth: 900, mx: "auto" }}>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{ color: "rgba(255,255,255,0.5)", mb: 2, pl: 0, "&:hover": { color: "#fff" } }}
          >
            <ArrowBackIcon sx={{ mr: 0.5 }} />
            <Typography variant="body2" sx={{ fontFamily: "Montserrat" }}>
              Back
            </Typography>
          </IconButton>
          <Typography sx={{ color: "rgba(255,255,255,0.7)", fontFamily: "Montserrat", mt: 4 }}>
            Certificate not found.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#111",
        color: "white",
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Box sx={{ maxWidth: 900, mx: "auto" }}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ color: "rgba(255,255,255,0.5)", mb: 2, pl: 0, "&:hover": { color: "#fff" } }}
        >
          <ArrowBackIcon sx={{ mr: 0.5 }} />
          <Typography variant="body2" sx={{ fontFamily: "Montserrat" }}>
            Back
          </Typography>
        </IconButton>

        {/* Title Section */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: "#fff",
            fontFamily: "Montserrat",
            mb: 1,
          }}
        >
          {certificate.name}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4, flexWrap: "wrap" }}>
          <Typography sx={{ color: "rgba(255,255,255,0.5)", fontFamily: "Montserrat" }}>
            {certificate.issuer}
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.4)",
              fontFamily: "Montserrat",
            }}
          >
            ·
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.5)", fontFamily: "Montserrat" }}>
            {certificate.date}
          </Typography>
          {certificate.url && (
            <Box
              component="a"
              href={certificate.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                color: "#6366f1",
                textDecoration: "none",
                fontFamily: "Montserrat",
                fontSize: "0.9rem",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              View Certificate <OpenInNewIcon sx={{ fontSize: 16 }} />
            </Box>
          )}
        </Box>

        {/* Certificate Image */}
        {certificate.image && (
          <Box
            sx={{
              mb: 4,
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <img
              src={certificate.image}
              alt={certificate.name}
              style={{
                width: "100%",
                display: "block",
              }}
            />
          </Box>
        )}

        {/* Description */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="overline"
            sx={{
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.12em",
              fontFamily: "Montserrat",
              display: "block",
              mb: 1.5,
            }}
          >
            About this Certification
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.75)",
              fontFamily: "Montserrat",
              fontSize: "0.95rem",
              lineHeight: 1.8,
            }}
          >
            {certificate.description}
          </Typography>
        </Box>

        {/* Key Points */}
        <Box>
          <Typography
            variant="overline"
            sx={{
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.12em",
              fontFamily: "Montserrat",
              display: "block",
              mb: 1.5,
            }}
          >
            Key Learnings
          </Typography>
          <Box component="ul" sx={{ listStyle: "none", padding: 0, margin: 0 }}>
            {certificate.keyPoints.map((point, index) => (
              <Box
                component="li"
                key={index}
                sx={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start",
                  mb: 1.5,
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "Montserrat",
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    mt: "8px",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#6366f1",
                    flexShrink: 0,
                  }}
                />
                {point}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CertificateDetailPage;
