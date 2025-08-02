import React from 'react';
import Navbar from '../components/Navbar';
import Gallery from '../components/Gallery';

const GalleryPage = () => {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-white dark:bg-gray-900">
        <Gallery />
      </main>
    </>
  );
};

export default GalleryPage;
