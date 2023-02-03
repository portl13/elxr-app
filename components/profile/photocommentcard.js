import React, { useState } from "react";
import moment from "moment";
import { Button, Modal, ModalBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faTrash } from "@fortawesome/free-solid-svg-icons";
import { uploadModal } from "../../components/livefeed/photo.style";
import PhotoReplyL1Card from "@components/profile/photoreplyl1card";
import AddPhotoComment from "@components/profile/addphotocomment";
import Link from "next/link";
import { getProfileRoute } from "../../utils/constant";
function PhotoCommentCard({
  comment,
  avtar,
  name,
  date,
  comment_Id,
  handleDelete,
  replyCount,
  reply,
  user,
  activityId,
  getComment,
  selectedUseDet,
  commentDetail,
  setSelPost,
  commentCount,
  setCommentCount,
  parentCallback,
  userId,
  modalClose,
}) {
  const [show, setShow] = useState(false);
  const [moreOption, setMoreOption] = useState(false);
  const [showCommentPost, setShowCommentPost] = useState(false);
  const [commentId, setCommentId] = useState(comment_Id);
  const [result, setResult] = useState(reply);
  const count = replyCount;
  function notVisible() {
    setMoreOption(false);
    setShow(false);
  }
  return (
    <>
      <div
        className="activity-comments-panel"
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
              {commentDetail?.user_id === user?.id ? (
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
              ) : (
                ""
              )}
            </div>
            <div className="comment-content">
              <p>{comment}</p>
            </div>
            <div className="save-button-panel">
              <Button
                className="ac-reply-cancel"
                onClick={() => setShowCommentPost(true)}
              >
                Reply
              </Button>
            </div>
          </div>
        </form>
      </div>
      {replyCount >= 1 &&
        result.map((rereply, index) => (
          <PhotoReplyL1Card
            photoIndex={index}
            comment={rereply.content_stripped}
            avtar={rereply.user_avatar.thumb}
            name={rereply.name}
            date={rereply.date}
            commentId={rereply.id}
            handleDelete={handleDelete}
            replyCount={rereply.comment_count}
            reply={rereply.comment_count >= 1 ? rereply.comments : null}
            showCommentPost={showCommentPost}
            setShowCommentPost={setShowCommentPost}
            setCommentId={setCommentId}
            activityId={activityId}
            getComment={getComment}
            result1={result}
            user={user}
            setCommentCount={setCommentCount}
            commentCount={commentCount}
            parentCallback={parentCallback}
            userId={rereply?.user_id}
            modalClose={modalClose}
          />
        ))}
      {showCommentPost && (
        <AddPhotoComment
          user={user}
          showComment={showCommentPost}
          setShowCommentPost={setShowCommentPost}
          commentId={commentId}
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
          <Button color="secondary-text" onClick={() => notVisible()}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              handleDelete(commentId, count);
              notVisible();
            }}
          >
            Yes, Delete
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
}
export default PhotoCommentCard;
