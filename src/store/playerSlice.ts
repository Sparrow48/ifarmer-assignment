import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  playerOne: '',
  playerTwo: '',
  turn: 'X',
  board: Array(9).fill(null),
  round: 1,
  scores: { X: 0, O: 0 },
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayers(state, action) {
      state.playerOne = action.payload.playerOne;
      state.playerTwo = action.payload.playerTwo;
    },
  },
});

export const { setPlayers } = playerSlice.actions;
export default playerSlice.reducer;
