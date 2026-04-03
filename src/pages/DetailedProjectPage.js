import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LaunchIcon from "@mui/icons-material/Launch";
import { Box, Chip, IconButton, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const techColors = [
  "#61dafb", "#f7df1e", "#68a063", "#a78bfa",
  "#fb923c", "#4ade80", "#38bdf8", "#f472b6",
  "#facc15", "#34d399", "#818cf8",
];

const renderHighlight = (text, index) =>
  text.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={j} style={{ color: "#e2e8f0", fontWeight: 600 }}>
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );

const DetailedProjectPage = ({ project }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:599px)");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "transparent",
        color: "white",
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 2, sm: 4, md: 6 },
      }}
    >
      {/* Back button */}
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
      </Box>

      <Box sx={{ maxWidth: 900, mx: "auto" }}>
        {/* Title + link */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            gap: { xs: 1, sm: 1.5 },
            mb: 1,
          }}
        >
          <Typography
            variant={isMobile ? "h4" : "h3"}
            sx={{ fontWeight: 700, lineHeight: 1.2, wordBreak: "break-word" }}
          >
            {project.name}
          </Typography>
          {project.link && (
            <IconButton
              component="a"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "rgba(255,255,255,0.45)", "&:hover": { color: "#fff" } }}
            >
              <LaunchIcon />
            </IconButton>
          )}
        </Box>

        {/* Status + dates */}
        <Typography
          variant="body2"
          sx={{
            color: "rgba(255,255,255,0.4)",
            mb: 3,
            fontFamily: "Montserrat",
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
          }}
        >
          {project.startDate} — {project.endDate} &nbsp;·&nbsp;
          <span
            style={{
              color: project.status === "Completed" ? "#4ade80" : "#facc15",
            }}
          >
            {project.status}
          </span>
        </Typography>

        {/* Live Preview - Show image if available, otherwise iframe */}
        {(project.image || project.iframeUrl) && (
          <Box
            sx={{
              mb: 4,
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
              position: "relative",
            }}
          >
            {project.image ? (
              <Box>
                <img
                  src={project.image}
                  alt={project.name}
                  style={{
                    width: "100%",
                    maxHeight: 400,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                {project.link && (
                  <Box
                    sx={{
                      p: 2,
                      background: "rgba(255,255,255,0.05)",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      component="a"
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 1,
                        px: 3,
                        py: 1.5,
                        border: "1px solid rgba(255,255,255,0.3)",
                        borderRadius: "8px",
                        color: "#fff",
                        fontFamily: "Montserrat",
                        fontSize: "0.85rem",
                        textDecoration: "none",
                        "&:hover": {
                          border: "1px solid rgba(255,255,255,0.6)",
                          background: "rgba(255,255,255,0.05)",
                        },
                      }}
                    >
                      Open Project ↗
                    </Box>
                  </Box>
                )}
              </Box>
            ) : project.iframeUrl ? (
              <Box
                component="iframe"
                src={project.iframeUrl}
                title={`${project.name} live preview`}
                sx={{
                  width: "100%",
                  height: { xs: 300, sm: 400, md: 500 },
                  border: "none",
                  display: "block",
                }}
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            ) : null}
          </Box>
        )}

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.8,
            mb: 4,
            fontFamily: "Montserrat",
            fontSize: "0.95rem",
          }}
        >
          {project.description}
        </Typography>

        {/* Highlights */}
        {project.highlights?.length > 0 && (
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
              Key Highlights
            </Typography>
            <Box
              component="ul"
              sx={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {project.highlights.map((point, i) => (
                <Box
                  component="li"
                  key={i}
                  sx={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    color: "rgba(255,255,255,0.75)",
                    fontFamily: "Montserrat",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      mt: "9px",
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: techColors[i % techColors.length],
                      flexShrink: 0,
                    }}
                  />
                  <span>{renderHighlight(point, i)}</span>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Tech stack */}
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
            Tech Stack
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {project.technologies?.map((tech, i) => (
              <Chip
                key={tech}
                label={tech}
                variant="outlined"
                sx={{
                  color: techColors[i % techColors.length],
                  borderColor: `${techColors[i % techColors.length]}55`,
                  background: `${techColors[i % techColors.length]}11`,
                  fontFamily: "Montserrat",
                  fontSize: "0.78rem",
                  height: "28px",
                  "&:hover": {
                    background: `${techColors[i % techColors.length]}22`,
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailedProjectPage;
