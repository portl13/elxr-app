import React from "react";
import { Button, Modal, ModalBody, Spinner } from "reactstrap";
import { uploadModal } from "../../../components/profile/photo.style";
function DeleteEvent({
  show,
  setDeleteModal,
  id,
  parentDelete,
  spin,
  setSpin,
}) {
  return (
    <>
      <Modal
        className="modal-dialog-centered modal-sm"
        isOpen={show}
        css={uploadModal}
      >
        <ModalBody className="text-center">
          <p className="mb-4">Are you sure you want to Delete this event?</p>
          <Button
            color="secondary-text"
            onClick={() => {
              setDeleteModal(false);
              setSpin(false);
            }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              setSpin(true);
              parentDelete(id);
            }}
          >
            {spin && <Spinner style={{ width: "1.2rem", height: "1.2rem" }} />}
            {""}Yes, Delete
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
}
export default DeleteEvent;
