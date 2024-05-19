import { Typography, styled } from "@mui/material";

const MuiTypography = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontSize: "1rem",
  marginBottom: "1rem",
  textAlign: "start",
  fontFamily: "Montserrat",
  fontWeight: "200",
}));

const MuiParagraph = ({ children, variant, ...others }) => {
  return (
    <MuiTypography variant={variant || "p"} {...others}>
      {children}
    </MuiTypography>
  );
};

export default MuiParagraph;
