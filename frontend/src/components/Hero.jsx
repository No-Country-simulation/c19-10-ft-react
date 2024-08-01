import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "./UI/Button";
import Link from "next/link";

const images = [
  "/images/foto1.webp",
  "/images/foto2.webp",
  "/images/foto3.webp",
  "/images/foto4.webp",
  "/images/foto5.webp",
  "/images/foto6.webp",
  "/images/foto7.webp",
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full  overflow-hidden">
      <div className=" carousel w-full h-full overflow-hidden flex items-center justify-center">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item w-full h-full absolute  top-0 left-0 transition-transform duration-1000 ease-in-out transform ${
              index === currentIndex ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Image
              className="brightness-50"
              src={image}
              layout="fill"
              objectFit="cover"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      {/* Contenedor texto - botones */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
        <div className="mx-auto px-4 sm:px-0 sm:text-left">
          <p className="text-3xl sm:text-5xl font-bold mb-2 text-shadow">
            Transformamos tus
          </p>
          <p className="text-3xl sm:text-5xl font-bold mb-2 text-shadow">
            momentos especiales
          </p>
          <p className="text-3xl sm:text-5xl font-bold mb-4 text-shadow">
            en recuerdos eternos.
          </p>
          <div className="flex place-items-end gap-4  sm:gap-2 sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/register" passHref>
              <Button
                text="REGÍSTRATE"
                className="w-full sm:w-auto px-8 hover:bg-white hover:text-accent "
              />
            </Link>
            <Button
              text="DESCUBRE MÁS"
              className="w-40 sm:w-auto bg-transparent border border-white text-white hover:bg-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
