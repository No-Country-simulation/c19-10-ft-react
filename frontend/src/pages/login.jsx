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

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("Campo requerido"),
  password: Yup.string().required("Campo requerido"),
});

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
            ¿No te has registrado?
          </p>
          <Link href="/register" passHref>
            <button className="bg-primary text-white py-2 px-4 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-100 font-bold text-base">
              Registrarse
            </button>
          </Link>
        </div>
      </div>

      {/* Contenedor */}
      <div className="max-w-sm w-full p-6 bg-white rounded-lg shadow-md mt-10">
        <h1 className="text-2xl text-black mb-6">Inicia sesión</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await axios.post(
                `${API_URL}/users/login`,
                values
              );
              const { accessToken, refreshToken } = response.data;
              localStorage.setItem("token", accessToken);
              localStorage.setItem("refreshToken", refreshToken);
              router.push("/home");
            } catch (error) {
              Swal.fire({
                icon: "error",
                title: "Ocurrió un error al iniciar sesión.",
                text: `${error.response.data.message}`,
                timer: 3500,
              });
              console.error("Error en el login:", error);
            } finally {
              setSubmitting(false);
            }
          }}
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
                  disabled={isSubmitting}
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
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <Field
                    disabled={isSubmitting}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-indigo-500 sm:text-sm bg-white border-grey border-2 py-2 px-3"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-4 py-2 bold text-sm primary focus:outline-none hover:text-primary"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-100 btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-4 text-center">
          <Link
            href="/forgot-password"
            className="text-primary hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
