import Image from "next/image";
import { useRouter } from "next/router";

const HomeCard = ({ image, size, title, path, onClick }) => {
  const router = useRouter();

  const navigateTo = (path) => {
    path ? router.push(path) : null;
  };
  return (
    <div
      className={
        path || onClick
          ? `cursor-pointer relative overflow-hidden shadow-lg rounded-lg col-span-${size}`
          : `relative overflow-hidden shadow-lg rounded-lg col-span-${size}`
      }
      onClick={path ? () => navigateTo(path) : onClick}
    >
      <Image
        className={
          !path
            ? "w-[250px] sm:w-full h-[100px] sm:h-full object-cover"
            : "w-full h-full object-cover"
        }
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
