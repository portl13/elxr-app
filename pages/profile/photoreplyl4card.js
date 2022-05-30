import React, { useState, useEffect } from "react";
import moment from "moment";
import { Button, Modal, ModalBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faTrash } from "@fortawesome/free-solid-svg-icons";
import { uploadModal } from "../../components/livefeed/photo.style";
import AddPhotoComment from "./addphotocomment";
import PhotoReplyL5Card from "./photoreplyl5card";
import Link from "next/link";
import { getProfileRoute } from "../../utils/constant";
function PhotoReplyL4Card({
  photoIndex,
  comment,
  avtar,
  name,
  date,
  commentId,
  handleDelete,
  replyCount,
  reply,
  showCommentPost,
  setShowCommentPost,
  activityId,
  result1,
  setCommentCount,
  commentCount,
  user,
  getComment,
  parentCallback,
  modalClose,
  userId,
}) {
  const [show, setShow] = useState(false);
  const [moreOption, setMoreOption] = useState(false);
  const [comments, setAllComments] = useState([]);
  const [showCommentPost1, setShowCommentPost1] = useState(false);
  const [result, setResult] = useState(reply);
  const count = replyCount;
  const loadChildComments = (parent) => {
    let res = [],
      comnt = [];
    for (let k = 0; k < parent.length; k++) {
      comnt.push(parent[k]);
      if (parent[k].comment_count) {
        res = [...res, ...parent[k].comments];
      }
    }
    setAllComments((data) => [...data, ...comnt]);
    if (res.length) loadChildComments(res);
    else return false;
  };
  useEffect(() => {
    if (result) {
      for (let k = 0; k < result.length; k++) {
        setAllComments((data) => [...data, result[k]]);
        if (result[k].comment_count) loadChildComments(result[k].comments);
      }
    }
  }, [result]);
  return (
    <>
      <div
        className="activity-comments-panel activity-inner-comments-panel pleft-45"
        onMouseLeave={() => setMoreOption(false)}
      >
        <form className="form-ac">
          <div className="ac-reply-avatar">
            <img className="avatar" src={avtar} />
          </div>
          <div
            className="ac-reply-content"
            onClick={() => setMoreOption(false)}
          >
            <div className="inner-content">
              <Link
                className="mr-1"
                href={getProfileRoute(name, userId, "timeline", "personal")}
              >
                <span onClick={() => modalClose()}>{name}</span>
              </Link>
              <span>
                <a href="">{moment(date).fromNow()}</a>
              </span>
              <div className="dots-section">
                <FontAwesomeIcon
                  icon={faEllipsisH}
                  onMouseOver={() => setMoreOption(true)}
                />
                <div className="tooltip-panel">More Options</div>
                {moreOption && (
                  <div className="more-action-list">
                    <div className="inner-tag">
                      <div className="main-tag">
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
            </div>
            <div className="comment-content">
              <p>{comment}</p>
            </div>
            <div className="save-button-panel">
              <Button
                className="ac-reply-cancel"
                onClick={() => setShowCommentPost1(true)}
              >
                Reply
              </Button>
            </div>
          </div>
        </form>
      </div>
      {replyCount >= 1 &&
        comments.map((reply, index) => (
          <PhotoReplyL5Card
            photoIndex={index}
            comment={reply.content_stripped}
            avtar={reply.user_avatar.thumb}
            name={reply.name}
            date={reply.date}
            commentId={reply.id}
            handleDelete={handleDelete}
            replyCount={reply.comment_count}
            reply={reply.comment_count >= 1 ? reply.comments : null}
            showCommentPost={showCommentPost1}
            setShowCommentPost={setShowCommentPost1}
            user={user}
            activityId={activityId}
            getComment={getComment}
            result1={result}
            setCommentCount={setCommentCount}
            commentCount={commentCount}
            parentCallback={parentCallback}
            userId={reply.user_id}
            modalClose={modalClose}
          />
        ))}
      {showCommentPost1 && (
        <AddPhotoComment
          user={user}
          showComment={showCommentPost1}
          setShowCommentPost={setShowCommentPost1}
          commentId={result1[photoIndex].id}
          activityId={activityId}
          setResult={setResult}
          getComment={getComment}
          commentCount={commentCount}
          setCommentCount={setCommentCount}
        />
      )}
      <Modal
        className="modal-dialog-centered modal-sm"
        isOpen={show}
        css={uploadModal}
      >
        <ModalBody className="text-center">
          <p className="mb-4">Are you sure you want to Delete this comment?</p>
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
              handleDelete(commentId, count);
              setMoreOption(false);
              setShow(false);
            }}
          >
            Yes, Delete
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
}
export default PhotoReplyL4Card;
