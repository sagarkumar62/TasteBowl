import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './AnimatedHome.css';

const CUISINES = ['Indian', 'Italian', 'Chinese'];
const SLIDES = [
  {
    img: '/src/assets/Butter Chicken.png',
    title: 'Butter Chicken',
    desc: 'Creamy, spiced, and rich Indian classic.'
  },
  {
    img: '/src/assets/Margherita Pizza.png',
    title: 'Margherita Pizza',
    desc: 'Wood-fired, fresh basil, mozzarella, and tomatoes.'
  },
  {
    img: '/src/assets/Kung Pao.png',
    title: 'Kung Pao Chicken',
    desc: 'Spicy, sweet, and savory Chinese favorite.'
  }
];

function Typewriter({ words, speed = 120, pause = 1200 }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), pause);
      return;
    }
    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, words, speed, pause]);

  return (
    <span className="text-primary font-bold">{words[index].substring(0, subIndex)}<span className="blinking-cursor">|</span></span>
  );
}

function SteamBowl() {
  return (
    <div className="flex flex-col items-center mt-8 mb-4">
      <div className="steam">
        <span className="steam1" />
        <span className="steam2" />
        <span className="steam3" />
      </div>
      <svg width="80" height="40" viewBox="0 0 80 40">
        <ellipse cx="40" cy="30" rx="35" ry="10" fill="#fff8e1" />
        <ellipse cx="40" cy="35" rx="30" ry="5" fill="#e0c097" />
      </svg>
    </div>
  );
}

function DishCarousel() {
  const [current, setCurrent] = useState(0);
  const slideRef = useRef();
  const touchStartX = useRef(null);

  const next = () => setCurrent((prev) => (prev + 1) % SLIDES.length);
  const prev = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  // Swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50) prev();
    else if (diff < -50) next();
    touchStartX.current = null;
  };

  return (
    <div className="relative w-full max-w-xl mx-auto mt-10">
      <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow hover:bg-primary hover:text-white transition">
        <FaChevronLeft size={22} />
      </button>
      <div
        ref={slideRef}
        className="overflow-hidden rounded-2xl shadow-lg"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.5 }}
          className="bg-white flex flex-col items-center p-6 min-h-[320px]"
        >
          <img
            src={SLIDES[current].img}
            alt={SLIDES[current].title}
            className="w-48 h-36 object-cover rounded-xl mb-4 shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <h3 className="text-xl font-semibold mb-2 text-primary">{SLIDES[current].title}</h3>
          <p className="text-gray-600 mb-2">{SLIDES[current].desc}</p>
        </motion.div>
      </div>
      <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow hover:bg-primary hover:text-white transition">
        <FaChevronRight size={22} />
      </button>
      <div className="flex justify-center gap-2 mt-4">
        {SLIDES.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full ${idx === current ? 'bg-primary' : 'bg-gray-300'} transition`}
          />
        ))}
      </div>
    </div>
  );
}

const AnimatedHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex flex-col items-center justify-start pt-8 px-2">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold text-center text-primary mb-4"
      >
        Welcome to <span className="text-orange-500">TasteBowl</span>
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-2xl md:text-3xl font-semibold text-center mb-2"
      >
        Experience the best of <Typewriter words={CUISINES} /> cuisine
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="text-lg text-gray-700 text-center max-w-xl mb-6"
      >
        Discover a world of flavors, crafted with passion and served with elegance. Enjoy our chef’s specials and signature dishes in a premium ambiance.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <button className="bg-primary text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-orange-600 transition-all focus:outline-none">
          Reserve a Table
        </button>
      </motion.div>
      <SteamBowl />
      <DishCarousel />
    </div>
  );
};

export default AnimatedHome;
