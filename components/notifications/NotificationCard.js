import React, { useState } from "react";
import { Input, Modal, ModalBody, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { uploadModal } from "../../components/livefeed/photo.style";
import moment from "moment";
import { handleRedirection } from "../../components/layout/NotificationBell";
export default function NotificationCard({
  notification,
  index,
  id,
  check,
  notiStatus,
  parentCallback,
  parentUpdate,
  user,
  parentLinkUpdate,
}) {
  const [selectStatus, setSelectStatus] = useState(check);
  const [show, setShow] = useState(false);
  const extractContent = (s) => {
    var span = document.createElement("span");
    span.innerHTML = s;
    return span.textContent || span.innerText;
  };

  function status() {
    if (selectStatus === true) {
      setSelectStatus(false);
    } else {
      setSelectStatus(true);
    }
  }

  const onTrigger = () => {
    parentCallback(id);
  };
  const updateNotification = () => {
    parentUpdate(id);
  };
  const linkUpdate = () => {
    parentLinkUpdate(id);
  };
  return (
    <>
      <div className="notification-data-panel">
        <div className="notification-options">
          <div className="custom-control custom-checkbox">
            <Input
              className="custom-control-input"
              id={"public" + id}
              type="checkbox"
              name={"status" + id}
              value={"public" + id}
              onChange={() => status()}
              checked={!check ? selectStatus === true : check}
            />
            <label
              className="custom-control-label"
              htmlFor={"public" + id}
            ></label>
          </div>
          <div className="notification-avatar">
            <img src={notification.avatar_urls.thumb} />
          </div>
          <div
            className="notification-content"
            onClick={() => {
              handleRedirection(notification, user);
              notiStatus && linkUpdate();
              setSelectStatus(false);
            }}
          >
            <a>{extractContent(notification.description.rendered)}</a>
            <span>{moment(notification.date, "YYYYMMDD").fromNow()}</span>
          </div>
        </div>
        <div className="notification-icons">
          <div className="svg-tag">
            <FontAwesomeIcon
              icon={notiStatus ? faEyeSlash : faEye}
              onClick={() => {
                updateNotification();
                setSelectStatus(false);
              }}
            />
            <span className="tooltip-panel">
              <em></em>
              {notiStatus ? "Mark Read" : "Mark Unread"}
            </span>
          </div>
          <div className="svg-tag">
            <FontAwesomeIcon icon={faTrash} onClick={() => setShow(true)} />
            <span className="delete-panel">
              <em></em>delete
            </span>
          </div>
        </div>
      </div>
      <Modal
        className="modal-dialog-centered modal-sm"
        isOpen={show}
        css={uploadModal}
      >
        <ModalBody className="text-center">
          <p className="mb-4">
            Are you sure you want to Delete this notification?
          </p>
          <Button color="secondary-text" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              onTrigger();
              setShow(false);
              setSelectStatus(false);
            }}
          >
            Yes, Delete
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
}
