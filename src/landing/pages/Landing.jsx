import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ServicesGrid from '../components/ServicesGrid';
import WorkWithUs from '../components/WorkWithUs';
import CarCategories from '../components/CarCategories';
import CityBlock from '../components/CityBlock';
import SecurityFeatures from '../components/SecurityFeatures';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import ServicesGridplus from '../components/ServicesGridplus';
import ScrollingRibbon from '../components/ScrollingRibbon';

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Ruban défilant */}
      <ScrollingRibbon />
      
      {/* Hero Section */}
      <Hero />

      {/* Services Grid */}
      <ServicesGrid />

      {/* Services Grid plus */}
      <ServicesGridplus />

      {/* Car Categories */}
      <CarCategories />

      {/* Security Features */}
      <SecurityFeatures />

      {/* City Block */}
      <CityBlock />

      {/* Travaillez avec nous */}
      <WorkWithUs />

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing; 