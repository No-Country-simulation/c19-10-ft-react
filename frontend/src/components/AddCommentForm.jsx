import * as Yup from "yup";
import axios from "axios";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import "sweetalert2/dist/sweetalert2.css";
const API_URL = process.env.API_BASE_URL;

const AddCommentForm = ({ postId, updateComments }) => {
  const [token, setToken] = useState(null);

  const eventSchema = Yup.object().shape({
    content: Yup.string().required("Campo requerido"),
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setToken(decodedToken);
    }
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await axios.post(`${API_URL}/comment/create`, {
        ...values,
        postId,
        userId: token?.id,
      });
      updateComments(postId);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al añadir comentario",
      });
      console.error("Error al añadir comentario:", error);
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <Formik
      initialValues={{ content: "" }}
      validationSchema={eventSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="mb-4">
            <Field
              placeholder="Comentario"
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

          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="btn btn-primary text-white btn-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Comentando..." : "Añadir"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddCommentForm;
