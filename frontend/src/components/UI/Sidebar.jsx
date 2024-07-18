import CLogo from "../../../public/C-logo.svg";

import ProfileLogo from "../../../public/profile-logo.svg";
import NotificationsLogo from "../../../public/notifications-logo.svg";
import CalendarLogo from "../../../public/calendar-logo.svg";
import InvitationLogo from "../../../public/invitation-logo.svg";
import SettingsLogo from "../../../public/settings-logo.svg";
import Image from "next/image";
import MenuOption from "./SidebarMenuOption";
import NavLink from "./NavLink";
import Link from "next/link";
import Button from "./Button";

import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <aside className="bg-primary w-full sm:w-28 sm:min-h-screen flex sm:flex-col justify-between py-4 px-3">
      <div className="flex sm:flex-col gap-2 sm:justify-center sm:items-center">
        <Image src={CLogo} width={50} height={50} alt="Celebria-mini-logo" />
        <div className="divider divider-neutral  w-full hidden sm:flex"></div>
      </div>
      <div className="flex sm:hidden">
        <button
          onClick={toggleMenu}
          className={`text-white lg:hidden focus:outline-none ${
            isOpen ? "bg-primary p-2 rounded-md" : ""
          }`}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke={isOpen ? "white" : "currentColor"}
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>
      <div
        className={`${
          isOpen
            ? "absolute md:hidden top-20 my-2 z-10 border-t-2 left-0 right-0 bg-primary py-2 px-4 lg:relative lg:bg-transparent lg:py-0 lg:px-0 lg:flex lg:space-x-4 lg:items-center"
            : "hidden"
        } lg:flex lg:space-x-4 lg:items-center`}
      >
        <section className="md:hidden flex gap-2 justify-between py-2 ">
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
          <MenuOption
            logo={SettingsLogo}
            alt={"settings-logo"}
            label={"Configuración"}
          />
        </section>
      </div>
      <section className="hidden sm:flex flex-col gap-4 ">
        <MenuOption logo={ProfileLogo} alt={"profile-logo"} label={"Perfil"} />
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
      <section className="hidden sm:flex h-full w-full">
        <MenuOption
          logo={SettingsLogo}
          alt={"settings-logo"}
          label={"Configuración"}
        />
      </section>
    </aside>
  );
};

export default Sidebar;
