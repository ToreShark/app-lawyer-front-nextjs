"use client";
import { useEffect, useState } from "react";
import { AiFillCar } from "react-icons/ai";
import { GoLaw } from "react-icons/go";
import Link from "next/link";
import { DefaultService } from "@/generated";

interface CardCategories {
  id: string;
  name: string;
  description: string;
  slug: string;
}

const categoryIcons: Record<string, JSX.Element> = {
  "ugolovnoe-delo": <GoLaw size={30} />,
  "grazhdanskoe-delo": <GoLaw size={30} />,
  "administrativnoe-delo": <AiFillCar size={30} />,
};

export default function Cards() {
  const [categories, setCategories] = useState<CardCategories[]>([]);
  const [isDayMode, setIsDayMode] = useState(false);

  useEffect(() => {
    DefaultService.categoriesControllerFindAll()
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const matcher = window.matchMedia("(prefers-color-scheme: dark)");

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
    <div className={`w-full py-8 px-4 ${isDayMode ? "bg-white" : "bg-black"}`}>
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`bg-gray-100 p-4 rounded-lg shadow-md flex flex-col justify-between ${
              isDayMode ? "text-black" : "text-gray-700"
            }`}
          >
            <div className="flex items-center mb-4">
              {categoryIcons[category.slug] ?? null}
              <h2 className="ml-2">{category.name}</h2>
            </div>
            <div>
              <p>{category.description}</p>
              <Link href={`/subcategories/${category.slug}`}>
                <button
                  className={`w-full py-2 mt-4 rounded-lg bg-blue-500 text-white font-bold text-lg cursor-pointer transition duration-300 ease-in-out hover:scale-110 ${
                    isDayMode ? "text-black" : "text-white"
                  }`}
                >
                  Войти
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
