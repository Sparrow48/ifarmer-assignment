'use client';

import { useState } from 'react';
import NavItem from './NavItem';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Check if we should show Leaderboard
  const showLeaderboard =
    pathname === '/' || pathname.includes('assignment-one');

  return (
    <div className="py-3 fixed z-50 w-full">
      <header className="px-5 md:px-8 h-[62px] w-full bg-blue-950 text-white flex items-center justify-between">
        {/* Logo / Title */}
        <div className="text-lg font-bold w-32">Assessment</div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex justify-center items-center w-full">
          <ul className="flex gap-11 items-center">
            <li className="flex group items-center">
              <NavItem
                buttonTitle="Assignment 1"
                buttonLink="/"
                buttonMainClass="text-white hover:text-green-300 overflow-hidden inline-block"
              />
            </li>
            <li className="flex group items-center">
              <NavItem
                buttonTitle="Assignment 2"
                buttonLink="/assignment-two"
                buttonMainClass="text-white hover:text-green-300 overflow-hidden inline-block"
              />
            </li>
            {showLeaderboard && (
              <li className="flex group items-center">
                <NavItem
                  buttonTitle="Leaderboard"
                  buttonLink="/assignment-one/leaderboard"
                  buttonMainClass="text-white hover:text-green-300 overflow-hidden inline-block"
                />
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="bg-blue-950 text-white px-5 py-4 md:hidden animate-slideDown">
          <ul className="flex flex-col gap-4">
            <li className="flex group items-center">
              <NavItem
                buttonTitle="Assignment 1"
                buttonLink="/"
                buttonMainClass="text-white hover:text-green-300 overflow-hidden inline-block"
              />
            </li>
            <li className="flex group items-center">
              <NavItem
                buttonTitle="Assignment 2"
                buttonLink="/assignment-two"
                buttonMainClass="text-white hover:text-green-300 overflow-hidden inline-block"
              />
            </li>
            {showLeaderboard && (
              <li className="flex group items-center">
                <NavItem
                  buttonTitle="Leaderboard"
                  buttonLink="/assignment-one/leaderboard"
                  buttonMainClass="text-white hover:text-green-300 overflow-hidden inline-block"
                />
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
