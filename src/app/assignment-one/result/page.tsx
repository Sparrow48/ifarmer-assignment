'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import { replayGame, resetGame, resetState } from '@/store/playerSlice';
import { useDispatch } from 'react-redux';

export default function ResultPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { leaderboard, playerOne, playerTwo, scores } = useSelector(
    (state: RootState) => state.player
  );

  // Determine the final winner
  const scoreX = scores.X;
  const scoreO = scores.O;

  let finalWinner = 'Draw';
  if (scoreX > scoreO) finalWinner = playerOne || 'Player One';
  else if (scoreO > scoreX) finalWinner = playerTwo || 'Player Two';

  // Redirect to setup page if no players info (optional)
  React.useEffect(() => {
    if (!playerOne || !playerTwo) {
      router.push('/');
    }
  }, [playerOne, playerTwo, router]);

  const playAgain = () => {
    dispatch(replayGame());
    router.push('/assignment-one/game');
  };

  const newGame = () => {
    dispatch(resetGame());
    router.push('/');
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow-md text-center">
      <h1 className="text-3xl font-bold mb-4">Game Result</h1>

      <p className="text-xl mb-6">
        {finalWinner === 'Draw'
          ? "It's a Draw!"
          : `${finalWinner} wins the game!`}
      </p>

      <div className="text-left mb-6">
        <h2 className="text-2xl font-semibold mb-2">Final Scores</h2>
        <ul className="list-disc list-inside text-lg">
          <li>
            {playerOne || 'Player One'}: {leaderboard[playerOne] ?? scoreX}
          </li>
          <li>
            {playerTwo || 'Player Two'}: {leaderboard[playerTwo] ?? scoreO}
          </li>
        </ul>
      </div>

      <button
        onClick={() => playAgain()}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Play Again
      </button>
      <button
        onClick={() => newGame()}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        New Game
      </button>
    </div>
  );
}
