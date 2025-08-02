import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const OrdersPage = () => {
  const orders = useSelector((state) => state.cart.orders || []);
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center">
        <div className="max-w-xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4 text-primary dark:text-yellow-400 text-center">My Orders</h1>
          {orders.length === 0 ? (
            <p className="mb-6 text-gray-700 dark:text-gray-200 text-center">You have no orders yet.</p>
          ) : (
            <ul className="mb-6">
              {orders.map((order, idx) => (
                <li key={idx} className="mb-6 border-b pb-4">
                  <h2 className="font-bold text-lg text-yellow-500 mb-2">Order #{idx + 1}</h2>
                  {order.date && (
                    <div className="text-sm text-gray-500 mb-2">Date: {new Date(order.date).toLocaleString()}</div>
                  )}
                  <ul>
                    {order.items.map((item, i) => (
                      <li key={i} className="flex items-center mb-2">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded mr-2" />
                        <div>
                          <span className="font-bold text-[#1f1f1f] dark:text-yellow-400">{item.name}</span>
                          <span className="ml-2 text-yellow-500">{item.price}</span>
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Qty: {item.quantity}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="text-right text-yellow-500 font-bold">Total: ${order.total}</div>
                  <div className="text-sm text-gray-500 mt-2">Payment: {order.paymentMethod}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OrdersPage;
