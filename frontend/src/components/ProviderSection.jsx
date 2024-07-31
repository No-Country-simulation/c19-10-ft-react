import React from 'react'

const ProvidersSection = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-pink-500">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://eu-central-1.linodeobjects.com/contactcenterhub/2024/02/proveedores.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full p-8">
        <div className="flex flex-col text-center md:text-left text-white max-w-md md:max-w-lg">
          <p className="text-gray-300 text-lg font-medium">PROVEEDORES</p>
          <h2 className="text-2xl md:text-3xl font-bold mt-2">
            Ofrece tus servicios y conoce a tus clientes a través de nuestra plataforma.
            <br />
            Regístrate como proveedor y conoce más al respecto.
          </h2>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mt-8 md:mt-0 md:ml-8 max-w-md w-full">
          <form className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Nombre"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="email"
              placeholder="Correo Electrónico"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button className="p-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600">
              Registrarse como proveedor
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProvidersSection;
