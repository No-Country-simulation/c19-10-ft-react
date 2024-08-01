import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
const API_URL = process.env.API_BASE_URL;

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Campo requerido")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: Yup.string()
    .required("Campo requerido")
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir"),
});

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query;
  const decodedToken = jwtDecode(token);
  const [message, setMessage] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.put(`${API_URL}/users/reset-password?token=${token}`, {
        email: decodedToken?.email,
        password: values.password,
      });
      setMessage("Contraseña restablecida con éxito.");
      setTimeout(() => router.push("/login"), 2000);
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
      setMessage("Error al restablecer la contraseña.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-sm w-full p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl text-black mb-6">Restablecer Contraseña</h1>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={ResetPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nueva Contraseña
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm bg-white border-grey border-2 py-2 px-3"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirmar Contraseña
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm bg-white border-grey border-2 py-2 px-3"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Restableciendo..." : "Restablecer Contraseña"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
