'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { resetGame, resetLeaderboard } from '@/store/playerSlice';
import { useRouter } from 'next/navigation';

export default function LeaderboardPage() {
  const leaderboard = useSelector(
    (state: RootState) => state.player.leaderboard
  );

  const dispatch = useDispatch();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const sortedEntries = Object.entries(leaderboard).sort(
    ([, a], [, b]) => b - a
  );

  if (!hydrated) {
    return null;
  }

  const resetLeaderboardFn = () => {
    dispatch(resetLeaderboard());
    router.push('/');
  };

  const newGame = () => {
    dispatch(resetGame());
    router.push('/');
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow-md text-center">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>

      {sortedEntries.length === 0 ? (
        <p className="text-gray-600 mb-6">No players in the leaderboard yet.</p>
      ) : (
        <ol className="list-decimal list-inside mb-6 text-left text-lg">
          {sortedEntries.map(([player, score]) => (
            <li key={player} className="mb-1">
              <span className="font-semibold">{player}</span>: {score}
            </li>
          ))}
        </ol>
      )}

      <div className="Flex space-x-2">
        <button
          onClick={() => {
            resetLeaderboardFn();
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Reset Leaderboard
        </button>
        <button
          onClick={() => newGame()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          New Game
        </button>
      </div>
    </div>
  );
}
