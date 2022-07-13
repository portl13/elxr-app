import LessonBuilderForm from "@components/dashboard/courses/LessonBuilderForm";
import Meta from "@components/layout/Meta";
import { UserContext } from "@context/UserContext";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import Head from "next/head";
import Link from "next/link";
import React, { useContext } from "react";
import * as Yup from "yup";

function LessonBuilder() {
  const { user } = useContext(UserContext);
  const token = user?.token;

  const formulario = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (values) => {
      console.log(formulario.values);
    },

    validationSchema: Yup.object({
      title: Yup.string().required("El Titulo es requerido"),
    }),
  });

  return (
    <>
      <Meta />
      <Head>
        <title>LESSON BUILDER</title>
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
                  <h1 className="create-communities-title">LESSON BUILDER</h1>
                </div>
              </div>
            </div>
            <LessonBuilderForm formulario={formulario} />
          </div>
        </div>
      </div>
    </>
  );
}

export default LessonBuilder;
