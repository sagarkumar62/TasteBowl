import { createSlice } from '@reduxjs/toolkit';

const loadOrdersState = () => {
  try {
    const serializedState = localStorage.getItem('orders');
    if (serializedState === null) return { orders: [] };
    return JSON.parse(serializedState);
  } catch {
    return { orders: [] };
  }
};

const saveOrdersState = (state) => {
  try {
    localStorage.setItem('orders', JSON.stringify(state));
  } catch {}
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState: loadOrdersState(),
  reducers: {
    addOrder(state, action) {
      state.orders.push(action.payload);
      saveOrdersState(state);
    },
    clearOrders(state) {
      state.orders = [];
      saveOrdersState(state);
    },
  },
});

export const { addOrder, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
