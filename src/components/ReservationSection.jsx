import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReservation } from '../reducer/reservationSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaFire, FaCalendarAlt, FaUser, FaClock, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const offers = [
  {
    title: 'Weekend Combo – 30% OFF',
    desc: 'Enjoy our chef’s special combo at a huge discount this weekend only!',
    validity: 'Valid: Fri–Sun, July 31 – Aug 2',
    code: 'WEEKEND30',
    badge: '🔥 Hot Deal',
    badgeType: 'fire',
  },
  {
    title: 'Family Feast – Free Dessert',
    desc: 'Order a Family Feast and get a complimentary dessert for everyone!',
    validity: 'Valid: All August',
    code: 'FAMILYDESSERT',
    badge: '⭐ Staff Pick',
    badgeType: 'star',
  },
  {
    title: 'Lunch Hour – 20% OFF',
    desc: 'Get 20% off on all lunch menu items from 12–3pm.',
    validity: 'Valid: Mon–Fri',
    code: 'LUNCH20',
    badge: '🔥 Hot Deal',
    badgeType: 'fire',
  },
];

const badgeIcon = (type) => type === 'fire' ? <FaFire className="text-yellow-400 mr-1" /> : <FaStar className="text-yellow-400 mr-1" />;

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 80 } },
};

const ctaVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 70, delay: 0.2 } },
};

const ReservationSection = ({ showCTA }) => {
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);
  const [form, setForm] = useState({ name: '', date: '', time: '', people: '' });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addReservation(form));
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 1200);
    navigate('/table');
    setForm({ name: '', date: '', time: '', people: '' });
  };

  const handleReserveClick = () => {
    navigate('/reservation');
  };

  return (
    <section className="bg-white py-12 px-2 md:px-0">
      <div className="max-w-6xl mx-auto rounded-2xl shadow-md border border-yellow-100 flex flex-col md:flex-row overflow-hidden">
        {/* Offers Left Side */}
        <div className="md:w-1/2 p-6 bg-white flex flex-col justify-center">
          <div className="space-y-6">
            <AnimatePresence>
              {(showAll ? offers : offers.slice(0,2)).map((offer, idx) => (
                <motion.div
                  key={offer.title}
                  className="relative rounded-xl border-2 border-transparent hover:border-yellow-400 shadow-md p-5 bg-white transition-all duration-300 group cursor-pointer"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(255,215,0,0.15)' }}
                >
                  <div className="absolute top-4 right-4 flex items-center bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    {badgeIcon(offer.badgeType)} {offer.badge}
                  </div>
                  <h4 className="text-lg font-semibold mb-1 text-[#1f1f1f]">{offer.title}</h4>
                  <p className="text-sm text-gray-700 mb-2">{offer.desc}</p>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <FaCalendarAlt className="mr-1 text-yellow-400" /> {offer.validity}
                  </div>
                  {offer.code && (
                    <div className="inline-block bg-yellow-100 text-yellow-700 font-mono text-xs px-2 py-1 rounded mb-2">Code: {offer.code}</div>
                  )}
                  <motion.button
                    className="hidden group-hover:inline-block mt-3 px-4 py-1 bg-yellow-400 text-[#1f1f1f] font-semibold rounded-full shadow hover:bg-yellow-300 transition-colors duration-200 text-sm"
                    whileHover={{ scale: 1.08 }}
                  >
                    Redeem Offer
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="mt-4 flex justify-center">
            <button
              className="px-4 py-1 bg-yellow-400 text-[#1f1f1f] font-semibold rounded-full shadow hover:bg-yellow-300 transition-colors duration-200 text-sm"
              onClick={() => setShowAll((s) => !s)}
            >
              {showAll ? 'Show Less' : 'Show More Offers'}
            </button>
          </div>
        </div>
        {/* Reservation CTA Right Side */}
        <motion.div
          className="md:w-1/2 p-8 bg-yellow-50 flex flex-col justify-center items-center relative"
          variants={ctaVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-[#1f1f1f] flex items-center gap-2">
            <FaClock className="text-yellow-400" /> Reserve Your Table Now!
          </h3>
          {showCTA && (
            <button
              className="mb-6 w-full py-2 bg-yellow-400 text-[#1f1f1f] font-bold rounded-full shadow hover:bg-yellow-300 transition-colors duration-200 text-lg"
              onClick={handleReserveClick}
            >
              Reserve Your Table
            </button>
          )}
          <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center gap-2">
              <FaUser className="text-yellow-400" />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none text-[#1f1f1f] bg-white"
              />
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-yellow-400" />
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none text-[#1f1f1f] bg-white"
              />
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-yellow-400" />
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none text-[#1f1f1f] bg-white"
              />
            </div>
            <div className="flex items-center gap-2">
              <FaUser className="text-yellow-400" />
              <select
                name="people"
                value={form.people}
                onChange={handleChange}
                required
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none text-[#1f1f1f] bg-white"
              >
                <option value="">People</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i+1} value={i+1}>{i+1} {i === 0 ? 'Person' : 'People'}</option>
                ))}
              </select>
            </div>
            <motion.button
              type="submit"
              className="w-full py-2 bg-yellow-400 text-[#1f1f1f] font-bold rounded-full shadow hover:bg-yellow-300 transition-colors duration-200 text-lg mt-2"
              whileHover={{ scale: 1.04 }}
            >
              Book Now
            </motion.button>
          </form>
          {/* Animated icons */}
          <div className="absolute bottom-4 left-4 flex gap-2 opacity-40 text-2xl">
            <FaMapMarkerAlt className="text-yellow-400" />
            <FaPhone className="text-yellow-400" />
          </div>
          {/* Confirmation Toast */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                className="fixed top-8 right-8 bg-yellow-400 text-[#1f1f1f] px-6 py-3 rounded-xl shadow-lg font-semibold flex items-center gap-2 z-50"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
              >
                <span role="img" aria-label="cheers">🥂</span> Reservation Confirmed!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ReservationSection;
