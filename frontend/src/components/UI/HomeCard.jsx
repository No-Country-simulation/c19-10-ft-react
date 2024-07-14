import Image from "next/image";

const HomeCard = ({ image, size, title, onClick }) => {
  return (
    <div
      className={`relative cursor-pointer overflow-hidden shadow-lg rounded-lg col-span-${size}`}
      onClick={onClick} 
    >
      <Image
        className="w-full h-full object-cover"
        src={image}
        width="auto"
        height="auto"
        alt="card-img"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h3 className="text-white text-2xl font-bold">{title}</h3>
      </div>
    </div>
  );
};

export default HomeCard;

