import React, { useState, useEffect, useRef } from "react";
import { uploadModal } from "../livefeed/photo.style";
import { Button, Modal, ModalBody, ModalHeader, Alert } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEllipsisH,
  faTrash,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import axios from "axios";
import PhotoAction from "@components/profile/photoaction";
import PhotoCommentCard from "./photocommentcard";
import AddPhotoComment from "@components/profile/addphotocomment";
import Link from "next/link";
import { getProfileRoute } from "@utils/constant";
function PhotoDetail({
  showModal,
  user,
  parentCallback,
  imageUrl,
  id,
  date,
  description,
  parentDescription,
  parentGroupData,
  handleDelete,
  result,
  index,
  setPhotoIndex,
  activityId,
  likeAction,
  isCurntUser,
  selectedUseDet,
  setResult,
  setShowModal,
  setEditModal,
  photoDetail,
}) {
  const [showEdit, setShowEdit] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [addDescription, setAddDescription] = useState(true);
  const [editScreen, setEditScreen] = useState(true);
  const [editDescription, setEditDescription] = useState(false);
  const [content, setContent] = useState(description);
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [moreOption, setMoreOption] = useState(false);
  const [picIndex, setPicIndex] = useState(index);
  const [favorite, setFavorite] = useState();
  const [showResult, setShowResult] = useState(false);
  const [commentResult, setCommentResult] = useState([]);
  const [viewComment, setViewComment] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const inputElement = useRef(null);
  const onDismiss = () => setVisible(false);
  useEffect(() => activityDetail(), [activityId, parentGroupData]);
  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, [showEdit]);
  useEffect(() => getComment(activityId), [activityId]);
  useEffect(() => {
    if (description !== "" && parentGroupData) {
      setEditDescription(false);
      setEditScreen(true);
      setContent(description);
    } else if (description === "" && parentGroupData) {
      setContent(description);
    }
  }, [description, parentGroupData]);
  function updateContent() {
    parentDescription(content, id, false);
  }
  function getNextIndex() {
    setPicIndex(picIndex + 1);
    setPhotoIndex(picIndex + 1);
    setAddDescription(true);
    setShowEdit(false);
    setEditDescription(false);
    setEditScreen(true);
    setShowResult(false);
    setShowComment(false);
    setViewComment(false);
  }
  function getPrevIndex() {
    setPicIndex(picIndex - 1);
    setPhotoIndex(picIndex - 1);
    setAddDescription(true);
    setShowEdit(false);
    setEditDescription(false);
    setEditScreen(true);
    setShowResult(false);
    setShowComment(false);
    setViewComment(false);
  }
  function like(childData, groupStatus) {
    likeAction(childData, groupStatus);
  }
  function activityDetail() {
    axios(process.env.bossApi + `/activity/${activityId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      setShowResult(true);
      setFavorite(res.data.favorited);
      setCommentCount(res.data.comment_count);
    });
  }
  function getComment(activity_id) {
    setCommentResult([]);
    axios
      .get(process.env.bossApi + `/activity/${activity_id}/comment`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setCommentResult(res.data.comments);
        setShowComment(true);
      });
  }
  function createComment(childData) {
    axios
      .post(
        process.env.bossApi + `/activity/${activityId}/comment`,
        {
          content: childData,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        setCommentResult(res.data.comments);
        setCommentCount(commentCount + 1);
      });
  }
  function commentDelete(childData, count) {
    setCommentResult([]);
    axios(process.env.bossApi + `/activity/${childData}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      getComment(activityId);
      if (count >= 1) {
        setCommentCount(commentCount - count - 1);
      } else {
        setCommentCount(commentCount - 1);
      }
    });
  }
  function addComment(childData) {
    setCommentResult([]);
    getComment(activityId);
  }
  function doneEdit() {
    content === "" ? setVisible(true) : updateContent();
  }
  return (
    <>
      <Modal
        className="modal-dialog-centered album-modal-container"
        css={uploadModal}
        isOpen={showModal}
      >
        <ModalHeader closeButton>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => parentCallback(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </ModalHeader>
        <ModalBody>
          <div className="bb-media-model-inner">
            <div className="bb-media-section">
              {picIndex > 0 && (
                <Button className="prev-icon" onClick={() => getPrevIndex()}>
                  <span></span>
                </Button>
              )}
              <img src={imageUrl} />
              {picIndex + 1 === result?.length ? null : (
                <Button className="next-icon" onClick={() => getNextIndex()}>
                  <span></span>
                </Button>
              )}
            </div>
            <div className="bb-media-info-section">
              <ul>
                <li>
                  <div className="bp-activity-head">
                    <div className="activity-avatar item-avatar">
                      <a href="@components/profile/photodetail">
                        <img
                          src={selectedUseDet?.avatar_urls.thumb}
                          className="avatar"
                          alt="Profile photo"
                        />
                      </a>
                    </div>
                    <div className="activity-header">
                      <p>
                        <Link
                          className="mr-1"
                          href={getProfileRoute(
                            selectedUseDet?.profile_name,
                            selectedUseDet?.id,
                            "timeline",
                            "personal"
                          )}
                        >
                          <span onClick={() => parentCallback(false)}>
                            {selectedUseDet?.profile_name}{" "}
                          </span>
                        </Link>
                        posted an update
                      </p>
                      <p className="activity-date">
                        <a href="@components/profile/photodetail">{moment(date).fromNow()}</a>
                      </p>
                    </div>
                    {isCurntUser && (
                      <div className="dots-section">
                        <FontAwesomeIcon
                          icon={faEllipsisH}
                          onClick={() =>
                            moreOption
                              ? setMoreOption(false)
                              : setMoreOption(true)
                          }
                        />
                        <div className="tooltip-panel">More Options</div>
                        {moreOption && (
                          <div className="more-action-list">
                            <div className="inner-tag">
                              <div className="main-tag">
                                {/* <div
                                  className="item-link"
                                  onClick={() => {
                                    setEditModal(true);
                                    setShowModal(false);
                                  }}
                                >
                                  <FontAwesomeIcon icon={faPencilAlt} />
                                  Edit
                                </div> */}
                                <div
                                  className="item-link"
                                  onClick={() => setShow(true)}
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                  Delete
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="activity-media-description">
                    <div className="bp-media-activity-description"></div>
                    {!isCurntUser && content ? <div>{content}</div> : ""}
                    {description === ""
                      ? addDescription &&
                        isCurntUser && (
                          <div
                            className="edit-tag"
                            onClick={() => {
                              setAddDescription(false);
                              setShowEdit(true);
                            }}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                            <span className="add">Add a description</span>
                          </div>
                        )
                      : editScreen &&
                        isCurntUser && (
                          <div>
                            <div className="description-data-div">
                              {description}
                            </div>
                            <div
                              className="edit-tag"
                              onClick={() => {
                                setEditDescription(true);
                                setEditScreen(false);
                              }}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                              <span className="add">Edit</span>
                            </div>
                          </div>
                        )}
                    {showEdit && description === "" && (
                      <div className="description-edit-panel">
                        <textarea
                          type="text"
                          ref={inputElement}
                          placeholder="Add Description"
                          value={content}
                          maxLength="30"
                          onChange={(e) => {
                            setContent(e.target.value);
                            setVisible(false);
                          }}
                          required
                        ></textarea>
                        <Alert
                          color="warning"
                          isOpen={visible}
                          toggle={onDismiss}
                        >
                          Description required.
                        </Alert>
                        <div className="button-tag">
                          <Button
                            className="cancel-btn"
                            onClick={() => {
                              setShowEdit(false);
                              setContent("");
                              setAddDescription(true);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            className="done-btn"
                            onClick={() => doneEdit()}
                          >
                            Done Editing
                          </Button>
                        </div>
                      </div>
                    )}
                    {editDescription && (
                      <div className="description-edit-panel">
                        <textarea
                          type="text"
                          value={content}
                          maxLength="30"
                          onChange={(e) => {
                            setContent(e.target.value);
                            setVisible(false);
                          }}
                        ></textarea>
                        <Alert
                          color="warning"
                          isOpen={visible}
                          toggle={onDismiss}
                        >
                          Description required.
                        </Alert>
                        <div className="button-tag">
                          <Button
                            className="cancel-btn"
                            onClick={() => {
                              setContent(description);
                              setEditDescription(false);
                              setEditScreen(true);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            className="done-btn"
                            onClick={() => doneEdit()}
                          >
                            Done Editing
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  {showResult && (
                    <>
                      <div className="profile-count-ui">
                        {favorite && (
                          <>
                            <span className="like-profile-panel">
                              You like this{" "}
                            </span>
                            <em></em>
                          </>
                        )}
                        {commentCount === 0 ? null : (
                          <span className="like-profile-panel">
                            {commentCount}{" "}
                            {commentCount === 1 ? "Comment" : "Comments"}{" "}
                          </span>
                        )}
                      </div>

                      <div className="activity-buttons-action">
                        <PhotoAction
                          activityId={activityId}
                          parentCallback={like}
                          like={favorite}
                          setViewComment={setViewComment}
                          photoDetail={photoDetail}
                        />
                      </div>
                    </>
                  )}
                  {showComment &&
                    commentResult &&
                    commentResult.map((comment) => (
                      <PhotoCommentCard
                        commentDetail={comment}
                        selectedUseDet={selectedUseDet}
                        comment={comment.content_stripped}
                        avtar={comment.user_avatar.thumb}
                        name={comment.name}
                        date={comment.date}
                        comment_Id={comment.id}
                        handleDelete={commentDelete}
                        replyCount={comment.comment_count}
                        reply={
                          comment.comment_count >= 1 ? comment.comments : null
                        }
                        user={user}
                        activityId={comment.primary_item_id}
                        getComment={getComment}
                        setCommentCount={setCommentCount}
                        commentCount={commentCount}
                        parentCallback={addComment}
                        userId={comment.user_id}
                        modalClose={parentCallback}
                      />
                    ))}
                  {viewComment && (
                    <AddPhotoComment
                      setViewComment={setViewComment}
                      user={user}
                      createComment={createComment}
                      viewComment={viewComment}
                      getComment={getComment}
                    />
                  )}
                </li>
              </ul>
            </div>
          </div>
        </ModalBody>
      </Modal>
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
              setMoreOption(false);
            }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              handleDelete(id);
              setShow(false);
              setMoreOption(false);
              setEditDescription(false);
              setShowEdit(false);
              description === "" ? setContent("") : null;
              setAddDescription(true);
              setEditScreen(true);
            }}
          >
            Yes, Delete
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
}
export default PhotoDetail;
