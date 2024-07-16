import Guardian from "@/components/auth/guardian";
import Layout from "@/Layouts/Layout";
import React, { useState } from "react";

const Events = () => {
  const items = [
    {
      title: "Titulo 1",
      description: "Desc. 1",
    },
    {
      title: "Titulo 2",
      description: "Desc. 2",
    },
    {
      title: "Titulo 3",
      description: "Desc. 3",
    },
    {
      title: "Titulo 4",
      description: "Desc. 4",
    },
    {
      title: "Titulo 5",
      description: "Desc. 5",
    },
    {
      title: "Titulo 6",
      description: "Desc. 6",
    },
  ];
  const itemsPerPage = 6;
  const totalItems = items?.length || 6;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

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

  const startIdx = currentPage * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentItems = items?.slice(startIdx, endIdx);

  return (
    <Layout>
      <div className="w-full h-full py-12 px-52">
        <h2 className="text-5xl px-12 font-bold text-primary mb-4">
          Tús eventos
        </h2>
        <div className="relative overflow-hidden w-full h-full flex justify-center items-center">
          <div className=" px-12 grid grid-cols-3 gap-4">
            {currentItems?.map((item, index) => (
              <div
                key={index}
                className="bg-gray-200 p-4 rounded-lg shadow w-[420px] h-[300px] "
              >
                <h2 className="text-xl font-bold">{item?.title}</h2>
                <p className="text-gray-700">{item?.description}</p>
              </div>
            ))}
          </div>
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2  text-white p-2"
          >
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
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white p-2"
          >
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
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Guardian(Events);
