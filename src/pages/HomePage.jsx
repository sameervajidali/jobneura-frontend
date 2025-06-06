import React from 'react';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import CertificateShowcase from '../components/landing/CertificateShowcase';
// import TutorialsPreview from '../components/landing/TutorialsPreview';
// import BlogsPreview from '../components/landing/BlogsPreview';

function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <CertificateShowcase />
      {/* <TutorialsPreview />
      <BlogsPreview /> */}
    </div>
  );
}
export default HomePage;
