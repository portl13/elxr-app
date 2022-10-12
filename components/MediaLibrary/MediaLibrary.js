import React, { useContext, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import useSWRInfinite from "swr/infinite";
import { genericFetch } from "@request/dashboard";
import MediaLibraryList from "./MediaLibraryList";
import { css } from "@emotion/core";
import CloseIcon from "@icons/CloseIcon";
import MediaLibraryUpload from "./MediaLibraryUpload";
import { UserContext } from "@context/UserContext";

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
`;

const mediaUrl = `${process.env.baseUrl}/wp-json/wp/v2/media`;

function MediaLibrary({
  show,
  onHide,
  token,
  media_type = "image",
  selectMedia,
  mediaHandlerUpload = null,
  multiselect = false,
}) {
  const { user } = useContext(UserContext);

  const { data, mutate, setSize, size, error } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null;
      if (!user) return null;
      let url = `${mediaUrl}?page=${pageIndex + 1}&author=${
        user.id
      }&per_page=16`;

      if (media_type) {
        url += `&media_type=${media_type}`;
      }

      return token ? [url, token] : null; // SWR key
    },
    genericFetch
  );

  const media = data ? [].concat(...data) : [];

  const [mediaSelected, setMediaSelected] = useState(null);

  const [tab, setTab] = useState("upload_files");

  const SelectFile = () => {
    selectMedia(mediaSelected);
    setMediaSelected(null);
    onHide();
  };

  const loadMore = () => {
    setSize(size + 1);
  };

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
          <MediaLibraryUpload
            mutate={mutate}
            token={token}
            setTab={setTab}
            media_type={media_type}
            mediaHandlerUpload={mediaHandlerUpload}
          />
        )}
        {tab === "media_library" && (
          <MediaLibraryList
            media={media}
            setMediaSelected={setMediaSelected}
            mediaSelected={mediaSelected}
            loadMore={loadMore}
            hasMore={!error || media.length !== 0}
            multiselect={multiselect}
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

export default MediaLibrary;
