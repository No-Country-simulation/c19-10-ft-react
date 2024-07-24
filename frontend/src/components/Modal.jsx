import React from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-black">
          X
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
