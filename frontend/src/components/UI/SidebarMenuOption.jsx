import Image from "next/image";

const MenuOption = ({ logo, alt, label, action }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <button
        onClick={action}
        className=" flex justify-center items-center rounded-full min-w-[30px] min-h-[30px] bg-background hover:scale-110 transition-all duration-150"
      >
        <Image src={logo} min-width={20} height={20} alt={alt} /> {/* 40 wh */}
      </button>
      <p className="text-secondary resize-text">{label}</p>
    </div>
  );
};

export default MenuOption;
