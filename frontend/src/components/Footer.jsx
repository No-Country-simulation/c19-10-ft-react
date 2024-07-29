import { useState } from "react";

const Footer = () => {
	const [showProgrammers, setShowProgrammers] = useState(false);

	const programmers = [
		{
			name: "Gisella Ortiz de la tabla",
			profession: "Frontend Developer",
			avatarUrl:
				"https://avatars.githubusercontent.com/u/131559131?s=400&u=68906a9df994f99fb5422ef06bba7e21a7f73757&v=4",
			linkedinUrl: "https://www.linkedin.com/in/gisellaortizdelatabla/",
		},
		{
			name: "Guido Contartese",
			profession: "Backend Developer",
			avatarUrl: "https://avatars.githubusercontent.com/u/79114533?v=4",
			linkedinUrl: "https://www.linkedin.com/in/guido-contartese/",
		},
		{
			name: "Matias Ezequiel Bidart",
			profession: "Backend Developer",
			avatarUrl:
				"https://media.licdn.com/dms/image/C5603AQF5SV7N1pBwwA/profile-displayphoto-shrink_200_200/0/1644881261243?e=1727308800&v=beta&t=LqxQJbj6dW2NJ1Y5l1eoUBMBzELSBxIa7aU31B9nyqI",
			linkedinUrl: "https://www.linkedin.com/in/matias-bidart-a03a25231/",
		},
		{
			name: "Cecilia Cruz Guevara",
			profession: "Backend Developer",
			avatarUrl:
				"https://raw.githubusercontent.com/cruzac1985/Arg_Programa4.0_FrontEndCV/main/img/IMG_20230201_172907190_2%20(1).jpg",
			linkedinUrl:
				"https://www.linkedin.com/in/cecilia-cruz-guevara?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
		},
		{
			name: "Daniela Manzano",
			profession: "Frontend Developer - UX/UI",
			avatarUrl: "https://avatars.githubusercontent.com/u/65313674?v=4",
			linkedinUrl: "https://www.linkedin.com/in/programador5",
		},
		{
			name: "Augusto Iphar",
			profession: "Full-Stack Developer",
			avatarUrl: "https://avatars.githubusercontent.com/u/87936004?v=4",
			linkedinUrl: "https://www.linkedin.com/in/augustofrx/",
		},
		{
			name: "Jhon Herrera",
			profession: "Backend Developer - UX/UI",
			avatarUrl: "https://avatars.githubusercontent.com/u/89622626?v=4",
			linkedinUrl: "https://www.linkedin.com/in/jhon-herrera22/",
		},
		{
			name: "Carlos Sabogal Motta",
			profession: "Backend Developer",
			avatarUrl:
				"https://media.licdn.com/dms/image/D4E03AQFBl74SlWB87A/profile-displayphoto-shrink_800_800/0/1709306772172?e=1727913600&v=beta&t=KTNtXhUoHRb0VUStTyCqUwGeOIF1mgGzZgy772CWgys",
			linkedinUrl: "https://www.linkedin.com/in/carlos-david-sabogal-motta/",
		},
	];

	return (
		<footer className="fixed bottom-0 left-0 w-full bg-white text-primary p-4 flex flex-col items-center">
			<nav className="relative w-full flex flex-col items-center mb-2">
				{showProgrammers ? (
					<div className="flex flex-col w-full">
						<div className="relative flex flex-col w-full">
							<button
								className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full shadow-md hover:bg-secondary focus:outline-none"
								onClick={() => setShowProgrammers(false)}
							>
								<span className="text-xl font-bold">×</span>
							</button>
						</div>

						{/* Programmers Grid */}
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 px-4 mb-8">
							{programmers.slice(0, 4).map((programmer) => (
								<div
									key={programmer.name}
									className="flex items-start space-x-4"
								>
									<div className="avatar flex-shrink-0">
										<div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
											<img
												src={programmer.avatarUrl}
												alt={programmer.name}
												className="w-full h-full object-cover"
											/>
										</div>
									</div>
									<div className="flex flex-col justify-center">
										<a
											href={programmer.linkedinUrl}
											className="block text-sm font-semibold text-primary hover:underline"
											target="_blank"
											rel="noopener noreferrer"
										>
											{programmer.name}
										</a>
										<p className="text-xs text-center text-accent">
											{programmer.profession}
										</p>
									</div>
								</div>
							))}
							{programmers.slice(4, 8).map((programmer) => (
								<div
									key={programmer.name}
									className="flex items-start space-x-4"
								>
									<div className="avatar flex-shrink-0">
										<div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
											<img
												src={programmer.avatarUrl}
												alt={programmer.name}
												className="w-full h-full object-cover"
											/>
										</div>
									</div>
									<div className="flex flex-col justify-center">
										<a
											href={programmer.linkedinUrl}
											className="block text-sm font-semibold text-primary hover:underline"
											target="_blank"
											rel="noopener noreferrer"
										>
											{programmer.name}
										</a>
										<p className="text-xs text-center text-accent">
											{programmer.profession}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				) : (
					<a
						className="text-sm font-medium text-accent hover:underline "
						onClick={() => setShowProgrammers(true)}
					>
						Conoce al equipo
					</a>
				)}
			</nav>
			<aside className="flex flex-col items-center mt-2">
				<p className="text-center text-sm font-medium">
					Celebria © {new Date().getFullYear()} - Todos los derechos reservados
				</p>
			</aside>
		</footer>
	);
};

export default Footer;
