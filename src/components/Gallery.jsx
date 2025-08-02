import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaHeart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Example static images (replace with your own or fetch from API)
const images = [
  {
    src: '/assets/gallery/Pasta.jpg',
    alt: 'Delicious Pasta',
    likes: 120,
    description: 'Creamy Alfredo Pasta',
    insta: 'https://instagram.com/yourpage',
    hashtags: ['#Pasta', '#Italian', '#FreshOnTheFeed'],
  },
  {
    src: '/assets/gallery/Juicy Gourmet Burger.jpg',
    alt: 'Gourmet Burger',
    likes: 98,
    description: 'Juicy Gourmet Burger',
    insta: 'https://instagram.com/yourpage',
    hashtags: ['#Burger', '#Grill', '#Yum'],
  },
  {
    src: '/assets/gallery/Assorted Sushi Platter.jpg',
    alt: 'Sushi Platter',
    likes: 143,
    description: 'Assorted Sushi Platter',
    insta: 'https://instagram.com/yourpage',
    hashtags: ['#Sushi', '#Japanese', '#FreshOnTheFeed'],
  },
  {
    src: '/assets/gallery/Dessert.jpg',
    alt: 'Dessert',
    likes: 87,
    description: 'Chocolate Lava Cake',
    insta: 'https://instagram.com/yourpage',
    hashtags: ['#Dessert', '#Chocolate', '#SweetTooth'],
  },
  // Add more images as needed
];

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 80 } },
};

const Gallery = () => {
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  const openLightbox = (idx) => setLightbox({ open: true, index: idx });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });
  const prevImage = () => setLightbox((l) => ({ ...l, index: (l.index - 1 + images.length) % images.length }));
  const nextImage = () => setLightbox((l) => ({ ...l, index: (l.index + 1) % images.length }));

  return (
    <section className="bg-white py-12 relative overflow-hidden">
      {/* Parallax floating icon (optional) */}
      <motion.div
        className="absolute top-10 left-10 text-yellow-400 opacity-20 text-7xl pointer-events-none z-0"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      >
        <FaInstagram />
      </motion.div>
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#222]"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          #FreshOnTheFeed <span role="img" aria-label="camera">📸</span>
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {images.map((img, idx) => (
            <motion.div
              key={img.src}
              className="relative group rounded-xl overflow-hidden shadow-lg bg-white cursor-pointer border-2 border-transparent hover:border-yellow-400 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.04 }}
              onClick={() => openLightbox(idx)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FaHeart className="text-white drop-shadow" />
                  <span className="text-white font-semibold">{img.likes}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <FaInstagram className="text-white" />
                  <span className="text-white text-sm">{img.description}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {img.hashtags.map((tag) => (
                    <span key={tag} className="bg-white/80 text-yellow-500 text-xs rounded px-2 py-0.5 mr-1">{tag}</span>
                  ))}
                </div>
                <motion.a
                  href={img.insta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-3 py-1 bg-yellow-400 text-[#222] font-semibold rounded-full shadow hover:bg-yellow-300 transition-colors duration-200 text-sm"
                  whileHover={{ scale: 1.08 }}
                  onClick={e => e.stopPropagation()}
                >
                  View on Instagram
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {/* Follow Button */}
        <div className="flex justify-center mt-10">
          <motion.a
            href="https://instagram.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2 bg-yellow-400 text-[#222] font-bold rounded-full shadow-lg hover:bg-yellow-300 transition-colors duration-200 text-lg"
            whileHover={{ scale: 1.06 }}
          >
            <FaInstagram /> Follow us on Instagram
          </motion.a>
        </div>
      </div>
      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox.open && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative bg-white rounded-xl shadow-2xl p-4 max-w-lg w-full flex flex-col items-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={images[lightbox.index].src}
                alt={images[lightbox.index].alt}
                className="w-full h-80 object-cover rounded mb-4"
              />
              <div className="flex items-center gap-2 mb-2">
                <FaHeart className="text-yellow-400" />
                <span className="text-[#222] font-semibold">{images[lightbox.index].likes}</span>
                <span className="ml-4 text-[#222]">{images[lightbox.index].description}</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {images[lightbox.index].hashtags.map((tag) => (
                  <span key={tag} className="bg-yellow-100 text-yellow-600 text-xs rounded px-2 py-0.5 mr-1">{tag}</span>
                ))}
              </div>
              <div className="flex justify-between w-full mt-2">
                <button onClick={prevImage} className="p-2 rounded-full bg-yellow-400 hover:bg-yellow-300 text-[#222] shadow">
                  <FaChevronLeft />
                </button>
                <a
                  href={images[lightbox.index].insta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-4 py-1 bg-yellow-400 text-[#222] font-semibold rounded-full shadow hover:bg-yellow-300 transition-colors duration-200 text-sm"
                >
                  <FaInstagram /> Instagram
                </a>
                <button onClick={nextImage} className="p-2 rounded-full bg-yellow-400 hover:bg-yellow-300 text-[#222] shadow">
                  <FaChevronRight />
                </button>
              </div>
              <button
                onClick={closeLightbox}
                className="absolute top-2 right-2 text-[#222] bg-yellow-100 hover:bg-yellow-200 rounded-full p-2"
                aria-label="Close"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
