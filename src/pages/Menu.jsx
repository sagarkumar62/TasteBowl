import React from 'react';
import MenuPreview from '../components/MenuPreview';
import Navbar from '../components/Navbar';

const Menu = () => {
  return (
    <main className="min-h-screen bg-white pt-24 pb-12">
        <Navbar />
      <section className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10 text-yellow-500">Our Menu</h1>
        <MenuPreview />
      </section>
    </main>
  );
};

export default Menu;
