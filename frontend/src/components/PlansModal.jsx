import Swal from "sweetalert2";
import axios from "axios";
const API_URL = process.env.API_BASE_URL;

const PlansModal = ({ isOpen, onClose, user, handleUpdateUser }) => {
  if (!isOpen) return null;

  const handleSelectPlan = async () => {
    try {
      const premium_pay = await axios.post(`${API_URL}/donation/subscribe`, {
        userId: user?.id,
      });
      const { init_point } = premium_pay.data;

      if (init_point) {
        window.open(init_point, "_blank");
      }
    } catch (error) {
      console.error(error);
    } finally {
      Swal.fire({
        title: "Plan actualizado",
        text: "Tu plan ha sido actualizado exitosamente.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await handleUpdateUser();
          onClose();
        }
      });
    }
  };

  const Icons = {
    checkIcon: (
      <svg
        className="flex-shrink-0 w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
    xIcon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ),
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto my-8 max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          {Icons.xIcon}
        </button>
        <div className="bg-white py-8 px-4 lg:py-16 lg:px-6">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
              Elige un plan y disfruta de organizar tu evento
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl">
              Ten en cuenta que puedes cambiar de plan en cualquier momento.
              Todo dependerá de la cantidad de invitados.
            </p>
          </div>
          <div className="flex justify-center space-x-9">
            <div className="bg-primary-600 flex flex-col justify-between items-center max-w-lg text-center text-gray-900 bg-primary rounded-lg border border-gray-100 shadow-xl p-8 opacity-75">
              <h3 className="text-white mb-4 text-2xl font-semibold">Free</h3>
              <p className="font-light text-gray-100 sm:text-lg">
                La mejor opción para uso personal y eventos pequeños.
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold text-white">
                  $ 0 ars
                </span>
                <span className="text-gray-100">/mes.</span>
              </div>
              <ul role="list" className="mb-8 space-y-4 text-left w-full">
                <li className="flex items-center space-x-3 text-green-500">
                  {Icons.checkIcon}
                  <span className="text-gray-100">
                    Configuración individual
                  </span>
                </li>
                <li className="flex items-center space-x-3  text-green-500">
                  {Icons.checkIcon}
                  <span className="text-gray-100">Sin tarifas ocultas</span>
                </li>

                <li className="flex items-center space-x-3 text-white">
                  {Icons.checkIcon}
                  <span className="text-gray-100">
                    Soporte premium:
                    <span className="font-semibold"> 6 meses</span>
                  </span>
                </li>
                <li className="flex items-center space-x-3 text-white">
                  {Icons.checkIcon}
                  <span className="text-gray-100">
                    Posts:
                    <span className="font-semibold">
                      {" "}
                      Cada usuario puede realizar hasta 3 post por cada evento.
                    </span>
                  </span>
                </li>
              </ul>
              <span className=" cursor-default text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                {user?.userPlan === "free"
                  ? "Plan actual"
                  : "Ya posees el plan premium"}
              </span>
            </div>

            <div
              className="bg-primary-600 flex flex-col justify-between
             max-w-lg text-center text-gray-900 bg-primary rounded-lg border border-gray-100 shadow-xl p-8 transition-transform duration-300 hover:scale-105"
            >
              <h3 className="text-white mb-4 text-2xl font-semibold">
                Premium
              </h3>
              <p className="font-light text-gray-100 sm:text-lg">
                La mejor opción para grandes eventos, con necesidades
                especificas !
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold text-white">
                  $ 1500 ars
                </span>
                <span className="text-gray-100">/mes.</span>
              </div>
              <ul
                role="list"
                className="mb-8 space-y-4 text-left w-full text-green-500"
              >
                <li className="flex items-center space-x-3">
                  {Icons.checkIcon}
                  <span className="text-gray-100">
                    Configuración individual
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  {Icons.checkIcon}
                  <span className="text-gray-100">Sin tarifas ocultas</span>
                </li>

                <li className="flex items-center space-x-3">
                  {Icons.checkIcon}
                  <span className="text-gray-100">
                    Soporte premium:
                    <span className="font-semibold"> Ilimitado</span>
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  {Icons.checkIcon}
                  <span className="text-gray-100">
                    Posts:
                    <span className="font-semibold"> Ilimitados</span>
                  </span>
                </li>
              </ul>
              {user?.userPlan === "free" ? (
                <button
                  onClick={() => handleSelectPlan()}
                  className="btn text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Obtener plan
                </button>
              ) : (
                <span className="text-white">Plan actual</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansModal;
