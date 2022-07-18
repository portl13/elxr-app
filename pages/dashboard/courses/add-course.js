import Meta from "@components/layout/Meta";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Link from "next/link";
import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CourseForm from "@components/dashboard/courses/CourseForm";
import { UserContext } from "@context/UserContext";

function AddCoursePage() {
  const { user } = useContext(UserContext);
  const token = user?.token;

  const formulario = useFormik({
    initialValues: {
      title: "",
      price: 0,
      subscriber_price: 0,
      category: "",
      tags: "",
      description: "",
      short_description: "",
      course_content: "",
      course_progression: "",
      url: "",
      video: "",
    },
    onSubmit: (values) => {
      console.log(formulario.values);
    },

    validationSchema: Yup.object({
      title: Yup.string().required("El nombre es requerido"),
      price: Yup.number().required("El presupuesto es requerido"),
      subscriber_price: Yup.number().required("El presupuesto es requerido"),
      category: Yup.string(),
      tags: Yup.string(),
      description: Yup.string().required("La direccion es requerida"),
      short_description: Yup.string().required("La direccion es requerida"),
      url: Yup.string().required("La direccion es requerida"),
    }),
  });

  const setPrice = (value, field) => {
    if (!value) return
    formulario.setFieldValue(field, value)
  }
  return (
    <>
      <Meta />
      <Head>
        <title>ADD NEW COURSE</title>
      </Head>
      <div className="modal-full-scream">
        <div className="container px-3 px-md-5 pt-5">
          <div className="d-flex align-items-center">
            <Link href={"/dashboard/courses"}>
              <a className="text-white">
                <span className="contain-icon">
                  <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
                </span>
                <span className="back">Back</span>
              </a>
            </Link>
          </div>
          <div className="container container-80">
            <div className="row">
              <div className="col-12">
                <div className="contain-title">
                  <h1 className="create-communities-title">ADD NEW COURSE</h1>
                </div>
              </div>
            </div>
            <CourseForm formCourse={formulario} setPrice={setPrice} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCoursePage;
