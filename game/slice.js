import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    created: false,
    players: []
  },
  reducers: {
    create: state => state.created = true,
    join: (state, action) => {
      state.players.push(action.payload)
    },
  }
});

export const { create, join } = gameSlice.actions;

export const selectPlayers = (state) => state.players;

export default gameSlice.reducer;