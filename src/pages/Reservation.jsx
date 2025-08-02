import React from 'react';
import Navbar from '../components/Navbar';
import ReservationSection from '../components/ReservationSection';
import Footer from '../components/Footer';

const ReservationPage = () => {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-end mb-4">
            <a href="/table">
              <button className="bg-yellow-400 text-[#1f1f1f] font-bold px-6 py-2 rounded-full shadow hover:bg-yellow-300 transition-colors duration-200">My Table</button>
            </a>
          </div>
          <ReservationSection />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ReservationPage;
