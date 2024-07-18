import Image from "next/image";
import { useRouter } from "next/router";

// const HomeCard = ({ image, size, title, path }) => {
//   const router = useRouter();

//   const navigateTo = (path) => {
//     router.push(path);
//   };

const HomeCard = ({ image, size, title, path, onClick }) => {
  const router = useRouter();

  const navigateTo = (path) => {
    path ? router.push(path) : null;
  };
  return (
    <div
      className={`relative cursor-pointer overflow-hidden shadow-lg rounded-lg col-span-${size}`}
      onClick={path ? () => navigateTo(path) : onClick}
    >
      <Image
        className="w-full h-full object-cover"
        src={image}
        width="auto"
        height="auto"
        alt="card-img"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h3 className="text-white text-lg text-center md:text-2xl font-bold">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default HomeCard;
