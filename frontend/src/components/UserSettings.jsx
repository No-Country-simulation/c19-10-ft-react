import { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Swal from "sweetalert2";
const API_URL = process.env.API_BASE_URL;
const UserSettings = ({ isOpen, onClose, user, updateUserData }) => {
  const [avatar, setAvatar] = useState(
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
  );

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setAvatar(user.avatar || avatar);
    }
  }, [user]);

  const validationSchema = Yup.object({
    name: Yup.string(),
    password: Yup.string().min(
      6,
      "La contraseña debe tener al menos 6 caracteres"
    ),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (values.name) {
        await axios.put(`${API_URL}/users/${user.id}`, {
          name: values.name,
        });
      }
      if (values.password) {
        const token = localStorage.getItem("token");
        await axios.put(`${API_URL}/users/reset-password?token=${token}`, {
          email: user.email,
          password: values.password,
        });
      }
      updateUserData();
      Swal.fire({
        icon: "success",
        text: "Datos de usuario actualizados exitosamente",
      });
      resetForm();
      onClose();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al actualizar datos de usuario",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg relative w-[90vw] max-w-md">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-primary hover:scale-110 transition-transform duration-150"
          title="Cerrar"
        >
          X
        </button>
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <img src={avatar} alt="Avatar" className="rounded-full w-32 h-32" />
          </div>
          <Formik
            initialValues={{
              name: user ? user.name : "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ resetForm, isSubmitting }) => (
              <Form className="w-full">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nombre de Usuario
                  </label>
                  <Field
                    disabled={isSubmitting}
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="Nombre de Usuario"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <div className="mb-4 relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contraseña
                  </label>
                  <Field
                    disabled={isSubmitting}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="Nueva Contraseña"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex justify-center pt-6 items-center px-2"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12 17.5c-3.8 0-7.2-2.1-8.8-5.5H1c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5h-2.2c-1.6 3.4-5 5.5-8.8 5.5"
                        ></path>
                      </svg>
                    )}
                  </button>
                </div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary btn btn-primary"
                >
                  {isSubmitting ? "Actualizando..." : " Guardar Cambios"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
