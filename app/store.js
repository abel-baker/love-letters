import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../game/slice.js';

export default configureStore({
  reducer: {
    game: gameReducer
  }
})