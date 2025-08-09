import { createSlice } from '@reduxjs/toolkit';

interface PlayerState {
  playerOne: string;
  playerTwo: string;
  turn: 'X' | 'O';
  board: (string | null)[];
  round: number;
  scores: { X: number; O: number };
  leaderboard: { [playerName: string]: number };
}

const initialState: PlayerState = {
  playerOne: '',
  playerTwo: '',
  turn: 'X',
  board: Array(9).fill(null),
  round: 1,
  scores: { X: 0, O: 0 },
  leaderboard: {},
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayers(state, action) {
      state.playerOne = action.payload.playerOne;
      state.playerTwo = action.payload.playerTwo;
    },
    resetBoard(state) {
      state.board = Array(9).fill(null);
      state.turn = 'X';
    },
    makeMove(state, action) {
      if (!state.board[action.payload]) {
        state.board[action.payload] = state.turn;
        state.turn = state.turn === 'X' ? 'O' : 'X';
      }
    },
    incrementScore(state, action: { payload: 'X' | 'O' }) {
      state.scores[action.payload] += 2;
      if (action.payload === 'X') state.scores['O'] += 1;
      else state.scores['X'] += 1;
    },
    nextRound(state) {
      state.round += 1;
      state.board = Array(9).fill(null);
      state.turn = 'X';
    },
    resetGame(state) {
      state.round = 1;
      state.scores = { X: 0, O: 0 };
      state.board = Array(9).fill(null);
      state.turn = 'X';
      state.playerOne = '';
      state.playerTwo = '';
    },
    updateLeaderboard(state, action) {
      for (const [playerName, score] of Object.entries(action.payload)) {
        if (typeof score === 'number') {
          if (state.leaderboard[playerName]) {
            state.leaderboard[playerName] += score;
          } else {
            state.leaderboard[playerName] = score;
          }
        }
      }
    },
    resetState(state, action: { payload: keyof PlayerState }) {
      (state[action.payload] as (typeof initialState)[typeof action.payload]) =
        initialState[action.payload];
    },
    replayGame(state) {
      state.round = 1;
      state.scores = { X: 0, O: 0 };
      state.board = Array(9).fill(null);
      state.turn = 'X';
    },
    resetLeaderboard(state) {
      state.leaderboard = {};
    },
  },
});

export const {
  setPlayers,
  resetBoard,
  makeMove,
  incrementScore,
  nextRound,
  resetGame,
  updateLeaderboard,
  resetState,
  replayGame,
  resetLeaderboard,
} = playerSlice.actions;
export default playerSlice.reducer;
