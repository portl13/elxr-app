import React, { useEffect, useState } from "react";
import { Input, Label, Button, Spinner } from "reactstrap";
import { useAlert } from "react-alert";
import { TIMEOUT } from "../../../utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UploadImage from "../UploadImage";
import { faEdit, faUpload } from "@fortawesome/free-solid-svg-icons";
import {
  getProfileDetails,
  updateProfileSetting,
} from "../../../pages/api/channel-social.api";
import Loader from "../../loader";
import { EditorState } from "draft-js";
import TextEditor from "../TextEditor";

function Personal({ user, getProfile}) {
  const alert = useAlert();
  const [loader, setLoader] = useState(true);
  const [result, setResult] = useState();
  const [avtar, setAvtar] = useState();
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState();
  const [uploadImage, setUploadImage] = useState(false);
  const [imageSpinner, setImageSpinner] = useState(false);
  const [editorShort, setEditorShort] = useState(() =>
    EditorState.createEmpty()
  );
  const updateState = (data) => {
    setAvtar(data.user_avatar);
    setFName(data.first_name);
    setLName(data.last_name);
    setPhone(data.phone);
    setAbout(data.description);
  };
  useEffect(() => {
    getProfileDetails(user)
      .then((res) => {
        setResult(res.data);
        updateState(res.data.data);
        setLoader(false);
      })
      .catch(() => setLoader(false));
  }, [user]);
  useEffect(() => setTimeout(() => setImageSpinner(false), [2500]), [avtar]);
  const updateProfile = () => {
    var check = avtar?.includes("-150x150");
    var newUrl = avtar?.replace("-150x150", "");
    const formData = {
      user_avatar: check !== undefined ? (!check ? avtar : newUrl) : avtar,
      first_name: fName,
      last_name: lName,
      phone,
      about,
    };
    updateProfileSetting(user, formData)
      .then(() => {
        alert.success("Profile Settings updated successfully.", TIMEOUT);
        getProfile()
      })
      .catch(() => {
        alert.error("Please update any value.", TIMEOUT);
      });
  };
  function errorMsg() {
    if (fName === "") {
      alert.error("First Name cannot be blank.", TIMEOUT);
    } else if (lName === "") {
      alert.error("Last Name cannot be blank.", TIMEOUT);
    } else alert.error("Phone Number cannot be blank.", TIMEOUT);
  }
  function phoneNumber(e) {
    const exp = /^[0-9]*$/;
    if (e.target.value === "" || exp.test(e.target.value)) {
      setPhone(e.target.value);
    }
  }
  // function firstName(e) {
  //   const exp = /^[a-zA-Z]*$/;
  //   if (e.target.value === "" || exp.test(e.target.value)) {
  //     setFName(e.target.value);
  //   }
  // }
  // function lastName(e) {
  //   const exp = /^[a-zA-Z]*$/;
  //   if (e.target.value === "" || exp.test(e.target.value)) {
  //     setLName(e.target.value);
  //   }
  // }
  if (loader) {
    return (
      <div style={{ textAlign: "center" }}>
        <Loader color="primary" />
      </div>
    );
  }
  return (
    <>
      {result && (
        <>
          <div className="store-panel">
            <Label>Avatar</Label>
            <div className="logo-tag">
              <img
                src={
                  avtar !== ""
                    ? avtar
                    : "https://data.portl.live/wp-content/plugins/wc-frontend-manager/includes/libs/upload/images/Placeholder.png"
                }
                alt="image"
              />
              {avtar === "" ? (
                <div
                  className="upload-photo-icon"
                  onClick={() => setUploadImage(true)}
                >
                  <FontAwesomeIcon icon={faUpload} />
                  <div className="tooltip-panel">
                    Upload Profile Photo<em></em>
                  </div>
                </div>
              ) : (
                <div
                  className="edit-avatar-icon"
                  onClick={() => setUploadImage(true)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                  <div className="tooltip-panel">
                    Change Profile Photo<em></em>
                  </div>
                </div>
              )}
              {imageSpinner && (
                <Spinner
                  className="spinner"
                  style={{ width: "1.2rem", height: "1.2rem" }}
                  color="primary"
                />
              )}
              {avtar !== "" && (
                <span className="cross-icon" onClick={() => setAvtar("")}>
                  <em>+</em>
                </span>
              )}
            </div>
          </div>
          <div className="store-panel">
            <Label>First Name *</Label>
            <Input
              type="text"
              value={fName}
              onChange={(e) => 
              //firstName(e)
              setFName(e.target.value)
              }
              maxLength="50"
            />
          </div>
          <div className="store-panel">
            <Label>Last Name *</Label>
            <Input
              type="text"
              value={lName}
              onChange={(e) => 
              //lastName(e)
              setLName(e.target.value)
              }
              maxLength="50"
            />
          </div>
          <div className="store-panel">
            <Label>Phone *</Label>
            <Input
              type="text"
              value={phone}
              onChange={(e) => phoneNumber(e)}
              maxLength="15"
            />
          </div>
          <div className="wcfm-descp-panel">
            <Label>About</Label>
            <div className="content-panel">
              <TextEditor
                editorState={editorShort}
                setEditorState={setEditorShort}
                setContentHtml={setAbout}
                editorVal={about}
                
              />
            </div>
          </div>
          <div className="button-tab">
            <Button
              onClick={() => {
                fName !== "" && lName !== "" && phone !== ""
                  ? updateProfile()
                  : errorMsg();
              }}
            >
              SAVE
            </Button>
          </div>
          {uploadImage && (
            <UploadImage
              show={uploadImage}
              setUploadImage={setUploadImage}
              user={user}
              setPicture={setAvtar}
              setImageSpinner={setImageSpinner}
              value="Profile"
            />
          )}
        </>
      )}
    </>
  );
}
export default Personal;
