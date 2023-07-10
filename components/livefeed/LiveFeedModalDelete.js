import React from 'react'
import { Button, Modal, ModalBody } from 'reactstrap'

function LiveFeedModalDelete({ show, uploadModal, setMoreOption, onTrigger, setShow }) {
  return (
    <Modal
      className="modal-dialog-centered modal-sm"
      isOpen={show}
      css={uploadModal}
    >
      <ModalBody className="text-center">
        <p className="mb-4">Are you sure you want to Delete this post?</p>
        <Button
          color="secondary-text"
          onClick={() => {
            setShow(false)
            setMoreOption(false)
          }}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => {
            onTrigger()
            setShow(false)
          }}
        >
          Yes, Delete
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default LiveFeedModalDelete
