import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../reducer/cartSlice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DetailsPage = () => {
  const location = useLocation();
  const dish = location.state?.dish;
  const dispatch = useDispatch();

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center">
        <div className="max-w-xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          {dish ? (
            <>
              <h1 className="text-3xl font-bold mb-4 text-primary dark:text-yellow-400 text-center">{dish.name}</h1>
              <img src={dish.image} alt={dish.name} className="w-full h-56 object-cover rounded mb-4" />
              <p className="mb-4 text-gray-700 dark:text-gray-200 text-center">{dish.description}</p>
              <div className="text-center font-bold text-yellow-500 text-xl mb-2">{dish.price}</div>
              <button
                className="mt-4 w-full bg-yellow-400 text-[#1f1f1f] font-semibold px-4 py-2 rounded-full shadow hover:shadow-yellow-300 transition-all duration-200 focus:outline-none"
                onClick={() => dispatch(addToCart(dish))}
              >
                Add to Cart
              </button>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-4 text-primary dark:text-yellow-400 text-center">Details</h1>
              <p className="mb-6 text-gray-700 dark:text-gray-200 text-center">This is the details page. Add your content here.</p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DetailsPage;
