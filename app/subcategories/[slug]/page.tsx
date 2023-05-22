"use client";
import NavBar from "../../components/NavBar";
//@ts-ignore
import { usePathname, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { Category, DefaultService, Subcategory } from "@/generated";
import Link from "next/link";
import { Metadata } from "next";
import { NextSeo } from "next-seo";
import { useAtom } from "jotai";
import { authAtom } from "@/app/state/atoms/atom";
import SendPhoneModal from "@/app/components/LoginModal";
import Cookies from "js-cookie";

export default function SubcategoriesPage() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [auth, setAuth] = useAtom(authAtom);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(auth.isAuthenticated);
  const [isDayMode, setIsDayMode] = useState(false);

  const metadata: Metadata = {
    title: "Next.js",
  };

  const pageTitle =
    typeof metadata.title === "string" ? metadata.title : undefined;

  useEffect(() => {
    if (slug) {
      DefaultService.categoriesControllerFindBySlug(slug)
        .then((category: Category) => {
          if (category && category.subcategories) {
            setSubcategories(category.subcategories);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [slug]);

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

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    setIsAuthenticated(Boolean(accessToken));
    console.log("isAuthenticated", isAuthenticated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setAuth({
      isAuthenticated: Boolean(accessToken),
      authToken: accessToken || "",
      refreshToken: refreshToken || "",
      userId: "",
    });
  }, [isAuthenticated, Cookies.get("accessToken")]);
  
  return (
    <>
      <NextSeo title={pageTitle} />
      <div className={`w-full py-8 px-4 ${isDayMode ? "bg-white" : "bg-black"}`}>
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
          {subcategories.map((subcategory) => (
            <div
              key={subcategory.id}
              className={`bg-gray-100 p-4 rounded-lg shadow-md flex flex-col justify-between ${
                isDayMode ? "text-black" : "text-gray-700"
              }`}
            >
              <div className="flex items-center mb-4">
                <h4 className="ml-2">{subcategory.name}</h4>
              </div>
              <div>
                <img
                  src={subcategory.image}
                  alt={subcategory.name}
                  className="w-full h-64 object-cover"
                />
                <p>{subcategory.description}</p>
                {isAuthenticated ? (
                  <Link href={`/subcategories/bySlug/${subcategory.slug}`}>
                    <button className="w-full py-2 mt-4 rounded-lg bg-blue-500 text-white font-bold text-lg cursor-pointer transition duration-300 ease-in-out hover:scale-110">
                      Подробнее
                    </button>
                  </Link>
                ) : (
                  <SendPhoneModal />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
