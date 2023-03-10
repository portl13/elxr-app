import React, { useEffect, useState, useContext, useCallback, useMemo } from "react";
import { ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { faInfoCircle,faTimes } from "@fortawesome/free-solid-svg-icons";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import axios from "axios";
import { Button, Progress, Alert } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "@context/UserContext";
import Webcam from "react-webcam";
import { setResolution, dataURLtoFile } from "@utils/setResolution";
import { 
    DropZoneStyle, 
    thumbsContainer,
    activeStyle,
    acceptStyle,
    rejectStyle,
} from "@components/profile-edit/profile-edit.style";
import Loader from "@components/loader";
import { 
    Image,
    ModalTitle,
    ModalText,
    ButtonSignupCreator,
    UseCameraButton,
    SelectFileButton,
    DropzoneContainer,
    AgreeText,
    CropperContainer,
    ModalStyle
} from "@components/signup/SingUpStyle";
import { useDropzone } from "react-dropzone";

const baseApi = process.env.bossApi;
const profile = process.env.bossApi + "/members/";

const ProfilePictureModal = ({
  userDetail,
  type = 'avatar',
  action,
  delAction,
  parentCallback,
  showModal,
  handleClose,
  setImage
}) => {
  const { user, setUser } = useContext(UserContext);
  const [userData, setUserData] = useState();
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [cropper, setCropper] = useState();
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);
  const [status, setStatus] = useState("");
  const [result, setResult] = useState(false);
  const [delMsg, setDelMsg] = useState(false);
  const [data, setData] = useState();
  const [upload, setUpload] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [captureImage, setCaptureImage] = useState(false);
  const [cropLoad, setCropLoad] = useState(false);

  function getUser(state = false) {
    axios.get(profile + user.id, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then(({ data }) => {
      setUserData(data);
      if (state) {
        let memberData = {
          ...user,
          avatar_urls: data.avatar_urls,
        };
        setUser(memberData);
      }
    });
  }

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const cropAndUpload = async (blob) => {
    const newFile = dataURLtoFile(blob.url, "capture.jpeg");
    const image = await setResolution(newFile);
    const body = new FormData();
    body.append("file", image);
    body.append("action", action);
    const url = `${baseApi}/members/${userDetail.id}/${type}`;
    const { data } = axios.post(url, body, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((res) => {
        setResult(true);
        getUser(true);
        setCropLoad(false);
        setStatus("");
        delAction && parentCallback(res.data);
      })
      .catch((err) => {
        setCropLoad(false);
        setVisible(true);
      });
  };

  const sendFiles = () => {
    setCropLoad(true);
    const cropUrl =
      status === "upload"
        ? `${cropper.getCroppedCanvas().toDataURL()}`
        : `${imgSrc}`;
    fetch(cropUrl)
      .then((res) => res)
      .then(cropAndUpload);
    closeModal()
  };

  const thumbs = (
    <div className="progress-bar-div">
      {file?.name}
      <Progress value="100" color="success" />
    </div>
  );

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  function deleteAvatar() {
    axios.delete(`${baseApi}/members/${userDetail?.id}/${type}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      setData(res.data);
      getUser();
      setStatus("");
      setDelMsg(true);
    });
  }

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const image = await setResolution(acceptedFiles[0]);
      let dataUrl = [...files];
      for (let i = 0; i < acceptedFiles.length; i++) {
        let val = await setResolution(acceptedFiles[i]);
        dataUrl = [
          ...dataUrl,
          {
            preview: URL.createObjectURL(val),
          },
        ];
      }
      image["path"] = image.name;
      image["preview"] = URL.createObjectURL(image);
      setFile(image);
      setFiles(dataUrl);
      setShowUpload(true);
      setTimeout(() => showProgress(), 1000);
    },
  });

  const style = useMemo(
    () => ({
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  function showProgress() {
    setUpload(true);
  }

  const closeModal = () => {
    handleClose()
    setStatus("");
    setFile(null);
    setFiles([]);
    setResult(false);
    setDelMsg(false);
    setUpload(false);
    setShowUpload(false);
    setImgSrc(null);
    setCaptureImage(false);
    setVisible(false);
    setCropLoad(false)
  }

  return (
    <>
      <Alert color="warning" isOpen={visible} toggle={onDismiss}>
        An error occured while uploading the image.
      </Alert>

      <ModalStyle isOpen={showModal} toggle={closeModal}>
        <ModalHeader
          toggle={closeModal}
          close={
            <FontAwesomeIcon
              icon={faTimes}
              style={{ width: "20px", height: "20px" }}
              onClick={closeModal}
            />
          }
        >
          {upload === false && status === "upload" && "Select photo"}
          {upload && file && status === "upload" && "Edit photo"}
          {status === "takephoto" && "Take photo"}
        </ModalHeader>
        <ModalBody>
          {!upload && !file && !status && (
            <>
              <ModalTitle>Add profile picture</ModalTitle>

              <div className="d-flex justify-content-center">
                <Image
                  src="/img/sign-up/profile-picture.png"
                  width={390}
                  height={100}
                  marginBottom={20}
                />
              </div>

              <ModalText>
                On Elxr we like to keep things real and build real communities.
                <br />
                To make that happen, could you please take or upload a photo of
                yourself?
                <br />
                You can even crop and adjust it to your liking so it looks just
                perfect.
              </ModalText>

              <div className="d-flex align-items-center justify-content-end">
                <UseCameraButton
                  onClick={() => {
                    setStatus("takephoto");
                    setResult(false);
                    setDelMsg(false);
                    setImgSrc(null);
                    setCaptureImage(false);
                    setVisible(false);
                  }}
                >
                  Use camera
                </UseCameraButton>

                <ButtonSignupCreator
                  padding="8px 26px"
                  marginTop="0px"
                  onClick={() => {
                    setStatus("upload");
                    setResult(false);
                    setDelMsg(false);
                    setUpload(false);
                    setShowUpload(false);
                    setImgSrc(null);
                    setCaptureImage(false);
                    setVisible(false);
                  }}
                >
                  Upload photo
                </ButtonSignupCreator>
              </div>
            </>
          )}

          <section css={DropZoneStyle} className="container p-0">
            {delAction !== true && type === "avatar" && (
              <div className="file-info">
                <FontAwesomeIcon icon={faInfoCircle} />
                Your profile photo will be used on your profile and throughout
                the site.
              </div>
            )}
            {type === "avatar" ? (
              <>
                {delAction === true ? null : userData?.avatar_urls?.thumb ===
                  `${process.env.baseUrl}/wp-content/plugins/buddyboss-platform/bp-core/images/mystery-man.jpg` ? null : (
                  <Button
                    type="button"
                    onClick={() => {
                      setStatus("delete");
                      setResult(false);
                      setImgSrc(null);
                      setCaptureImage(false);
                      setVisible(false);
                    }}
                  >
                    Delete
                  </Button>
                )}
              </>
            ) : null}
            {status === "takephoto" ? (
              <div className="take-photo-panel">
                <div className="upper-section">
                  <div className="photo-panel">
                    <Webcam
                      audio={false}
                      height={300}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      width={300}
                    />
                  </div>
                  <div className="capture-panel">
                    <div className="capture-section">
                      {imgSrc && <img src={imgSrc} alt={"avatar"} />}
                    </div>
                  </div>
                </div>
                <AgreeText className="text-center">
                  {captureImage === false
                    ? "Camera loaded. Click Take photo to take a photo."
                    : "Your profile photo is ready. Click Save to use this photo."}
                </AgreeText>
              </div>
            ) : null}
            {status === "upload" && upload === false ? (
              <>
                <DropzoneContainer {...getRootProps({ style })}>
                  <input {...getInputProps()} />
                  <p>Drop your image here</p>
                  <SelectFileButton
                    id="browse-button"
                    type="button"
                    value="Select your file"
                  ></SelectFileButton>
                </DropzoneContainer>
                {delAction === true ? null : (
                  <div className="alert alert-warning">
                    {type === "avatar"
                      ? "If you'd like to delete the existing profile photo but not upload a new one, please use the delete tab."
                      : "For best results, upload an image that is 1950px by 450px or larger."}
                  </div>
                )}
                {showUpload && <aside style={thumbsContainer}>{thumbs}</aside>}
              </>
            ) : null}
            {upload && file && status === "upload" && (
              <CropperContainer>
                <div className="profile-image-cropper m-0">
                  <Cropper
                    className="cropper-panel"
                    zoomTo={0.5}
                    initialAspectRatio={1}
                    preview=".img-preview"
                    src={file.preview}
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false}
                    onInitialized={(instance) => {
                      setCropper(instance);
                    }}
                    guides={true}
                  />
                </div>
                <AgreeText>Drag to reposition.</AgreeText>
              </CropperContainer>
            )}
            {result === true ? (
              <div className="cover-image-status">
                <div className="uploader-progress mb-4">
                  <p id="cover-image-feedback" className="alert alert-success">
                    Your new {type === "avatar" ? "profile" : "cover"} photo was
                    uploaded successfully.
                  </p>
                </div>
              </div>
            ) : null}
            {delMsg === true ? (
              <div className="cover-image-status">
                <div className="uploader-progress mb-4">
                  <p id="cover-image-feedback" className="alert alert-success">
                    Your {type === "avatar" ? "profile" : "cover"} photo was
                    deleted successfully!
                  </p>
                </div>
              </div>
            ) : null}
            {status === "delete" ? (
              <div id="delete-image-container">
                <p>
                  If you'd like to delete your current{" "}
                  {type === "avatar" ? "profile" : "cover"} photo, use the
                  delete {type === "avatar" ? "profile" : "cover"} Photo button.
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  id="delete-cover-image"
                  onClick={() => deleteAvatar()}
                >
                  Delete My {type === "avatar" ? "profile" : "cover"} Photo
                </button>
              </div>
            ) : null}
          </section>
        </ModalBody>
        <ModalFooter>
          {upload && file && status === "upload" && (
            <div className="d-flex align-items-center justify-content-end">
              <UseCameraButton
                onClick={() => {
                  setUpload(false);
                  setFile(null);
                  setFiles([]);
                  setShowUpload(false);
                  setVisible(false);
                  setStatus("");
                }}
              >
                Change photo
              </UseCameraButton>

              <ButtonSignupCreator
                padding="8px 26px"
                marginTop="0px"
                onClick={() => sendFiles()}
                //onClick={() => closeModal()}
              >
                Save photo {cropLoad ? <Loader /> : ""}
              </ButtonSignupCreator>
            </div>
          )}

          {status === "takephoto" && (
            <div className="d-flex w-100 align-items-center justify-content-between">
              <UseCameraButton
                onClick={() => {
                  setUpload(false);
                  setFile(null);
                  setFiles([]);
                  setShowUpload(false);
                  setVisible(false);
                  setStatus("");
                }}
              >
                Cancel
              </UseCameraButton>

              <div>
                <ButtonSignupCreator
                  padding="8px 26px"
                  marginTop="0px"
                  className="mr-3"
                  onClick={() => {
                    capture();
                    setCaptureImage(true);
                  }}
                >
                  Take photo
                </ButtonSignupCreator>

                <ButtonSignupCreator
                  padding="8px 26px"
                  marginTop="0px"
                  onClick={() => sendFiles()}
                >
                  Save
                </ButtonSignupCreator>
              </div>
            </div>
          )}
        </ModalFooter>
      </ModalStyle>
    </>
  );
};

export default ProfilePictureModal;
