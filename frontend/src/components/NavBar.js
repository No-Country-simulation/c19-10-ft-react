import Image from "next/image";
import Logo from "../../public/Celebria-logo.webp";
import NavLink from "./UI/NavLink";
import Button from "./UI/Button";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="bg-white drop-shadow-sm relative py-4 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="h-full w-full flex items-center justify-between gap-24">
          <div className="flex items-center justify-center">
            <Image src={Logo} width={120} height={50} alt="CelebriaLogo" />
          </div>
          <div className="flex space-x-4 items-center">
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
