import React from 'react'
import { Modal, ModalBody, Button, Spinner } from 'reactstrap';
import { uploadModal } from "../../components/requestModal/requestModal.style";

const DeleteMsg = ({ show, close, handleDelete, showSpinner }) => {
    return (
        <Modal
            className="modal-dialog-centered modal-sm"
            isOpen={show}
            css={uploadModal}>
            <ModalBody className="text-center">
                <p className="mb-4">Are you sure you want to permanently delete all of your messages from this conversation? This cannot be undone.</p>
                <Button color="secondary-text" onClick={() => close(false)}>
                    Cancel
                </Button>
                <Button color="primary" onClick={() => handleDelete('delete_messages')} >
                    Yes, Delete {showSpinner ? <Spinner style={{ width: '1.2rem', height: '1.2rem' }} /> : ""}
                </Button>
            </ModalBody>
        </Modal>
    )
}

export default DeleteMsg;
