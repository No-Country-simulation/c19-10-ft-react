import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Guardian from "@/components/auth/guardian";
import { jwtDecode } from "jwt-decode";

import CLogo from "../../public/C-logo.svg";
import ProfileLogo from "../../public/profile-logo.svg";
import NotificationsLogo from "../../public/notifications-logo.svg";
import CalendarLogo from "../../public/calendar-logo.svg";
import InvitationLogo from "../../public/invitation-logo.svg";
import SettingsLogo from "../../public/settings-logo.svg";
import NewEventBackground from "../../public/new-event.webp";
import YourEventsBackground from "../../public/your-events.webp";
import NigthEvent from "../../public/nigth-event.webp";
import SunsetEvent from "../../public/sunset-event.webp";
import LunchEvent from "../../public/lunch-event.webp";

import HomeCard from "@/components/UI/HomeCard";
import MenuOption from "@/components/UI/SidebarMenuOption";

// Cargar DatePicker dinámicamente para que se cargue solo en el cliente
const DatePicker = dynamic(() => import("react-datepicker"), { ssr: false });

import "react-datepicker/dist/react-datepicker.css";

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

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="w-full h-full flex">
      <aside className="flex flex-col justify-between gap-4 bg-primary py-4 px-2 min-h-screen">
        <div className="flex justify-center items-center">
          <Image src={CLogo} width={60} height={60} alt="Celebria-mini-logo" />
        </div>
        <div className="divider divider-neutral opacity-50"></div>

        <section className="min-h-[660px] flex flex-col gap-8">
          <MenuOption logo={ProfileLogo} alt={"profile-logo"} label={"Perfil"} />
          <MenuOption logo={NotificationsLogo} alt={"notifications-logo"} label={"Avisos"} />
          <MenuOption logo={CalendarLogo} alt={"calendar-logo"} label={"Calendario"} />
          <MenuOption logo={InvitationLogo} alt={"invitation-logo"} label={"Invitaciones"} />
        </section>
        <section className="h-full w-full">
          <MenuOption logo={SettingsLogo} alt={"settings-logo"} label={"Configuración"} />
        </section>
      </aside>
      <section className="w-full h-full py-12 px-56 flex flex-col justify-center items-center gap-4">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-5xl text-primary font-bold">
            Bienvenido, {user?.name}.
          </h1>
          <button
            onClick={() => logout()}
            className="bg-primary btn btn-md text-secondary hover:bg-accent "
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
            onClick={openModal} // Asegúrate de pasar la función onClick aquí
          />
          <HomeCard image={YourEventsBackground} size={1} title={"Tus eventos"} />
        </section>
        <section className="w-full h-full flex flex-col justify-center items-center">
          <div className="w-full">
            <h2 className="text-3xl text-primary font-semibold">
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-1/2">
            <h2 className="text-2xl mb-4">Registra tu evento</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Tipo de evento
                </label>
                <select
                  className="mt-1 block w-full h-12 border border-primary rounded-md shadow-sm focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                >
                  <option>Seleccione un tipo de evento</option>
                  <option>Casamiento</option>
                  <option>Cumpleaños Infantil</option>
                  <option>Cumpleaños de 15</option>
                  <option>Cumpleaños Adulto</option>
                  <option>Baby Shower</option>
                  <option>Despedida de soltero/a</option>
                  <option>Evento empresarial</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Nombre del evento
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full h-12 border border-primary rounded-md shadow-sm focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  className="mt-1 block w-full h-24 border border-primary rounded-md shadow-sm focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                />
              </div>
              <div className="mb-4 flex flex-col items-center">
                <label className="block text-sm font-medium text-gray-700">
                  Fecha
                </label>
                <DatePicker
                  className="mt-1 block w-full h-12 border border-primary rounded-md shadow-sm text-center focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
                  selected={eventDate}
                  onChange={(date) => setEventDate(date)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 ml-4 rounded-md"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Guardian(Home);
