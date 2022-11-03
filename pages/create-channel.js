import React, { useRef, useState, useEffect, useContext } from "react";
import Head from "next/head";
import { Form, FormGroup, Input, Label, Alert } from "reactstrap";
import BlockUi, { containerBlockUi } from "@components/ui/blockui/BlockUi";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { UserContext } from "@context/UserContext";
import { useRouter } from "next/router";
import LayoutAuth from "@components/layout/LayoutAuth";
import Header from "@components/layout/Header";
import { inputLabelStyle, BackLink } from "@components/ui/auth/auth.style";
import axios from "axios";
import InputDashForm from "@components/shared/form/InputDashForm";
const url = process.env.baseUrl;

export default function CreateChanelDetailPage() {
  const router = useRouter();

  const isMounted = useRef(true);

  const { user, setUser } = useContext(UserContext);

  const [blocking, setBlocking] = useState(false);

  const [fail, setFail] = useState({
    status: false,
    message: "",
  });

  const source = Axios.CancelToken.source();

  const createChannel = async ({
    channel_description,
    social,
    channel_name,
  }) => {
    setBlocking(true);

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
        });

        user.roles.push("wcfm_vendor");

        setUser({ ...user });

        router.push("/subscription-settings");

        setBlocking(false);
      }
    } catch (e) {
      if (isMounted) {
        if (Axios.isCancel(e)) {
          setBlocking(false);
        } else {
          if (e.response) {
            const { data } = e.response;
            setFail({
              status: true,
              message: data.message,
            });
            setBlocking(false);
          }
          setBlocking(false);
        }
      }
    }
  };

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
      description: Yup.string().required("Channel description is required"),
    }),
    onSubmit: (values) => createChannel(values),
  });

  useEffect(() => {
    return () => {
      isMounted.current = false;
      source.cancel();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Add Creator Detail</title>
      </Head>
      <LayoutAuth image={true}>
        <Header actionButton={true} />
        <div className="form-section m-auto">
          <BackLink>
            <a href="/" className="back">
              {" "}
              Back{" "}
            </a>
          </BackLink>
          <Form css={[containerBlockUi]} onSubmit={channelForm.handleSubmit}>
            {blocking && <BlockUi color="#eb1e79" />}
            <header className="text-center">
              <h3 className="form-sub-title">Add</h3>
              <h1 className="form-title">Creator Details</h1>
            </header>
            <div className="inner-form">
              <div className="mb-4">
                <InputDashForm
                  name={"channel_name"}
                  type={"text"}
                  label={"Creator Name"}
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
                  label={"Creator Description"}
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
  );
}
