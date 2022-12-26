import React, { useState, useEffect } from "react";

import { Col, Button, Modal, ModalBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEllipsisH,
  faImages,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import useIcon from "../../hooks/useIcon";
import {
  PhotoAction,
  Media,
  uploadModal,
} from "../../components/livefeed/photo.style";
import MovePhoto from "./movephoto";
import PhotoDetail from "./photodetail";
import EditComment from "./EditComment";
const PhotoCard = ({
  photo,
  id,
  parentCallback,
  parentMember,
  selection,
  check,
  user,
  parentImageData,
  isGroup,
  date,
  description,
  parentDescription,
  parentGroupData,
  result,
  index,
  activityId,
  likeAction,
  groupId,
  isCurntUser,
  setReportModalOpen,
  setSelPhoto,
  setSelPhotoIndex,
  isFromDetail,
  selectedUseDet,
}) => {
  const [display, setDisplay] = useState(false);
  const { iconElement: trash } = useIcon(faTrash);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectStatus, setSelectStatus] = useState(check);
  const [showPhotoPage, setShowPhotoPage] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(index);
  const [openEditModal, setEditModal] = useState(false);
  const [selPost, setSelPost] = useState(null);
  const [group, setGroup] = useState("privacy");
  const onDismissEditModal = () => setEditModal(false);
  useEffect(() => {
    if (check === false) {
      setSelectStatus(false);
    } else {
      setSelectStatus(true);
    }
  }, [check]);
  useEffect(() => {
    setSelectStatus(true);
  }, [selection]);
  function status() {
    if (selectStatus === true) {
      parentMember(id, true);
      setSelectStatus(false);
    } else {
      parentMember(id, false);
      setSelectStatus(true);
    }
  }
  const onTrigger = () => {
    parentCallback(id);
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
  function handleDescription(content, photoId, groupData) {
    parentDescription(content, photoId, groupData);
  }
  function openModal() {
    setShowPhotoPage(true);
  }
  function likePhotoAction(childData, groupStatus) {
    likeAction(childData, groupStatus);
  }

  const handleReportPhotot = (photos, i) => {
    setReportModalOpen(true);
    setSelPhoto(photos);
    setSelPhotoIndex(i);
  };
  return (
    <>
      <Col sm={4} lg={4} xl={3} className="px-2">
        <Media className={selectStatus === true ? "" : "show"}>
          <PhotoAction className="media-action">
            <div className="has-tooltip more">
              <div className="popover bs-popover-top">
                <div className="arrow"></div>
                <div className="popover-body">More Action</div>
              </div>
              <div className="circle">
                <FontAwesomeIcon
                  icon={faEllipsisH}
                  onClick={() => setDisplay(true)}
                />
              </div>
            </div>
            {display && isCurntUser ? (
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
                      {trash} Delete
                    </div>
                  </li>
                </ul>
              </div>
            ) : null}
            {!isCurntUser && display && (
              <div className="more-action-list">
                <ul>
                  <li>
                    <div
                      className="item-link"
                      onClick={() => handleReportPhotot(photo, index)}
                    >
                      <FontAwesomeIcon icon={faFlag} />
                      Report Photo
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </PhotoAction>
          <div
            className="media-wrap"
            onClick={() => {
              if (!isFromDetail) {
                setDisplay(false);
                !display && openModal();
              }
            }}
          >
            <img
              className="photo"
              src={photo?.attachment_data?.full}
              alt="Photo"
              onMouseOut={() => setDisplay(false)}
            />
          </div>
          {isCurntUser && (
            <div className="custom-control custom-checkbox select-popover">
              <input
                className="custom-control-input"
                id={"public" + id}
                type="checkbox"
                name={"status" + id}
                value={"public" + id}
                onChange={() => status()}
                checked={selectStatus === false}
              />
              <label
                className="custom-control-label"
                htmlFor={"public" + id}
              ></label>
              <div className="tooltip-panel">
                {selectStatus === true ? "Select" : "Unselect"}
                <em></em>
              </div>
            </div>
          )}
        </Media>
      </Col>
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
          id={id}
          parentResponse={moveImage}
          isGroup={isGroup}
          groupId={groupId}
        />
      )}
      {showPhotoPage && (
        <PhotoDetail
          selectedUseDet={selectedUseDet}
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
};
export default PhotoCard;
