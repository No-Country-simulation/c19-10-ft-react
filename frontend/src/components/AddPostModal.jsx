import * as Yup from "yup";
import axios from "axios";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import "sweetalert2/dist/sweetalert2.css";
const API_URL = process.env.API_BASE_URL;

const AddPostModal = ({ isOpen, onClose, eventId, updatePosts }) => {
  const [token, setToken] = useState(null);

  const eventSchema = Yup.object().shape({
    content: Yup.string().required("Campo requerido"),
    image: Yup.mixed()
      .required("Archivo requerido")
      .test("fileType", "Tipo de archivo no soportado", (value) => {
        return (
          value &&
          ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
            value.type
          )
        );
      }),
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
    const formData = new FormData();
    formData.append("content", values.content);
    formData.append("image", values.image);
    formData.append("userId", token?.id);
    formData.append("eventId", eventId);
    try {
      await axios.post(`${API_URL}/post/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      updatePosts();
      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
      console.error("Error al añadir post:", error.response.data.message);
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4  w-full md:w-96">
        <div className="w-full flex justify-between">
          <h2 className=" mb-4">Añadir Post</h2>
          <button
            className="text-white btn btn-sm bg-red-600 flex justify-center items-center hover:bg-red-300 text-center"
            onClick={onClose}
          >
            x
          </button>
        </div>
        <Formik
          initialValues={{ content: "", image: null }}
          validationSchema={eventSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descripción
                </label>
                <Field
                  disabled={isSubmitting}
                  placeholder="Descripción"
                  id="content"
                  name="content"
                  type="text"
                  className="input mt-1 block w-full h-8 border border-primary rounded-md shadow-sm focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <ErrorMessage
                  name="content"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Foto
                </label>
                <input
                  disabled={isSubmitting}
                  id="image"
                  name="image"
                  onChange={(event) => {
                    setFieldValue("image", event.currentTarget.files[0]);
                  }}
                  type="file"
                  className="file-input file-input-bordered file-input-primary w-full "
                />
                {/* <input
                
                  type="file"
                  className="input  mt-1 block w-full h-8 border border-primary rounded-md shadow-sm focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
                
                /> */}
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  disabled={isSubmitting}
                  type="button"
                  onClick={onClose}
                  className="bg-background text-gray-500 border border-primary btn btn-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary text-white btn-sm"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Publicando..." : "Publicar"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddPostModal;
