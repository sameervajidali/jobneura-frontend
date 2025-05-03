import React from 'react';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import JobsPreview from '../components/landing/JobsPreview';
import QuizzesPreview from '../components/landing/QuizzesPreview';
import CTABanner from '../components/landing/CTABanner';

function HomePage() {
  return (
    <div>
     
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Jobs Preview Section */}
      <JobsPreview />
      {/* Quizzes Preview Section */}
      <QuizzesPreview />

      {/* Call To Action Banner */}
      <CTABanner />
    </div>
  );
}

export default HomePage;
