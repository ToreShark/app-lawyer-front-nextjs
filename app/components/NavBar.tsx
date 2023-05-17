'use client';
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

export default function NavBar() {
  const [nav, setNav] = useState(true);
  const [isDayMode, setIsDayMode] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const toggleDayMode = () => {
    setIsDayMode(!isDayMode);
  };

  return (
    <div className={`flex justify-between items-center h-24 max-w-[1024px] mx-auto px-4 ${isDayMode ? 'text-black' : 'text-white'}`}>
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">NAVBAR</h1>
      <ul className="hidden md:flex">
        <li className="p-4">Домой</li>
        <li className="p-4">Помощь</li>
        <li className="p-4">Контакты</li>
        <li className="p-4">Проект</li>
        <li className="p-4">Новости</li>
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
        {!nav ? <AiOutlineClose size={"2rem"} /> : <AiOutlineMenu size={20} />}
      </div>
      <div className={!nav ? 'fixed z-50 left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'fixed left-[-100%]'}>
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">NAVBAR</h1>
        <ul className="uppercase p-4 text-white">
          <li className="p-4 border-b border-gray-600">Домой</li>
          <li className="p-4 border-b border-gray-600">Помощь</li>
          <li className="p-4 border-b border-gray-600">Контакты</li>
          <li className="p-4 border-b border-gray-600">Проект</li>
          <li className="p-4">Новости</li>
        </ul>
      </div>
      <button onClick={toggleDayMode}>{isDayMode ? 'Night Mode' : 'Day Mode'}</button>
    </div>
  );
}
