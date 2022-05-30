import React from 'react'
import { Modal, ModalBody, Button, Spinner } from 'reactstrap';
import { uploadModal } from "./requestModal.style";

export default function RequestModal({ show, close, handleDelete, showSpinner }) {
    return (
        <Modal
            className="modal-dialog-centered modal-sm"
            isOpen={show}
            css={uploadModal}>
            <ModalBody className="text-center">
                <p className="mb-4">Are you sure you want to Delete this friendship?</p>
                <Button color="secondary-text" onClick={() => close(false)}>
                    Cancel
                </Button>
                <Button color="primary" onClick={handleDelete} >
                    Yes, Delete {showSpinner ? <Spinner style={{ width: '1.2rem', height: '1.2rem' }} /> : ""}
                </Button>
            </ModalBody>
        </Modal>
    )
}

