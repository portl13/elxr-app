import React from 'react'
import { Modal, ModalBody, Button, Spinner } from 'reactstrap';
import { uploadModal } from "../requestModal/requestModal.style";

const DeleteMsg = ({ show, close, handleDelete, showSpinner }) => {
    return (
        <Modal
            className="modal-dialog-centered modal-sm confirm_modal delete_chat"
            isOpen={show}
            css={uploadModal}>
            <ModalBody className="text-center" style={{backgroundColor:"white"}}>
            <button className="close" onClick={() => close(false)}>
              <svg width="13" height="13" viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.243 11.529a.503.503 0 1 1-.71.711L6.198 6.907.866 12.24a.503.503 0 1 1-.71-.711l5.332-5.333L.156.863a.503.503 0 0 1 .71-.711L6.2 5.485 11.533.152a.503.503 0 1 1 .71.71L6.912 6.197l5.332 5.333z" fill="#141414" fill-rule="nonzero" opacity=".401" />
              </svg>
            </button>
                <h6>Delete Chat</h6>
                <p className="mb-4">Are you sure you want to permanently delete all of your messages from this conversation? This cannot be undone.</p>
                <div className='btnWrapper'>
                <Button color="primary" onClick={() => handleDelete('delete_messages')} >
                    Yes, Delete {showSpinner ? <Spinner style={{ width: '1.2rem', height: '1.2rem' }} /> : ""}
                </Button>
                <Button color="secondary-text" onClick={() => close(false)}>
                    Cancel
                </Button>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default DeleteMsg;
