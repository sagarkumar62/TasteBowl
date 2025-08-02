import { createSlice } from '@reduxjs/toolkit';

const loadCheckoutState = () => {
  try {
    const serializedState = localStorage.getItem('checkout');
    if (serializedState === null) return { orders: [] };
    return JSON.parse(serializedState);
  } catch {
    return { orders: [] };
  }
};

const saveCheckoutState = (state) => {
  try {
    localStorage.setItem('checkout', JSON.stringify(state));
  } catch {}
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: loadCheckoutState(),
  reducers: {
    addOrder(state, action) {
      state.orders.push(action.payload);
      saveCheckoutState(state);
    },
    clearOrders(state) {
      state.orders = [];
      saveCheckoutState(state);
    },
  },
});

export const { addOrder, clearOrders } = checkoutSlice.actions;
export default checkoutSlice.reducer;
