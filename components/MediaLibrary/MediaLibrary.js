import React, { useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import useSWR from 'swr'
import { genericFetch } from '@request/dashboard'
import MediaLibraryList from './MediaLibraryList'
import { css } from '@emotion/core'
import CloseIcon from '@icons/CloseIcon'
import MediaLibraryUpload from './MediaLibraryUpload'

const mediaStyle = css`
  .media-item {
    cursor: pointer;
    border-radius: 2px;
    border: 2px solid transparent;
    &.active .selected-image {
      border: 2px solid var(--primary-color);
      border-radius: 2px;
    }
  }
  .selected-image {
    border: 2px solid transparent;
  }
  .modal-title {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-radius: 2px;
  }
  .nav-tabs .nav-link.active {
    background-color: transparent !important;
    color: var(--white-color) !important;
  }
  .drop-zone{
    border: 2px dashed var(--white-color);
    min-height: 200px;
  }
`

function MediaLibrary({
  show,
  onHide,
  token,
  media_type = 'image',
  selectMedia,
}) {
  const { data: media } = useSWR(
    token ? [`/api/media/?media_type=${media_type}`, token] : null,
    genericFetch
  )
  const [mediaSelected, setMediaSelected] = useState(null)
  const [tab, setTab] = useState('upload_files')

  const SelectFile = () => {
    selectMedia(mediaSelected)
    setMediaSelected(null)
    onHide()
  }

  return (
    <Modal
      css={mediaStyle}
      size="lg"
      centered={true}
      isOpen={show}
      toggle={onHide}
    >
      <ModalHeader>
        <span>Select or Upload Media</span>
        <span onClick={() => onHide()} className="pointer">
          <CloseIcon className="icon-setting" />
        </span>
      </ModalHeader>
      <ModalBody>
        <ul class="nav nav-tabs mb-3">
          <li onClick={() => setTab('upload_files')} class="nav-item pointer">
            <span class={`nav-link ${tab === 'upload_files' ? 'active' : ''}`}>
              Upload files
            </span>
          </li>
          <li onClick={() => setTab('media_library')} class="nav-item pointer">
            <span class={`nav-link ${tab === 'media_library' ? 'active' : ''}`}>
              Media Library
            </span>
          </li>
        </ul>
        {tab === 'upload_files' && <MediaLibraryUpload token={token} />}
        {tab === 'media_library' && (
          <MediaLibraryList
            media={media}
            setMediaSelected={setMediaSelected}
            mediaSelected={mediaSelected}
          />
        )}
      </ModalBody>
      <ModalFooter>
        <button
          disabled={!mediaSelected}
          onClick={SelectFile}
          className="btn btn-primary"
        >
          Select File
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default MediaLibrary
