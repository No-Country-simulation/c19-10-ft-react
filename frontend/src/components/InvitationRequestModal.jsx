import Image from "next/image";
import BackgroundImage from "../../public/party.jpg";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const API_URL = process.env.API_BASE_URL;

const InvitationRequestModal = (isOpen) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const [tokenData, setTokenData] = useState();
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setTokenData(decoded);
      if (isOpen) {
        setModalVisible(true);
      }
    }
  }, [token]);

  const handleAccept = async () => {
    try {
      await axios.put(`${API_URL}/invitation/${tokenData?.invitationId}`, {
        state: "ACCEPTED",
        acceptationDate: new Date(),
      });
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Gracias por aceptar, nos vemos !",
        showConfirmButton: false,
        timer: 1500,
      });
      setModalVisible(false);
    } catch (error) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Error al aceptar la invitación",
        showConfirmButton: false,
        timer: 1500,
      });
      setModalVisible(false);
    }
  };

  const handleDecline = async () => {
    setModalVisible(false);
    try {
      await axios.put(`${API_URL}/invitation/${tokenData?.invitationId}`, {
        state: "REJECTED",
        acceptationDate: new Date(),
      });
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "No tienes más invitaciones",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Error al rechazar la invitación",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      {isModalVisible ? (
        <div className="flex items-center justify-center relative h-full lg:py-[16.48rem] bg-black bg-opacity-55 backdrop-filter-blur z-50">
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
            <div className="text-center  lg:text-left lg:w-1/2 lg:pl-6">
              <h1 className="text-4xl lg:text-5xl font-bold py-6">
                Invitación!
              </h1>
              <div className="flex flex-col gap-4">
                <p className="text-lg">¡Hola! Has sido invitado(a) al evento</p>
                {tokenData && (
                  <p className="text-2xl font-semibold text-primary">
                    {tokenData?.eventData?.title}
                  </p>
                )}
                <p className="text-lg">
                  ¿Te gustaría formar parte de esta celebración?
                </p>
                <p className="text-lg">
                  Por favor, confirma si puedes asistir usando los botones a
                  continuación.
                </p>
                <div className="flex gap-4 lg:flex-row lg:gap-4 justify-center lg:justify-start">
                  <button
                    onClick={handleAccept}
                    className="bg-[#54b531] text-white px-6 py-2 rounded-md transform hover:scale-105 focus:outline-none transition-transform duration-300"
                  >
                    Aceptar
                  </button>
                  <button
                    className="bg-[#ff0000c1] text-white px-6 py-2 rounded-md transform hover:scale-105 focus:outline-none transition-transform duration-300"
                    onClick={handleDecline}
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default InvitationRequestModal;
