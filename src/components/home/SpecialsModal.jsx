import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../reducer/cartSlice';

const backdropVariants = {
  visible: { opacity: 1, transition: { duration: 0.2 } },
  hidden: { opacity: 0, transition: { duration: 0.2 } },
};
const modalVariants = {
  hidden: { y: 80, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 180, damping: 18 } },
};


const SpecialsModal = ({ dish, onClose }) => {
  const dispatch = useDispatch();
  const [showNotif, setShowNotif] = useState(false);

  const handleOrderNow = () => {
    dispatch(addToCart(dish));
    setShowNotif(true);
    setTimeout(() => {
      setShowNotif(false);
      onClose();
    }, 1200);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={backdropVariants}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative border-2 border-yellow-400"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-yellow-400 hover:text-yellow-600 text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <img src={dish.image} alt={dish.name} className="w-full h-48 object-cover rounded-xl mb-4" />
        <h3 className="text-2xl font-bold text-yellow-400 mb-2">{dish.name}</h3>
        <p className="text-gray-700 mb-3">{dish.details || dish.description}</p>
        <span className="inline-block bg-yellow-100 text-yellow-700 font-semibold px-3 py-1 rounded-full text-sm shadow mb-2">
          ${dish.price}
        </span>
        {dish.tags && (
          <div className="flex gap-2 mt-2">
            {dish.tags.map(tag => (
              <span key={tag} className={`badge badge-${tag.toLowerCase()}`}>{tag}</span>
            ))}
          </div>
        )}
        <button
          className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition-all duration-200"
          onClick={handleOrderNow}
        >
          Order Now
        </button>
        {showNotif && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed left-1/2 -translate-x-1/2 bottom-10 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg font-semibold z-50"
          >
            Added to cart!
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SpecialsModal;
