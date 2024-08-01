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
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
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

const Home = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(null);

  const {
    data: userData,

    refetch,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      const data = jwtDecode(token);
      setUserId(data.id);
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const updateUser = () => {
    refetch();
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center w-full bg-white">
      <Sidebar user={userData} updateUser={updateUser} />
      <div className="w-full">
        <section className="w-full h-screen md:h-full mt-4 md:mt-0 px-12 md:py-6 md:px-56 flex flex-col justify-center items-center gap-4">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-2xl md:text-5xl text-primary font-bold">
              Bienvenido, {userData?.name}.
            </h1>
            <button
              onClick={logout}
              className="bg-red-600 btn btn-xs md:btn-md text-secondary hover:bg-red-300"
            >
              Cerrar sesión
            </button>
          </div>
          <section className="grid grid-cols-3 grid-rows-1 gap-4 my-4">
            <HomeCard
              className="col-span-2"
              image={NewEventBackground}
              size={2}
              title={"Registra tu evento"}
              onClick={openModal}
            />
            <HomeCard
              image={YourEventsBackground}
              size={1}
              title={"Tus eventos"}
              path={"/home/events"}
            />
          </section>
          <section className="w-full md:h-full flex flex-col md:justify-center items-center">
            <div className="w-full">
              <span className="text-xs">Próximamente</span>
              <h2 className="text-3xl text-primary font-semibold opacity-25">
                Eventos disponibles
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-1 gap-4 my-4 opacity-25">
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
