import React, { useState, useEffect } from 'react'
import Image from "next/image";
import CLogo from "../../public/C-logo.svg";
import Logo from "../../public/CelebriaWhite.png"; //------
import ProfileLogo from "../../public/profile-logo.svg";
import NotificationsLogo from "../../public/notifications-logo.svg";
import CalendarLogo from "../../public/calendar-logo.svg";
import InvitationLogo from "../../public/invitation-logo.svg";
import SettingsLogo from "../../public/settings-logo.svg";
import Link from "next/link";

import MenuOption from "@/components/UI/SidebarMenuOption";

const HomeNavBar = () => {
    const [imageSrc, setImageSrc] = useState(CLogo);
    const [imageSize, setImageSize] = useState(30);
    // 
    const [menuOpen, setMenuOpen] = useState(false);

    // 
    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
      };

    useEffect(() => {
        const resizes = () => {
          if (window.innerWidth >= 768) {
            setImageSrc(CLogo);
            setImageSize(30)
            setMenuOpen(true);
          } else {
            setImageSrc(Logo);
            setImageSize(160);
            setMenuOpen(false);
          }
        };
        resizes();
        window.addEventListener('resize', resizes);
        return () => window.removeEventListener('resize', resizes);
      }, []);

  return (
    <div id='div1'>
        <aside id='nav-aside'  className="flex flex-col gap-4 bg-primary py-4 px-2 min-h-screen">
        <section>
        <div className="flex items-center justify-rspnsv">
          <Link href={'/home'}>
          <Image src={imageSrc} width={imageSize} height={imageSize} alt="Celebria-mini-logo" />
          </Link>
          <div className='brgr-menu'>
            <label htmlFor= 'brgr-menu' className='checkbtn'>☰</label>
          <input type='checkbox' id='brgr-menu' checked={menuOpen} onChange={handleMenuToggle} />
          </div>
        </div>
        </section>

        <div className={`div2 ${menuOpen ? 'block' : 'hidden'}`}>
        <div className="divider divider-neutral opacity-50"></div>

        <section id="nav-options" className="flex gap-8">
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
        <section className="h-full w-full sec1">
          <MenuOption
            logo={SettingsLogo}
            alt={"settings-logo"}
            label={"Configuración"}
          />
        </section>

        </div>
      </aside>
    </div>
  )
}

export default HomeNavBar