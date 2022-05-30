import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import Router from "next/router";
import Head from "next/head";
import { inputLabelStyle, BackLink } from "../components/ui/auth/auth.style";
import Header from "../components/layout/Header";
import { Alert, FormGroup, Input, Label, Button } from "reactstrap";
import LayoutAuth from "../components/layout/LayoutAuth";
import { UserContext } from "../context/UserContext";
import BlockUi from "../components/ui/blockui/BlockUi";
import MyCustomDropzone from "../components/profile-edit/MyCustomDropzone";
export default function MemberDetails() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState();
  const [addAvatar, setAddAvatar] = useState(false);
  const [image, setImage] = useState();
  const [fname, setFname] = useState("");

  const [blocking, setBlocking] = useState(true);
  const [alertInfo, setAlertInfo] = useState(false);
  const [warning, setWarning] = useState(false);
  const [values, setValues] = useState({
    name: { value: "", id: 1 },
    last_name: { value: "", id: 31 },
    about_me: { value: "", id: 25 },
    birth_date: { value: "", id: 26 },
    gender: { value: "", id: 27 },
  });
  const baseApi = process.env.bossApi;
  const profile = process.env.bossApi + "/members/";
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
      setData(res.data);
      setImage(res.data.avatar_urls.thumb);
      setFname(res.data.profile_name);
    });
  }
  useEffect(() => {
    setBlocking(false);
  }, []);
  const change = (e) => {
    handlerChange(e);
    setAlertInfo(false);
    setWarning(false);
  };
  const handlerChange = (e) => {
    setValues((valuedata) => {
      return {
        ...values,
        [e.target.name]: {
          value: e.target.value,
          id: values[e.target.name].id,
        },
      };
    });
  };
  const handlerSubmit = async (e) => {
    e.preventDefault();
    let allRequest = [];
    for (const key in values) {
      const url = `${baseApi}/xprofile/${values[key].id}/data/${user.id}`;
      allRequest.push(
        Axios.patch(
          url,
          {
            value:
              values[key].id !== 26
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
      setAlertInfo(true);
      Router.push("/");
    } catch {
      setBlocking(false);
    }
  };
  function error(e) {
    e.preventDefault();
    setWarning(true);
  }
  function getImage(childData) {
    setImage(childData.thumb);
    setAddAvatar(false);
  }
  return (
    <>
      <LayoutAuth image={true}>
        <Head>
          <title>Member Details - WeShare</title>
        </Head>
        <Header actionButton={true} />
        <div className="form-section">
          <BackLink>
            <a href="/login" className="back">
              {" "}
              Back{" "}
            </a>
          </BackLink>
          <div className="skip-button" onClick={() => Router.push("/")}>
            Skip
          </div>
          {data && (
            <form
              onSubmit={(e) =>
                (values.name.value && values.last_name.value) !== ""
                  ? handlerSubmit(e)
                  : error(e)
              }
            >
              {blocking && <BlockUi color="#eb1e79" />}
              <div className="inner-form">
                <h1>
                  <span>Add</span>Member Details
                </h1>
                <div className="member-image-panel">
                  <div className="image-tag">
                    {image && <img className="avatar" src={image} />}
                  </div>
                  <div
                    className="text-panel"
                    onClick={() => setAddAvatar(true)}
                  >
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

                <FormGroup>
                  <Label for="name" css={inputLabelStyle}>
                    First Name
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    value={values.name.value}
                    onChange={(e) => change(e)}
                    id="name"
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="last_name" css={inputLabelStyle}>
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    name="last_name"
                    value={values.last_name.value}
                    onChange={(e) => change(e)}
                    id="last_name"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="birth_date" css={inputLabelStyle}>
                    Date of Birth (Optional)
                  </Label>
                  <Input
                    id="birth_date"
                    name="birth_date"
                    type="date"
                    onChange={(e) => change(e)}
                    value={values.birth_date.value}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="gender" css={inputLabelStyle}>
                    Gender (Optional)
                  </Label>
                  <Input
                    type="select"
                    name="gender"
                    id="gender"
                    onChange={(e) => change(e)}
                    value={values.gender.value}
                  >
                    <option>-----</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="other">Other</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="about_me" css={inputLabelStyle}>
                    About Me (Optional)
                  </Label>
                  <textarea
                    type="text"
                    className="form-control"
                    name="about_me"
                    value={values.about_me.value}
                    onChange={(e) => change(e)}
                    id="about_me"
                  ></textarea>
                </FormGroup>
                {alertInfo === true ? <Alert>Changes saved.</Alert> : null}
                {warning === true ? (
                  <Alert color="danger">
                    {values.name.value === "" ? "Name" : "Last Name"} cannot be
                    blank
                  </Alert>
                ) : null}
                <input
                  className="btn btn-primary mb-4 submit-button"
                  value="Confirm Details"
                  type="submit"
                />
              </div>
            </form>
          )}
        </div>
      </LayoutAuth>
    </>
  );
}
