'use client';
import { DefaultService } from "@/generated";
import { useEffect, useState } from "react";

interface CarouselItem {
  imageUrl: string;
  title: string;
  description: string;
}

export default function Carousel() {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    DefaultService.subcategoriesControllerFindAll()
      .then((subcategories) => {
        const items: CarouselItem[] = subcategories.map((subcategory) => ({
          imageUrl: subcategory.image,
          title: subcategory.name,
          description: subcategory.description,
        }));
        setCarouselItems(items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % carouselItems.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [carouselItems]);

  return (
    <div className="mx-auto overflow-hidden max-w-[80rem] h-[30rem] text-center">
      <div className="relative w-full h-full">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 ${index === activeSlide ? "block" : "hidden"}`}
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white px-4 py-2">
              <h2 className="font-bold text-[1.5rem]">{item.title}</h2>
              <p className="text-[1rem]">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
