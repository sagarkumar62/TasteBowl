import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { addOrder } from '../reducer/cartSlice';

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + price * (item.quantity || 1);
  }, 0);

  const handleConfirmOrder = () => {
    if (cartItems.length === 0) return;
    dispatch(addOrder({ items: cartItems, total: total.toFixed(2), paymentMethod }));
    navigate('/orders');
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center">
        <div className="max-w-xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4 text-primary dark:text-yellow-400 text-center">Checkout</h1>
          {cartItems.length === 0 ? (
            <p className="mb-6 text-gray-700 dark:text-gray-200 text-center">Your cart is empty.</p>
          ) : (
            <>
              <ul className="mb-6">
                {cartItems.map((item, idx) => (
                  <li key={idx} className="flex items-center mb-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                    <div>
                      <h2 className="font-bold text-lg text-[#1f1f1f] dark:text-yellow-400">{item.name}</h2>
                      <span className="font-bold text-yellow-500">{item.price}</span>
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Qty: {item.quantity}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="text-xl font-bold text-right text-yellow-500 mb-4">Total: ${total.toFixed(2)}</div>
              <div className="mb-6">
                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">Select Payment Method:</label>
                <select className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-yellow-400" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                  <option value="card">Credit/Debit Card</option>
                  <option value="cash">Cash on Delivery</option>
                  <option value="upi">UPI</option>
                </select>
              </div>
              <button className="w-full bg-yellow-500 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-yellow-600 transition-all duration-200 cursor-pointer" onClick={handleConfirmOrder}>Confirm Order</button>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CheckoutPage;
