import React, {useRef, useState} from "react";
import { Draggable } from "react-beautiful-dnd";
import EditIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Spinner } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from "@material-ui/core/TextField";
import {
  faChevronDown,
  faChevronUp,
  faEdit,
  faGripHorizontal,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import {
  genericDelete,
  genericFetch,
  genericFetchPost,
} from "@request/dashboard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Editor from "@components/shared/editor/Editor";
import InputDashForm from "@components/shared/form/InputDashForm";

const urlLessons = `${process.env.baseUrl}/wp-json/ldlms/v2/sfwd-lessons/`;
const courseApi = `${process.env.baseUrl}/wp-json/buddyboss-app/learndash/v1/lessons`;

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const Lesson = ({
  lesson,
  index,
  moveDown,
  moveUp,
  deleteLesson,
  editLesson,
  courseID,
  user,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formulario = useFormik({
    initialValues: {
      isLoading: false,
      post_title: "",
      post_description: "",
    },
    onSubmit: async (values) => updateLesson(values),
    validationSchema: Yup.object({
      post_title: Yup.string().required("Name is required"),
      post_description: Yup.string().required("Description is required"),
    }),
  });

  const updateLesson = async (values) => {
    if (courseID) {
      formulario.setFieldValue("isLoading", true);

      if (lesson?.ID && lesson.ID !== "-1") {
        let lessonDetails = {
          content: values.post_description,
          title: values.post_title,
        };
        await genericFetchPost(
          `${urlLessons}${lesson.ID}`,
          user?.token,
          lessonDetails
        );
      } else {
        const saveLesson = {
          title: values.post_title,
          menu_order: index + 1,
          course: courseID,
          status: "publish",
          author: user?.id,
        };
        await genericFetchPost(urlLessons, user?.token, saveLesson);
      }

      lesson.post_title = values.post_title;

      formulario.setFieldValue("isLoading", false);
    }
    closeAccordion();
  };

  const showEditLesson = (lessonId) => {
    // const details = { ...expanded };
    setIsLoading(true);
    setIsOpen(true);

    // details.post_title = lesson?.post_title || "";
    // details.post_description = lesson?.post_description || "";

    formulario.setFieldValue("post_title", lesson?.post_title || "");
    formulario.setFieldValue(
      "post_description",
      lesson?.post_description || ""
    );
    // setExpanded(details);
    setTimeout(async () => {
      await getLessonDetails();
    }, 300);
    // editLesson(lessonId);
    // setExpanded(!newExpanded);
  };

  const getLessonDetails = async () => {
    if (courseID && lesson?.ID && lesson.ID !== "-1") {
      let getLesson = await genericFetch(
        `${courseApi}/${lesson.ID}`,
        user?.token
      );

      if (getLesson?.id) {
        // const details = { ...expanded };

        // details.post_title = getLesson?.title?.rendered || "";
        // details.post_description = getLesson?.content?.rendered || "";

        // setExpanded(details);

        formulario.setFieldValue(
          "post_title",
          getLesson?.title?.rendered || ""
        );
        formulario.setFieldValue(
          "post_description",
          getLesson?.content?.rendered || ""
        );
      }
    }
    setIsLoading(false);
  };

  const closeAccordion = () => {
    setIsLoading(false);
    setIsOpen(false);

    formulario.resetForm({
      post_title: "",
      post_description: "",
    });
  };

  const handleInputChange = (input) => (e) => {
    // const details = { ...expanded };
    // details[input] = e.target.value;
    // setExpanded(details);
    if (input === "post_description") {
      formulario.setFieldValue(input, e);
    } else {
      formulario.setFieldValue(input, e.target.value);
    }
  };

  const handleSaveBtn = (event) => {
    formulario.submitForm();
  };

  return (
    <Draggable isDragDisabled={false} draggableId={lesson.ID} index={index}>
      {(provided) => (
        <>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`lesson-item d-flex pr-0 ${
              lesson.type === "section-heading"
                ? "section-heading"
                : "sfwd-lessons"
            }`}
          >
            <div className="builder-inner-container">
              <div className="d-flex flex-column move-actions align-items-center">
                <button
                  className="move-actions-up none-button d-flex p-0 align-items-center"
                  onClick={() => moveUp(index)}
                >
                  <FontAwesomeIcon icon={faChevronUp} />
                </button>
                <FontAwesomeIcon
                  className="d-block move-actions-grip"
                  icon={faGripHorizontal}
                />
                <button
                  className="move-actions-down none-button d-flex p-0 align-items-center"
                  onClick={() => moveDown(index)}
                >
                  <FontAwesomeIcon icon={faChevronDown} />
                </button>
              </div>
              <button className="section-edit none-button no-pointer p-0 d-flex">
                <h4 className="mb-0 d-flex align-items-center">
                  {lesson.post_title}
                </h4>
              </button>
              {!isOpen && (
                <span className="d-flex button-container">
                  {lesson.type === "sfwd-lessons" && (
                    <span
                      onClick={() => showEditLesson(lesson.ID)}
                      className="none-button  b-remove pointer d-flex mr-2"
                    >
                      <EditIcon />
                    </span>
                  )}
                  {lesson.type === "section-heading" && (
                    <span
                      onClick={() => editLesson(lesson)}
                      className="none-button  b-remove pointer d-flex mr-2"
                    >
                      <EditIcon />
                    </span>
                  )}
                  <span
                    onClick={() => deleteLesson(lesson)}
                    className="none-button  b-remove pointer"
                  >
                    <DeleteIcon />
                  </span>
                </span>
              )}
            </div>
          </div>
          {isOpen && (
            <Accordion
              className="accrordion-style-container"
              square
              expanded={isOpen}
              onChange={closeAccordion}
            >
              <AccordionDetails>
                <Typography>
                  <div className="row">
                    {isLoading && (
                      <div className="col-12 text-center">
                        <SpinnerLoader />
                      </div>
                    )}

                    {!isLoading && (
                      <>
                        <div className="col-12 mt-3 mt-md-0">
                          <InputDashForm
                            id="title"
                            type="text"
                            label="Title"
                            className="custom-input"
                            value={formulario?.values?.post_title}
                            onChange={handleInputChange("post_title")}
                          />
                          {formulario?.errors?.post_title && (
                            <div className="invalid-feedback d-block">
                              {formulario.errors.post_title}
                            </div>
                          )}
                        </div>
                        <div className="col-12 mt-3">
                          <Editor
                            id="description"
                            className="editor-styles"
                            onChange={handleInputChange("post_description")}
                            value={formulario?.values?.post_description}
                          />
                          {formulario?.errors?.post_description && (
                            <div className="invalid-feedback d-block">
                              {formulario.errors.post_description}
                            </div>
                          )}
                        </div>
                        <div className="col-12 mt-4">
                          <div className="d-flex justify-content-end ">
                            <button
                              type="submit"
                              className="btn btn-create custom-cancel-btn py-3 px-5"
                              onClick={closeAccordion}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="btn btn-create custom-submit-btn py-3 px-5"
                              onClick={handleSaveBtn}
                            >
                              {formulario?.values?.isLoading && (
                                <Spinner animation="grow" variant="primary" />
                              )}
                              Save
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}
        </>
      )}
    </Draggable>
  );
};

export default Lesson;
