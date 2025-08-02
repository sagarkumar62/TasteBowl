import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../reducer/cartSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      {/* My Orders Button */}
      <button
        className="absolute top-20 right-8 bg-white border border-yellow-500 text-yellow-500 font-bold px-6 py-2 rounded-full shadow hover:bg-yellow-500 hover:text-white transition-all duration-200 cursor-pointer z-50"
        onClick={() => navigate('/orders')}
      >
        My Orders
      </button>
      <main className="pt-24 min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center">
        <div className="max-w-xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4 text-primary dark:text-yellow-400 text-center">Your Cart</h1>
          {cartItems.length === 0 ? (
            <p className="mb-6 text-gray-700 dark:text-gray-200 text-center">Your selected items will appear here. Checkout coming soon!</p>
          ) : (
            <ul className="mb-6">
              {cartItems.map((item, idx) => (
                <li key={idx} className="flex items-center mb-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                  <div className="flex-1">
                    <h2 className="font-bold text-lg text-[#1f1f1f] dark:text-yellow-400">{item.name}</h2>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                    <span className="font-bold text-yellow-500">{item.price}</span>
                    <div className="flex items-center mt-2">
                      <button
                        className="bg-yellow-400 text-white px-2 py-1 rounded-l hover:bg-yellow-500"
                        onClick={() => dispatch(decrementQuantity(item.id))}
                        disabled={item.quantity <= 1}
                      >-</button>
                      <span className="px-3 font-bold">{item.quantity}</span>
                      <button
                        className="bg-yellow-400 text-white px-2 py-1 rounded-r hover:bg-yellow-500"
                        onClick={() => dispatch(incrementQuantity(item.id))}
                      >+</button>
                      <button
                        className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >Delete</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
      {/* Place Order Button */}
      <button
        className="fixed bottom-8 right-8 bg-yellow-500 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-yellow-600 transition-all duration-200 z-50 cursor-pointer"
        onClick={() => navigate('/checkout')}
        disabled={cartItems.length === 0}
      >
        Place Order
      </button>
    </>
  );
};

export default CartPage;
