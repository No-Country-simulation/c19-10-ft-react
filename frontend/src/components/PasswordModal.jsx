import React, { useState } from "react";
import Modal from "@/components/UI/Modal";

const PasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      setMessage("Email de recuperación enviado. Por favor, revisa tu correo.");
    } catch (error) {
      setMessage(
        "Error enviando email de recuperación. Por favor, intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="password-modal p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl mb-4">Recuperar Contraseña</h2>
        <input
          type="email"
          placeholder="Ingresa tu email"
          value={email}
          onChange={handleEmailChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-100"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </Modal>
  );
};

export default PasswordModal;
