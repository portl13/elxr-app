import React, { useState } from "react";
import { useAlert } from "react-alert";
import useIcon from "@hooks/useIcon";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import {
  CloseButton,
  thumb,
  thumbImg,
  thumbInner,
  thumbsContainer,
} from "@components/profile-edit/profile-edit.style";
import axios from "axios";
import { TIMEOUT } from "@utils/constant";
import {
  Button,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import MediaLibrary from "@components/MediaLibrary/MediaLibrary";
import { uploadModal } from "@components/livefeed/photo.style";
import Loader from "@components/profile/loader";

function AddPhotoProfile({ user, mutate }) {
  const alert = useAlert();
  const token = user?.token;
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [upload, setUpload] = useState(false);
  const [file, setFile] = useState(null);
  const [imageData, setImageData] = useState([]);
  const [privacy, setPrivacy] = useState("public");
  const [content, setContent] = useState("");
  const [uploadPhoto, setUploadPhoto] = useState(false);

  const [showMedia, setShowMedia] = useState(false);
  const [previewsUpload, setPreviewsUpload] = useState([]);
  const [errorMedia, setErrorMedia] = useState("");

  const baseApi = process.env.bossApi;
  const { iconElement: close } = useIcon(faWindowClose, false, "sm");

  const sendFiles = () => {
    const arr = [...imageData];
    setUpload(true);

    const formData = {
      upload_ids: arr,
      privacy: privacy,
      content: content,
    };

    axios
      .post(baseApi + "/media", formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(async (res) => {
        await mutate();
        setImageData([]);
        setShowModal(false);
        setFile(null);
      })
      .catch((e) => {
        if (
          e.response &&
          e.response.data &&
          e.response.data.code === "bp_rest_duplicate_media_upload_id"
        ) {
          let idMedia = e.response.data.message.split(" ").pop();
          selectedMediaExits(idMedia);
          setErrorMedia(
            "Media already exists, delete the photo with the red border."
          );
          setTimeout(() => setErrorMedia(""), TIMEOUT.timeout);
        }
      })
      .finally(() => {
        setUpload(false);
        setUploadPhoto(false);
      });
  };

  let styleThumb = thumb;
  const thumbs = previewsUpload.map((file, i) => (
    <div
      className={`bg-cover ${file?.exits ? "border-danger" : ""}`}
      style={{
        ...styleThumb,
        background: `url(${
          file.media_type === "image" ? file.source_url : ""
        })`,
      }}
      key={file.id}
    >
      <Button
        onClick={() => clearMediaData(file)}
        css={CloseButton}
        className="btn-icon btn-2"
        color="primary"
        type="button"
      >
        <span className="btn-inner--icon">
          <i>{close}</i>
        </span>
      </Button>
      <div style={thumbInner}>
        {file.media_type !== "image" && (
          <video style={thumbImg}>
            <source src={file.source_url} />
          </video>
        )}
      </div>
    </div>
  ));

  const selectMediaManager = (media) => {
    setImageData([...imageData, media.id]);
    setPreviewsUpload([...previewsUpload, media]);
    setFile(imageData);
  };

  const clearMediaData = (media) => {
    const imagesId = imageData.filter((img) => img !== media.id);
    const previewsImg = previewsUpload.filter((img) => img.id !== media.id);
    setImageData([...imagesId]);
    setPreviewsUpload([...previewsImg]);
    if (imagesId.length === 0) {
      setFile(null);
    }
  };

  const selectedMediaExits = (id) => {
    const previewsImg = previewsUpload.map((media) => {
      if (String(media.id) === id) {
        media.exits = true;
      }
      return media;
    });
    setPreviewsUpload([...previewsImg]);
  };

  return (
    <>
      <Button onClick={handleShow} className="btn btn-outline-primary">
        Add Photos
      </Button>
      <MediaLibrary
        show={showMedia}
        token={token}
        media_type={"image"}
        selectMedia={selectMediaManager}
        onHide={() => setShowMedia(false)}
      />
      <Modal
        className="modal-dialog-centered"
        css={uploadModal}
        isOpen={showModal}
        onHide={handleClose}
      >
        <ModalHeader closeButton>
          <h5 className="modal-title">
            {!upload ? "Upload" : "Uploading..."}{" "}
          </h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => {
              setImageData([]);
              setPreviewsUpload([]);
              setShowModal(false);
              setFile(null);
              setImageData([]);
              setUpload(false);
              setContent("");
            }}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </ModalHeader>
        <ModalBody>
          <textarea
            className="input-search mb-4 input-text"
            name="content"
            placeholder="Write something about your photos, to be shown on your timeline"
            id="content"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div className="upload-image-conatiner">
            <section className={"d-flex justify-content-end"}>
              <button
                onClick={() => setShowMedia(!showMedia)}
                className="d-flex btn btn-borde-bg-negro post-element-panel post-editor-icon"
              >
                <img
                  style={{ width: 20 }}
                  src="/img/editor/camera.png"
                  alt="camera"
                />
                <span className="d-none d-md-flex post-element-panel-item pl-2 font-weight-normal">
                  Add Photo
                </span>
              </button>
            </section>
            {errorMedia && <p className={"text-danger py-3"}>{errorMedia}</p>}
            <aside style={thumbsContainer}>{thumbs}</aside>
          </div>
        </ModalBody>

        <ModalFooter className="profile-footer-panel">
          <FormGroup>
            <Input
              style={{
                background: "transparent",
                color: "white",
                borderRadius: "25px",
                border: "1px solid #fff",
              }}
              className={
                "d-flex btn btn-borde-bg-negro post-element-panel post-editor-icon"
              }
              type="select"
              onChange={(e) => setPrivacy(e.target.value)}
            >
              <option value="public">Public</option>
              <option value="loggedin">All Members</option>
              <option value="friends">My Connections</option>
              <option value="onlyme">Only Me</option>
            </Input>

            {file ? (
              <>
                <button
                  style={{
                    borderRadius: "25px",
                  }}
                  className="btn btn-outline-primary btn"
                  onClick={() => {
                    setUploadPhoto(true);
                    sendFiles();
                  }}
                >
                  {" "}
                  {uploadPhoto && <Loader />}Upload
                </button>
              </>
            ) : null}
          </FormGroup>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default AddPhotoProfile;
