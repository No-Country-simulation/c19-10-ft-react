import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import CLogo from "../../../public/C-logo.svg";
import ProfileLogo from "../../../public/profile-logo.svg";

import MenuOption from "./SidebarMenuOption";
import UserPerfil from "../UserPerfil";
import PlansModal from "../PlansModal";

const Sidebar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      const data = jwtDecode(token);
      setUser(data);
    }
  }, []);

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
      <aside className="bg-primary w-full sm:w-28 sm:min-h-screen flex sm:flex-col justify-between py-4 px-3">
        <div className="flex sm:flex-col gap-2 sm:justify-center sm:items-center">
          <Image src={CLogo} width={50} height={50} alt="Celebria-mini-logo" />
          <div className="divider divider-neutral w-full hidden sm:flex"></div>
        </div>
        <div className="flex sm:hidden">
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
              ? "absolute top-20 my-2 z-10 border-t-2 left-0 right-0 bg-primary py-2 px-4 flex flex-col gap-2"
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
        </section>
      </aside>
      <UserPerfil
        user={user}
        isOpen={isProfileOpen}
        onClose={handleCloseProfile}
      />
      <PlansModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Sidebar;
