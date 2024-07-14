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

  return (
    <div className="w-full h-full flex">
      <aside className="flex flex-col justify-between gap-4 bg-primary py-4 px-2 min-h-screen">
        <div className="flex justify-center items-center">
          <Image src={CLogo} width={60} height={60} alt="Celebria-mini-logo" />
        </div>
        <div className="divider divider-neutral opacity-50"></div>

        <section className="min-h-[660px] flex flex-col gap-8">
          <MenuOption
            logo={ProfileLogo}
            alt={"profile-logo"}
            label={"Perfil"}
          />
          <MenuOption
            logo={NotificationsLogo}
            alt={"notifications-logo"}
            label={"Avisos"}
          />
          <MenuOption
            logo={CalendarLogo}
            alt={"calendar-logo"}
            label={"Calendario"}
          />
          <MenuOption
            logo={InvitationLogo}
            alt={"invitation-logo"}
            label={"Invitaciones"}
          />
        </section>
        <section className="h-full w-full">
          <MenuOption
            logo={SettingsLogo}
            alt={"settings-logo"}
            label={"Configuración"}
          />
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
          <HomeCard
            image={YourEventsBackground}
            size={1}
            title={"Tus eventos"}
          />
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

      <div className={`modal ${isModalOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Registra tu evento</h3>
          <form className="flex flex-col gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Tipo de Evento</span>
              </label>
              <select
                className="select select-bordered focus:border-primary"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
              >
                <option value="">Seleccione un tipo de evento</option>
                <option value="casamiento">Casamiento</option>
                <option value="cumpleaños infantil">Cumpleaños Infantil</option>
                <option value="cumpleaños de 15">Cumpleaños de 15</option>
                <option value="cumpleaños adulto">Cumpleaños Adulto</option>
                <option value="baby shower">Baby Shower</option>
                <option value="despedida de soltero/a">Despedida de Soltero/a</option>
                <option value="evento empresarial">Evento Empresarial</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nombre del Evento</span>
              </label>
              <input
                type="text"
                className="input input-bordered focus:border-primary"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Descripción</span>
              </label>
              <textarea
                className="textarea textarea-bordered focus:border-primary"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Fecha</span>
              </label>
              <DatePicker
                selected={eventDate}
                onChange={(date) => setEventDate(date)}
                className="input input-bordered focus:border-primary"
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>Cerrar</button>
              <button type="submit" className="btn btn-primary">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Guardian(Home);
