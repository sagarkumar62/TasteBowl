
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUtensils, FaHome, FaConciergeBell, FaInfoCircle, FaImages, FaCalendarAlt, FaPhone, FaShoppingCart, FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { name: "Home", icon: <FaHome />, href: "/" },
  { name: "Menu", icon: <FaUtensils />, href: "/menu" },
  { name: "About Us", icon: <FaInfoCircle />, href: "/about" },
  { name: "Gallery", icon: <FaImages />, href: "/gallery" },
  { name: "Reservations", icon: <FaCalendarAlt />, href: "/reservation" },
  { name: "Contact", icon: <FaPhone />, href: "/contact" },
  { name: "Order Online", icon: <FaShoppingCart />, href: "/cart" },
];

const Navbar = () => {
  const [navSolid, setNavSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const [menuDropdown, setMenuDropdown] = useState(false);
  const navRef = useRef(null);

  // Sticky and solid navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setNavSolid(window.scrollY > 40);
      // Scrollspy
      const sections = [
        "home",
        "starters",
        "main-course",
        "desserts",
        "drinks",
        "about",
        "gallery",
        "reservations",
        "contact",
        "order",
      ];
      let current = "home";
      for (let id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 80) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Glassmorphism and shadow classes
  const navBg = navSolid
    ? "bg-white/90 dark:bg-gray-900/90 shadow-lg"
    : "bg-white/30 dark:bg-gray-900/30 backdrop-blur-md shadow-md";

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, type: "spring" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 lg:py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary dark:text-yellow-400">
          <FaConciergeBell className="text-3xl" />
          <span className="tracking-tight">TasteBowl</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex gap-2 xl:gap-4 items-center">
          {navLinks.map((link, idx) => (
            <li key={link.name} className="relative group">
              <Link
                to={link.href}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-lg ${activeSection === link.href.replace('#','') ? "text-primary dark:text-yellow-400" : "text-gray-700 dark:text-gray-200"} hover:bg-primary/10 dark:hover:bg-yellow-400/10`}
              >
                <span className="text-xl">{link.icon}</span>
                {link.name}
              </Link>
            </li>
          ))}
          {/* Dark mode toggle */}
          <li className="ml-2">
            <button
              aria-label="Toggle dark mode"
              onClick={() => setDarkMode((d) => !d)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary/20 dark:hover:bg-yellow-400/20 transition-all shadow"
            >
              {darkMode ? <FaSun className="text-yellow-400 text-xl" /> : <FaMoon className="text-gray-700 text-xl" />}
            </button>
          </li>
        </ul>

        {/* Hamburger for mobile */}
        <button
          className="lg:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary/20 dark:hover:bg-yellow-400/20 transition-all shadow"
          onClick={() => setMenuOpen((m) => !m)}
          aria-label="Open menu"
        >
          {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-full h-screen bg-white shadow-2xl z-50 flex flex-col p-6 gap-4"
          >
            <div className="flex items-center justify-between ">
              <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
                <FaConciergeBell className="text-3xl text-red-600" />
                <span>GourmetBite</span>
              </Link>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <FaTimes className="text-2xl text-red-600" />
              </button>
            </div>
            <ul className="flex flex-col gap-2 bg-amber-50 ">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-lg font-medium hover:bg-red-50 transition-all duration-150 ${activeSection === link.href.replace('#','') ? "font-bold text-red-600" : "text-gray-900"}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="text-xl">{link.icon}</span>
                    {link.name}
                  </Link>
                </li>
              ))}
              {/* Dark mode toggle */}
              <li className="mt-2">
                <button
                  aria-label="Toggle dark mode"
                  onClick={() => setDarkMode((d) => !d)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-red-50 transition-all shadow"
                >
                  {darkMode ? <FaSun className="text-yellow-500 text-xl" /> : <FaMoon className="text-gray-700 text-xl" />}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
