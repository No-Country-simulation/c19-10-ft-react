import Guardian from "@/components/auth/guardian";
import { jwtDecode } from "jwt-decode";
import NewEventBackground from "../../public/new-event.webp";
import YourEventsBackground from "../../public/your-events.webp";
import NigthEvent from "../../public/nigth-event.webp";
import SunsetEvent from "../../public/sunset-event.webp";
import LunchEvent from "../../public/lunch-event.webp";
import HomeCard from "@/components/UI/HomeCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HomeNavBar from "@/components/HomeNavBar";

const Home = () => {
  const router = useRouter();
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

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };
  return (
    <div className="home-main-div">
      <HomeNavBar/>
      <section className="w-full h-full py-12 flex flex-col justify-center items-center gap-4 custom-px-56">
        <div className="w-full flex justify-between items-center">
          <h1 className="custom-text-5xl text-primary font-bold">
            Bienvenido, {user?.name}.
          </h1>
          <button
            onClick={() => logout()}
            className="bg-primary btn btn-md text-secondary hover:bg-accent btn-logout"
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
          />
          <HomeCard
            image={YourEventsBackground}
            size={1}
            title={"Tus eventos"}
          />
        </section>
        <section className="w-full h-full flex flex-col justify-center items-center">
          <div className="w-full">
            <h2 className="text-primary font-semibold custom-text-3xl">
              Eventos disponibles
            </h2>
          </div>
          <div className="grid grid-cols-3 grid-rows-1 gap-4 my-4">
            <HomeCard image={LunchEvent} size={1} title={"Almuerzo"} />
            <HomeCard image={SunsetEvent} size={1} title={"Dj Party"} />
            <HomeCard image={NigthEvent} size={1} title={"Fiesta Halloween"} />
          </div>
        </section>
      </section>
    </div>
  );
};

export default Guardian(Home);
