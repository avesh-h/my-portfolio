import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import MuiHeading from "../components/mui/MuiHeading";
import { techStackData } from "../static/techStackData";

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  paddingTop: "1rem",
  paddingBottom: "4rem",
});

const CategoryBlock = styled(Box)({
  marginBottom: "1.8rem",
});

const CategoryLabel = styled(Typography)({
  color: "#ffffff",
  fontSize: "0.75rem",
  fontWeight: "600",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  marginBottom: "0.75rem",
  fontFamily: "Montserrat",
});

const ChipsRow = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
});

const Chip = styled(Box)(({ accentcolor }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "5px 14px",
  borderRadius: "999px",
  border: `1px solid rgba(255,255,255,0.12)`,
  background: "rgba(255,255,255,0.04)",
  color: "#e2e8f0",
  fontSize: "0.82rem",
  fontFamily: "Montserrat",
  fontWeight: "400",
  cursor: "default",
  transition: "background 0.2s, border-color 0.2s, transform 0.2s",
  "&:hover": {
    background: "rgba(255,255,255,0.09)",
    borderColor: accentcolor,
    transform: "translateY(-2px)",
  },
  "&::before": {
    content: '""',
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: accentcolor,
    flexShrink: 0,
  },
}));

const TechStackPage = () => {
  return (
    <Container>
      <MuiHeading>Stack</MuiHeading>
      {techStackData.map((group) => (
        <CategoryBlock key={group.category}>
          <CategoryLabel>{group.category}</CategoryLabel>
          <ChipsRow>
            {group.items.map((item) => (
              <Chip key={item} accentcolor={group.color}>
                {item}
              </Chip>
            ))}
          </ChipsRow>
        </CategoryBlock>
      ))}
    </Container>
  );
};

export default TechStackPage;
