'use client';
import React, { useEffect, useState } from 'react';
import { setPlayers } from '@/store/playerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store';

const Setup = () => {
  const { playerOne, playerTwo } = useSelector(
    (state: RootState) => state.player
  );

  const [playerOneName, setPlayerOneName] = useState('');
  const [playerTwoName, setPlayerTwoName] = useState('');
  const [errors, setErrors] = useState({
    playerOneName: '',
    playerTwoName: '',
  });

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (playerOne.length > 0 || playerTwo.length > 0) {
      router.push('/assignment-one/game');
    }
  }, [playerOne, playerTwo, router]);

  const validateField = (name: string, value: string) => {
    if (!value.trim()) {
      return `${name} is required`;
    }
    return '';
  };

  const handleChange = (
    field: 'playerOneName' | 'playerTwoName',
    value: string
  ) => {
    if (field === 'playerOneName') {
      setPlayerOneName(value);
      setErrors((prev) => ({
        ...prev,
        playerOneName: validateField('Player One', value),
      }));
    } else {
      setPlayerTwoName(value);
      setErrors((prev) => ({
        ...prev,
        playerTwoName: validateField('Player Two', value),
      }));
    }
  };

  const startGame = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      setPlayers({
        playerOne: playerOneName,
        playerTwo: playerTwoName,
      })
    );

    router.push('/assignment-one/game');
  };

  const isFormValid =
    playerOneName.trim() &&
    playerTwoName.trim() &&
    !errors.playerOneName &&
    !errors.playerTwoName;

  return (
    <div className="w-full flex bg-theme-red-dark py-12 px-4 items-center justify-center">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:w-xl"
        onSubmit={startGame}
      >
        {/* Player One */}
        <div className="mb-4">
          <label
            htmlFor="playerOneName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Player One
          </label>
          <input
            id="playerOneName"
            type="text"
            placeholder="Name of the first player."
            value={playerOneName}
            onChange={(e) => handleChange('playerOneName', e.target.value)}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.playerOneName ? 'border-red-500' : ''
            }`}
          />
          {errors.playerOneName && (
            <p className="text-red-500 text-xs mt-1">{errors.playerOneName}</p>
          )}
        </div>

        {/* Player Two */}
        <div className="mb-4">
          <label
            htmlFor="playerTwoName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Player Two
          </label>
          <input
            id="playerTwoName"
            type="text"
            placeholder="Name of the second player."
            value={playerTwoName}
            onChange={(e) => handleChange('playerTwoName', e.target.value)}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.playerTwoName ? 'border-red-500' : ''
            }`}
          />
          {errors.playerTwoName && (
            <p className="text-red-500 text-xs mt-1">{errors.playerTwoName}</p>
          )}
        </div>

        {/* Start Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={!isFormValid}
            className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isFormValid
                ? 'bg-blue-500 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            Start Game
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setup;
