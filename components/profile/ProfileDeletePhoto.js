import React, { useState } from "react";
import {Button, Modal, ModalBody, Spinner} from "reactstrap";
import { uploadModal } from "@components/livefeed/photo.style";
import {genericDelete} from "@request/dashboard";
import {TIMEOUT} from "@utils/constant";

const url = process.env.bossApi + `/media`

function ProfileDeletePhoto({show, setShow, token, photoId, mutate}) {
  const [loading, setLoading] = useState(false);

  const deletePhoto = async () => {
    if(!token) return
    try {
      setLoading(true)
      await genericDelete(`${url}/${photoId}/`, token)
      await mutate()
      setLoading(false)
      setShow(false)
    } catch (error) {
      alert.error(error.message, TIMEOUT)
      setLoading(false)
    }
  }

  return (
    <Modal
      className="modal-dialog-centered modal-sm"
      isOpen={show}
      css={uploadModal}
    >
      <ModalBody className="text-center">
        <p className="mb-4">Are you sure you want to Delete this photo?</p>
        <Button
          color="secondary-text"
          onClick={() => {
            setShow(false);
          }}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={deletePhoto}
          style={{minWidth:100}}
        >
          {!loading ? 'Yes, Delete' : <Spinner size={"sm"} />}
        </Button>
      </ModalBody>
    </Modal>
  );
}

export default ProfileDeletePhoto;
