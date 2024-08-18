import Guardian from "@/components/auth/guardian";
import { jwtDecode } from "jwt-decode";

import NewEventBackground from "../../../public/new-event.webp";
import YourEventsBackground from "../../../public/your-events.webp";
import NigthEvent from "../../../public/nigth-event.webp";
import SunsetEvent from "../../../public/sunset-event.webp";
import LunchEvent from "../../../public/lunch-event.webp";

import HomeCard from "@/components/UI/HomeCard";
import RegisterEventModal from "@/components/RegisterEventModal";
import Sidebar from "@/components/UI/Sidebar";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      const data = jwtDecode(token);
      setUser(data);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };
  return (
    <div className="flex flex-col sm:flex-row  justify-between items-center w-full bg-white">
      <Sidebar />
      <div className="w-full">
        <section className="w-full h-screen md:h-full py-4 px-12 md:py-12 md:px-56 flex flex-col justify-center items-center gap-4">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-xl md:text-2xl text-primary font-bold">
              Bienvenido, {user?.name}.
            </h1>
            <button
              onClick={() => logout()}
              className="bg-red-600 btn btn-xs md:btn-md text-secondary hover:bg-red-300 "
            >
              Cerrar sesion
            </button>
          </div>
          <section className="grid grid-row gap-4 my-4 w-[100%]">
            {/* <HomeCard
              className="col-span-2"
              image={NewEventBackground}
              size={2}
              title={"Registra tu evento"}
              onClick={() => openModal()}
            /> */}
            <div
              className="bg-gray-200 p-4 rounded-md cursor-pointer flex items-center gap-3"
              onClick={() => router.push(`/creating-salon?userId=${user?.id}`)}
            >
              <div className="text-2xl font-bold text-gray-600">+</div>
              <div className="text-lg font-medium text-gray-600">Agregar nuevo salón</div>
            </div>
          </section>
          <section className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-full">
              <h2 className="text-3xl text-primary font-semibold">
                Eventos disponibless
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-1 gap-4 my-4">
              <HomeCard image={LunchEvent} size={1} title={"Almuerzo"} />
              <HomeCard image={SunsetEvent} size={1} title={"Dj Party"} />
              <HomeCard
                image={NigthEvent}
                size={1}
                title={"Fiesta Halloween"}
              />
            </div>
          </section>
        </section>

        <RegisterEventModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </div>
  );
};

export default Guardian(Dashboard);