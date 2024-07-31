import React from 'react';
import Image from "next/image";
import InvitationImage from "../../public/celebria-invitation.png";

const LandingInvitation = () => {
  return (
    <div className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-400 to-pink-500"></div>
      <div className="relative z-10">
        <div className='flex items-center justify-center'>
        <Image src={InvitationImage} alt='invitation-image'  className="w-64 h-64"/>
        </div>
        <h1 className="text-lg text-base text-white">Invitaciones</h1>
        <p className="text-base text-white">Contacta a tus invitados por mail, gestiona tus invitaciones desde nuestra plataforma.</p>
      </div>
    </div>
  );
};

export default LandingInvitation;
