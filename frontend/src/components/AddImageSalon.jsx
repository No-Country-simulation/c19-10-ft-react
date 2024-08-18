import React, { useState, useEffect } from 'react'
import * as Yup from "yup";
import axios from "axios";
import { Formik, Form, ErrorMessage } from "formik";
import Swal from "sweetalert2";


const AddImageSalon = ({salonId}) => {
  const [imagesBySalonId, setImagesBySalonId] = useState();
  const [submitExecuted, setSubmitExecuted] = useState(false);
  
  
  const imageSchema = Yup.object().shape({
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

      
      
      const handleSubmit = async (values, {setSubmitting, resetForm }) => {
        const formData = new FormData();
        formData.append("image", values.image);
        formData.append("salonId", salonId );
        
        try {
          await axios.post("http://localhost:3001/api/v1/salon/image/create", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },  
          });
          setSubmitExecuted(true)
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al subir imagen",
          });
          console.error("Error al subir imagen:", error);
        } finally {
          setSubmitting(false);
          resetForm();
        }
      };
      
      useEffect(() => {
        setImagesBySalonId(imagesBySalonId +1)
        try{
          const data = axios.post("http://localhost:3001/api/v1/salon/image/create", formData);
          setImagesBySalonId(data)
        } catch {
          console.log('error loco')
        }
        setSubmitExecuted(false)
      }, [submitExecuted])
      


  return (
    <div>
    <div className="mb-4">
    <Formik
          initialValues={{ content: "", image: null }}
          validationSchema={imageSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Foto
                </label>
                <input
                  id="image"
                  name="image"
                  onChange={(image) => {
                    setFieldValue("image", image.currentTarget.files[0]);
                  }}
                  type="file"
                  className="file-input file-input-bordered file-input-primary w-full "
                />

                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
            <button
                type="submit"
                className="bg-pink-300 text-black rounded-full px-4 py-2 hover:bg-pink-800 hover:text-white transition-colors"
                disabled={isSubmitting}
            >
                Subir Imagen
              </button>
        </Form>
    )}
  </Formik>
    </div>
    </div>
  )
}

export default AddImageSalon