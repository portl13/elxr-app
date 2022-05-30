import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button, Alert } from "reactstrap";
function AddPhotoComment({
  setViewComment,
  user,
  createComment,
  viewComment,
  setShowCommentPost,
  showComment,
  commentId,
  activityId,
  getComment,
  commentCount,
  setCommentCount,
  parentCallback,
  status,
}) {
  const [content, setContent] = useState("");
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);
  const inputElement = useRef(null);
  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, [viewComment]);
  function addComment() {
    createComment(content);
  }
  function createAction() {
    addComment();
    setViewComment(false);
    setContent("");
  }
  function createReply() {
    axios
      .post(
        process.env.bossApi + `/activity/${activityId}/comment`,
        {
          parent_id: commentId,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        getComment(activityId);
        setShowCommentPost(false);
        setContent("");
        setCommentCount(commentCount + 1);
        status && parentCallback(res.data.comments);
      });
  }
  function notVisible() {
    viewComment && createAction();
    showComment && createReply();
  }
  return (
    <>
      <div className="activity-comments-panel">
        <form className="form-ac">
          <div className="ac-reply-avatar">
            <img className="avatar" src={user && user.avatar_urls.thumb} />
          </div>
          <div className="ac-reply-content">
            <textarea
              id="content"
              type="text"
              ref={inputElement}
              name="content"
              value={content}
              maxLength="100"
              onChange={(e) => {
                setContent(e.target.value);
                setVisible(false);
              }}
              required
            ></textarea>
            <Alert color="warning" isOpen={visible} toggle={onDismiss}>
              Content is required.
            </Alert>
            <div className="save-button-panel">
              <Button
                className="ac-reply-cancel"
                onClick={() => {
                  viewComment && setViewComment(false);
                  showComment && setShowCommentPost(false);
                  setContent("");
                }}
              >
                Cancel
              </Button>
              <Button
                className="post-button"
                onClick={() => {
                  content === "" ? setVisible(true) : notVisible();
                }}
              >
                Post
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default AddPhotoComment;
