'use client';
import React, { useState } from 'react';
import { setPlayers } from '@/store/playerSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

const Setup = () => {
  const [playerOne, setPlayerOne] = useState('');
  const [playerTwo, setPlayerTwo] = useState('');
  const [errors, setErrors] = useState({ playerOne: '', playerTwo: '' });

  const dispatch = useDispatch();
  const router = useRouter();

  const validateField = (name: string, value: string) => {
    if (!value.trim()) {
      return `${name} is required`;
    }
    return '';
  };

  const handleChange = (field: 'playerOne' | 'playerTwo', value: string) => {
    if (field === 'playerOne') {
      setPlayerOne(value);
      setErrors((prev) => ({
        ...prev,
        playerOne: validateField('Player One', value),
      }));
    } else {
      setPlayerTwo(value);
      setErrors((prev) => ({
        ...prev,
        playerTwo: validateField('Player Two', value),
      }));
    }
  };

  const startGame = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      setPlayers({
        playerOne,
        playerTwo,
      })
    );

    router.push('/assignment-one/game');
  };

  const isFormValid =
    playerOne.trim() &&
    playerTwo.trim() &&
    !errors.playerOne &&
    !errors.playerTwo;

  return (
    <div className="w-full flex bg-theme-red-dark py-12 px-4 items-center justify-center">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:w-xl"
        onSubmit={startGame}
      >
        {/* Player One */}
        <div className="mb-4">
          <label
            htmlFor="playerOne"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Player One
          </label>
          <input
            id="playerOne"
            type="text"
            placeholder="Name of the first player."
            value={playerOne}
            onChange={(e) => handleChange('playerOne', e.target.value)}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.playerOne ? 'border-red-500' : ''
            }`}
          />
          {errors.playerOne && (
            <p className="text-red-500 text-xs mt-1">{errors.playerOne}</p>
          )}
        </div>

        {/* Player Two */}
        <div className="mb-4">
          <label
            htmlFor="playerTwo"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Player Two
          </label>
          <input
            id="playerTwo"
            type="text"
            placeholder="Name of the second player."
            value={playerTwo}
            onChange={(e) => handleChange('playerTwo', e.target.value)}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.playerTwo ? 'border-red-500' : ''
            }`}
          />
          {errors.playerTwo && (
            <p className="text-red-500 text-xs mt-1">{errors.playerTwo}</p>
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
