import React, { useContext, useEffect, useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import Axios from "axios"
import Head from "next/head"
import Router from "next/router"
import { UserContext } from "@context/UserContext"
import Logo from "@components/layout/Logo"
import LayoutAuth from "@components/layout/LayoutAuth"
import BlockUi from "@components/ui/blockui/BlockUi"
import InputDashForm from "@components/shared/form/InputDashForm"
import ProfilePictureModal from "@components/signup/ProfilePictureModal"
import {
  Copyright,
  inputCSS,
  Button as GradientButton,
  Image,
  SignupCreatorText,
  PageContainer,
  ButtonSignupCreator,
  UseCameraButton,
  ImageBg,
} from "@components/signup/SingUpStyle"
import { XPROFILE_FIELDS } from "@utils/constant"

const baseApi = process.env.bossApi
const profile = process.env.bossApi + "/members/"

function MemberDetailForm({ title, skip }) {
  const { user } = useContext(UserContext)
  const [image, setImage] = useState(null)
  const [category, setCategory] = useState("")
  const [blocking, setBlocking] = useState(true)
  const [showModal, setShowModal] = useState(false)

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
  })

  const values = {
    name: { id: XPROFILE_FIELDS.name },
    last_name: { id: XPROFILE_FIELDS.last_name },
    about_me: { id: XPROFILE_FIELDS.about_me },
    birth_date: { id: XPROFILE_FIELDS.birth_date },
    gender: { id: XPROFILE_FIELDS.gender },
  }

  function getUser() {
    Axios.get(profile + user.id, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      setImage(res.data.avatar_urls.thumb)
    })
  }

  useEffect(() => {
    if (user) {
      getUser()
    }
  }, [user])

  useEffect(() => {
    setBlocking(false)
  }, [])

  const handleShow = () => setShowModal(true)
  const handleClose = () => setShowModal(false)

  const handlerChangeForm = (e) => {
    formik.setFieldValue(e.target.name, {
      value: e.target.value,
      id: values[e.target.name].id,
    })
  }

  const handlerSubmit = async (values) => {
    let allRequest = []
    for (const key in values) {
      const url = `${baseApi}/xprofile/${values[key].id}/data/${user.id}`
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
      )
    }
    setBlocking(true)
    try {
      await Axios.all(allRequest)
      setBlocking(false)
      await Router.push(skip)
    } catch {
      setBlocking(false)
    }
  }

  function getImage(childData) {
    setImage(childData.thumb)
    //setAddAvatar(false);
  }

  const handleChangeCategory = (value) => {
    setCategory(value)
    formik.setFieldValue("gender", {
      value: String(value.value),
      id: XPROFILE_FIELDS.gender,
    })
  }

  return (
    <PageContainer main flexDirection="column">
      <Head>
        <title>{title}</title>
      </Head>

      <LayoutAuth image={true}>
        <Logo logo="/img/logo.png" alt="PORTL" className="mx-auto my-0" />

        <div className="form-section m-auto">
          <SignupCreatorText className="mb-0 line-height-1 mt-4">
            Please fill in some details for your personal Member Account.
          </SignupCreatorText>
          <SignupCreatorText className="mb-0 line-height-1 mt-2">
            You will fill in your Professional Details on the next screen.
          </SignupCreatorText>

          <div className="inner-form mt-p pt-3">
            {!image ? (
              <div className="member-image-panel m-0">
                <div className="pointer" onClick={handleShow}>
                  <Image
                    src="/img/sign-up/add-photo.png"
                    width={100}
                    height={100}
                    mb={16}
                  />
                </div>

                {/* <AddPhoto onClick={() => setAddAvatar(true)}>
                  Add photo
                </AddPhoto> */}
              </div>
            ) : (
              <div className="d-flex justify-content-between align-items-center mx-auto flex-column">
                <ImageBg
                  className="mr-3 bg-cover"
                  width={100}
                  height={100}
                  src={image}
                  alt={"Avatar"}
                />
                <div className={"mt-4"}>
                  <ButtonSignupCreator
                    className="mr-3"
                    padding="8px 26px"
                    marginTop="0px"
                    onClick={handleShow}
                  >
                    Change photo
                  </ButtonSignupCreator>

                  <UseCameraButton onClick={() => setImage(null)}>
                    Remove
                  </UseCameraButton>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={formik.handleSubmit}>
            {blocking && <BlockUi color="#eb1e79" />}

            <div className="inner-form">
              <div className="mb-4">
                <InputDashForm
                  customStyle={inputCSS}
                  value={formik.values.name.value}
                  onChange={(e) => handlerChangeForm(e)}
                  error={formik.errors.name}
                  touched={formik.touched.name}
                  name={"name"}
                  label={"First Name"}
                  type={"text"}
                  required={true}
                />
              </div>

              <div className="mb-4">
                <InputDashForm
                  customStyle={inputCSS}
                  value={formik.values.last_name.value}
                  onChange={(e) => handlerChangeForm(e)}
                  error={formik.errors.last_name}
                  touched={formik.touched.last_name}
                  name={"last_name"}
                  label={"Last Name"}
                  type={"text"}
                  required={true}
                />
              </div>

              <div className="mb-4">
                <InputDashForm
                  customStyle={inputCSS}
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
                  customStyle={inputCSS}
                  value={category}
                  onChange={handleChangeCategory}
                  name={"gender"}
                  label={"Gender"}
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
                  customStyle={inputCSS}
                  value={formik.values.about_me.value}
                  onChange={(e) => handlerChangeForm(e)}
                  error={formik.errors.about_me}
                  touched={formik.touched.about_me}
                  name={"about_me"}
                  label={"About me (optional)"}
                  type={"textarea"}
                />
              </div>

              <GradientButton type="submit" className="w-50 mx-auto">
                Continue
              </GradientButton>
            </div>
          </form>

          <Copyright>
            Copyright © 2017-2023 ELXR All rights reserved.
          </Copyright>
        </div>
      </LayoutAuth>

      <ProfilePictureModal
        userDetail={user}
        type="avatar"
        action="bp_avatar_upload"
        delAction={true}
        parentCallback={getImage}
        showModal={showModal}
        handleClose={handleClose}
        setImage={setImage}
      />
    </PageContainer>
  )
}

export default MemberDetailForm
