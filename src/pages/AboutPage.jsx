// src/pages/AboutPage.jsx
import React from "react";
import AboutHero from "../components/about/AboutHero";
import OurStory from "../components/about/OurStory";
import OurValues from "../components/about/OurValues";
import StatsSection from "../components/about/StatsSection";
import AboutCTA from "../components/about/AboutCTA";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <OurValues />
      <StatsSection />
      <AboutCTA />
    </>
  );
}
