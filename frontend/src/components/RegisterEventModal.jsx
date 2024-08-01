import dynamic from "next/dynamic";
import * as Yup from "yup";
import axios from "axios";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import "sweetalert2/dist/sweetalert2.css";
const API_URL = process.env.API_BASE_URL;

const DatePicker = dynamic(() => import("react-datepicker"), { ssr: false });

const RegisterEventModal = ({ isOpen, onClose }) => {
  const [eventDate, setEventDate] = useState(new Date());
  const [token, setToken] = useState(null);

  const eventSchema = Yup.object().shape({
    type: Yup.string().required("Campo requerido"),
    title: Yup.string().required("Campo requerido"),
    description: Yup.string().required("Campo requerido"),
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
      await axios.post(`${API_URL}/event/create`, {
        ...values,
        date: eventDate,
        userId: token?.id,
      });

      Swal.fire({
        icon: "success",
        title: "Evento registrado exitosamente!",
        showConfirmButton: false,
        timer: 1500,
      });

      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al crear el evento",
      });
      console.error("Error al crear evento:", error);
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full md:w-1/2">
        <div className="w-full flex justify-between">
          <h2 className="text-2xl mb-4">Registra tu evento</h2>
          <button
            className="text-white btn btn-sm bg-red-600 flex justify-center items-center hover:bg-red-300 text-center"
            onClick={onClose}
          >
            x
          </button>
        </div>
        <Formik
          initialValues={{ title: "", description: "", type: "" }}
          validationSchema={eventSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Tipo de evento
                </label>
                <Field
                  id="type"
                  name="type"
                  as="select"
                  className="select mt-1 block w-full h-12 border border-primary rounded-md shadow-sm focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option disabled value="">
                    Seleccione un tipo de evento
                  </option>
                  <option value="Casamiento">Casamiento</option>
                  <option value="Cumpleaños Infantil">
                    Cumpleaños Infantil
                  </option>
                  <option value="Cumpleaños de 15">Cumpleaños de 15</option>
                  <option value="Cumpleaños de Adulto">
                    Cumpleaños de Adulto
                  </option>
                  <option value="Baby Shower">Baby Shower</option>
                  <option value="Despedida de Soltero/a">
                    Despedida de soltero/a
                  </option>
                  <option value="Evento Empresarial">Evento empresarial</option>
                </Field>
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Nombre del evento
                </label>
                <Field
                  placeholder="Nombre del evento"
                  id="title"
                  name="title"
                  type="text"
                  className="input mt-1 block w-full h-12 border border-primary rounded-md shadow-sm focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <Field
                  placeholder="Descripcion"
                  id="description"
                  name="description"
                  type="text"
                  className="input py-2 mt-1 block w-full h-24 border border-primary rounded-md shadow-sm focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4 flex flex-col items-center">
                <label className="block text-sm font-medium text-gray-700">
                  Fecha
                </label>
                <DatePicker
                  selected={eventDate}
                  onChange={(date) => setEventDate(date)}
                  className="mt-1 block w-full h-12 border border-primary rounded-md shadow-sm text-center focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-background text-gray-500 border border-primary px-4 py-2 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 ml-4 rounded-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Cargando..." : "Guardar"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterEventModal;
