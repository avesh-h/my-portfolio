import React from "react";
import { Typography, styled } from "@mui/material";

const MuiTypography = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontSize: "2rem",
  fontWeight: "400",
  marginBottom: "1rem",
  fontFamily: "Poppins",
}));

const MuiHeading = ({ children, variant, ...others }) => {
  return (
    <MuiTypography variant={variant || "h2"} {...others}>
      {children}
    </MuiTypography>
  );
};

export default MuiHeading;
