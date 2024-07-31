import { useState } from 'react';
import Image from 'next/image';
import CLogo from "../../../public/C-logo.svg";
import ProfileLogo from "../../../public/profile-logo.svg";
import NotificationsLogo from "../../../public/notifications-logo.svg";
import CalendarLogo from "../../../public/calendar-logo.svg";
import InvitationLogo from "../../../public/invitation-logo.svg";
import SettingsLogo from "../../../public/settings-logo.svg";
import MenuOption from "./SidebarMenuOption";
import PlansModal from "@/components/PlansModal";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <aside className="bg-primary w-full sm:w-28 sm:min-h-screen flex flex-col justify-between py-4 px-3">
        <div className="flex flex-col flex-grow justify-between">
          <div className="flex sm:flex-col gap-2 sm:justify-center sm:items-center">
            <Image src={CLogo} width={50} height={50} alt="Celebria-mini-logo" />
          </div>
          <section className="hidden sm:flex flex-col gap-4 items-center">
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
          <div className="flex flex-col items-center mb-4">
            <div className="hidden sm:flex">
              <MenuOption
                logo={SettingsLogo}
                alt={"settings-logo"}
                label={"Configuración"}
              />
            </div>
            <div
              className=" bold text-white text-center cursor-pointer mt-4"
              onClick={openModal}
            >
              FREE PLAN
            </div>
          </div>
        </div>
        <div className="flex sm:hidden justify-center py-2">
          <button
            onClick={toggleMenu}
            className={`text-white focus:outline-none ${
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
      </aside>
      <PlansModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Sidebar;
