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
  Alert,
} from "reactstrap";
import Loader from "./loader";
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
import AlbumModal from "./albummodal";

function AddPhoto({
  user,
  parentResponse,
  isGroup,
  groupId,
  newAlbum,
  album_Id,
}) {
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
  const [albumId, setAlbumId] = useState(album_Id != undefined ? album_Id : 0);
  const [length, setLength] = useState("");
  const [albumView, setAlbumView] = useState(false);
  const [uploadPhoto, setUploadPhoto] = useState(false);
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [addAlbum, setAddAlbum] = useState(false);
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
    var counter = count;
    file.map((fileData, key) => {
      const body = new FormData();
      body.append("file", fileData, fileData.name);
      const url = `${baseApi}/media/upload`;
      axios
        .post(url, body, {
          headers: { Authorization: `Bearer ${user.token}` },
          onUploadProgress: function (progressEvent) {
            const { loaded, total } = progressEvent;
            const percentage = Math.floor((loaded * 100) / total);
            setProgress(percentage);
          },
        })
        .then((res) => {
          arr.push(res.data.upload_id);
          setCount(counter++);
          setImageData(arr);
          setImageCount(true);
          setUpload(true);
          const formData = {
            upload_ids: arr,
            privacy: privacy,
            content: content,
            album_id: parseInt(albumId),
          };
          if (isGroup) formData["group_id"] = groupId;
          files.length === counter
            ? axios
                .post(baseApi + "/media", formData, {
                  headers: { Authorization: `Bearer ${user.token}` },
                })
                .then((res) => {
                  setShowModal(false);
                  parentResponse(res.data);
                  setFile(null);
                  setProgress(0);
                  setFiles([]);
                  setImageData([]);
                  setCount(0);
                  setImageCount(false);
                  setUpload(false);
                  setSelectFile([]);
                  setFinalUrl([]);
                  setContent("");
                  setUploadPhoto(false);
                })
            : null;
        });
    });
  };

  function buttonVisible() {
    if (files == 0) {
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
  const thumbs = files.map((fileData, i) => (
    <div style={styleThumb} key={fileData.name}>
      <Button
        onClick={() => cleanFile(i)}
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
        <div className="loading-container">
          {progress !== 0 && (
            <Progress max="100" value={progress} color="success" />
          )}
        </div>
        <img src={fileData.preview} style={thumbImg} />
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

  return (
    <>
      <Button onClick={handleShow} className="btn btn-outline-primary">
        Add Photos
      </Button>
      <Modal
        className="modal-dialog-centered"
        css={uploadModal}
        isOpen={showModal}
        onHide={handleClose}
      >
        <ModalHeader closeButton>
          <h5 className="modal-title">
            {!upload ? "Upload" : "Uploading..."}{" "}
            {imageCount && `${count + 1} out of ${files.length}`}
          </h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => {
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
          <FormGroup>
            <Input
              className="form-control"
              type="textarea"
              name="content"
              placeholder="Write something about your photos, to be shown on your timeline"
              id="content"
              onChange={(e) => setContent(e.target.value)}
            />
          </FormGroup>
          <div className="upload-image-conatiner">
            <section css={DropZoneStyle} className="container">
              <div {...getRootProps({ style, className: "dropzone" })}>
                <input {...getInputProps()} />
                <input
                  id="browse-button"
                  type="button"
                  value="Select or Drop images here to upload"
                  className="btn btn-default"
                ></input>
              </div>
              <aside style={thumbsContainer}>{thumbs}</aside>
            </section>
          </div>
        </ModalBody>

        <ModalFooter className="profile-footer-panel">
          <FormGroup>
            {file && !newAlbum && (
              <Button onClick={() => setShowAlbumModal(true)}>
                + Create New Album
              </Button>
            )}
          </FormGroup>
          {file && !newAlbum && (
            <FormGroup>
              <Button
                onClick={() => {
                  setAlbumView(true);
                  getAlbums();
                }}
              >
                Select Album
                {albumView && <Loader />}
              </Button>
              <span></span>
              {length > 0 ? (
                <Input
                  type="select"
                  className="select-album"
                  value={albumId}
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
            </FormGroup>
          )}

          <FormGroup>
            {!newAlbum && albumId == 0 && (
              <Input type="select" onChange={(e) => setPrivacy(e.target.value)}>
                <option value="public">Public </option>
                <option value="loggedin">All Members </option>
                <option value="friends">My Connections </option>
                <option value="onlyme">Only Me </option>
              </Input>
            )}
            {albumId != 0 &&(
                <Input type="select" disabled>
                <option value="public">Public </option>              
              </Input>
              )}
            {file && (
              <>
                <Button
                  className="upload-button"
                  onClick={() => {
                    setUploadPhoto(true);
                    sendFiles();
                  }}
                >
                  {" "}
                  {uploadPhoto && <Loader />}Upload
                </Button>
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
