import React, { useState, useEffect, useRef } from "react";
import { Button, Alert } from "reactstrap";

export default function AddCommentCard({
  user,
  viewComment,
  setViewComment,
  parentCreate,
  id,
}) {
  const inputElement = useRef(null);
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);
  const [content, setContent] = useState("");
  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, [viewComment]);
  function notVisible() {
    parentCreate(content, id >= 1 ? id : null);
    setViewComment(false);
    setContent("");
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
              maxLength="100"
              value={content}
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
                  setViewComment(false);
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
