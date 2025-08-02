import { createSlice } from '@reduxjs/toolkit';
import { menuData as initialMenuData } from '../components/menuData';

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    data: initialMenuData,
  },
  reducers: {
    setMenuData(state, action) {
      state.data = action.payload;
    },
    // Add more reducers as needed (e.g., addItem, removeItem, updateItem)
  },
});

export const { setMenuData } = menuSlice.actions;
export default menuSlice.reducer;
