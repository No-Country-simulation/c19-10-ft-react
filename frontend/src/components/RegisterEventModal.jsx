import dynamic from "next/dynamic";
const DatePicker = dynamic(() => import("react-datepicker"), { ssr: false });
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const RegisterEventModal = ({ isOpen, onClose }) => {
  const [eventDate, setEventDate] = useState(new Date());

  const eventSchema = Yup.object().shape({
    title: Yup.string().required("Campo requerido"),
    description: Yup.string().required("Campo requerido"),
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-1/2">
        <div className="w-full flex justify-between">
          <h2 className="text-2xl mb-4">Registra tu evento</h2>
          <button className="text-gray-500 text-2xl pr-2" onClick={onClose}>
            x
          </button>
        </div>
        <Formik
          initialValues={{ title: "", description: "" }}
          validationSchema={eventSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await axios.post("http://localhost:3001/api/v1/event/create", {
                ...values,
                date: eventDate,
              });
            } catch (error) {
              console.error("Error al crear evento:", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                {/* <label className="block text-sm font-medium text-gray-700">
                  Tipo de evento
                </label>
                <Field
                  id="type"
                  name="type"
                  as="select"
                  className="select mt-1 block w-full h-12 border border-primary rounded-md shadow-sm focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option disabled selected>
                    Seleccione un tipo de evento
                  </option>
                  <option value="Casamiento">Casamiento</option>
                  <option value="Cumpleaños Infantil">
                    Cumpleaños Infantil
                  </option>
                  <option value="Cumpleaños de 15">Cumpleaños de 15</option>
                  <option value="Cumpleaños Adulto">Cumpleaños Adulto</option>
                  <option value="Baby Shower">Baby Shower</option>
                  <option value="Despedida de soltero/a">
                    Despedida de soltero/a
                  </option>
                  <option value="Evento empresarial">Evento empresarial</option>
                </Field>
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                /> */}
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
