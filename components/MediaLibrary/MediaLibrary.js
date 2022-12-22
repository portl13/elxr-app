import React, { useContext, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import useSWRInfinite from "swr/infinite";
import { genericFetch, genericDelete } from "@request/dashboard";
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
    overflow: hidden;
    padding-right: 15px;

    &.active {
      border: 2px solid var(--danger);
      border-radius: 2px;
    }
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
  .video-title {
    padding: 10px;
    top: unset;
    bottom: 0;
    word-break: break-all;
  }
  .media-item-name{
    display: flex;
    align-items: center;
  }
  .media-item-progress{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .media-item-icon{
    width: 20px;
  }
  .media-metadata{
    
  }
  .media-metadata-title{
    font-weight: 600;
    font-size: 1rem;
    @media (max-width: 500px) {
      font-size: 14px;
    }
  }
  .media-metadata-minor{
    font-size: 12px;
    @media (max-width: 500px) {
      font-size: 10px;
    }
  }
  .media-audio{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90px;
  }
  .media-icon {
    width: 2rem;
  }
  .media-video{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90px;
  }
  .spinner-border{
    width: 1rem !important;
    height: 1rem !important;
  }
`;

const mediaUrl = `${process.env.baseUrl}/wp-json/wp/v2/media`;
const PAGE_SIZE = 16;

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
      }&per_page=${PAGE_SIZE}`;

      if (media_type) {
        url += `&media_type=${media_type}`;
      }

      return token ? [url, token] : null; // SWR key
    },
    genericFetch
  );

  const media = data ? [].concat(...data) : [];
  const isEmpty = data?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  const [mediaSelected, setMediaSelected] = useState("");

  const [tab, setTab] = useState("upload_files");

  const [selectToDelete, setSelectToDelete] = useState(false);

  const [selectedMediaItems, setSelectedMediaItems] = useState([]);

  const [isDeleting, setIsDeleting] = useState(false);

  const SelectFile = () => {
    selectMedia(mediaSelected);
    setMediaSelected(null);
    onHide();
  };

  const loadMore = async () => {
    await setSize(size + 1);
  };

  const setTabs = (tab) => {
    setTab(tab)
    setMediaSelected("")
  }

  const selectMediaItem = (mediaItem) => {
    const index = selectedMediaItems.findIndex(e => e?.id === mediaItem.id)

    if (index > -1){
      const selectedMediaItemsCopy = [...selectedMediaItems]
      selectedMediaItemsCopy.splice(index, 1)
      setSelectedMediaItems([...selectedMediaItemsCopy]);
      return
    }

    setSelectedMediaItems([...selectedMediaItems, mediaItem]);
  };

  const handleSelectToDelete = () => {
    setSelectToDelete(!selectToDelete);
    setSelectedMediaItems([])
    setMediaSelected('')
  }

  const deleteSelectedMediaItems = async () => {
    setIsDeleting(true)

    const deleteRequests = selectedMediaItems.map(item => genericDelete(
      `${mediaUrl}/${item.id}?force=true`, 
      token
    ))

    const responses = await Promise.allSettled(deleteRequests)

    await mutate()
    setIsDeleting(false)

    setSelectToDelete(!selectToDelete);
    setSelectedMediaItems([])
    setMediaSelected('')
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
        <ul className="nav nav-tabs mb-3">
          <li
            onClick={() => setTabs("upload_files")}
            className="nav-item pointer"
          >
            <span
              className={`nav-link ${tab === "upload_files" ? "active" : ""}`}
            >
              Upload files
            </span>
          </li>
          <li
            onClick={() => setTabs("media_library")}
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
            hasMore={!isReachingEnd}
            multiselect={multiselect}
            selectMediaItem={selectMediaItem}
            selectedMediaItems={selectedMediaItems}
            selectToDelete={selectToDelete}
          />
        )}
        {mediaSelected && media_type === "audio" && (
          <audio
            className={"w-100"}
            src={mediaSelected.source_url}
            controls
          ></audio>
        )}
      </ModalBody>
      <ModalFooter>
        {tab === "media_library" && (
          <>
            <button
              onClick={handleSelectToDelete}
              className="btn btn-primary border-radius-35"
            >
              Select To Delete
            </button>

            {selectToDelete ?
              <button
                disabled={selectedMediaItems.length === 0}
                onClick={() => deleteSelectedMediaItems()}
                className={`btn btn-danger border-radius-35 ${isDeleting ? 'px-5' : ''}`}
              >
                {!isDeleting ? 
                  'Delete' :
                  <div class="spinner-border text-light" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                }
              </button>
              :
              <button
                disabled={!mediaSelected}
                onClick={SelectFile}
                className="btn btn-primary border-radius-35"
              >
                Select File
              </button>
            }
          </>
        )}
      </ModalFooter>
    </Modal>
  );
}

export default MediaLibrary;
