import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaStar, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Sophia Lee',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    review: 'Absolutely delicious! The chef specials are a must-try. Will come back for sure!'
  },
  {
    name: 'James Smith',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4,
    review: 'Great ambiance and the food reels made me hungry before I even ordered!'
  },
  {
    name: 'Ava Brown',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    rating: 5,
    review: 'The best dining experience I’ve had in years. Highly recommend!'
  },
];

const foodReels = [
  {
    src: '/src/assets/reels/part1.mp4',
    alt: 'Sizzling Steak Reel',
  },
  {
    src: '/src/assets/reels/part2.mp4',
    alt: 'Fresh Salad Reel',
  },
  {
    src: '/src/assets/reels/part3.mp4',
    alt: 'Dessert Reel',
  },
];

const TestimonialCard = ({ testimonial, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={controls}
      transition={{ duration: 0.10, delay: index * 0.15 }}
      className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-transparent hover:scale-105 hover:shadow-lg hover:border-yellow-400 transition-all duration-300 cursor-pointer flex flex-col items-center"
    >
      <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mb-3 border-4 border-yellow-200 object-cover" />
      <div className="flex mb-2">
        {[...Array(testimonial.rating)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-800 font-semibold mb-1">{testimonial.name}</p>
      <p className="text-gray-600 text-center text-sm">“{testimonial.review}”</p>
    </motion.div>
  );
};

const FoodReel = ({ src, alt, isActive, muted, onMuteToggle }) => {
  const videoRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    if (isActive) {
      controls.start({ scale: 1, opacity: 1, y: 0 });
      videoRef.current?.play();
    } else {
      controls.start({ scale: 0.95, opacity: 0.7, y: 40 });
      videoRef.current?.pause();
    }
  }, [isActive, controls]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  return (
    <motion.div
      className="relative w-full h-72 rounded-2xl overflow-hidden shadow-md bg-gray-100 flex items-center justify-center"
      animate={controls}
      initial={{ scale: 0.95, opacity: 0.7, y: 40 }}
      transition={{ type: 'spring', bounce: 0.4, duration: 0.7 }}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        loop
        autoPlay={isActive}
        muted={muted}
        playsInline
      />
      <button
        className="absolute top-3 right-3 bg-white/80 rounded-full p-2 shadow hover:bg-yellow-400 transition-colors"
        onClick={onMuteToggle}
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? <FaVolumeMute className="text-gray-700" /> : <FaVolumeUp className="text-yellow-500" />}
      </button>
    </motion.div>
  );
};

const TestimonialsAndReels = () => {
  const [activeReel, setActiveReel] = useState(0);
  const [muted, setMuted] = useState(true);
  const reelTimeout = useRef();

  // Auto-play/loop reels
  useEffect(() => {
    reelTimeout.current = setTimeout(() => {
      setActiveReel((prev) => (prev + 1) % foodReels.length);
    }, 12000);
    return () => clearTimeout(reelTimeout.current);
  }, [activeReel]);

  // Swipe/scroll handler
  const handleWheel = (e) => {
    if (e.deltaY > 0) {
      setActiveReel((prev) => (prev + 1) % foodReels.length);
    } else if (e.deltaY < 0) {
      setActiveReel((prev) => (prev - 1 + foodReels.length) % foodReels.length);
    }
  };

  // Touch swipe
  const touchStartY = useRef(null);
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e) => {
    if (touchStartY.current === null) return;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (deltaY > 40) {
      setActiveReel((prev) => (prev - 1 + foodReels.length) % foodReels.length);
    } else if (deltaY < -40) {
      setActiveReel((prev) => (prev + 1) % foodReels.length);
    }
    touchStartY.current = null;
  };

  return (
    <section className="w-full bg-white py-16 px-4 md:px-16 flex flex-col md:flex-row gap-10 md:gap-20 items-center justify-center">
      {/* Left: Testimonials */}
      <div className="flex-1 max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 font-sans">What Our Customers Say</h2>
        {testimonials.map((t, i) => (
          <TestimonialCard testimonial={t} key={i} index={i} />
        ))}
      </div>
      {/* Right: Food Reels */}
      <div
        className="flex-1 max-w-md flex flex-col items-center"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <h2 className="text-3xl font-bold mb-8 text-yellow-500 font-sans">Food Reels</h2>
        <div className="w-full h-72 relative">
          {foodReels.map((reel, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-500 ${i === activeReel ? 'z-10' : 'z-0 pointer-events-none'}`}
              style={{ opacity: i === activeReel ? 1 : 0 }}
            >
              <FoodReel
                src={reel.src}
                alt={reel.alt}
                isActive={i === activeReel}
                muted={muted}
                onMuteToggle={() => setMuted((m) => !m)}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          {foodReels.map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full border-2 ${i === activeReel ? 'bg-yellow-400 border-yellow-400' : 'bg-white border-gray-300'} transition-all`}
              onClick={() => setActiveReel(i)}
              aria-label={`Go to reel ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsAndReels;
