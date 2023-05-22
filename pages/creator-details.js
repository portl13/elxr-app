import React, { useRef, useState, useEffect, useContext } from "react"
import Head from "next/head"
import { Form, FormGroup } from "reactstrap"
import BlockUi, { containerBlockUi } from "@components/ui/blockui/BlockUi"
import { useFormik } from "formik"
import * as Yup from "yup"
import Axios from "axios"
import { UserContext } from "@context/UserContext"
import { useRouter } from "next/router"
import LayoutAuth from "@components/layout/LayoutAuth"
import Header from "@components/layout/Header"
import { BackLink } from "@components/ui/auth/auth.style"
import axios from "axios"
import InputDashForm from "@components/shared/form/InputDashForm"
import MediaLibraryCover from "@components/shared/media/MediaLibraryCover"
import MediaLibraryAvatar from "@components/shared/media/MediaLibraryAvatar"
import { SignupCreatorText } from "@components/signup/SingUpStyle"
const wcfmApiURl1 = process.env.baseUrl + "/wp-json/portl/v1/"

export default function CreateChanelDetailPage() {
  const router = useRouter()

  const isMounted = useRef(true)

  const { user, updateCookie } = useContext(UserContext)
  const token = user?.token

  const [blocking, setBlocking] = useState(false)
  const [logo, setLogo] = useState("")
  const [banner, setBanner] = useState("")

  const [fail, setFail] = useState({
    status: false,
    message: "",
  })

  const source = Axios.CancelToken.source()

  const updateImages = async (data, token) => {
    try {
      await axios.post(`${wcfmApiURl1}channel/branding/media`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (e) {
      console.log("Error", e)
    }
  }

  const createChannel = async ({
    channel_description,
    social,
    channel_name,
  }) => {
    setBlocking(true)

    try {
      if (isMounted) {
        await axios.post("/api/create-channel", {
          user,
          dataStore: {
            store_name: channel_name,
            shop_description: channel_description,
            social,
          },
          channelID: user.id,
        })

        updateCookie(true)

        if (banner && banner.id) {
          await updateImages(
            {
              user_id: user.id,
              type: "banner",
              image: banner.id,
            },
            token
          )
        }
        if (logo && logo.id) {
          await updateImages(
            {
              user_id: user.id,
              type: "gravatar",
              image: logo.id,
            },
            token
          )
        }

        await router.push("/subscription-settings")

        setBlocking(false)
      }
    } catch (e) {
      if (isMounted) {
        if (Axios.isCancel(e)) {
          setBlocking(false)
        } else {
          if (e.response) {
            const { data } = e.response
            setFail({
              status: true,
              message: data.message,
            })
            setBlocking(false)
          }
          setBlocking(false)
        }
      }
    }
  }

  const channelForm = useFormik({
    initialValues: {
      channel_name: "",
      channel_description: "",
      social: {
        twitter: "",
        fb: "",
        instagram: "",
        youtube: "",
        linkedin: "",
        gplus: "",
        snapchat: "",
        pinterest: "",
      },
    },
    validationSchema: Yup.object({
      channel_name: Yup.string()
        .min(4, "very short name")
        .required("Channel name is required"),
      channel_description: Yup.string().required(
        "Channel description is required"
      ),
    }),
    onSubmit: (values) => createChannel(values),
  })

  useEffect(() => {
    return () => {
      isMounted.current = false
      source.cancel()
    }
  }, [])

  const resetMediaCover = () => {
    setBanner("")
  }

  const resetMediaLogo = () => {
    setLogo("")
  }

  const selectMediaCover = (media) => {
    setBanner({ url: media.source_url, id: media.id })
  }
  const selectMediaLogo = (media) => {
    setLogo({ url: media.source_url, id: media.id })
  }

  return (
    <>
      <Head>
        <title>Add Professional Detail</title>
      </Head>
      <LayoutAuth image={true}>
        <Header actionButton={true} />
        <SignupCreatorText className="line-height-1 mb-0 mt-4">
          Please fill in the details for your Elxr Professional Account.
        </SignupCreatorText>
        <SignupCreatorText className="line-height-1 mb-0 mt-2">
          These images and details will appear on your Professional Page.
        </SignupCreatorText>
        <div className="form-section m-auto mt-4">
          <BackLink>
            <a href="/member-profile" className="back">
              {" "}
              Back{" "}
            </a>
          </BackLink>

          <MediaLibraryCover
            selectMedia={selectMediaCover}
            cover={banner}
            reset={resetMediaCover}
            text="Upload cover image"
            token={token}
            isAvatar={true}
          />
          <MediaLibraryAvatar
            selectMedia={selectMediaLogo}
            logo={logo}
            reset={resetMediaLogo}
            text={"Brand Logo"}
            token={token}
            url={logo?.url}
          />
          <Form css={[containerBlockUi]} onSubmit={channelForm.handleSubmit}>
            {blocking && <BlockUi color="#eb1e79" />}

            <div className="inner-form">
              <div className="mb-4">
                <InputDashForm
                  name={"channel_name"}
                  type={"text"}
                  label={"Name"}
                  value={channelForm.values.channel_name}
                  onChange={channelForm.handleChange}
                  required={true}
                  error={channelForm.errors.channel_name}
                  touched={channelForm.touched.channel_name}
                />
              </div>

              <div className="mb-4">
                <InputDashForm
                  name={"channel_description"}
                  type={"textarea"}
                  label={"Description"}
                  value={channelForm.values.channel_description}
                  onChange={channelForm.handleChange}
                  required={true}
                  error={channelForm.errors.channel_description}
                  touched={channelForm.touched.channel_description}
                />
              </div>

              <div className="mb-4">
                <InputDashForm
                  name={"social.fb"}
                  type={"text"}
                  label={"Facebook Profile URL"}
                  value={channelForm.values.social.fb}
                  onChange={channelForm.handleChange}
                />
              </div>

              <div className="mb-4">
                <InputDashForm
                  name={"social.twitter"}
                  type={"text"}
                  label={"Twitter Profile URL"}
                  value={channelForm.values.social.twitter}
                  onChange={channelForm.handleChange}
                />
              </div>

              <div className="mb-4">
                <InputDashForm
                  name={"social.instagram"}
                  type={"text"}
                  label={"Instagram Profile URL"}
                  value={channelForm.values.social.instagram}
                  onChange={channelForm.handleChange}
                />
              </div>

              <div className="mb-4">
                <InputDashForm
                  name={"social.linkedin"}
                  type={"text"}
                  label={"Twitch Profile URL"}
                  value={channelForm.values.social.linkedin}
                  onChange={channelForm.handleChange}
                />
              </div>

              <div className="mb-4">
                <InputDashForm
                  name={"social.youtube"}
                  type={"text"}
                  label={"Youtube Profile URL"}
                  value={channelForm.values.social.youtube}
                  onChange={channelForm.handleChange}
                />
              </div>
              <FormGroup className="mt-1 mb-5">
                <input
                  className="btn btn-primary submit-button"
                  value="Submit"
                  type="submit"
                />
              </FormGroup>
            </div>
          </Form>
        </div>
      </LayoutAuth>
    </>
  )
}
