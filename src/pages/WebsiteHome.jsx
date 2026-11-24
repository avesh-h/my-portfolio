import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SiteNav from "../components/site/SiteNav";
import Banner from "../components/site/Banner";
import { C, FONT, Container } from "../components/site/tokens";
import {
  Intro, Projects, Experience, Skills, Certifications, About, Contact, Footer,
} from "../components/site/Sections";
import { setMode } from "../utils/mode";

/* Default landing page: a conventional, scroll-based portfolio site.
 * The terminal lives at /terminal and is reached via the "Terminal mode" toggle. */
const WebsiteHome = () => {
  const { hash } = useLocation();

  useEffect(() => {
    setMode("website");
    // Arriving from a detail page's nav ("/#projects") scrolls to that section.
    const target = hash && document.getElementById(hash.slice(1));
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = "smooth";
    return () => {
      root.style.scrollBehavior = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", fontFamily: FONT, color: C.text, background: "rgba(11,12,16,0.52)" }}>
      <SiteNav />
      <Container sx={{ pt: { xs: "20px", md: "32px" } }}>
        <Banner />
      </Container>
      <main>
        <Intro />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </Box>
  );
};

export default WebsiteHome;
