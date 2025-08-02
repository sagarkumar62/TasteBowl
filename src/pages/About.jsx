import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24 pb-12">
        <section className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-yellow-500">About Us</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Welcome to TasteBowl! We are passionate about serving delicious, high-quality food in a warm and inviting atmosphere. Our chefs use only the freshest ingredients to craft a menu that celebrates both classic favorites and creative new dishes.
        </p>
        <p className="text-md text-gray-600 mb-4">
          Whether you're joining us for a family dinner, a special celebration, or just a quick bite, we strive to make every visit memorable. Our team is dedicated to providing excellent service and a dining experience that will keep you coming back for more.
        </p>
        <p className="text-md text-gray-600">
          Thank you for choosing TasteBowl. We look forward to serving you soon!
        </p>
        </section>
      </main>
    </>
  );
};

export default About;
