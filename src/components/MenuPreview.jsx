import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../reducer/cartSlice';
import { menuData } from './menuData';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const categories = [
  { key: 'Starters', label: '🍽️ Starters' },
  { key: 'Main Course', label: '🍝 Main Course' },
  { key: 'Desserts', label: '🍰 Desserts' },
  { key: 'Beverages', label: '🥤 Beverages' },
];

const filterTabVariants = {
  rest: { scale: 1, backgroundColor: '#fff', color: '#1f1f1f' },
  hover: { scale: 1.08, backgroundColor: '#fffbe6', color: '#FFD700', transition: { type: 'spring', stiffness: 300 } },
  active: { scale: 1.1, backgroundColor: '#fffbe6', color: '#FFD700' },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12 } }),
  exit: { opacity: 0, y: 40, transition: { duration: 0.2 } },
};

const MenuPreview = () => {
  const [activeCategory, setActiveCategory] = useState('Starters');
  const dispatch = useDispatch();

  const handleOrderNow = (dish) => {
    dispatch(addToCart(dish));
    toast.success(`${dish.name} added to cart!`, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  return (
    <section className="bg-white py-12 px-4 md:px-12 lg:px-32">
      <ToastContainer />
      <div className="max-w-5xl mx-auto">
        {/* Filter Tabs */}
        <div className="flex gap-2 md:gap-6 mb-8 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <motion.button
              key={cat.key}
              className={`relative px-4 py-2 rounded-full font-semibold focus:outline-none transition-colors duration-200 ${activeCategory === cat.key ? 'text-yellow-500' : 'text-[#1f1f1f]'}`}
              initial="rest"
              whileHover="hover"
              animate={activeCategory === cat.key ? 'active' : 'rest'}
              variants={filterTabVariants}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label}
              {activeCategory === cat.key && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute left-0 right-0 -bottom-1 h-1 rounded bg-yellow-400"
                  style={{ zIndex: -1 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Menu Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
          >
            {menuData[activeCategory].map((dish, i) => (
              <motion.div
                key={dish.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 #FFD70055' }}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col transition-all duration-200 cursor-pointer hover:shadow-yellow-300"
              >
                <img src={dish.image} alt={dish.name} className="w-full h-40 object-cover" />
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-lg mb-1 text-[#1f1f1f]">{dish.name}</h3>
                  <p className="text-gray-500 text-sm mb-2 flex-1">{dish.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-yellow-500 text-lg">{dish.price}</span>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="bg-yellow-400 text-[#1f1f1f] font-semibold px-4 py-1.5 rounded-full shadow hover:shadow-yellow-300 transition-all duration-200 focus:outline-none cursor-pointer"
                      onClick={() => handleOrderNow(dish)}
                    >
                      Order Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MenuPreview;
