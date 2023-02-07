import React, { useState, useEffect } from "react";
import { uploadModal } from "../livefeed/photo.style";
import {
  Button,
  Input,
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Label,
  Alert,
} from "reactstrap";
import axios from "axios";
import AlbumModal from "@components/profile/albummodal";
import Loader from "./loader";

function MovePhoto({
  user,
  showModal,
  parentCallback,
  id,
  parentResponse,
  isGroup,
  groupId,
}) {
  const [result, setResult] = useState([]);
  const [albumId, setAlbumId] = useState(0);
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [uploadPhoto, setUploadPhoto] = useState(false);
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const onDismiss = () => setVisible(false);
  const baseApi = process.env.bossApi;
  useEffect(() => getAlbums(), []);
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
        setResult(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function movePhoto() {
    axios(process.env.bossApi + `/media/albums/${albumId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      const data = res.data.media.medias;
      axios
        .patch(
          baseApi + `/media/${id}`,
          {
            id: id,
            album_id: parseInt(albumId),
          },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        )
        .then((res) => {
          const picId = res.data.id;
          const index = data.filter((item) => item.id === picId);
          const indexId = index.map((d) => d.id);
          const photoId = indexId.toString();
          if (picId === parseInt(photoId)) {
            setShow(true);
            setUploadPhoto(false);
            setTimeout(() => parentCallback(false), [1500]);
          } else {
            parentResponse(res.data);
            setUploadPhoto(false);
            parentCallback(false);
          }
        });
    });
  }
  function closeModal(childData) {
    setShowAlbumModal(false);
  }
  function fetchAlbums(childData) {
    result.unshift(childData);
    setResult(result);
  }
  function msgVisible(childData) {
    setVisible(childData);
    setTimeout(() => setVisible(false), 1000);
  }
  return (
    <>
      <Modal
        className="modal-dialog-centered"
        css={uploadModal}
        isOpen={showModal}
      >
        <ModalHeader closeButton>
          <h5 className="modal-title">Move Photo to...</h5>
        </ModalHeader>
        <ModalBody className="profile-move-panel">
          {result && (
            <FormGroup>
              <Label>Select Album</Label>
              <span></span>
              <Input
                type="select"
                className="select-album"
                value={albumId}
                onChange={(e) => setAlbumId(e.target.value)}
              >
                <option value="">Select</option>
                {result &&
                  result.map((album, key) => (
                    <option value={album.id}>{album.title}</option>
                  ))}
              </Input>
            </FormGroup>
          )}
          <Alert color="success" isOpen={visible} toggle={onDismiss}>
            New Album Created Successfully.
          </Alert>
          <Alert color="warning" isOpen={show}>
            Photo already exist in album.
          </Alert>
        </ModalBody>
        <ModalFooter className="profile-footer-button">
          <Button onClick={() => setShowAlbumModal(true)}>
            Create New Album
          </Button>
          <div>
            <Button onClick={() => parentCallback(false)}>Cancel</Button>
            {albumId === 0 ? null : (
              <Button
                className="upload-button"
                onClick={() => {
                  setUploadPhoto(true);
                  movePhoto();
                }}
              >
                {uploadPhoto && <Loader />}Move
              </Button>
            )}
          </div>
        </ModalFooter>
      </Modal>
      {showAlbumModal && (
        <AlbumModal
          showModal={showAlbumModal}
          parentCallback={closeModal}
          user={user}
          parentResponse={fetchAlbums}
          alertVisible={msgVisible}
          isGroup={isGroup}
          groupId={groupId}
        />
      )}
    </>
  );
}
export default MovePhoto;
