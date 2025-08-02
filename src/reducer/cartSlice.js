import { createSlice } from '@reduxjs/toolkit';

const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) return { items: [] };
    return JSON.parse(serializedState);
  } catch {
    return { items: [] };
  }
};

const saveCartState = (state) => {
  try {
    localStorage.setItem('cart', JSON.stringify(state));
  } catch {}
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartState(),
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      saveCartState(state);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload);
      saveCartState(state);
    },
    incrementQuantity(state, action) {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        saveCartState(state);
      }
    },
    decrementQuantity(state, action) {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCartState(state);
      }
    },
    addOrder(state, action) {
      state.orders = state.orders || [];
      state.orders.push(action.payload);
      saveCartState(state);
    },
    clearCart(state) {
      state.items = [];
      saveCartState(state);
    },
  },
});

export const { addToCart, addOrder, clearCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
