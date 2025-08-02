
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUtensils, FaWineGlassAlt, FaLeaf } from "react-icons/fa";

const bgImage = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1500&q=80"; // Replace with your own image if desired

const headlineVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
const subheadingVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.8, ease: "easeOut" } },
};
const buttonVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.5 + i * 0.15, duration: 0.7, ease: "easeOut" } }),
};
const iconsVariant = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1, transition: { delay: 0.9, duration: 0.6, ease: "backOut" } },
};
const arrowVariant = {
  animate: {
    y: [0, 12, 0],
    transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
  },
};

const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      style={{ minHeight: "100dvh" }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={bgImage}
          alt="Restaurant ambiance"
          className="w-full h-full object-cover object-center brightness-75 md:brightness-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-2xl mx-auto">
        {/* Food Icons */}
        <motion.div
          className="flex gap-6 mb-6 justify-center"
          variants={iconsVariant}
          initial="hidden"
          animate="visible"
        >
          <FaUtensils className="text-3xl md:text-4xl text-amber-400 drop-shadow-lg" />
          <FaWineGlassAlt className="text-3xl md:text-4xl text-rose-300 drop-shadow-lg" />
          <FaLeaf className="text-3xl md:text-4xl text-emerald-400 drop-shadow-lg" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4"
          variants={headlineVariant}
          initial="hidden"
          animate="visible"
        >
          Experience Flavor Like Never Before
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-lg md:text-2xl text-gray-200 mb-8 font-light"
          variants={subheadingVariant}
          initial="hidden"
          animate="visible"
        >
          Savor the art of fine dining in a modern, elegant setting. Reserve your table for an unforgettable culinary journey.
        </motion.p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <motion.div
            variants={buttonVariant}
            initial="hidden"
            animate="visible"
            custom={0}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              to="/menu"
              className="px-8 py-3 rounded-full bg-amber-500 text-white font-semibold text-lg shadow-lg hover:bg-amber-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-300 scale-100 hover:scale-105 flex items-center justify-center"
            >
              View Menu
            </Link>
          </motion.div>
          <motion.div
            variants={buttonVariant}
            initial="hidden"
            animate="visible"
            custom={1}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              to="/reservation"
              className="px-8 py-3 rounded-full bg-white text-amber-600 font-semibold text-lg shadow-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-300 scale-100 hover:scale-105 flex items-center justify-center"
            >
              Book a Table
            </Link>
          </motion.div>
        </div>

        {/* Scroll Down Arrow */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-10 flex flex-col items-center cursor-pointer"
          variants={arrowVariant}
          animate="animate"
          onClick={() => {
            const nextSection = document.getElementById("next-section");
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="text-white drop-shadow-lg animate-bounce">
            <path d="M12 5v14m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-xs text-gray-200 mt-1">Scroll Down</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
