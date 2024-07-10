import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "./UI/Button";

const images = [
	"/images/foto1.jpg",
	"/images/foto2.jpg",
	"/images/foto3.jpg",
	"/images/foto4.jpg",
	"/images/foto5.jpg",
	"/images/foto6.jpg",
	"/images/foto7.jpg",
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
		<div className="relative h-[400px] sm:h-[700px] overflow-hidden mt-16">
			<div className="carousel w-full h-full rounded-box relative overflow-hidden flex items-center justify-center">
				{images.map((image, index) => (
					<div
						key={index}
						className={`carousel-item w-full h-full absolute top-0 left-0 transition-transform duration-1000 ease-in-out transform ${
							index === currentIndex ? "translate-x-0" : "-translate-x-full"
						}`}
					>
						<Image
							src={image}
							layout="fill"
							objectFit="contain"
							alt={`Slide ${index + 1}`}
						/>
					</div>
				))}
			</div>
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
				<div className="mx-auto px-4 sm:px-0 text-left">
					<p className="text-2xl sm:text-5xl font-bold mb-2 text-shadow">
						Transformamos tus
					</p>
					<p className="text-2xl sm:text-5xl font-bold mb-2 text-shadow">
						momentos especiales en
					</p>
					<p className="text-2xl sm:text-5xl font-bold mb-4 text-shadow">
						recuerdos eternos.
					</p>
					<div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
						<Button
							text="REGÍSTRATE"
							className="w-full sm:w-auto px-8 hover:bg-white hover:text-accent "
						/>
						<Button
							text="DESCUBRE MÁS"
							className="w-full sm:w-auto bg-transparent border border-white text-white hover:bg-transparent"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
