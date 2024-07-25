import Image from "next/image";
import BackgroundImage from "../../public/party.jpg";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";

const EventRequest = () => {
  const [isModalVisible, setModalVisible] = useState(true);
  const [tokenData, setTokenData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { token } = router.query;
  const decoded = jwtDecode(token);

  useEffect(() => {
    if (token) {
      setIsOpen(true);
      setTokenData(decoded);
    }
  }, []);

  const handleDecline = () => {
    setModalVisible(false);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "No tienes más invitaciones",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <>
      {isModalVisible && (
        <div className="flex items-center justify-center  bg-gray-100 p-4">
          <div className="hero-content flex-col lg:flex-row-reverse bg-white p-6 rounded-lg shadow-lg max-w-4xl">
            <div className="flex justify-center lg:justify-start lg:w-1/2">
              <div className="max-w-md lg:max-w-full">
                <Image
                  src={BackgroundImage}
                  alt="Fondo de fiesta"
                  className="rounded-lg shadow-2xl object-cover"
                  width={500}
                  height={300}
                  layout="responsive"
                />
              </div>
            </div>
            <div className="text-center lg:text-left lg:w-1/2 lg:pl-6">
              <h1 className="text-4xl lg:text-5xl font-bold py-6">
                Invitación!
              </h1>
              <p className="text-lg">
                ¡Hola! Has sido invitado(a) a nuestro evento [Evento]
              </p>
              <p className="text-lg">
                ¿Te gustaría formar parte de esta celebración?
              </p>
              <p className="py-6 text-lg">
                Por favor, confirma si puedes asistir usando los botones a
                continuación.
              </p>
              <div className="flex gap-4 lg:flex-row lg:gap-4 justify-center lg:justify-start">
                <button className="bg-[#88D66C] text-white px-6 py-2 rounded-md transform hover:scale-105 focus:outline-none transition-transform duration-300">
                  Aceptar
                </button>
                <button
                  className="bg-[#FF0000] text-white px-6 py-2 rounded-md transform hover:scale-105 focus:outline-none transition-transform duration-300"
                  onClick={handleDecline}
                >
                  Rechazar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventRequest;
