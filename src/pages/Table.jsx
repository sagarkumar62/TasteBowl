import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ReservationSection from '../components/ReservationSection';
import { useSelector, useDispatch } from 'react-redux';
import { clearReservations } from '../reducer/reservationSlice';

const TableDetails = () => {
  const reservations = useSelector(state => state.reservation.reservations);
  const latest = reservations[reservations.length - 1];
  const dispatch = useDispatch();
  if (!latest) return null;
  const handleCancel = () => {
    dispatch(clearReservations());
  };
  return (
    <div className="mb-8 p-6 bg-white rounded-xl shadow border border-yellow-100">
      <h2 className="text-2xl font-bold mb-4 text-yellow-500">Your Table Details</h2>
      <div className="space-y-2 text-lg">
        <div><span className="font-semibold">Name:</span> {latest.name}</div>
        <div><span className="font-semibold">Date:</span> {latest.date}</div>
        <div><span className="font-semibold">Time:</span> {latest.time}</div>
        <div><span className="font-semibold">People:</span> {latest.people}</div>
      </div>
      <button
        className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded-full shadow transition-colors duration-200"
        onClick={handleCancel}
      >
        Cancel Table
      </button>
    </div>
  );
};

const TablePage = () => {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-yellow-400 text-center">Book Your Table</h1>
          <TableDetails />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TablePage;
