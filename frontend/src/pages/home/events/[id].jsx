import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import formatDate from "@/utils/formatDate";
import InvitationFormModal from "@/components/InvitationFormModal";

const EventDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);
  const API_BASE_URL = process.env.API_BASE_URL;

  const getEventData = async (id) => {
    const res = await axios.get(`${API_BASE_URL}/event/${id}`);
    return res.data.eventById;
  };

  useEffect(() => {
    if (id) {
      getEventData(id).then((data) => setEvent(data));
    }
  }, [id, API_BASE_URL]);

  return (
    <div className="w-full h-full min-h-screen py-4 px-12 md:py-12 md:px-56 bg-white flex flex-col items-start justify-start gap-4">
      <section className="w-full h-full flex items-center justify-between gap-2">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl text-primary font-bold">{event?.title}</h1>
          <p>{event?.description}</p>
          <p>Fecha: {formatDate(event?.date)}</p>
        </div>

        <button
          className="btn btn-md hover:bg-accent btn-primary text-white"
          onClick={openModal}
        >
          Invitar
        </button>
      </section>
      <div className="w-full h-full min-h-[700px]">
        <div className="flex justify-around items-center font-semibold bg-primary text-white rounded-md overflow-hidden">
          <p className="text-center hover:bg-accent hover:text-background w-full h-full py-2 cursor-pointer">
            Invitados
          </p>
          <p className="text-center hover:bg-accent hover:text-background w-full h-full py-2 cursor-pointer">
            Regalos
          </p>
          <p className="text-center hover:bg-accent hover:text-background w-full h-full py-2 cursor-pointer">
            Posts{" "}
          </p>
        </div>
      </div>
      <InvitationFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        eventId={id}
      />
    </div>
  );
};

export default EventDetail;
