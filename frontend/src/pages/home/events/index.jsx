import Guardian from "@/components/auth/guardian";
import Sidebar from "@/components/UI/Sidebar";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import NewEventBackground from "../../../../public/new-event.webp";
import formatDate from "@/utils/formatDate";
import { jwtDecode } from "jwt-decode";
const API_URL = process.env.API_BASE_URL;

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

const Events = () => {
  const [userId, setUserId] = useState(null);
  const [events, setEvents] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();

  const { data: user, refetch } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      const data = jwtDecode(token);
      setUserId(data.id);
    }
  }, [router]);

  useEffect(() => {
    if (user) {
      getEvents(user.id, user.email);
    }

    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 640 ? 1 : 3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [user]);

  const getEvents = async (userId, email) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/event/all?id=${userId}&email=${email}`
      );
      setEvents(data.allEvents);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) =>
      prevPage === 0 ? totalPages - 1 : prevPage - 1
    );
  };

  const handleNext = () => {
    setCurrentPage((prevPage) =>
      prevPage === totalPages - 1 ? 0 : prevPage + 1
    );
  };

  const goToEventDetail = (id) => {
    router.push(`/home/events/${id}`);
  };

  const goBack = () => {
    router.push("/home");
  };

  const updateUser = () => {
    refetch();
  };

  const totalItems =
    events.invitedEvents?.length || events.createdEvents?.length || 6;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIdx = currentPage * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentItems = [
    (events?.createdEvents || []).slice(startIdx, endIdx),
    (events?.invitedEvents || []).slice(startIdx, endIdx),
  ];

  return (
    <div className="flex flex-col sm:flex-row  justify-between items-center w-full bg-white">
      <Sidebar user={user} updateUser={updateUser} />
      {(!events?.createdEvents && !events?.invitedEvents) ||
      (events?.createdEvents?.length === 0 &&
        events?.invitedEvents.length === 0) ? (
        <section className="w-full h-screen flex flex-col justify-center items-center">
          <div className="w-full h-full flex flex-col justify-center items-center px-2 md:px-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="5em"
              height="5em"
              viewBox="0 0 24 24"
            >
              <path
                d="M5.843 4.559a8.707 8.707 0 0 1 12.514 12.107l-.2.207a434.13 434.13 0 0 1-4.593 4.486a2.25 2.25 0 0 1-3.128 0l-3.85-3.749c-.284-.28-.532-.526-.743-.737a8.707 8.707 0 0 1 0-12.314zm11.253 1.06A7.207 7.207 0 0 0 6.904 15.813L8.6 17.484c.783.765 1.742 1.697 2.879 2.797a.75.75 0 0 0 1.043 0l2.974-2.89a212.31 212.31 0 0 0 1.6-1.579a7.207 7.207 0 0 0 0-10.192zm-2.15 1.994l.084.073a.75.75 0 0 1 .073.976l-.073.084l-1.969 1.97l1.97 1.97a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-.976.073l-.084-.073l-1.97-1.97l-1.97 1.97a.75.75 0 0 1-.976.073l-.084-.073a.75.75 0 0 1-.073-.976l.073-.084l1.969-1.97l-1.97-1.97a.75.75 0 0 1-.072-.976l.073-.084a.75.75 0 0 1 .976-.073l.084.073L12 9.655l1.97-1.97a.75.75 0 0 1 .976-.072z"
                fill="primary"
                fillRule="nonzero"
              ></path>
            </svg>

            <h2 className="text-center md:text-2xl font-semibold">
              Oops... parece no haber nada aquí, prueba organizando un evento
              genial !
            </h2>
            <button
              onClick={goBack}
              className="btn btn-sm btn-primary bg-background text-primary hover:text-background mx-2 mt-4"
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
              Regresar al inicio
            </button>
          </div>
        </section>
      ) : (
        <section className="w-full h-screen flex flex-col items-center justify-center  md:px-28">
          <div className="w-full px-8 pt-4 ">
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
          <div className="w-full h-full py-8 md:py-16 md:px-52 mt-10 md:mt-0 -z-0">
            <h2 className="text-2xl md:text-5xl text-center md:text-left px-8 md:px-12 font-bold text-primary mb-4 ">
              Tús eventos
            </h2>

            <div className="relative overflow-hidden w-full h-full items-center  flex flex-col gap-4  justify-start md:justify-center -z-0">
              {currentItems[0].length > 0 && (
                <h2 className="font-semibold md:text-xl md:pl-14 w-full text-center md:text-start text-accent">
                  Eventos que estas organizando
                </h2>
              )}
              <div className="px-8 md:px-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {currentItems[0]?.map((item) => (
                  <section className="w-full flex flex-col gap-2" key={item.id}>
                    <div
                      onClick={() => goToEventDetail(item.id)}
                      className="bg-white cursor-pointer border border-black p-4 rounded-lg h-[300px] w-[250px] sm:w-[380px] sm:h-[300px] drop-shadow-md"
                    >
                      <Image
                        src={NewEventBackground}
                        width="full"
                        height="full"
                        className="rounded-md"
                        alt="bg-img"
                      />
                      <h2 className=" sm:text-2xl mt-2 font-bold">
                        {item?.title}
                      </h2>
                      <p className=" text-sm ">{item?.description}</p>
                      <p className="text-sm font-semibold mt-6">
                        Fecha: {formatDate(item?.date)}
                      </p>
                    </div>
                  </section>
                ))}
              </div>
              {currentItems[1].length > 0 && (
                <h2 className="font-semibold md:text-xl md:pl-14 w-full text-center md:text-start text-accent">
                  Eventos a los que has sido invitado/a
                </h2>
              )}

              <div className="px-8 md:px-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
                {currentItems[1]?.map((invitation) => (
                  <section
                    className="w-full flex flex-col gap-2"
                    key={invitation.id}
                  >
                    <div
                      onClick={() => goToEventDetail(invitation?.event.id)}
                      className="bg-white cursor-pointer border border-black p-4 rounded-lg h-[300px] w-[250px] sm:w-[380px] sm:h-[300px] drop-shadow-md"
                    >
                      <Image
                        src={NewEventBackground}
                        width="full"
                        height="full"
                        className="rounded-md"
                        alt="bg-img"
                      />
                      <h2 className=" sm:text-2xl mt-2 font-bold">
                        {invitation?.event.title}
                      </h2>
                      <p className=" text-sm ">
                        {invitation?.event.description}
                      </p>
                      <p className="text-sm font-semibold mt-6">
                        Fecha: {formatDate(invitation?.event.date)}
                      </p>
                    </div>
                  </section>
                ))}
              </div>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2  text-white p-2"
              >
                {events.invitedEvents.length > 3 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="black"
                      d="M11.67 3.87L9.9 2.1L0 12l9.9 9.9l1.77-1.77L3.54 12z"
                    ></path>
                  </svg>
                )}
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white p-2"
              >
                {events.invitedEvents.length > 3 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="black"
                      d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Guardian(Events);
