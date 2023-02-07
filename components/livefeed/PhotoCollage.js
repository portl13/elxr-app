import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faTrash,
  faImages,
} from "@fortawesome/free-solid-svg-icons";
import { uploadModal } from "../../components/livefeed/photo.style";
import MovePhoto from "../profile/movephoto";
import { Col, Button, Modal, ModalBody } from "reactstrap";
import PhotoDetail from "../profile/photodetail";
import EditComment from "../profile/EditComment";
export default function PhotoCollage({
  index,
  bp_media_ids,
  media,
  name,
  user,
  photoId,
  parentCallback,
  parentImageData,
  parentGroupData,
  parentDescription,
  likeAction,
}) {
  const [isCurntUser, setCurrentUserState] = useState(false);
  const [display, setDisplay] = useState(false);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPhotoPage, setShowPhotoPage] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(index);
  const [openEditModal, setEditModal] = useState(false);
  const onDismissEditModal = () => setEditModal(false);
  const [selPost, setSelPost] = useState(null);
  const [group, setGroup] = useState("privacy");
  const result = bp_media_ids;
  const id = bp_media_ids.map((d) => d.user_id)[0];
  useEffect(() => {
    if (user?.id === id) {
      setCurrentUserState(true);
    }
  }, []);
  const onTrigger = () => {
    parentCallback(photoId);
  };
  function modalStatus({ childData }) {
    setShowModal(childData);
  }
  function moveImage(photoData) {
    parentImageData(photoData);
  }
  function closeModal(childData) {
    setShowPhotoPage(false);
  }
  function openModal() {
    setShowPhotoPage(true);
  }
  function handleDescription(content, photo_id, groupData) {
    parentDescription(content, photo_id, groupData);
  }
  function likePhotoAction(childData, groupStatus) {
    likeAction(childData, groupStatus);
  }
  return (
    <>
      <div
        className={`act-grid-1-${
          index === 0
            ? bp_media_ids.length === 1
              ? "full"
              : "1"
            : index === 1
            ? "1"
            : "2"
        }`}
      >
        {index === 4 && bp_media_ids.length > 5 && (
          <div className="bb-photos-length">
            <span>
              +{bp_media_ids.length - 5}
              <em>More Photos</em>
            </span>
          </div>
        )}
        <div
          className="hover-effect"
          onClick={() => {
            if (display) {
              setDisplay(false);
            }
            openModal();
          }}
        ></div>

        <img
          key={media.attachment_id}
          src={
            media.attachment_data.full
              ? media.attachment_data.full
              : media.attachment_data.thumb
          }
          alt={`media video ${name}`}
          onMouseOut={() => setDisplay(false)}
        />
        {(index <= 3 || (index === 4 && bp_media_ids.length === 5)) &&
          isCurntUser && (
            <div className="media-action">
              <div className="has-tooltip more">
                <div className="circle">
                  <FontAwesomeIcon
                    icon={faEllipsisH}
                    onClick={() => setDisplay(true)}
                  />
                  <div className="popover bs-popover-top">
                    <div className="arrow"></div>
                    <div className="popover-body">More Action</div>
                  </div>
                </div>
              </div>
              {display && (
                <div className="more-action-list">
                  <ul>
                    <li>
                      <div
                        className="item-link"
                        onClick={() => {
                          setShowModal(true);
                          setDisplay(false);
                        }}
                      >
                        <FontAwesomeIcon icon={faImages} />
                        Move
                      </div>
                    </li>
                    <li>
                      <div className="item-link" onClick={() => setShow(true)}>
                        <FontAwesomeIcon icon={faTrash} />
                        Delete
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
      </div>
      <Modal
        className="modal-dialog-centered modal-sm"
        isOpen={show}
        css={uploadModal}
      >
        <ModalBody className="text-center">
          <p className="mb-4">Are you sure you want to Delete this photo?</p>
          <Button
            color="secondary-text"
            onClick={() => {
              setShow(false);
              setDisplay(false);
            }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              onTrigger();
              setShow(false);
              setDisplay(false);
            }}
          >
            Yes, Delete
          </Button>
        </ModalBody>
      </Modal>
      {showModal && (
        <MovePhoto
          user={user}
          showModal={showModal}
          parentCallback={modalStatus}
          id={photoId}
          parentResponse={moveImage}
        />
      )}
      {showPhotoPage && (
        <PhotoDetail
          selectedUseDet={user}
          showModal={showPhotoPage}
          parentCallback={closeModal}
          user={user}
          imageUrl={result[photoIndex].attachment_data.full}
          id={result[photoIndex].id}
          date={result[photoIndex].date}
          description={result[photoIndex].description}
          parentDescription={handleDescription}
          parentGroupData={parentGroupData}
          handleDelete={onTrigger}
          result={result}
          index={photoIndex}
          setPhotoIndex={setPhotoIndex}
          activityId={result[photoIndex].activity_id}
          likeAction={likePhotoAction}
          isCurntUser={isCurntUser}
          setShowModal={setShowPhotoPage}
          setEditModal={setEditModal}
          setSelPost={setSelPost}
          photoDetail={result[photoIndex]}
        />
      )}
      {openEditModal && (
        <EditComment
          setShowEdit={onDismissEditModal}
          uploadModal={uploadModal}
          showEdit={openEditModal}
          setGroup={setGroup}
          group={group}
          user={user}
          pHotoData={result[photoIndex]}
          result={result}
        />
      )}
    </>
  );
}
