import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';

// configureStore adalah wrapper dari createStore pada Redux tradisional.
// Secara otomatis mengatur hal-hal yang sering dipakai:
// - Menggabungkan reducers (combineReducers)
// - Menambahkan middleware redux-thunk untuk operasi async
// - Menghidupkan integrasi dengan Redux DevTools extension di browser
export const store = configureStore({
  reducer: {
    posts: postsReducer
  }
});
