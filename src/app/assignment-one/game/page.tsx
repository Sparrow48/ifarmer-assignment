'use client';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  incrementScore,
  makeMove,
  nextRound,
  resetBoard,
  updateLeaderboard,
} from '@/store/playerSlice';

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner(board: (string | null)[]) {
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  return board.every((cell) => cell) ? 'draw' : null;
}

export default function GamePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { board, turn, playerOne, playerTwo, round, scores } = useSelector(
    (state: RootState) => state.player
  );

  const [winner, setWinner] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const result = checkWinner(board);
    if (result && !winner) {
      setWinner(result);
      if (result === 'draw') {
        setTimeout(() => {
          dispatch(nextRound());
          setWinner(null);
        }, 3000);
      } else {
        if (result === 'X' || result === 'O') {
          dispatch(incrementScore(result));
        }

        const scoreX = result === 'X' ? scores.X + 2 : scores.X + 1;
        const scoreO = result === 'O' ? scores.O + 2 : scores.O + 1;

        if (scoreX >= 6 || scoreO >= 6 || round === 5) {
          const finalWinner =
            scoreX > scoreO ? playerOne : scoreO > scoreX ? playerTwo : 'Draw';
          dispatch(
            updateLeaderboard({
              [playerOne]: scoreX,
              [playerTwo]: scoreO,
            })
          );
          router.push('/assignment-1/result');
        } else {
          setTimeout(() => {
            dispatch(nextRound());
            setWinner(null);
          }, 2000);
        }
      }
    }
  }, [board, dispatch, scores, round, router, winner, playerOne, playerTwo]);

  useEffect(() => {
    if (playerOne.length <= 0 || playerTwo.length <= 0) {
      router.push('/');
    } else {
      setLoading(false);
    }
  }, [playerOne, playerTwo, router]);

  const handleClick = (index: number) => {
    if (winner) return;
    if (!board[index] && !winner) dispatch(makeMove(index));
  };

  if (loading)
    return (
      <>
        <p>Loading...</p>
      </>
    );

  return (
    <div className="max-w-lg mx-auto text-center space-y-4 py-10">
      <h1 className="text-2xl font-bold">Tic-Tac-Toe - Round {round}</h1>
      <p className="text-lg">
        {' '}
        Scores: {`${playerOne} = ${scores.X} , ${playerTwo} = ${scores.O}`}
      </p>
      <p className="text-lg">Turn: {turn === 'X' ? playerOne : playerTwo}</p>
      <div className="grid grid-cols-3 w-full max-w-sm mx-auto aspect-square">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="aspect-square text-3xl border border-gray-500 flex items-center justify-center"
          >
            {cell}
          </button>
        ))}
      </div>

      {winner && (
        <p className="text-green-600 font-semibold">
          {winner === 'draw'
            ? 'Round Draw!'
            : `${winner === 'X' ? playerOne : playerTwo} wins the round!`}
        </p>
      )}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => dispatch(resetBoard())}
          className="bg-yellow-400 text-white px-4 py-2"
        >
          Reset Round
        </button>
      </div>
    </div>
  );
}
