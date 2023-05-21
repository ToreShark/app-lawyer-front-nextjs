"use client";
import NavBar from "../../components/NavBar";
import { usePathname, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { Category, DefaultService, Subcategory } from "@/generated";
import Link from "next/link";
import { Metadata } from "next";
import { NextSeo } from "next-seo";

export default function SubcategoriesPage() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();
  console.log("slug", slug);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  const metadata: Metadata = {
    title: "Next.js",
  };

  const pageTitle = typeof metadata.title === 'string' ? metadata.title : undefined;


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

  return (
    <>
    <NextSeo title={pageTitle} />
      <div className="w-full py-8 px-4 bg-white">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
          {subcategories.map((subcategory) => (
            <div
              key={subcategory.id}
              className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col justify-between"
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
                <Link href={`/subcategories/bySlug/${subcategory.slug}`}>
                  <button className="w-full py-2 mt-4 rounded-lg bg-blue-500 text-white font-bold text-lg cursor-pointer transition duration-300 ease-in-out hover:scale-110">
                    Подробнее
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
