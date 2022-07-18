import React from 'react'
import { Modal, ModalHeader } from 'reactstrap'

function MediaLibrary({ show, onHide }) {
  return <Modal isOpen={show} toggle={onHide}>
    <ModalHeader>Media Library</ModalHeader>
  </Modal>
}

export default MediaLibrary
