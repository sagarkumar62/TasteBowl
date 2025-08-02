import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../reducer/menuSlice';
import cartReducer from '../reducer/cartSlice';
import ordersReducer from '../reducer/ordersSlice';
import reservationReducer from '../reducer/reservationSlice';
// 🔹 Load persisted reservations from localStorage
const loadReservations = () => {
  try {
    const serializedReservations = localStorage.getItem('reservation');
    if (serializedReservations === null) return undefined;
    return JSON.parse(serializedReservations).reservations || [];
  } catch (err) {
    console.error('Could not load reservations from localStorage', err);
    return undefined;
  }
};

// 🔹 Save reservations to localStorage
const saveReservations = (reservations) => {
  try {
    const serializedReservations = JSON.stringify({ reservations });
    localStorage.setItem('reservation', serializedReservations);
  } catch (err) {
    console.error('Could not save reservations to localStorage', err);
  }
};

// 🔹 Load persisted orders from localStorage
const loadOrders = () => {
  try {
    const serializedOrders = localStorage.getItem('orders');
    if (serializedOrders === null) return undefined;
    return JSON.parse(serializedOrders);
  } catch (err) {
    console.error('Could not load orders from localStorage', err);
    return undefined;
  }
};

// 🔹 Save orders to localStorage
const saveOrders = (orders) => {
  try {
    const serializedOrders = JSON.stringify(orders);
    localStorage.setItem('orders', serializedOrders);
  } catch (err) {
    console.error('Could not save orders to localStorage', err);
  }
};

// 🔹 Preload orders and reservations slices
const preloadedState = {
  orders: {
    orders: loadOrders() || [],
  },
  reservation: {
    reservations: loadReservations() || [],
  },
};

const store = configureStore({
  reducer: {
    menu: menuReducer,
    cart: cartReducer,
    orders: ordersReducer,
    reservation: reservationReducer,
  },
  preloadedState,
});

// 🔹 Subscribe and persist orders and reservations on change
store.subscribe(() => {
  const currentOrders = store.getState().orders.orders;
  saveOrders(currentOrders);
  const currentReservations = store.getState().reservation.reservations;
  saveReservations(currentReservations);
});

export default store;
