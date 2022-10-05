import Axios from "axios";
import moment from "moment";
import { UserContext } from "../../context/UserContext";
import React, { useEffect, useState, useContext } from "react";
import BlockUi from "../ui/blockui/BlockUi";
import {
  BiographyFormHeading,
  inputLabelStyle,
  inputWithLabelStyle,
  biographyForm,
  ChangeContainer,
} from "../profile-edit/biography.style";
import { FormGroup, Input, Label, Row, Col, Alert } from "reactstrap";
import MasterData from "../../components/masterdata/MasterData.json";
import { updateAccountSetting } from "../../pages/api/account.api";
import {useFormik} from "formik";
const BiographyTab = ({ userDetail, tabData, loadData }) => {
  const { user } = useContext(UserContext);
  const pub = "Public";
  const member = "All Members";
  const connection = "My Connections";
  const only = "Only Me";
  const {
    xprofile: { groups },
  } = userDetail;
  const { fields = null } = groups[1];

  let firstName = "";
  let lastName = "";
  let username = "";
  let gender = "";
  let birthDate = "";
  let aboutMe = "";
  if (fields) {
    firstName = 1 in fields ? fields[1]?.value?.raw || "" : "";
    lastName = 31 in fields ? fields[31]?.value?.raw || "" : "";
    username = 32 in fields ? fields[32]?.value?.raw || "" : "";
    gender = 27 in fields ? fields[27]?.value?.raw || "" : "";
    aboutMe = 25 in fields ? fields[25]?.value?.raw || "" : "";
    birthDate = 26 in fields ? fields[26]?.value?.raw || "" : "";
  }
  // const formik = useFormik({
  //   initialValues:{
  //     name: { value: '', id: 1 },
  //     last_name: { value: '', id: 31 },
  //     user_name: { value: '', id: 32 },
  //     about_me: { value: '', id: 25 },
  //     birth_date: { value: '', id: 26 },
  //     gender: { value: '', id: 27 },
  //   }
  // })


  const fname = tabData.map((d) => d.value)[1];
  const uname = tabData.map((d) => d.value)[3];
  const [birthDay, setBirthDay] = useState(0);
  const [birthMonth, setBirthMonth] = useState(0);
  const [birthYear, setBirthYear] = useState(0);
  const [blocking, setBlocking] = useState(true);
  const [status, setStatus] = useState(tabData.map((d) => d.value)[2]);
  const [statusAbout, setStatusAbout] = useState(
    tabData.map((d) => d.value)[4]
  );
  const [statusDob, setStatusDob] = useState(tabData.map((d) => d.value)[5]);
  const [statusGender, setStatusGender] = useState(
    tabData.map((d) => d.value)[7]
  );
  const [view, setView] = useState(false);
  const [viewAbout, setViewAbout] = useState(false);
  const [viewDob, setViewDob] = useState(false);
  const [viewGender, setViewGender] = useState(false);
  const [alertInfo, setAlertInfo] = useState(false);
  const [warning, setWarning] = useState(false);
  const [dateStatus, setDateStatus] = useState(false);
  const Dob = "DD MM YYYY";
  const newBirthDate = `${
    birthYear === 0 ? moment(birthDate).format(Dob).split(" ")[2] : birthYear
  }-${
    birthMonth === 0
      ? moment(birthDate).format(Dob).split(" ")[1]
      : parseInt(birthMonth)
  }-${
    birthDay === 0 ? moment(birthDate).format(Dob).split(" ")[0] : birthDay
  } 00:00:00`;

  const [values, setValues] = useState({
    name: { value: `${firstName}`, id: 1 },
    last_name: { value: `${lastName}`, id: 31 },
    user_name: { value: `${username}`, id: 32 },
    about_me: { value: `${aboutMe}`, id: 25 },
    birth_date: { value: `${birthDate}`, id: 26 },
    gender: { value: `${gender}`, id: 27 },
  });
  const baseApi = process.env.bossApi;
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
  useEffect(() => {
    if (dateStatus === true) {
      setValues((valuedata) => {
        return {
          ...values,
          birth_date: {
            value: newBirthDate,
            id: 26,
          },
        };
      });
    }
  }, [birthDay, birthMonth, birthYear]);
  const handlerSubmit = async (e) => {
    e.preventDefault();
    let allRequest = [];
    for (const key in values) {
      const url = `${baseApi}/xprofile/${values[key].id}/data/${userDetail.id}`;
      allRequest.push(
        Axios.patch(
          url,
          { value: values[key].value },
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        )
      );
    }
    setBlocking(true);
    setDateStatus(false);
    try {
      await Axios.all(allRequest);
      const data = `
                    fields[${tabData.map((d) => d.name)[1]}]=${fname}&
                    fields[${tabData.map((d) => d.name)[2]}]=${status}&
                    fields[${tabData.map((d) => d.name)[3]}]=${uname}&
                    fields[${tabData.map((d) => d.name)[4]}]=${statusAbout}&
                    fields[${tabData.map((d) => d.name)[5]}]=${statusDob}&
                    fields[${
                      tabData.map((d) => d.name)[7]
                    }]=${statusGender}                  
                  `;
      updateAccountSetting(user, "profile", data)
        .then((res) => {
          setBlocking(false);
          setAlertInfo(true);
          setTimeout(() => setAlertInfo(false), [2000]);
        })
        .catch(() => {
          setBlocking(false);
        });
    } catch {
      setBlocking(false);
    }
  };
  function error(e) {
    e.preventDefault();
    setWarning(true);
  }
  return (
    <form
      css={biographyForm}
      onSubmit={(e) =>
        (values.name.value &&
          values.last_name.value &&
          values.user_name.value) !== ""
          ? handlerSubmit(e)
          : error(e)
      }
    >
      {blocking && <BlockUi color="#eb1e79" />}
      {loadData && (
        <>
          <BiographyFormHeading>Biography</BiographyFormHeading>
          <div className="form-group">
            <label htmlFor="name">Name (required)</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={values.name.value}
              onChange={(e) => change(e)}
              id="name"
            />
            <p className="help-text-container">
              <span className="help-text">
                {fname === "public"
                  ? pub
                  : fname === "loggedin"
                  ? member
                  : fname === "friends"
                  ? connection
                  : only}
              </span>
            </p>
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name (required)</label>
            <input
              type="text"
              className="form-control"
              name="last_name"
              value={values.last_name.value}
              onChange={(e) => change(e)}
              id="last_name"
            />
            <p className="help-text-container">
              <span className="help-text">
                {status === "public"
                  ? pub
                  : status === "loggedin"
                  ? member
                  : status === "friends"
                  ? connection
                  : only}
              </span>
              <button
                className="btn btn-link"
                type="button"
                aria-expanded="false"
                onClick={() => setView(true)}
              >
                Change
              </button>
            </p>
            <ChangeContainer className={view === true ? "" : "d-none"}>
              <h4>Select who is allowed to see this field?</h4>
              <div className="custom-control custom-radio">
                <input
                  name="public"
                  className="custom-control-input"
                  id="public"
                  type="radio"
                  value="public"
                  onChange={(e) => {
                    setStatus(e.target.value);
                    console.log(e.target.value);
                  }}
                  checked={status === "public"}
                />
                <label className="custom-control-label" for="public">
                  {pub}
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  name="loggedin"
                  className="custom-control-input"
                  id="loggedin"
                  type="radio"
                  value="loggedin"
                  onChange={(e) => setStatus(e.target.value)}
                  checked={status === "loggedin"}
                />
                <label className="custom-control-label" for="loggedin">
                  {member}
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  name="friends"
                  className="custom-control-input"
                  id="friends"
                  type="radio"
                  value="friends"
                  onChange={(e) => setStatus(e.target.value)}
                  checked={status === "friends"}
                />
                <label className="custom-control-label" for="friends">
                  {connection}
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  name="adminsonly"
                  className="custom-control-input"
                  id="adminsonly"
                  type="radio"
                  value="adminsonly"
                  onChange={(e) => setStatus(e.target.value)}
                  checked={status === "adminsonly"}
                />
                <label className="custom-control-label" for="adminsonly">
                  {only}
                </label>
              </div>
              <button
                className="btn btn-link btn-close"
                type="button"
                aria-expanded="false"
                onClick={() => setView(false)}
              >
                Close
              </button>
            </ChangeContainer>
          </div>
          <div className="form-group">
            <label htmlFor="user_name">Username (required)</label>
            <input
              type="text"
              className="form-control"
              name="user_name"
              value={values.user_name.value}
              onChange={(e) => change(e)}
              id="user_name"
            />
            <p className="help-text-container">
              <span className="help-text">
                {uname === "public"
                  ? pub
                  : uname === "loggedin"
                  ? member
                  : uname === "friends"
                  ? connection
                  : only}
              </span>
            </p>
          </div>
          <div className="form-group">
            <label htmlFor="about_me">About me</label>
            <input
              type="text"
              className="form-control"
              name="about_me"
              value={values.about_me.value}
              onChange={(e) => change(e)}
              id="about_me"
            />
            <p className="help-text-container">
              <span className="help-text">
                {statusAbout === "public"
                  ? pub
                  : statusAbout === "loggedin"
                  ? member
                  : statusAbout === "friends"
                  ? connection
                  : only}
              </span>
              <button
                className="btn btn-link"
                type="button"
                aria-expanded="false"
                onClick={() => setViewAbout(true)}
              >
                Change
              </button>
            </p>
            <ChangeContainer className={viewAbout === true ? "" : "d-none"}>
              <h4>Select who is allowed to see this field?</h4>
              <div className="custom-control custom-radio">
                <input
                  name="publicAbout"
                  className="custom-control-input"
                  id="publicAbout"
                  type="radio"
                  value="public"
                  onChange={(e) => setStatusAbout(e.target.value)}
                  checked={statusAbout === "public"}
                />
                <label className="custom-control-label" for="publicAbout">
                  {pub}
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  name="loggedinAbout"
                  className="custom-control-input"
                  id="loggedinAbout"
                  type="radio"
                  value="loggedin"
                  onChange={(e) => setStatusAbout(e.target.value)}
                  checked={statusAbout === "loggedin"}
                />
                <label className="custom-control-label" for="loggedinAbout">
                  {member}
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  name="friendsAbout"
                  className="custom-control-input"
                  id="friendsAbout"
                  type="radio"
                  value="friends"
                  onChange={(e) => setStatusAbout(e.target.value)}
                  checked={statusAbout === "friends"}
                />
                <label className="custom-control-label" for="friendsAbout">
                  {connection}
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  name="onlymeAbout"
                  className="custom-control-input"
                  id="onlymeAbout"
                  type="radio"
                  value="adminsonly"
                  onChange={(e) => setStatusAbout(e.target.value)}
                  checked={statusAbout === "adminsonly"}
                />
                <label className="custom-control-label" for="onlymeAbout">
                  {only}
                </label>
              </div>
              <button
                className="btn btn-link btn-close"
                type="button"
                aria-expanded="false"
                onClick={() => setViewAbout(false)}
              >
                Close
              </button>
            </ChangeContainer>
          </div>
          <Row form>
            <Col md={12}>
              <Label css={inputLabelStyle}>Birthdate</Label>
            </Col>
            <Col md={3}>
              <FormGroup css={inputWithLabelStyle}>
                <Label for="day">Day</Label>
                <Input
                  type="select"
                  name="selectDay"
                  id="selectDay"
                  onChange={(e) => {
                    setBirthDay(e.target.value);
                    setDateStatus(true);
                  }}
                  value={
                    birthDay === 0
                      ? moment(birthDate).format(Dob).split(" ")[0]
                      : birthDay
                  }
                >
                  <option>-----</option>
                  {MasterData.Date.map((e, key) => (
                    <option value={e.date}>{e.date}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup css={inputWithLabelStyle}>
                <Label for="month">Month</Label>
                <Input
                  type="select"
                  name="selectMonth"
                  id="selectMonth"
                  onChange={(e) => {
                    setBirthMonth(e.target.value);
                    setDateStatus(true);
                  }}
                  value={
                    birthMonth === 0
                      ? moment(birthDate).format(Dob).split(" ")[1]
                      : birthMonth
                  }
                >
                  <option>-----</option>
                  {MasterData.Month.map((e, key) => (
                    <option value={e.id}>{e.month}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup css={inputWithLabelStyle}>
                <Label for="year">Year</Label>
                <Input
                  type="select"
                  name="selectYear"
                  id="selectYear"
                  onChange={(e) => {
                    setBirthYear(e.target.value);
                    setDateStatus(true);
                  }}
                  value={
                    birthYear === 0
                      ? moment(birthDate).format(Dob).split(" ")[2]
                      : birthYear
                  }
                >
                  <option>-----</option>
                  {MasterData.Year.map((e, key) => (
                    <option value={e.year}>{e.year}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={12}>
              <p className="help-text-container">
                <span className="help-text">
                  {statusDob === "public"
                    ? pub
                    : statusDob === "loggedin"
                    ? member
                    : statusDob === "friends"
                    ? connection
                    : only}
                </span>
                <button
                  className="btn btn-link"
                  type="button"
                  aria-expanded="false"
                  onClick={() => setViewDob(true)}
                >
                  Change
                </button>
              </p>
              <ChangeContainer className={viewDob === true ? "" : "d-none"}>
                <h4>Select who is allowed to see this field?</h4>
                <div className="custom-control custom-radio">
                  <input
                    name="publicDob"
                    className="custom-control-input"
                    id="publicDob"
                    type="radio"
                    value="public"
                    onChange={(e) => setStatusDob(e.target.value)}
                    checked={statusDob === "public"}
                  />
                  <label className="custom-control-label" for="publicDob">
                    {pub}
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    name="loggedinDob"
                    className="custom-control-input"
                    id="loggedinDob"
                    type="radio"
                    value="loggedin"
                    onChange={(e) => setStatusDob(e.target.value)}
                    checked={statusDob === "loggedin"}
                  />
                  <label className="custom-control-label" for="loggedinDob">
                    {member}
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    name="friendsDob"
                    className="custom-control-input"
                    id="friendsDob"
                    type="radio"
                    value="friends"
                    onChange={(e) => setStatusDob(e.target.value)}
                    checked={statusDob === "friends"}
                  />
                  <label className="custom-control-label" for="friendsDob">
                    {connection}
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    name="onlymeDob"
                    className="custom-control-input"
                    id="onlymeDob"
                    type="radio"
                    value="adminsonly"
                    onChange={(e) => setStatusDob(e.target.value)}
                    checked={statusDob === "adminsonly"}
                  />
                  <label className="custom-control-label" for="onlymeDob">
                    {only}
                  </label>
                </div>
                <button
                  className="btn btn-link btn-close"
                  type="button"
                  aria-expanded="false"
                  onClick={() => setViewDob(false)}
                >
                  Close
                </button>
              </ChangeContainer>
            </Col>
          </Row>
          <FormGroup>
            <Label for="gender" css={inputLabelStyle}>
              Gender
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
              <option value="Other">Other</option>
            </Input>
            <p className="help-text-container">
              <span className="help-text">
                {statusGender === "public"
                  ? pub
                  : statusGender === "loggedin"
                  ? member
                  : statusGender === "friends"
                  ? connection
                  : only}
              </span>
              <button
                className="btn btn-link"
                type="button"
                aria-expanded="false"
                onClick={() => setViewGender(true)}
              >
                Change
              </button>
            </p>
            <ChangeContainer className={viewGender === true ? "" : "d-none"}>
              <h4>Select who is allowed to see this field?</h4>
              <div className="custom-control custom-radio">
                <input
                  name="publicGender"
                  className="custom-control-input"
                  id="publicGender"
                  type="radio"
                  value="public"
                  onChange={(e) => setStatusGender(e.target.value)}
                  checked={statusGender === "public"}
                />
                <label className="custom-control-label" for="publicGender">
                  Public
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  name="loggedinGender"
                  className="custom-control-input"
                  id="loggedinGender"
                  type="radio"
                  value="loggedin"
                  onChange={(e) => setStatusGender(e.target.value)}
                  checked={statusGender === "loggedin"}
                />
                <label className="custom-control-label" for="loggedinGender">
                  {member}
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  name="friendsGender"
                  className="custom-control-input"
                  id="friendsGender"
                  type="radio"
                  value="friends"
                  onChange={(e) => setStatusGender(e.target.value)}
                  checked={statusGender === "friends"}
                />
                <label className="custom-control-label" for="friendsGender">
                  {connection}
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  name="onlymeGender"
                  className="custom-control-input"
                  id="onlymeGender"
                  type="radio"
                  value="adminsonly"
                  onChange={(e) => setStatusGender(e.target.value)}
                  checked={statusGender === "adminsonly"}
                />
                <label className="custom-control-label" for="onlymeGender">
                  Only Me
                </label>
              </div>
              <button
                className="btn btn-link btn-close"
                type="button"
                aria-expanded="false"
                onClick={() => setViewGender(false)}
              >
                Close
              </button>
            </ChangeContainer>
          </FormGroup>
          <div className="form-group mt-4 text-center">
            <input
              className="btn btn-primary"
              type="submit"
              value="Save Changes"
            />
          </div>
          {alertInfo === true ? <Alert>Changes saved.</Alert> : null}
          {warning === true ? (
            <Alert color="danger">
              {values.name.value === ""
                ? "Name"
                : values.last_name.value === ""
                ? "Last Name"
                : "User Name"}{" "}
              cannot be blank
            </Alert>
          ) : null}
        </>
      )}
    </form>
  );
};
export default BiographyTab;
