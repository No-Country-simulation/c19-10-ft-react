import Hero from "../components/Hero";
import NavBar from "../components/NavBar";
import InvitationRequestModal from "@/components/InvitationRequestModal";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "../components/Footer";

export default function Landing() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      openModal();
    }
  }, []);
  const openModal = () => setIsModalOpen(true);
  return (
    <div>
      <NavBar className="z-10" />
      <InvitationRequestModal isOpen={isModalOpen} />
      <Hero className="z-0" />
      <Footer />
    </div>
  );
}
