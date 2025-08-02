
import React from 'react';
import Hero from '../components/home/Hero';
import Navbar from '../components/Navbar';
import AnimatedHome from '../components/home/AnimatedHome';
import ChefSpecials from '../components/home/ChefSpecials';
import MenuPreview from '../components/MenuPreview';

import Gallery from '../components/Gallery';
import ReservationSection from '../components/ReservationSection';
import TestimonialsAndReels from '../components/home/TestimonialsAndReels';

import Footer from '../components/Footer';


const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <AnimatedHome />
      <ChefSpecials />
      {/* Menu Preview Section */}
      <MenuPreview />
      {/* Instagram Gallery Section */}
      <Gallery />
      {/* Offers & Reservation Section */}
      <ReservationSection />
      <TestimonialsAndReels />
    <Footer />
    </div>
  );
};

export default Home;