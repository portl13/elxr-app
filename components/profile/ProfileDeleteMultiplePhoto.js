import React from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import { uploadModal } from "@components/livefeed/photo.style";
import { genericDelete } from "@request/dashboard";

const url = process.env.bossApi + `/media`;

function ProfileDeleteMultiplePhoto({ token, photosIds }) {

  const deleteMultiplePhoto = async () => {
    try {
      const data = genericDelete(url, token, {
        media_ids: photosIds,
      });
      console.log(data)
    } catch (e) {

    }
  };

  return (
    <Modal
      className="modal-dialog-centered modal-sm"
      isOpen={show}
      css={uploadModal}
    >
      <ModalBody className="text-center">
        <p className="mb-4">Are you sure you want to Delete selected photos?</p>
        <Button
          color="secondary-text"
          onClick={() => {}}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={deleteMultiplePhoto}
        >
          Yes, Delete
        </Button>
      </ModalBody>
    </Modal>
  );
}

export default ProfileDeleteMultiplePhoto;
