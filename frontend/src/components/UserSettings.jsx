import { useState } from "react";
import Image from "next/image";
import editLogo from "../../public/edit-logo.svg";

const UserSettings = ({ isOpen, onClose }) => {
	const [avatar, setAvatar] = useState(
		"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
	);
	const [username, setUsername] = useState("usuario@example.com");
	const [password, setPassword] = useState("");

	const handleAvatarChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setAvatar(URL.createObjectURL(file));
		}
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		alert("Formulario enviado");
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white p-8 rounded-lg shadow-lg relative w-[90vw] max-w-md">
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-primary hover:scale-110 transition-transform duration-150"
					title="Cerrar"
				>
					X
				</button>
				<div className="flex flex-col items-center">
					<div className="relative mb-4">
						<img src={avatar} alt="Avatar" className="rounded-full w-32 h-32" />
						<input
							type="file"
							id="avatarUpload"
							className="absolute bottom-0 right-0 opacity-0"
							onChange={handleAvatarChange}
						/>
						<label
							htmlFor="avatarUpload"
							className="absolute bottom-0 right-0 bg-white p-2 rounded-full border border-gray-300 shadow-md hover:scale-110 transition-transform duration-150 cursor-pointer"
							title="Subir foto de perfil"
						>
							<Image
								src={editLogo}
								width={24}
								height={24}
								alt="Subir foto de perfil"
							/>
						</label>
					</div>
					<form onSubmit={handleFormSubmit} className="w-full">
						<div className="mb-4">
							<label
								htmlFor="username"
								className="block text-sm font-medium text-gray-700"
							>
								Nombre de Usuario
							</label>
							<input
								type="text"
								id="username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
								placeholder="Nombre de Usuario"
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700"
							>
								Contraseña
							</label>
							<input
								type="password"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
								placeholder="Nueva Contraseña"
							/>
						</div>
						<button
							type="submit"
							className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
						>
							Guardar Cambios
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default UserSettings;
