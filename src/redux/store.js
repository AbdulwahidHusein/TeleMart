import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// Example slice: a simple counter slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// Cart info slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], total: 0 },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      state.total += action.payload.price;
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total -= action.payload.price;
    },
  },
});

// Profile info slice
const profileSlice = createSlice({
  name: 'profile',
  initialState: { first_name: '', last_name: '', tg_id: null, additionalFields: {} },
  reducers: {
    updateProfile: (state, action) => {
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.tg_id = action.payload.tg_id;
      state.additionalFields = action.payload.additionalFields;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export const { addItem, removeItem } = cartSlice.actions;
export const { updateProfile } = profileSlice.actions;

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    cart: cartSlice.reducer,
    profile: profileSlice.reducer,
  },
});

export default store;
