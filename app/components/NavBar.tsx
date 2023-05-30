"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import SendPhoneModal from "./LoginModal";
import { useAtom } from "jotai";
import { authAtom } from "../state/atoms/atom";
import Cookies from "js-cookie";
import { DefaultService } from "@/generated";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const [nav, setNav] = useState(true);
  const [isDayMode, setIsDayMode] = useState(false);
  const [auth, setAuth] = useAtom(authAtom);
  const [isAuthenticated, setIsAuthenticated] = useState(auth.isAuthenticated);
  const pathname = usePathname();

  const handleNav = () => {
    setNav(!nav);
  };

  const toggleDayMode = () => {
    setIsDayMode(!isDayMode);
  };

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    setIsAuthenticated(Boolean(accessToken));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setAuth({
      isAuthenticated: Boolean(accessToken),
      authToken: accessToken || "",
      refreshToken: refreshToken || "",
      userId: "",
    });
  }, [pathname]);

  console.log(pathname);

  const handleLogout = () => {
    try {
      DefaultService.authControllerLogout(); // Вызовите метод authControllerLogout
      //
      Cookies.remove("accessToken");
      setIsAuthenticated(false);
      console.log("isAuthenticated", isAuthenticated);
      console.log("Выход выполнен");
    } catch (error) {
      console.error("Ошибка при выходе", error);
    }
  };

  useEffect(() => {
    setIsAuthenticated(auth.isAuthenticated);
  }, [auth]);

  useEffect(() => {
    const matcher = window.matchMedia('(prefers-color-scheme: dark)');
  
    const updateDayMode = () => {
      setIsDayMode(!matcher.matches);
    };
  
    // Установите режим при первоначальной загрузке
    updateDayMode();
  
    // Добавьте слушатель для отслеживания изменений
    matcher.addListener(updateDayMode);
  
    // Очистите слушатель при размонтировании компонента
    return () => {
      matcher.removeListener(updateDayMode);
    };
  }, []);

  
  return (
    <div
      className={`flex justify-between items-center h-24 max-w-[1024px] mx-auto px-4 ${
        isDayMode ? "text-black" : "text-white"
      }`}
    >
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">NAVBAR</h1>
      <ul className="hidden md:flex">
        <li className="p-4">
          <Link href="/">Домой</Link>
        </li>
        <li className="p-4">Помощь</li>
        <li className="p-4">Контакты</li>
        <li className="p-4">Проект</li>
        <li className="p-4">Новости</li>

        {isAuthenticated ? (
          <li className="p-4">
            {" "}
            <button onClick={handleLogout}>Выйти</button>{" "}
          </li>
        ) : (
          <li className="p-3">
            <SendPhoneModal />
          </li>
        )}

        <button onClick={toggleDayMode}>
          {isDayMode ? "Night Mode" : "Day Mode"}
        </button>
      </ul>
      <div onClick={handleNav} className="block md:hidden">
        {!nav ? <AiOutlineClose size={"2rem"} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          !nav
            ? "fixed z-50 left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      >
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">NAVBAR</h1>
        <ul className="uppercase p-4 text-white">
          <li className="p-4 border-b border-gray-600">
            <Link href="/">Домой</Link>
          </li>
          <li className="p-4 border-b border-gray-600">Помощь</li>
          <li className="p-4 border-b border-gray-600">Контакты</li>
          <li className="p-4 border-b border-gray-600">Проект</li>
          <li className="p-4 border-b border-gray-600">Новости</li>
          {isAuthenticated ? (
            <li className="p-4">
              {" "}
              <button onClick={handleLogout}>Выйти</button>{" "}
            </li>
          ) : (
            <li className="p-3">
              <SendPhoneModal />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
