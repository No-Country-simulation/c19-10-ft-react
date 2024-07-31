import React, {useState} from 'react'
import Image from "next/image";
import EventImageOne from "../../public/celebria-event-1.png";
import EventImageTwo from "../../public/celebria-event-2.png";
import EventImage from "../../public/celebria-event.png"

const TuEvento = () => {
    const [isFirstOpen, setIsFirstOpen] = useState(false);
  const [isSecondOpen, setIsSecondOpen] = useState(false);
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black bg-opacity-90">
        <div className="bg-white rounded-lg w-[95%] h-[90%]">

        <div className="flex flex-col md:flex-row h-[100%]">
            
            <div className="flex-1 p-4 flex items-center justify-center">
            <h1 className="flex flex-row items-center justify-center text-4xl md:text-6xl font-bold text-black">
        Tu Evento
      </h1>
            <Image src={EventImage} alt='event-image' className='w-64 h-64'/>
             <h1><b><i>Celebria</i></b> centraliza y simplifica la gestión de eventos, permitiéndote registrar, organizar y monetizar tus eventos con facilidad.</h1>
            </div>
            <div className="flex-1 p-4 flex flex-col items-center justify-center">
        {/* Primer div desplegable */}
        <div className="bg-gray-200 rounded-lg shadow-md w-4/5 p-4 mb-4">
          <h3 
            className="font-semibold cursor-pointer"
            onClick={() => {setIsFirstOpen(!isFirstOpen); setIsSecondOpen(false)}}
          >
            + Organiza y Administra tu Evento en un Solo Lugar
          </h3>
          {isFirstOpen && (
            <div className="mt-2 flex items-center justify-center">
                <Image src={EventImageOne} alt='event-image-one' className="w-64 h-64"/>
              <p><b>Registra tu Evento,</b> Invita a tus Amigos, <i>Contabiliza Asistencias</i></p>
            </div>
          )}
        </div>
        {/* Segundo div desplegable */}
        <div className="bg-gray-200 rounded-lg shadow-md w-4/5 p-4">
          <h3 
            className="font-semibold cursor-pointer"
            onClick={() => {setIsSecondOpen(!isSecondOpen); setIsFirstOpen(false)}}
          >
            + Ofrece y Monetiza tus Eventos
          </h3>
          {isSecondOpen && (
            <div className="mt-2 flex items-center justify-center">
              <Image src={EventImageTwo} alt='event-image-two' className="w-64 h-64"/>
              <p><b>Ofrece tu Evento,</b> Registra tus ventas, <i>Lleva la contabilidad de tu evento</i></p>
            </div>
          )}
        </div>
      </div>
        </div>
        </div>
    </div>
  )
}

export default TuEvento