import NavLink from "./UI/NavLink";
import Button from "./UI/Button";
import Image from "next/image";
import Logo from "../../public/Celebria-logo.webp";

const NavBar = () => {
	return (
		<nav className="bg-white drop-shadow-sm pt-4">
			<div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-around h-16">
					<div className="flex items-center">
						<Image src={Logo} width={120} height={50} alt="CelebriaLogo" />
					</div>
					<div className="flex gap-4 items-center">
						<NavLink text="LUGARES" />
						<NavLink text="TU EVENTO"  />
						<NavLink text="INVITACIONES"  />
						<Button text="ACCEDER" className="px-6" />
						<Button text="REGISTRARTE" />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
