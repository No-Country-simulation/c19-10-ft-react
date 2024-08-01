import { useState } from "react";
import Image from "next/image";
import UserSettings from "../components/UserSettings";
import SettingsLogo from "../../public/settings-logo.svg";

const UserPerfil = ({ isOpen, onClose, user, updateUserData }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
    onClose();
  };

  const handleUpdateUserData = () => {
    updateUserData();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg relative w-[90vw] max-w-md sm:w-auto sm:max-w-sm sm:absolute sm:left-4 sm:bottom-[calc(4rem+50px)]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-primary hover:scale-110 transition-transform duration-150"
            title="Cerrar"
          >
            X
          </button>
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="Avatar"
                className="rounded-full w-32 h-32"
              />
              <button
                className="absolute -top-2 -right-2 bg-white p-2 rounded-full border border-gray-300 shadow-md hover:scale-110 transition-transform duration-150"
                title="Configuración"
                onClick={handleSettingsClick}
              >
                <Image
                  src={SettingsLogo}
                  width={24}
                  height={24}
                  alt="Settings Logo"
                />
              </button>
            </div>
            <h2 className="text-xl font-semibold mb-2">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
      </div>
      <UserSettings
        updateUserData={handleUpdateUserData}
        user={user}
        isOpen={isSettingsOpen}
        onClose={handleCloseSettings}
      />
    </>
  );
};

export default UserPerfil;
