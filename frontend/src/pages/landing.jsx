import React from 'react'
import NavBar from "../components/NavBar";
import ProvidersSection from '@/components/providerSection';
import TuEvento from '@/components/TuEvento';
import LandingInvitation from '@/components/LandingInvitation';



const Landing = () => {
    const imagen = 'https://cdn0.casamientos.com.ar/vendor/7425/3_2/960/jpg/salon-epsectacular_7_117425.jpeg'
  return (
    <div className="w-full h-full  overflow-hidden">
         <NavBar className="z-10" />
        <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imagen})` }}
      ></div>
      <div className="relative z-10">
        <div className="bg-black bg-opacity-75 p-10 ">
            <div className='flex flex-col items-center justify-center text-center w-full p-2'>
          <h1 className="text-5xl font-bold text-white">Encuentra <br></br> tu lugar soñado! 🥂</h1>
          <p className="text-2xl text-white p-6">
          Explora decenas de opciones donde llevar a cabo tu evento.<br></br> Contacta con los salones de manera simple y en un solo lugar.
          </p>

            </div>

          <div className="bg-white rounded-lg p-4 flex flex-col md:flex-row items-center md:items-start">
      <img
        src="https://cdn0.casamientos.com.ar/vendor/6792/3_2/640/jpg/0032-mkt-recorrido-san-isidro-29-de-junio-de-2022-74a9477_7_2227-165700929475814.webp"
        alt="Imagen principal"
        className="w-full md:w-1/3 rounded-lg"
      />
       <div className="flex flex-col md:ml-4 mt-4 md:mt-0 w-full md:w-2/3">
      <div className="mb-4">
        <h2 className="text-black text-2xl font-bold">Jano's San Telmo</h2>
        <p className="text-gray-600 mt-2">
          Jano's San Telmo equipado con la última tecnología en técnica y sonido, dos elementos que harán de su celebración un verdadero éxito.
        </p>
      </div>
      <div className="flex items-center p-4 bg-gray-100 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row">
            <img
              src="https://pbs.twimg.com/profile_images/1014493279478517764/sHGGmwgc_400x400.jpg"
              alt="Usuario"
              className="w-12 h-12 rounded-full mr-4"
            />
            <p className="text-gray-800">
              "La comida: entrada, plato principal y mesa dulces de muy buen nivel."
            </p>
          </div>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-60">
            Solicitar presupuesto
          </button>
        </div>
      </div>
      </div>
      </div>
      </div>

    </div>
    <div className="bg-gray-200 py-10 mt-8 relative z-10 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center text-black mb-6">Estos son los salones que confían en nuestra plataforma</h2>
        <div className="flex justify-center space-x-6 p-4">
          <img src="https://via.placeholder.com/100" alt="Logo 1" className="h-16" />
          <img src="https://via.placeholder.com/100" alt="Logo 2" className="h-16" />
          <img src="https://via.placeholder.com/100" alt="Logo 3" className="h-16" />
          <img src="https://via.placeholder.com/100" alt="Logo 4" className="h-16" />
          <img src="https://via.placeholder.com/100" alt="Logo 5" className="h-16" />
          <img src="https://via.placeholder.com/100" alt="Logo 6" className="h-16" />
        </div>
        <button className="mt-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 w-60">
            Conviertete en uno
        </button>
      </div>
{/* Acá iría el contenedor de proveedores */}
    <ProvidersSection/>
    <TuEvento/>
    <LandingInvitation/>

      </div>
  )
}

export default Landing