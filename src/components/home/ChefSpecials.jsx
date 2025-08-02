import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import specialsData from './specialsData';
import SpecialsModal from './SpecialsModal';
import './ChefSpecials.css';

const ChefSpecials = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section className="w-full bg-white py-12 px-2 md:px-0 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-yellow-400 drop-shadow-lg tracking-tight relative">
        Chef’s Specials
        <span className="steam-animation absolute left-1/2 -translate-x-1/2 -top-8 md:-top-10 z-0" />
      </h2>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch w-full max-w-5xl">
        {specialsData.map((dish, idx) => (
          <motion.div
            key={dish.id}
            className={`special-card relative bg-white rounded-2xl shadow-lg border-2 ${dish.isSpecial ? 'border-yellow-400 animate-glow' : 'border-gray-100'} overflow-hidden flex-1 min-w-[260px] max-w-[340px] cursor-pointer`}
            whileHover={{ scale: 1.05, rotate: dish.isSpecial ? 2 : 1, boxShadow: '0 8px 32px #FFD70055' }}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            onClick={() => setSelected(dish)}
          >
            <div className="relative group h-48 md:h-56 overflow-hidden">
              <img
                src={typeof dish.image === 'string' && dish.image.startsWith('/src/assets/')
                  ? dish.image.replace('/src/assets/', '/assets/')
                  : dish.image}
                alt={dish.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {dish.tags && (
                <div className="absolute top-2 left-2 flex gap-2 z-10">
                  {dish.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      className={`badge badge-${tag.toLowerCase()}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              )}
            </div>
            <div className="p-5 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl text-yellow-400 drop-shadow-md relative z-10">
                  {dish.name}
                  {dish.isSpecial && <span className="pulse-glow absolute -right-4 -top-2" />}
                </span>
              </div>
              <motion.p
                className="text-gray-700 text-sm min-h-[48px]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                {dish.description}
              </motion.p>
              <div className="flex items-center justify-between mt-2">
                <span className="price-badge bg-yellow-100 text-yellow-700 font-semibold px-3 py-1 rounded-full text-sm shadow">
                  ${dish.price}
                </span>
                <motion.button
                  className="order-btn bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-4 py-2 rounded-lg shadow transition-transform focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  whileHover={{ scale: 1.08, boxShadow: '0 0 16px #FFD700' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={e => { e.stopPropagation(); setSelected(dish); }}
                >
                  {dish.cta || 'Order Now'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selected && (
          <SpecialsModal dish={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ChefSpecials;
