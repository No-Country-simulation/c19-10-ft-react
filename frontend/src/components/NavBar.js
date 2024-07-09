
const NavLink = ({ text }) => (
	<span className="text-gray-800 hover:text-gray-600 hover:underline cursor-pointer font-bold">
		{text}
	</span>
);

const Button = ({ text, color }) => (
	<button
		className={`bg-[#FF2861] text-white py-2 px-4 rounded-md hover:bg-[#d2aab4]
			text === "ACCEDER" ? "px-6" : ""
		}`}
	>
		{text}
	</button>
);

const NavBar = () => {
	return (
		<nav className="bg-white shadow-md pt-4">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-center h-16 gap-24">
					<div className="flex items-center">
						<span className="text-2xl font-bold">Celebria</span>
					</div>
					<div className="flex space-x-4 items-center">
						<NavLink text="LUGARES" />
						<NavLink text="PROVEEDORES" />
						<NavLink text="TU EVENTO" />
						<NavLink text="INVITACIONES" />
						<Button text="ACCEDER" color="#FF2861" />
						<Button text="REGISTRARTE" color="#FF2861" />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
