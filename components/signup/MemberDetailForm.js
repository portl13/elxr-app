import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@context/UserContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Router from "next/router";
import LayoutAuth from "@components/layout/LayoutAuth";
import Head from "next/head";
import Header from "@components/layout/Header";
import { BackLink } from "@components/ui/auth/auth.style";
import MyCustomDropzone from "@components/profile-edit/MyCustomDropzone";
import { Button } from "reactstrap";
import BlockUi from "@components/ui/blockui/BlockUi";
import InputDashForm from "@components/shared/form/InputDashForm";
import Link from "next/link";

const XPROFILE_FIELDS = {
  name: 1,
  last_name: 31,
  about_me: 25,
  birth_date: 26,
  gender: 27,
};

const baseApi = process.env.bossApi;
const profile = process.env.bossApi + "/members/";

function MemberDetailForm({ title, skip }) {
  const { user } = useContext(UserContext);
  const [addAvatar, setAddAvatar] = useState(false);
  const [image, setImage] = useState();
  const [category, setCategory] = useState("");

  const [blocking, setBlocking] = useState(true);

  const formik = useFormik({
    initialValues: {
      name: { value: "", id: XPROFILE_FIELDS.name },
      last_name: { value: "", id: XPROFILE_FIELDS.last_name },
      about_me: { value: "", id: XPROFILE_FIELDS.about_me },
      birth_date: { value: "", id: XPROFILE_FIELDS.birth_date },
      gender: { value: "", id: XPROFILE_FIELDS.gender },
    },
    onSubmit: (values) => handlerSubmit(values),
    validationSchema: Yup.object({
      name: Yup.object().required("Name is required"),
      last_name: Yup.object().required("Last Name is required"),
    }),
  });

  const values = {
    name: { value: "", id: XPROFILE_FIELDS.name },
    last_name: { value: "", id: XPROFILE_FIELDS.last_name },
    about_me: { value: "", id: XPROFILE_FIELDS.about_me },
    birth_date: { value: "", id: XPROFILE_FIELDS.birth_date },
    gender: { value: "", id: XPROFILE_FIELDS.gender },
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  function getUser() {
    Axios.get(profile + user.id, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      setImage(res.data.avatar_urls.thumb);
    });
  }

  useEffect(() => {
    setBlocking(false);
  }, []);

  const handlerChangeForm = (e) => {
    formik.setFieldValue(e.target.name, {
      value: e.target.value,
      id: values[e.target.name].id,
    });
  };

  const handlerSubmit = async (values) => {
    let allRequest = [];
    for (const key in values) {
      const url = `${baseApi}/xprofile/${values[key].id}/data/${user.id}`;
      allRequest.push(
        Axios.patch(
          url,
          {
            value:
              values[key].id !== XPROFILE_FIELDS.birth_date
                ? values[key].value
                : values[key].value === ""
                ? values[key].value
                : `${values[key].value} 00:00:00`,
          },
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        )
      );
    }
    setBlocking(true);
    try {
      await Axios.all(allRequest);
      setBlocking(false);
      await Router.push(skip);
    } catch {
      setBlocking(false);
    }
  };

  function getImage(childData) {
    setImage(childData.thumb);
    setAddAvatar(false);
  }

  const handleChangeCategory = (value) => {
    setCategory(value);
    formik.setFieldValue("gender", {
      value: String(value.value),
      id: XPROFILE_FIELDS.gender,
    });
  };

  return (
    <>
      <LayoutAuth image={true}>
        <Head>
          <title>{title}</title>
        </Head>
        <Header actionButton={true} />
        <div className="form-section m-auto">
          <BackLink>
            <Link href={"/accounttype"}>
              <a className="back">Back</a>
            </Link>
          </BackLink>
          <div className="skip-button" onClick={() => Router.push(skip)}>
            Skip
          </div>

          <div className="inner-form">
            <h1>
              <span>Add</span>Member Details
            </h1>
            <div className="member-image-panel">
              <div className="image-tag bg-gray">
                {image && <img className="avatar" src={image} alt={"Avatar"} />}
              </div>
              <div className="text-panel" onClick={() => setAddAvatar(true)}>
                Add Profile Picture
              </div>
            </div>
            {addAvatar && (
              <MyCustomDropzone
                userDetail={user}
                type="avatar"
                value="Upload Avatar"
                action="bp_avatar_upload"
                delAction={true}
                parentCallback={getImage}
              />
            )}
            {addAvatar && (
              <Button onClick={() => setAddAvatar(false)}>Close</Button>
            )}
          </div>
          <form onSubmit={formik.handleSubmit}>
            {blocking && <BlockUi color="#eb1e79" />}

            <div className="inner-form">
              <div className="mb-4">
                <InputDashForm
                  value={formik.values.name.value}
                  onChange={(e) => handlerChangeForm(e)}
                  required={true}
                  error={formik.errors.name}
                  touched={formik.touched.name}
                  name={"name"}
                  label={"First Name"}
                  type={"text"}
                />
              </div>

              <div className="mb-4">
                <InputDashForm
                  value={formik.values.last_name.value}
                  onChange={(e) => handlerChangeForm(e)}
                  required={true}
                  error={formik.errors.last_name}
                  touched={formik.touched.last_name}
                  name={"last_name"}
                  label={"Last Name"}
                  type={"text"}
                />
              </div>

              <div className="mb-4">
                <InputDashForm
                  value={formik.values.birth_date.value}
                  onChange={(e) => handlerChangeForm(e)}
                  error={formik.errors.birth_date}
                  touched={formik.touched.birth_date}
                  name={"birth_date"}
                  label={"Date of Birth (Optional)"}
                  type={"date"}
                />
              </div>

              <div className="mb-4">
                <InputDashForm
                  value={category}
                  onChange={handleChangeCategory}
                  name={"gender"}
                  label={"Gender (Optional)"}
                  type={"select"}
                  options={[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                    { label: "Other", value: "Other" },
                  ]}
                />
              </div>

              <div className="mb-4">
                <InputDashForm
                  value={formik.values.about_me.value}
                  onChange={(e) => handlerChangeForm(e)}
                  error={formik.errors.about_me}
                  touched={formik.touched.about_me}
                  name={"about_me"}
                  label={"About Me (Optional)"}
                  type={"textarea"}
                />
              </div>

              <input
                className="btn btn-primary mb-4 submit-button m-auto"
                value="Confirm Details"
                type="submit"
              />
            </div>
          </form>
        </div>
      </LayoutAuth>
    </>
  );
}

export default MemberDetailForm;
