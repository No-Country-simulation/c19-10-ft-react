import Guardian from "@/components/auth/guardian";
import Sidebar from "@/components/UI/Sidebar";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import NewEventBackground from "../../../../public/new-event.webp";
import formatDate from "@/utils/formatDate";

const Events = () => {
  const router = useRouter();

  const [events, setEvents] = useState([]);

  const itemsPerPage = 6;
  const totalItems = events?.length || 6;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3001/api/v1/event/all"
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

  const startIdx = currentPage * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentItems = events?.slice(startIdx, endIdx);

  return (
    <div className="flex flex-col sm:flex-row  justify-between items-center w-full bg-white">
      <Sidebar />
      {!events || events?.length === 0 ? (
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
        <section className="w-full h-screen flex flex-col items-center justify-center ">
          <div className="w-full px-8 pt-4">
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
          <div className="w-full h-full py-12 md:py-16 md:px-52">
            <h2 className="md:text-5xl  px-8 md:px-12 font-bold text-primary mb-4 ">
              Tús eventos
            </h2>
            <div className="relative overflow-hidden w-full h-full  flex items-start justify-center md:items-center">
              <div className="px-8 md:px-12 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {currentItems?.map((item, index) => (
                  <div
                    onClick={() => goToEventDetail(item.id)}
                    key={index}
                    className="bg-white cursor-pointer border border-black p-4 rounded-lg w-[170px] sm:w-[420px] sm:h-[300px] drop-shadow-md"
                  >
                    <Image
                      src={NewEventBackground}
                      width="full"
                      height="full"
                      className="rounded-md"
                    />
                    <h2 className=" sm:text-2xl mt-2 font-bold">
                      {item?.title}
                    </h2>
                    <p className=" text-sm ">{item?.description}</p>
                    <p className="text-sm font-semibold mt-6">
                      Fecha: {formatDate(item?.date)}
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2  text-white p-2"
              >
                {events.length > 6 && (
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
                {events.length > 6 && (
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
