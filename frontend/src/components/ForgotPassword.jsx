import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("Campo requerido"),
});

const ForgotPassword = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setMessage("Se ha enviado un enlace de recuperación a tu correo.");
    } catch (error) {
      console.error("Error al enviar el correo de recuperación:", error);
      setMessage("Error al enviar el correo de recuperación.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-sm w-full p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl text-black mb-6">Recuperar Contraseña</h1>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <Formik
        initialValues={{ email: "" }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Correo Electrónico
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm bg-white border-grey border-2 py-2 px-3"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar enlace de recuperación"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
