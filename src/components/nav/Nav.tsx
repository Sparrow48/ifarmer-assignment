'use client';

import Link from 'next/link';
import { useState } from 'react';
import Dot from './Dot';
import TextFadeOutNavButton from './TextFadeOutNavButton';

export default function Nav() {
  const [menuText, setMenuText] = useState('Menu');
  const [isOpened, setIsOpened] = useState(false);
  const [showMenuItems, setShowMenuItems] = useState(false);

  const handleMouseEnter = () => {
    if (menuText === 'Menu') {
      setMenuText('Open');
    }
  };

  const handleMouseLeave = () => {
    if (menuText === 'Open') {
      setMenuText('Menu');
    }
  };

  return (
    <>
      <div className="py-3 fixed z-15 w-full">
        <header className="px-5 md:px-8 h-[62px] w-full bg-blue-950 text-white flex items-center">
          <nav className="flex justify-center items-center w-full">
            <ul className="flex gap-11  items-center ">
              <li className="flex group items-center">
                <Dot />
                <TextFadeOutNavButton
                  buttonTitle="Assignment 1"
                  buttonLink="/"
                  buttonMainClass="text-white hover:text-green-300 transition-colors duration-300 overflow-hidden inline-block"
                />
              </li>
              <li className="flex group items-center">
                <Dot />
                <TextFadeOutNavButton
                  buttonTitle="Assignment 2"
                  buttonLink="/assignment-two"
                  buttonMainClass="text-white hover:text-green-300 transition-colors duration-300 overflow-hidden inline-block"
                />
              </li>
              <li className="flex group items-center">
                <Dot />
                <TextFadeOutNavButton
                  buttonTitle="Leaderboard"
                  buttonLink="/leaderboard"
                  buttonMainClass="text-white hover:text-green-300 transition-colors duration-300 overflow-hidden inline-block"
                />
              </li>
            </ul>
          </nav>
        </header>
      </div>
    </>
  );
}
