import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, ModalHeader, Button, Spinner } from 'reactstrap';
import { uploadModal } from "../../components/requestModal/requestModal.style";

const BlockMemberModal = ({ show, close, handleDelete, showSpinner, userMsg, user, setOpenEllipses }) => {
    const [isBlockOpen, setBlockModal] = useState(true)
    const [blockUser, setBlockUser] = useState(null)
    useEffect(() => {
        setBlockModal(true)
        if (userMsg?.recipients && userMsg?.recipients_count === 2) {
            for (let key in userMsg?.recipients) {
                let rec = userMsg?.recipients[key]
                if (user?.id !== rec.user_id)
                    setBlockUser(rec.user_id)
            }
        }
    }, [userMsg])
    const getBlockUserList = () => {
        let list = []
        if (userMsg?.recipients) {
            for (let key in userMsg?.recipients) {
                let rec = userMsg?.recipients[key]
                if (user?.id !== rec.user_id)
                    rec.name !== "Blocked Member" && list.push(
                        <div className="message-notfication-box">
                            <div className="image-tag">
                                <img src={rec.user_avatars.thumb} />
                            </div>
                            <div className="thread-content">
                                <div className="thread-to">{rec.name}</div>
                            </div>
                            <Button color="primary" onClick={() => { setBlockModal(false); setBlockUser(rec.user_id) }}>Block</Button>
                        </div>)
            }
        }
        return list
    }
    const handleClose = () => {
        setBlockModal(true)
        close(false);
        setOpenEllipses(false)
    }
    return (
        <Modal
            className="modal-dialog-centered"
            isOpen={show}
            css={uploadModal}>
            <ModalHeader toggle={handleClose}>Block Member ?</ModalHeader>
            <ModalBody>
                {userMsg?.recipients && userMsg.recipients_count > 2 && isBlockOpen ?
                    getBlockUserList() : <>
                        <p>Please confirm you want to block this member.</p>
                        <p>You will no longer be able to:</p>
                        <ul>
                            <li>See blocked member's posts</li>
                            <li>Mention this member in posts</li>
                            <li>Invite this member to groups</li>
                            <li>Message this member</li>
                            <li> Add this member as a connection</li>
                        </ul>
                        <p>Please note: This action will also remove this member from your connections
                            and send a report to the site admin. Please allow a few minutes for this
                            process to complete.
                        </p>
                        <div style={{ textAlign: "end" }}>
                            <Button color="secondary-text" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button color="primary" onClick={() => handleDelete(blockUser)} >
                                Confirm {showSpinner ? <Spinner style={{ width: '1.2rem', height: '1.2rem' }} /> : ""}
                            </Button>
                        </div>
                    </>}
            </ModalBody>
        </Modal>
    )
}

export default BlockMemberModal;
