import React, { useState } from "react";
import { useRouter } from "next/router";
import Instagram from "../../public/instagram-logo.png";
import Facebook from "../../public/facebook-logo.png";
import Web from "../../public/web-logo.png";
import Image from "next/image";
import Logo from "../../public/Celebria-Logo.webp";
import axios from "axios";
import AddImageSalon from "@/components/AddImageSalon";



const CreatingSalon = () => {
  const router = useRouter();
  const { userId } = router.query;

 
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    telefono: "",
    instagram: "",
    facebook: "",
    webUrl: "",
    userId: userId
  });
  const [salonId, setSalonId] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/salon/create', formData);
      setSalonId(response.data.newSalon.id);
    } catch (error) {
      console.error('Error al crear el salón:', error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 flex mb-6 fixed flex flex-col">
        <div className="w-full mb-4">
          <Image src={Logo} width={60} alt="celebria-logo"/>
        </div>
        <div className="w-full flex flex-row">
        <div className="w-1/4 bg-gray-200 rounded-md flex items-center justify-center">
          <p className="text-gray-500">Cargar imagen</p>
        </div>
        <div className="w-3/4 pl-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold">{formData.title || "Título"}</h2>
            <p className="text-gray-700 mt-2 line-clamp-3">
              {formData.description || "Descripción breve..."}
            </p>
            <p className="text-gray-500 mt-2">{formData.telefono || "Teléfono"}</p>
          </div>

          <div className="flex justify-end mt-4 space-x-4">
            {formData.instagram && <Image src={Instagram} alt="instagram-logo" width={30} />}
            {formData.facebook && <Image src={Facebook} alt="facebook-logo" width={30} />}
            {formData.webUrl && <Image src={Web} alt="web-logo" width={30} />}
          </div>
        </div>
          
        </div>
      </div>
      <form className="w-[80vw] max-w-3xl bg-white rounded-lg shadow-lg p-6 mt-48 pt-20">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full border border-gray-300 p-2 rounded-md"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full border border-gray-300 p-2 rounded-md"
            rows="3"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="telefono" className="block text-gray-700 font-bold mb-2">
            Teléfono
          </label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            className="w-full border border-gray-300 p-2 rounded-md"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="instagram" className="block text-gray-700 font-bold mb-2">
            Instagram
          </label>
          <input
            type="text"
            id="instagram"
            name="instagram"
            className="w-full border border-gray-300 p-2 rounded-md"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="facebook" className="block text-gray-700 font-bold mb-2">
            Facebook
          </label>
          <input
            type="text"
            id="facebook"
            name="facebook"
            className="w-full border border-gray-300 p-2 rounded-md"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="webUrl" className="block text-gray-700 font-bold mb-2">
            Página Web
          </label>
          <input
            type="text"
            id="webUrl"
            name="webUrl"
            className="w-full border border-gray-300 p-2 rounded-md"
            onChange={handleChange}
          />
        </div>
        </form>
        {
          salonId ? <AddImageSalon salonId= { salonId } /> : null
        }
        <button 
          className="bg-black text-white rounded-full px-4 py-2 hover:bg-gray-800 transition-colors"
          onClick={handleClick}
        >
          Siguiente
        </button>
    </div>
  );
};

export default CreatingSalon;