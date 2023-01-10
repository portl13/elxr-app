import InputDashForm from "@components/shared/form/InputDashForm";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { createEventsFecth, getCategories } from "@request/dashboard";
import "rc-time-picker/assets/index.css";

import { UserContext } from "@context/UserContext";
import Editor from "@components/shared/editor/Editor";
import { useAlert } from "react-alert";
import { TIMEOUT } from "@utils/constant";
import { useContext } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXRay } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { HourglassEmpty } from "@material-ui/icons";
import index from "@components/CenterLoader";

const baseUrl = process.env.apiV2;
const urlCategory = `${baseUrl}/channel-event/categories`;

export const SendInvites = ({ curntUserId }) => {

  const { user } = useContext(UserContext);
  const alert = useAlert();
  const token = user?.token;
  const router = useRouter();
  const [addInvite, setAddInvite] = useState([{ id: 0}]);



  const sentInvitesForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      description: `An invitation from ${curntUserId.name} to join PORTL`,
      editor: `You have been invited by  ${curntUserId.name} to join the PORTL community.`,
    }, //
    onSubmit: async (values) => createNewEvent(values),
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().required("Email is required"),
      description: Yup.string().required("Description is required"),
    }),
  });

  //   const handleSubmit = async (status) => {
  //     await addEventForm.setFieldValue("status", status);
  //     await addEventForm.submitForm();
  //   };
  const createNewEvent = async (values) => {
    setLoading(true);
    try {
      const { event_id } = await createEventsFecth(
        "/api/cloudflare/create-event",
        token,
        values
      );
      setLoading(false);
      if (values.type_stream === "rtmp") {
        await router.push(`/manage/event/rtmp/${event_id}?reload=`);
        return;
      }
      if (values.type_stream === "webcam") {
        await router.push(`/manage/event/web/${event_id}?reload=`);
        return;
      }
      await router.push(`/dashboard/event/${event_id}?reload=`);
    } catch (error) {
      setLoading(false);
      alert.error(error.message, TIMEOUT);
    }
  };

  const add = (length) => {
    const newEmail = {
      id: length * 2
    }
    
    setAddInvite([...addInvite, newEmail]);

  };
  const deleteInvite = (id) => {
    if(id !== 0 ) {
      const newEmail = addInvite.filter((item) => item.id !== id);
      setAddInvite(newEmail);
    }else{
      console.log('no permitido');
    }
    
  };

  return (
    <>
      <h2>Send Invites</h2>
      <p>
        Invite non-members to create an account. They will receive an email with
        a link to register.
      </p>

      <div className="row">
        {addInvite &&
          addInvite.map((item) => {
            return (
              <div className="col-12 " key={item.id} >
                <div className="row">
                  <div className="col-12 col-md-6 mt-4 mb-1">
                    <InputDashForm
                      label="Recipient Name"
                      name="name"
                      type={"text"}
                      value={sentInvitesForm.values.name}
                      onChange={sentInvitesForm.handleChange}
                      required={true}
                      error={sentInvitesForm.errors.name}
                      touched={sentInvitesForm.touched.name}
                    />
                  </div>
                  <div className="col-12 col-md-6  pl-0  mt-4 mb-1 d-flex">
                    <InputDashForm
                      label="Recipient Email"
                      name="email"
                      type={"email"}
                      value={sentInvitesForm.values.email}
                      onChange={sentInvitesForm.handleChange}
                      required={true}
                      error={sentInvitesForm.errors.email}
                      touched={sentInvitesForm.touched.email}
                    />
                    <div className="d-flex justify-content-center align-items-center">
                      <span
                        className="pointer color-font p-0 ml-2"
                        onClick={() => deleteInvite(item.id)}
                      >
                        <FontAwesomeIcon
                          className="icon-setting"
                          icon={faTimesCircle}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        <div className="col-12 d-flex justify-content-end">
          <span className="color-font pointer p-0" onClick={() => add(addInvite.length)}>
            <FontAwesomeIcon className="icon-setting" icon={faPlus} />
          </span>
        </div>

        <div className="col-12  mt-4">
          <p>Customize the text of the invitation subject.</p>
          <InputDashForm
            label="Description"
            name="description"
            type={"textarea"}
            value={sentInvitesForm.values.description}
            onChange={sentInvitesForm.handleChange}
            required={true}
            error={sentInvitesForm.errors.description}
            touched={sentInvitesForm.touched.description}
          />
        </div>

        <div className="col-12  mt-4">
          <p>
            Customize the text of the invitation email. A link to register will
            be sent with the email.
          </p>
          <Editor
            className="editor-styles"
            onChange={(value) => sentInvitesForm.setFieldValue("editor", value)}
            value={sentInvitesForm.values.editor}
          />
          {sentInvitesForm.touched.editor && sentInvitesForm.touched.editor && (
            <div className="invalid-feedback d-block">
              {sentInvitesForm.errors.editor}
            </div>
          )}
        </div>

        <div className="py-3 d-flex justify-content-center  mt-3 w-100">
          <button
            type="submit"
            onClick={() => handleSubmit("publish")}
            className="btn btn-create px-5"
          >
            Send Invites
          </button>
        </div>
      </div>
    </>
  );
};
