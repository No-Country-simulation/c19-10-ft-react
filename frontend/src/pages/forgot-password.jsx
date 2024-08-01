import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Image from "next/image";
import Logo from "../../public/CelebriaWhite.png";
import BackgroundImage from "../../public/party.jpg";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
const API_URL = process.env.API_BASE_URL;

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("Campo requerido"),
});

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${BackgroundImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Contenedor*/}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
        {/* Logo*/}
        <div>
          <Image src={Logo} alt="Celebria Logo" width={120} height={50} />
        </div>
        {/*esquina superior derecha */}
        <div className="flex items-center">
          <p className="text-23 font-bold text-white mr-2">
            ¿Ya tienes cuenta?
          </p>
          <Link href="/login">
            <button className="bg-primary text-white py-2 px-4 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-100 font-bold text-base">
              Iniciar sesión
            </button>
          </Link>
        </div>
      </div>

      {/* Contenedor */}
      <div className="max-w-sm w-full p-6 bg-white rounded-lg shadow-md mt-10">
        <h1 className="text-2xl text-black mb-6">Recuperar Contraseña</h1>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={async (values) => {
            setIsSubmitting(true);
            try {
              await axios.post(`${API_URL}/users/forgot-password`, values);
              Swal.fire({
                icon: "success",
                title:
                  "Por favor, revisa tu correo electrónico para restablecer tu contraseña.",
                showConfirmButton: false,
                timer: 1500,
              });
              router.push("/");
            } catch (error) {
              console.error("Error al recuperar la contraseña:", error);
              Swal.fire({
                icon: "error",
                title: "Ocurrió un error al intentar recuperar la contraseña.",
                showConfirmButton: false,
                timer: 1500,
              });
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          {() => (
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
                {isSubmitting ? "Enviando..." : "Enviar Enlace de Recuperación"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
