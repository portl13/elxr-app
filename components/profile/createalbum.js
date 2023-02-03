import React, { useState, useMemo } from "react";
import { uploadModal } from "../../components/livefeed/photo.style";
import {
  Button,
  Input,
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
  Progress,
  ModalFooter,
  Label,
  Alert,
} from "reactstrap";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import {
  CloseButton,
  DropZoneStyle,
  thumbsContainer,
  thumb,
  thumbInner,
  thumbImg,
  activeStyle,
  acceptStyle,
  rejectStyle,
} from "../../components/profile-edit/profile-edit.style";
import useIcon from "../../hooks/useIcon";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import Loader from "./loader";
import MediaLibrary from "@components/MediaLibrary/MediaLibrary";
import { TIMEOUT } from "@utils/constant";
function CreateAlbum({ user, parentCallback, isGroup, groupId, getAlbums }) {
  const token = user?.token;
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [files, setFiles] = useState([]);
  const [addAlbum, setAddAlbum] = useState(false);
  const [selectFile, setSelectFile] = useState([]);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageData, setImageData] = useState([]);
  const [privacy, setPrivacy] = useState("public");
  const [count, setCount] = useState(0);
  const [finalUrl, setFinalUrl] = useState([]);
  const [content, setContent] = useState("");
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  const [showMedia, setShowMedia] = useState(false);
  const [previewsUpload, setPreviewsUpload] = useState([]);
  const [errorMedia, setErrorMedia] = useState("");

  const baseApi = process.env.bossApi;
  const { iconElement: close } = useIcon(faWindowClose, false, "sm");
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    maxFiles: 0,
    multiple: true,
    onDrop: (acceptedFiles) => {
      setSelectFile([...selectFile, ...acceptedFiles]);
      const totalImage = [...selectFile, ...acceptedFiles];
      setFile(totalImage);
      const imageUrl = acceptedFiles.map((fileData) =>
        Object.assign(fileData, { preview: URL.createObjectURL(fileData) })
      );
      setFinalUrl([...finalUrl, ...imageUrl]);
      const imageUrls = [...finalUrl, ...imageUrl];
      setFiles(imageUrls);
      setProgress(0);
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

  const sendFiles = () => {
    const arr = [...imageData];
    const formData = {
      upload_ids: arr,
      privacy: privacy,
      title: content,
    };
    if (isGroup) formData["group_id"] = groupId;
    axios
      .post(baseApi + "/media/albums", formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        isGroup && getAlbums(1, true);
        setShowModal(false);
        parentCallback(res.data.album);
        setFile(null);
        setProgress(0);
        setFiles([]);
        setImageData([]);
        setCount(0);
        setSelectFile([]);
        setFinalUrl([]);
        setContent("");
        setAddAlbum(false);
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
      });
  };

  const cleanFile = (i) => {
    files.splice(i, 1);
    setFiles(files);
    setProgress(0);
    setImageData([]);
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

  function createAlbum() {
    const formData = {
      privacy: privacy,
      title: content,
    };
    if (isGroup) formData["group_id"] = groupId;
    axios
      .post(baseApi + "/media/albums", formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setShowModal(false);
        isGroup && getAlbums(1, true);
        setContent("");
        setAddAlbum(false);
      });
  }
  function uploadAlbum() {
    if (content === "") {
      setVisible(true);
    } else if (files.length === 0) {
      setAddAlbum(true);
      createAlbum();
    } else {
      setAddAlbum(true);
      sendFiles();
    }
  }

  const selectMediaManager = (media) => {
    setImageData([...imageData, media.id]);
    setPreviewsUpload([...previewsUpload, media]);
    setFiles(imageData);
  };

  const clearMediaData = (media) => {
    const imagesId = imageData.filter((img) => img !== media.id);
    const previewsImg = previewsUpload.filter((img) => img.id !== media.id);
    setImageData([...imagesId]);
    setPreviewsUpload([...previewsImg]);
    if (imagesId.length === 0) {
      setFiles(null);
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
        + Create Album
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
          <h5 className="modal-title">Create Album</h5>
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
              setFiles([]);
              setImageData([]);
              setSelectFile([]);
              setFinalUrl([]);
              setContent("");
            }}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Title</Label>
            <input
              className="input-search"
              type="text"
              name="content"
              placeholder="Enter Album Title"
              id="content"
              maxLength="50"
              style={{
                boxShadow: "none",
                border: "1px solid #fff",
              }}
              onChange={(e) => {
                setContent(e.target.value);
                setVisible(false);
              }}
            />
            <Alert color="warning" isOpen={visible} toggle={onDismiss}>
              Title is required.
            </Alert>
          </FormGroup>
          <div className="upload-image-conatiner">
            {/*<section css={DropZoneStyle} className="container">*/}
            {/*  <div {...getRootProps({ style, className: "dropzone" })}>*/}
            {/*    <input {...getInputProps()} />*/}
            {/*    <input*/}
            {/*      id="browse-button"*/}
            {/*      type="button"*/}
            {/*      value="Select or Drop images here to upload"*/}
            {/*      className="btn btn-default"*/}
            {/*    ></input>*/}
            {/*  </div>*/}
            {/*  <aside style={thumbsContainer}>{thumbs}</aside>*/}
            {/*</section>*/}
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
                  Upload Photo
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
              type="select"
              onChange={(e) => setPrivacy(e.target.value)}
            >
              <option value="public">Public </option>
              <option value="loggedin">All Members </option>
              <option value="friends">My Connections </option>
              <option value="onlyme">Only Me </option>
            </Input>
            <button
              style={{
                borderRadius: "25px",
              }}
              className="btn btn-outline-primary btn"
              onClick={() => uploadAlbum()}
            >
              {addAlbum && <Loader />}{" "}Create Album
            </button>
          </FormGroup>
        </ModalFooter>
      </Modal>
    </>
  );
}
export default CreateAlbum;
