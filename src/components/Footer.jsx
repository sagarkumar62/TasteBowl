import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaTwitter, FaMapMarkerAlt, FaClock, FaArrowUp } from 'react-icons/fa';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Menu', href: '/menu' },
  { name: 'About', href: '/about' },
  { name: 'Reservations', href: '/reservations' },
  { name: 'Contact', href: '/contact' },
];

const openingHours = [
  { day: 'Mon - Fri', time: '10:00 AM - 10:00 PM' },
  { day: 'Sat - Sun', time: '9:00 AM - 11:00 PM' },
];

const social = [
  { icon: FaInstagram, href: 'https://instagram.com' },
  { icon: FaFacebookF, href: 'https://facebook.com' },
  { icon: FaTwitter, href: 'https://twitter.com' },
];

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Scroll to top
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="bg-white border-t border-yellow-300 px-6 pt-12 pb-4 mt-16 shadow-lg"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 text-[#1a1a1a]">
        {/* Brand Info */}
        <div className="flex flex-col items-start gap-3">
          <div className="flex items-center gap-2">
            <motion.span
              initial={{ rotate: -20 }}
              animate={{ rotate: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="text-3xl"
              aria-label="Cooking Icon"
            >🍳</motion.span>
            <span className="text-2xl font-bold tracking-tight text-yellow-500">Taste Bowl</span>
          </div>
          <p className="text-sm max-w-xs mt-1">Savor the taste of tradition with a modern twist. Where every meal is a celebration!</p>
        </div>
        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3 text-lg">Quick Links</h4>
          <ul className="space-y-2">
            {links.map(link => (
              <motion.li
                key={link.name}
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="group"
              >
                <a
                  href={link.href}
                  className="inline-block relative font-medium text-[#1a1a1a] transition-colors duration-200 group-hover:text-yellow-400"
                >
                  {link.name}
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 h-0.5 bg-yellow-400 rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                    style={{ width: '0%' }}
                  />
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
        {/* Opening Hours */}
        <div>
          <h4 className="font-semibold mb-3 text-lg flex items-center gap-2">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              className="text-yellow-400"
            >
              <FaClock />
            </motion.span>
            Opening Hours
          </h4>
          <ul className="space-y-1">
            {openingHours.map((item, idx) => (
              <li key={idx} className="flex justify-between text-sm">
                <span>{item.day}</span>
                <span>{item.time}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Newsletter & Social */}
        <div>
          <h4 className="font-semibold mb-3 text-lg">Newsletter</h4>
          <form
            className="flex items-center gap-2 mb-4"
            onSubmit={e => { e.preventDefault(); }}
          >
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-yellow-400 transition-all duration-200 text-sm w-36 md:w-40"
              required
            />
            <motion.button
              whileTap={{ scale: 0.92 }}
              whileHover={{ backgroundColor: '#FFD700', color: '#1a1a1a' }}
              transition={{ type: 'spring', stiffness: 300 }}
              type="submit"
              className="bg-yellow-400 text-white px-3 py-2 rounded-r-md font-semibold text-sm shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
            >
              Subscribe
            </motion.button>
          </form>
          <div className="flex items-center gap-3 mt-2">
            {social.map(({ icon: Icon, href }, idx) => (
              <motion.a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.18, boxShadow: '0 0 8px #FFD700' }}
                className="text-xl text-[#1a1a1a] hover:text-yellow-400 transition-colors duration-200"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
            <FaMapMarkerAlt className="text-yellow-400" />
            123 Main St, Food City
          </div>
        </div>
      </div>
      {/* Bottom Line */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
        className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-200 pt-4 text-xs text-gray-500"
      >
        <span>© 2025 Golden Spoon • All Rights Reserved</span>
        <button
          onClick={handleScrollTop}
          className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-400 text-white font-semibold shadow hover:scale-105 hover:bg-yellow-500 transition-all duration-200"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
          Top
        </button>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
