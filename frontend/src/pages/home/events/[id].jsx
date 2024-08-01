import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import formatDate from "@/utils/formatDate";
import InvitationFormModal from "@/components/InvitationFormModal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import AddCommentForm from "@/components/AddCommentForm";
import AddPostModal from "@/components/AddPostModal";
import Sidebar from "@/components/UI/Sidebar";
const API_URL = process.env.API_BASE_URL;
const sendDonationSchema = Yup.object().shape({
  title: Yup.string().required("El titulo es requerido."),
  description: Yup.string().required("La descripción es requerida."),
  amount: Yup.number()
    .min(1, "El monto debe ser mayor a 1")
    .required("El monto es requerido."),
});

const fetchUser = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  try {
    const res = await axios.get(`${API_URL}/users/${userId}`);
    return res.data.user;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching user");
  }
};

const EventDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const { data: user, refetch } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId,
  });

  const [isPostsModalOpen, setIsPostsModalOpen] = useState(false);
  const [selectedView, setSelectedView] = useState("invitations");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);
  const [invitations, setInvitations] = useState([]);
  const [posts, setPosts] = useState([]);
  const [disableInviteBtn, setDisableInviteBtn] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openPostsModal = () => setIsPostsModalOpen(true);
  const closePostsModal = () => setIsPostsModalOpen(false);

  const goBack = () => {
    router.push("/home/events");
  };

  const updateUser = async () => {
    try {
      await refetch();
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  const getEventPosts = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/post/all?id=${id}`);
      if (res) {
        setPosts(res.data.allPosts);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkStr = (str) => {
    if (str) {
      const isSplitted = str.split(" ");
      return isSplitted.length === 1;
    }
    return false;
  };

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

  const updateComments = async (postId) => {
    try {
      const res = await axios.get(`${API_URL}/comment/?id=${postId}`);
      const updatedComments = res.data;
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, comments: updatedComments } : post
        )
      );
    } catch (error) {
      console.error("Error actualizando los comentarios:", error);
    }
  };

  const getEventData = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/event/${id}`);
      return res.data.eventById;
    } catch (error) {
      console.error("Error fetching event data:", error);
      return null;
    }
  };

  const getInvitationsList = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/invitation/event/${id}`);
      return res.data.invitations;
    } catch (error) {
      console.error("Error fetching invitations list:", error);
      return [];
    }
  };

  const updatePosts = async () => {
    if (id) {
      await getEventPosts(id);
    }
  };

  const updateInvitations = async () => {
    if (id) {
      const data = await getInvitationsList(id);
      setInvitations(data);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    const data = jwtDecode(token);
    setUserId(data.id);
  }, [router]);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const eventData = await getEventData(id);
          setEvent(eventData);
          const invitationsData = await getInvitationsList(id);
          setInvitations(invitationsData);
          await getEventPosts(id);
        } catch (error) {
          console.error("Error fetching event data:", error);
        }
      };
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (user && invitations.length > 0) {
      const isEmailInvited = invitations.some(
        (invite) => invite.invitedEmail === user.email
      );
      setDisableInviteBtn(isEmailInvited);
    }
  }, [user, invitations]);

  const renderContent = () => {
    switch (selectedView) {
      case "invitations":
        return (
          <div className="overflow-x-auto w-full h-full text-black">
            {invitations?.length > 0 ? (
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
                    `${API_URL}/donation/create`,
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
          <div className="w-full h-full flex flex-col justify-center items-center min-h-[700px]">
            <div className="w-full flex justify-end items-center mt-8 mb-2">
              <button
                onClick={openPostsModal}
                className="btn btn-sm text-white btn-primary"
              >
                Agregar post
              </button>
            </div>
            <section className="w-full h-full  min-h-[600px] flex justify-center items-center">
              {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  {posts?.map((post) => (
                    <section
                      key={post.id}
                      className="border flex flex-col md:flex-row w-full max-w-3xl p-4 m-2 rounded-lg"
                    >
                      <div className="flex flex-col md:flex-row gap-2 w-full h-full min-h-[400px] md:min-h-[590px]">
                        <Image
                          className="rounded-lg object-cover min-h-[400px] md:h-full "
                          src={post.imageUrl}
                          width="400"
                          height="300"
                          alt="Post Image"
                        />
                        <section className="flex flex-col justify-start items-start w-full">
                          <span className="pl-2 flex flex-col justify-start items-start gap-1 text-sm">
                            <strong className="text-lg">
                              {post.user?.name}
                            </strong>
                            {post.content}
                          </span>
                          {post.comments?.length > 0 ? (
                            <ul className=" w-full ">
                              <span className="text-xs pl-2 text-gray-400">
                                Comentarios...
                              </span>
                              <div className="border-t mt-2 w-full max-h-[400px] overflow-y-auto">
                                {post.comments.map((comment) => (
                                  <li
                                    className="pt-2 pl-2 w-full"
                                    key={comment?.id}
                                  >
                                    <p className="font-semibold">
                                      {comment?.user?.name}
                                    </p>
                                    <p
                                      className={
                                        checkStr(comment.content)
                                          ? "text-sm max-w-[25ch] truncate"
                                          : "text-sm max-w-[25ch]"
                                      }
                                    >
                                      {comment?.content}
                                    </p>
                                  </li>
                                ))}
                              </div>
                              <section className="w-full border-t mt-2 pt-2">
                                <AddCommentForm
                                  postId={post.id}
                                  updateComments={() => updateComments(post.id)}
                                />
                              </section>
                            </ul>
                          ) : (
                            <div className="w-full ">
                              <p className="pt-2 mt-2 pl-2 w-full font-semibold text-sm">
                                Aún no hay comentarios
                              </p>
                              <section className="w-full border-t mt-2 pt-2">
                                <AddCommentForm
                                  postId={post.id}
                                  updateComments={() => updateComments(post.id)}
                                />
                              </section>
                            </div>
                          )}
                        </section>
                      </div>
                    </section>
                  ))}
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <p className="text-xl font-semibold text-primary">
                    Aun no hay publicaciones, se el primero en publicar 📸
                  </p>
                </div>
              )}
            </section>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="flex flex-col sm:flex-row justify-center items-start w-full bg-white">
      <Sidebar user={user} updateUser={updateUser} />
      <div className="md:min-w-[230px] flex justify-end pt-28 md:pt-4 pl-12 ">
        <button
          onClick={goBack}
          className="btn btn-sm btn-primary bg-background text-primary hover:text-background"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m10 18l-6-6l6-6l1.4 1.45L7.85 11H20v2H7.85l3.55 3.55z"
            ></path>
          </svg>
          Volver
        </button>
      </div>
      <div className="w-full h-full min-h-screen py-8 px-12 md:py-28  md:pl-16 md:pr-40 bg-white flex flex-col items-start justify-start gap-4">
        <section className="w-full h-full flex items-center justify-between gap-2">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl md:text-5xl text-primary font-bold">
              {event?.title}
            </h1>
            <p>{event?.description}</p>
            <p className="text-sm">
              Fecha del evento: {formatDate(event?.date)}
            </p>
          </div>

          <button
            className={
              disableInviteBtn
                ? "hidden"
                : "btn btn-sm md:btn-md hover:bg-accent btn-primary text-white"
            }
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
          onClose={closeModal}
          updateInvitations={updateInvitations}
        />
        <AddPostModal
          eventId={id}
          isOpen={isPostsModalOpen}
          onClose={closePostsModal}
          updatePosts={updatePosts}
        />
      </div>
    </section>
  );
};

export default EventDetail;
