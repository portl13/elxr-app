import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import { Spinner } from "reactstrap";
import Editor from "@components/shared/editor/Editor";
import InputDashForm from "@components/shared/form/InputDashForm";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    border: "none",
  };
}

const useStyles = makeStyles((theme) => ({
  closeBtn: {
    cursor: "pointer",
    color: "#141414",
  },
  paper: {
    position: "absolute",
    width: "100%",
    maxWidth: 750,
    backgroundColor: 'rgba(29,51,91,1)',
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 3, 2),
  },
  saveBtn: {
    background: "#2166E3",
    color: "#ffffff",
    borderRadius: "40px",
  },
}));

function LessonPopup({ isOpen, lessonForm, handleChange, handleClose }) {
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  useEffect( () => {
    if (isOpen) {
      // formulario.setFieldValue("id", lessonForm.id);
      // formulario.setFieldValue("title", lessonForm.title);
      // formulario.setTouched(false);
      // formulario.setFieldValue("description", lessonForm.description);
      formulario.resetForm({
        id: null,
        title: "",
        description: "",
      });
      // setLesson({
      //   id: lessonForm.id,
      //   title: lessonForm.title,
      //   description: lessonForm.description,
      // });
    }
  }, [isOpen]);

  const formulario = useFormik({
    initialValues: {
      id: null,
      title: "",
      description: "",
    },
    onSubmit: async (values) => createLesson(values),
    validationSchema: Yup.object({
      title: Yup.string().required("Name is required"),
      description: Yup.string().required("Description is required"),
    }),
  });

  const createLesson = (values) => {
    setIsLoading(true);
    handleClose(values);
  };

  const handleCloseBtn = (event) => {
    handleClose(null);
  };

  const handleSaveBtn = (event) => {
    formulario.submitForm();
  };

  const handleInputChange = (input) => (e) => {
    // const details = { ...lesson };
    // details[input] = e.target.value;
    // setLesson(details);
    if (input === "description") {
      formulario.setFieldValue(input, e);
    } else {
      formulario.setFieldValue(input, e.target.value);
    }
  };

  return (
    <Modal
      className="lesson-modal"
      open={isOpen}
      onClose={handleCloseBtn}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      style={{zIndex: 1020}}
    >
      <div style={modalStyle} className={classes.paper}>
          
          <div className="w-100 text-right">
            <CloseIcon onClick={handleCloseBtn} className={classes.closeBtn} />
          </div>
          <div className="header text-white">Lesson Editor</div>
        <div className="mt-4">
          <InputDashForm
            id="title"
            type="text"
            label="Title"
            className="custom-input"
            value={formulario?.values?.title}
            onChange={handleInputChange("title")}
          />
          {formulario?.errors?.title && (
            <div className="invalid-feedback d-block">
              {formulario.errors.title}
            </div>
          )}
        </div>
        <div className="mt-3">
          <Editor
            id="description"
            className="editor-styles"
            value={formulario?.values?.description}
            onChange={handleInputChange("description")}
          />
          {formulario?.errors?.description && (
            <div className="invalid-feedback d-block">
              {formulario.errors.description}
            </div>
          )}
          {/* <TextField
            id="description"
            type="text"
            label="Description"
            className="custom-input"
            value={formulario?.values?.description}
            onChange={handleInputChange("description")}
          />
          {formulario?.errors?.description && (
            <div className="invalid-feedback d-block">
              {formulario.errors.description}
            </div>
          )} */}
        </div>
        <div className="mt-4">
          <div className="d-flex justify-content-end ">
            <button
              className="btn btn-border-primary-2 custom-cancel-btn px-4  py-3"
              onClick={handleCloseBtn}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-create custom-submit-btn py-3 px-5"
              onClick={handleSaveBtn}
            >
              {lessonForm?.id === null ? "Save Lesson" : "Update Lesson"}
              {isLoading && <Spinner style={{width:10, height:10}} animation="grow" variant="primary" />}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
export default LessonPopup;
