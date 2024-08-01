import { useState } from "react";

import Image from "next/image";
import CLogo from "../../../public/C-logo.svg";
import ProfileLogo from "../../../public/profile-logo.svg";

import MenuOption from "./SidebarMenuOption";
import UserPerfil from "../UserPerfil";
import PlansModal from "../PlansModal";

const Sidebar = ({ user, updateUser }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateUserData = () => {
    updateUser();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileOpen(true);
    setIsMenuOpen(false);
  };

  const handleCloseProfile = () => {
    setIsProfileOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <aside className="bg-primary w-full sm:w-28 sm:min-h-screen flex sm:flex-col justify-between py-4 px-3 fixed left-0 top-0 z-50">
        <div className="flex sm:flex-col gap-2 sm:justify-center sm:items-center">
          <Image src={CLogo} width={50} height={50} alt="Celebria-mini-logo" />
          <div className="divider divider-neutral w-full hidden sm:flex"></div>
        </div>
        <div className="flex sm:hidden z-50">
          <button
            onClick={toggleMenu}
            className="text-white lg:hidden focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        <div
          className={`${
            isMenuOpen
              ? "absolute top-20 my-2 z-50 border-t-2 left-0 right-0 bg-primary py-2 px-4 flex flex-col gap-2"
              : "hidden"
          } lg:flex lg:space-x-4 lg:items-center`}
        >
          {isMenuOpen && (
            <MenuOption
              logo={ProfileLogo}
              alt={"profile-logo"}
              label={"Perfil"}
              onClick={handleProfileClick}
            />
          )}
        </div>

        <section className="hidden sm:flex flex-col gap-4">
          <MenuOption
            logo={ProfileLogo}
            alt={"profile-logo"}
            label={"Perfil"}
            onClick={handleProfileClick}
          />
          <button className=" btn text-white" onClick={openModal}>
            <p className="text-xs">
              {user?.userPlan === "free" ? "FREE PLAN" : "PREMIUM PLAN"}
            </p>
          </button>
        </section>
      </aside>
      <UserPerfil
        user={user}
        isOpen={isProfileOpen}
        onClose={handleCloseProfile}
        updateUserData={handleUpdateUserData}
      />
      <PlansModal
        isOpen={isModalOpen}
        onClose={closeModal}
        user={user}
        handleUpdateUser={handleUpdateUserData}
      />
    </>
  );
};

export default Sidebar;
