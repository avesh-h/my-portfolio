import { keyframes } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import MuiHeading from "../components/mui/MuiHeading";
import certificationsData from "../static/certificationsData.json";

const rotateBorder = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const CardWrapper = styled(Box)({
  position: "relative",
  borderRadius: "16px",
  padding: "1px",
  overflow: "hidden",
  marginBottom: "12px",
  // "&::before": {
  //   content: '""',
  //   position: "absolute",
  //   width: "200%",
  //   height: "200%",
  //   top: "-50%",
  //   left: "-50%",
  //   background:
  //     "conic-gradient(from 0deg, transparent 0%, transparent 65%, rgba(255,255,255,0.55) 80%, transparent 95%)",
  //   animation: `${rotateBorder} 8s linear infinite`,
  // },
});

const CardBody = styled(Box)({
  position: "relative",
  background: "transparent",
  borderRadius: "15px",
  padding: "20px 24px",
  display: "flex",
  gap: "20px",
  border: "1px solid rgba(255, 255, 255, 0.36)",
});

const CertificateImage = styled(Box)(({ image }) => ({
  width: "100px",
  height: "70px",
  borderRadius: "8px",
  background: image ? `url(${image}) center/cover no-repeat` : "rgba(99, 102, 241, 0.2)",
  backgroundColor: "rgba(99, 102, 241, 0.1)",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.5rem",
}));

const CertificateInfo = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

const CertificateName = styled(Typography)({
  color: "#fff",
  fontSize: "1.1rem",
  fontWeight: 600,
  fontFamily: "Montserrat",
  marginBottom: "4px",
});

const Issuer = styled(Typography)({
  color: "rgba(255,255,255,0.5)",
  fontSize: "0.85rem",
  fontFamily: "Montserrat",
});

const DateBadge = styled(Box)({
  display: "inline-block",
  padding: "2px 8px",
  borderRadius: "4px",
  background: "rgba(255,255,255,0.08)",
  color: "rgba(255,255,255,0.6)",
  fontSize: "0.72rem",
  fontFamily: "Montserrat",
  marginTop: "6px",
});

const ArrowIcon = styled(Box)({
  color: "rgba(255,255,255,0.5)",
  display: "flex",
  alignItems: "center",
  alignSelf: "center",
});

const CertificationsPage = () => {
  return (
    <Box sx={{ paddingTop: "1rem" }}>
      <MuiHeading>Certifications</MuiHeading>
      {certificationsData.map((cert) => (
        <Link
          key={cert.id}
          to={`/certificate/${cert.id}`}
          style={{ textDecoration: "none", color: "white", display: "block" }}
        >
          <CardWrapper>
            <CardBody>
              <CertificateImage image={cert.image} />
              <CertificateInfo>
                <CertificateName>{cert.name}</CertificateName>
                <Issuer>{cert.issuer}</Issuer>
                <DateBadge>{cert.date}</DateBadge>
              </CertificateInfo>
              <ArrowIcon>→</ArrowIcon>
            </CardBody>
          </CardWrapper>
        </Link>
      ))}
    </Box>
  );
};

export default CertificationsPage;
