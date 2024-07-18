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

const Home = () => {
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
            <h1 className="text-3xl md:text-5xl text-primary font-bold">
              Bienvenido, {user?.name}.
            </h1>
            <button
              onClick={() => logout()}
              className="bg-red-600 btn btn-xs md:btn-md text-secondary hover:bg-red-300 "
            >
              Cerrar sesion
            </button>
          </div>
          <section className="grid grid-cols-3 grid-rows-1 gap-4 my-4">
            <HomeCard
              className="col-span-2"
              image={NewEventBackground}
              size={2}
              title={"Registra tu evento"}
              onClick={() => openModal()}
            />
            <HomeCard
              image={YourEventsBackground}
              size={1}
              title={"Tus eventos"}
              path={"/home/events"}
            />
          </section>
          <section className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-full">
              <h2 className="text-3xl text-primary font-semibold">
                Eventos disponibles
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

export default Guardian(Home);
