import * as Yup from "yup";
import axios from "axios";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import "sweetalert2/dist/sweetalert2.css";
const API_URL = process.env.API_BASE_URL;

const InvitationModal = ({ isOpen, onClose, eventId, updateInvitations }) => {
  const [token, setToken] = useState(null);

  const eventSchema = Yup.object().shape({
    invitedEmail: Yup.string().email().required("Campo requerido"),
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setToken(decodedToken);
    }
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await axios.post(`${API_URL}/invitation/create`, {
        ...values,
        eventId,
        userId: token?.id,
      });

      Swal.fire({
        icon: "success",
        title: "Invitación enviada exitosamente!",
        showConfirmButton: false,
        timer: 1500,
      });

      onClose();
      updateInvitations();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al enviar invitación",
      });
      console.error("Error al crear evento:", error);
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full md:w-1/2">
        <div className="w-full flex justify-between">
          <h2 className="text-2xl mb-4">Enviar invitación</h2>
          <button
            className="text-white btn btn-sm bg-red-600 flex justify-center items-center hover:bg-red-300 text-center"
            onClick={onClose}
          >
            x
          </button>
        </div>
        <Formik
          initialValues={{ invitedEmail: "" }}
          validationSchema={eventSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="invitedEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  placeholder="Email del invitado"
                  id="invitedEmail"
                  name="invitedEmail"
                  type="text"
                  className="input mt-1 block w-full h-12 border border-primary rounded-md shadow-sm focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <ErrorMessage
                  name="invitedEmail"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex justify-end">
                <button
                  disabled={isSubmitting}
                  type="button"
                  onClick={onClose}
                  className="btn bg-background text-gray-500 border border-primary px-4 py-2 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary text-white px-4 py-2 ml-4 rounded-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Invitando..." : "Invitar"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default InvitationModal;
