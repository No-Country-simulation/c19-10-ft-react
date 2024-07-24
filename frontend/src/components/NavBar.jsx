import { useState } from "react";
import Image from "next/image";
import Logo from "../../public/Celebria-logo.webp";
import NavLink from "./UI/NavLink";
import Button from "./UI/Button";
import Link from "next/link";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white drop-shadow-sm relative py-4 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <Image src={Logo} width={120} height={50} alt="CelebriaLogo" />
        </div>
        {/* Menú */}
        <div className="flex">
          <button
            onClick={toggleMenu}
            className={`text-primary lg:hidden focus:outline-none ${
              isOpen ? "bg-primary p-2 rounded-md" : ""
            }`}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke={isOpen ? "white" : "currentColor"}
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
        <div
          className={`${
            isOpen
              ? "absolute top-full left-0 right-0 bg-white py-2 px-4 lg:relative lg:bg-transparent lg:py-0 lg:px-0 lg:flex lg:space-x-4 lg:items-center"
              : "hidden"
          } lg:flex lg:space-x-4 lg:items-center`}
        >
          <div className="flex flex-col items-center lg:flex-row lg:space-x-4 gap-4">
            <NavLink text="LUGARES" />
            <NavLink text="PROVEEDORES" />
            <NavLink text="TU EVENTO" />
            <NavLink text="INVITACIONES" />
            <Link href="/login" passHref>
              <Button text="ACCEDER" />
            </Link>
            <Link href="/register" passHref>
              <Button text="REGISTRARTE" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
