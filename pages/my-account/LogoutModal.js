import React from "react";
import { Button, Modal, ModalBody } from "reactstrap";
export default function LogoutModal({
  show,
  uploadModal,
  setShow,
  parentTrigger,
}) {
  return (
    <>
      <Modal
        className="modal-dialog-centered modal-sm"
        isOpen={show}
        css={uploadModal}
      >
        <ModalBody className="text-center">
          <p className="mb-4">Are you sure you want to Logout?</p>
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
            onClick={() => {
              parentTrigger();
              setShow(false);
            }}
          >
            Yes, Delete
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
}
