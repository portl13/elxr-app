import React, { useState } from "react";
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
import Loader from "@components/profile/loader";

function AlbumModal({
  showModal,
  parentCallback,
  user,
  parentResponse,
  alertVisible,
  isGroup,
  groupId,
}) {
  const [privacy, setPrivacy] = useState("public");
  const [content, setContent] = useState("");
  const [visible, setVisible] = useState(false);
  const [uploadAlbum, setUploadAlbum] = useState(false);
  const onDismiss = () => setVisible(false);
  const baseApi = process.env.bossApi;
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
        parentResponse(res.data.album);
        parentCallback(false);
        setContent("");
        setUploadAlbum(false);
        !isGroup && alertVisible(true);
      });
  }
  function addAlbum() {
    if (content === "") {
      setVisible(true);
    } else {
      setUploadAlbum(true);
      createAlbum();
    }
  }
  return (
    <>
      <Modal
        className="modal-dialog-centered"
        css={uploadModal}
        isOpen={showModal}
      >
        <ModalHeader closeButton>
          <h5 className="modal-title">Create Album</h5>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Album Title</Label>
            <Input
              className="form-control"
              type="text"
              name="content"
              placeholder="Enter Album Title"
              id="content"
              maxLength="50"
              onChange={(e) => {
                setContent(e.target.value);
                setVisible(false);
              }}
            />
            <Alert color="warning" isOpen={visible} toggle={onDismiss}>
              Title is required.
            </Alert>
          </FormGroup>
          <FormGroup>
            <Label>Privacy</Label>
            <Input type="select" onChange={(e) => setPrivacy(e.target.value)}>
              <option value="public">Public </option>
              <option value="loggedin">All Members </option>
              <option value="friends">My Connections </option>
              <option value="onlyme">Only Me </option>
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter className="profile-footer-button">
          <Button onClick={() => parentCallback(false)}>Cancel</Button>
          <Button onClick={() => addAlbum()}>
            {uploadAlbum && <Loader />}Create
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
export default AlbumModal;
