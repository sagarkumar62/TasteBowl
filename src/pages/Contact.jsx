import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center">
        <div className="max-w-xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4 text-primary dark:text-yellow-400 text-center">Contact Us</h1>
          <p className="mb-6 text-gray-700 dark:text-gray-200 text-center">We'd love to hear from you! Fill out the form below or reach us directly at <a href="mailto:info@tastebowl.com" className="text-primary dark:text-yellow-400 underline">info@tastebowl.com</a>.</p>
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Your Name" className="px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-primary" required />
            <input type="email" placeholder="Your Email" className="px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-primary" required />
            <textarea placeholder="Your Message" className="px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-primary" rows={5} required />
            <button type="submit" className="bg-primary dark:bg-yellow-400 text-white dark:text-gray-900 font-bold py-2 rounded hover:bg-primary/80 dark:hover:bg-yellow-300 transition">Send Message</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
