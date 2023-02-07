import React, { useState, useMemo } from "react";
import { uploadModal } from "@components/livefeed/photo.style";
import {
  Button,
  Input,
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";
import Loader from "@components/profile/loader";
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
} from "@components/profile-edit/profile-edit.style";
import useIcon from "@hooks/useIcon";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import AlbumModal from "./albummodal";
import MediaLibrary from "@components/MediaLibrary/MediaLibrary";
import { useAlert } from "react-alert";
import { TIMEOUT } from "@utils/constant";
import { createLogger } from "redux-logger";

function AddPhoto({
  user,
  parentResponse,
  isGroup,
  groupId,
  newAlbum,
  album_Id,
}) {
  const alert = useAlert();
  const token = user?.token;
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [upload, setUpload] = useState(false);
  const [imageCount, setImageCount] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectFile, setSelectFile] = useState([]);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageData, setImageData] = useState([]);
  const [privacy, setPrivacy] = useState("public");
  const [count, setCount] = useState(0);
  const [finalUrl, setFinalUrl] = useState([]);
  const [content, setContent] = useState("");
  const [result, setResult] = useState([]);
  const [albumId, setAlbumId] = useState(album_Id !== undefined ? album_Id : 0);
  const [length, setLength] = useState("");
  const [albumView, setAlbumView] = useState(false);
  const [uploadPhoto, setUploadPhoto] = useState(false);
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [addAlbum, setAddAlbum] = useState(false);

  const [showMedia, setShowMedia] = useState(false);
  const [previewsUpload, setPreviewsUpload] = useState([]);
  const [errorMedia, setErrorMedia] = useState("");

  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);
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
        Object.assign(fileData, {
          preview: URL.createObjectURL(fileData),
        })
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
    setImageCount(true);
    setUpload(true);
    const formData = {
      upload_ids: arr,
      privacy: privacy,
      content: content,
      album_id: parseInt(albumId),
    };
    if (isGroup) formData["group_id"] = groupId;
    axios
      .post(baseApi + "/media", formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setImageData([]);
        setPreviewsUpload([]);
        setShowModal(false);
        parentResponse(res.data);
        setFile(null);
        setProgress(0);
        setFiles([]);
        setImageData([]);
        setCount(0);
        setImageCount(false);
        setSelectFile([]);
        setFinalUrl([]);
        setContent("");
        setUpload(false);
        setUploadPhoto(false);
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
        setUpload(false);
        setUploadPhoto(false);
      });
  };

  function buttonVisible() {
    if (files === 0) {
      setFile(null);
    } else {
      setFile(files);
    }
  }

  const cleanFile = (i) => {
    files.splice(i, 1);
    setFiles(files);
    buttonVisible();
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

  function getAlbums() {
    const formData = {
      page: 1,
      per_page: 100,
      user_id: user?.id,
    };
    if (isGroup) formData["group_id"] = groupId;
    axios(process.env.bossApi + "/media/albums", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      params: formData,
    })
      .then((res) => {
        setAlbumView(false);
        setResult(res.data);
        setLength(res.data.length);
        setAddAlbum(true);
        res.data.length === 0 ? setVisible(true) : null;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function closeModal(childData) {
    setShowAlbumModal(false);
  }
  function fetchAlbums(childData) {
    if (addAlbum) {
      result.unshift(childData);
      setResult(result);
    }
  }

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
              setFiles([]);
              setImageData([]);
              setImageCount(false);
              setUpload(false);
              setSelectFile([]);
              setFinalUrl([]);
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
          <p className={"form-group"}>
            {file && !newAlbum && (
              <button
                className={
                  "d-flex btn btn-borde-bg-negro post-element-panel post-editor-icon"
                }
                onClick={() => setShowAlbumModal(true)}
              >
                + Create New Album
              </button>
            )}
          </p>
          {file && !newAlbum && (
            <div className={"form-group"}>
              <button
                className={
                  "d-flex btn btn-borde-bg-negro post-element-panel post-editor-icon"
                }
                onClick={() => {
                  setAlbumView(true);
                  getAlbums();
                }}
              >
                Select Album
                {albumView && <Loader />}
              </button>
              <span></span>
              {length > 0 ? (
                <Input
                  type="select"
                  className="select-album"
                  value={albumId}
                  style={{
                    background: "transparent",
                    color: "white",
                    borderRadius: "25px",
                    border: "1px solid #fff",
                  }}
                  onChange={(e) => {
                    setAlbumId(e.target.value);
                    setPrivacy("public");
                  }}
                >
                  <option value="">...Select</option>
                  {result &&
                    result.map((album, key) => (
                      <option value={album.id}>{album.title}</option>
                    ))}
                </Input>
              ) : length === 0 ? (
                <div>No album found.</div>
              ) : (
                "Click on Select Album"
              )}
            </div>
          )}

          <FormGroup>
            {!newAlbum && albumId == 0 && (
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
                <option value="public">Public </option>
                <option value="loggedin">All Members </option>
                <option value="friends">My Connections </option>
                <option value="onlyme">Only Me </option>
              </Input>
            )}
            {albumId != 0 && (
              <Input
                style={{
                  background: "transparent",
                  color: "white",
                  borderRadius: "25px",
                  border: "1px solid #fff",
                }}
                type="select"
                disabled
              >
                <option value="public">Public </option>
              </Input>
            )}
            {file && (
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
            )}
          </FormGroup>
        </ModalFooter>
      </Modal>
      {showAlbumModal && (
        <AlbumModal
          showModal={showAlbumModal}
          parentCallback={closeModal}
          user={user}
          parentResponse={fetchAlbums}
          isGroup={true}
          groupId={groupId}
        />
      )}
    </>
  );
}
export default AddPhoto;
