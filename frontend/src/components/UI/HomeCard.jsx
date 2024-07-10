import Image from "next/image";

const HomeCard = ({ image, size, title }) => {
  return (
    <div
      className={`w-full h-full flex justify-center items-center overflow-hidden row-span-${size} col-span-${size} rounded-2xl cursor-pointer hover:scale-95 transition-all duration-300`}
    >
      <p className="absolute text-3xl text-secondary font-semibold">{title}</p>
      <Image
        className="w-full h-full object-cover"
        src={image}
        width="auto"
        height="auto"
        alt="card-img"
      />
    </div>
  );
};

export default HomeCard;
