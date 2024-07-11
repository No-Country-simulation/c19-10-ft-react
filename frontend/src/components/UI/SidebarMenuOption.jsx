import Image from "next/image";

const MenuOption = ({ logo, alt, label, action }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <button
        onClick={action}
        className=" flex justify-center items-center rounded-full min-w-[60px] min-h-[60px] bg-background hover:scale-110 transition-all duration-150"
      >
        <Image src={logo} width={40} height={40} alt={alt} />
      </button>
      <p className="text-secondary">{label}</p>
    </div>
  );
};

export default MenuOption;
