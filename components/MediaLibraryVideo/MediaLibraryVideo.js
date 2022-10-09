import React, { useContext, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CloseIcon from "@icons/CloseIcon";
import { css } from "@emotion/core";
import MediaLibraryVideoUpload from "@components/MediaLibraryVideo/MediaLibraryVideoUpload";
import MediaLibraryVideoList from "@components/MediaLibraryVideo/MediaLibraryVideoList";
import { UserContext } from "@context/UserContext";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";
const mediaStyle = css`
  .media-item {
    cursor: pointer;
    border-radius: 5px;
    border: 2px solid transparent;
    overflow: hidden;
    &.active {
      border: 2px solid var(--primary-color);
      border-radius: 5px;
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
  .drop-zone {
    border: 2px dashed var(--white-color);
    min-height: 200px;
  }
  .media-container {
    overflow-y: scroll;
  }
  .video-title {
    padding: 10px;
    top: unset;
    bottom: 0;
    word-break: break-all;
  }
  .modal-body {
    max-height: 470px;
    overflow: auto;
  }
`;

function MediaLibraryVideo({ selectMedia, show, setShow }) {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const [tab, setTab] = useState("upload_files");
  const onHide = () => setShow(!show);
  const [mediaSelected, setMediaSelected] = useState(null);

  const SelectFile = () => {
    selectMedia(mediaSelected);
    setMediaSelected(null);
    onHide();
  };

  const { data: videos, mutate } = useSWR(
    token && tab === "media_library" ? ["/api/cloudflare/list", token] : null,
    genericFetch
  );

  if (mediaSelected) {
    console.log(mediaSelected);
  }

  return (
    <Modal css={mediaStyle} size="lg" centered={true} isOpen={show}>
      <ModalHeader>
        <span>Select or Upload Video</span>
        <span onClick={() => onHide()} className="pointer">
          <CloseIcon className="icon-setting" />
        </span>
      </ModalHeader>
      <ModalBody>
        <ul className="nav nav-tabs mb-3">
          <li
            onClick={() => setTab("upload_files")}
            className="nav-item pointer"
          >
            <span
              className={`nav-link ${tab === "upload_files" ? "active" : ""}`}
            >
              Upload files
            </span>
          </li>
          <li
            onClick={() => setTab("media_library")}
            className="nav-item pointer"
          >
            <span
              className={`nav-link ${tab === "media_library" ? "active" : ""}`}
            >
              Media Library
            </span>
          </li>
        </ul>
        {tab === "upload_files" && (
          <MediaLibraryVideoUpload
            mutate={mutate}
            user={user}
            setTab={setTab}
          />
        )}
        {tab === "media_library" && (
          <MediaLibraryVideoList
            mediaSelected={mediaSelected}
            setMediaSelected={setMediaSelected}
            videos={videos}
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
  );
}

export default MediaLibraryVideo;
