import { createSlice } from '@reduxjs/toolkit';

const loadReservationState = () => {
  try {
    const serializedState = localStorage.getItem('reservation');
    if (serializedState === null) return { reservations: [] };
    return JSON.parse(serializedState);
  } catch {
    return { reservations: [] };
  }
};

const saveReservationState = (state) => {
  try {
    localStorage.setItem('reservation', JSON.stringify(state));
  } catch {}
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState: loadReservationState(),
  reducers: {
    addReservation(state, action) {
      state.reservations.push(action.payload);
      saveReservationState(state);
    },
    clearReservations(state) {
      state.reservations = [];
      saveReservationState(state);
    },
  },
});

export const { addReservation, clearReservations } = reservationSlice.actions;
export default reservationSlice.reducer;
