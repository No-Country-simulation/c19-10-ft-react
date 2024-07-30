import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import formatDate from "@/utils/formatDate";
import InvitationFormModal from "@/components/InvitationFormModal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import * as Yup from "yup";

const sendDonationSchema = Yup.object().shape({
  title: Yup.string().required("El titulo es requerido."),
  description: Yup.string().required("La descripción es requerida."),
  amount: Yup.number()
    .min(1, "El monto debe ser mayor a 1")
    .required("El monto es requerido."),
});

const EventDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedView, setSelectedView] = useState("invitations");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      const data = jwtDecode(token);
      setUser(data);
    }
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);
  const [invitations, setInvitations] = useState([]);
  const API_BASE_URL = process.env.API_BASE_URL;

  const statusTranslation = {
    ACCEPTED: "Aceptado",
    REJECTED: "Rechazado",
    PENDING: "Pendiente",
  };

  const iconsMap = {
    ACCEPTED: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.2em"
        height="1.2em"
        viewBox="0 0 1024 1024"
      >
        <path
          fill="green"
          d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.27 38.27 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"
        ></path>
      </svg>
    ),
    REJECTED: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.2em"
        height="1.2em"
        viewBox="0 0 24 24"
      >
        <path
          fill="red"
          d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
        ></path>
      </svg>
    ),
    PENDING: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.3em"
        height="1.3em"
        viewBox="0 0 24 24"
      >
        <path
          fill="orange"
          d="M12 17q.425 0 .713-.288T13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
        ></path>
      </svg>
    ),
  };

  const getEventData = async (id) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/event/${id}`);
      return res.data.eventById;
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  const getInvitationsList = async (id) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/invitation/event/${id}`);
      return res.data.invitations;
    } catch (error) {
      console.error("Error fetching invitations list:", error);
    }
  };

  const updateInvitations = async () => {
    if (id) {
      const data = await getInvitationsList(id);
      setInvitations(data);
    }
  };

  useEffect(() => {
    if (id) {
      getEventData(id).then((data) => setEvent(data));
      getInvitationsList(id).then((data) => setInvitations(data));
    }
  }, [id]);

  const renderContent = () => {
    switch (selectedView) {
      case "invitations":
        return (
          <div className="overflow-x-auto w-full h-full text-black">
            {invitations.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {invitations?.map((invitation) => (
                    <tr key={invitation.id}>
                      <td>{invitation.invitedEmail}</td>
                      <td>
                        {iconsMap[invitation.state] && (
                          <span className="flex gap-2">
                            {statusTranslation[invitation.state]}
                            {iconsMap[invitation.state]()}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="w-full h-full py-24 flex justify-center items-center">
                <p className="text-primary font-semibold text-2xl">
                  Aun no has invitado a nadie, prueba invitando a alguien a tu
                  evento 🕺🏼💃🏼
                </p>
              </div>
            )}
          </div>
        );
      case "gifts":
        return (
          <div className="w-full h-full py-24 flex flex-col justify-center items-center gap-4">
            <p className="text-primary font-semibold text-xl">
              Enviale un regalito monetario al organizador del evento 😉💸
            </p>
            <Formik
              initialValues={{ title: "", amount: 0, description: "" }}
              validationSchema={sendDonationSchema}
              onSubmit={async (values, { resetForm }) => {
                setIsSubmitting(true);
                try {
                  const date = new Date();

                  const donation = await axios.post(
                    "http://localhost:3001/api/v1/donation/create",
                    { ...values, date, eventId: id, userId: user?.id }
                  );

                  const { init_point } = donation.data;

                  Swal.fire({
                    icon: "success",
                    title:
                      "Donación realizada con exito, gracias por colaborar con este evento !",
                    timer: 1500,
                  });
                  if (init_point) {
                    window.open(init_point, "_blank");
                  }
                } catch (error) {
                  console.error("Error al realizar donación:", error);
                  Swal.fire({
                    icon: "error",
                    title: "Ocurrió un error al intentar realizar la donación.",
                    timer: 1500,
                  });
                } finally {
                  setIsSubmitting(false);
                  resetForm();
                }
              }}
            >
              {() => (
                <Form className="w-full max-w-xl">
                  <div className="mb-6">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Titulo
                    </label>
                    <Field
                      type="text"
                      id="title"
                      name="title"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm bg-white border-grey border-2 py-2 px-3"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Descripción
                    </label>
                    <Field
                      type="textarea"
                      id="description"
                      name="description"
                      className="input textarea mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm bg-white border-grey border-2 py-2 px-3"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="amount"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Monto
                    </label>
                    <Field
                      type="number"
                      id="amount"
                      name="amount"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm bg-white border-grey border-2 py-2 px-3"
                    />
                    <ErrorMessage
                      name="amount"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando donación..." : "Donar"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        );
      case "posts":
        return (
          <div className="w-full h-full py-24 flex justify-center items-center">
            <p className="text-primary font-semibold text-2xl"></p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full min-h-screen py-4 px-12 md:py-12 md:px-56 bg-white flex flex-col items-start justify-start gap-4">
      <section className="w-full h-full flex items-center justify-between gap-2">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl text-primary font-bold">{event?.title}</h1>
          <p>{event?.description}</p>
          <p>Fecha: {formatDate(event?.date)}</p>
        </div>

        <button
          className="btn btn-md hover:bg-accent btn-primary text-white"
          onClick={openModal}
        >
          Invitar
        </button>
      </section>
      <section className="w-full h-full">
        <div className="w-full h-full min-h-[700px]">
          <div className="flex justify-around items-center font-semibold bg-primary text-white rounded-md overflow-hidden">
            <button
              className={
                selectedView === "invitations"
                  ? "text-center bg-primary hover:text-background w-full h-full py-2 cursor-pointer"
                  : "text-center bg-accent hover:text-background w-full h-full py-2 cursor-pointer"
              }
              onClick={() => setSelectedView("invitations")}
            >
              Invitados
            </button>
            <button
              className={
                selectedView === "gifts"
                  ? "text-center bg-primary hover:text-background w-full h-full py-2 cursor-pointer"
                  : "text-center bg-accent hover:text-background w-full h-full py-2 cursor-pointer"
              }
              onClick={() => setSelectedView("gifts")}
            >
              Regalos
            </button>
            <button
              className={
                selectedView === "posts"
                  ? "text-center bg-primary hover:text-background w-full h-full py-2 cursor-pointer"
                  : "text-center bg-accent hover:text-background w-full h-full py-2 cursor-pointer"
              }
              onClick={() => setSelectedView("posts")}
            >
              Posts
            </button>
          </div>
          {renderContent()}
        </div>
      </section>
      <InvitationFormModal
        eventId={id}
        isOpen={isModalOpen}
        closeModal={closeModal}
        updateInvitations={updateInvitations}
      />
    </div>
  );
};

export default EventDetail;
