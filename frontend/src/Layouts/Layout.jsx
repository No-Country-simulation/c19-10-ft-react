import CLogo from "../../public/C-logo.svg";
import ProfileLogo from "../../public/profile-logo.svg";
import NotificationsLogo from "../../public/notifications-logo.svg";
import CalendarLogo from "../../public/calendar-logo.svg";
import InvitationLogo from "../../public/invitation-logo.svg";
import SettingsLogo from "../../public/settings-logo.svg";
import Image from "next/image";
import MenuOption from "@/components/UI/SidebarMenuOption";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-row justify-between items-center w-full bg-white">
      <aside className="bg-primary min-h-screen flex flex-col justify-between py-4 px-3">
        <div className="flex flex-col gap-2 justify-center items-center">
          <Image src={CLogo} width={50} height={50} alt="Celebria-mini-logo" />
          <div className="divider divider-neutral  w-full"></div>
        </div>

        <section className="flex flex-col gap-4">
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
      <main className=" w-full h-full">{children}</main>
    </div>
  );
};

export default Layout;
