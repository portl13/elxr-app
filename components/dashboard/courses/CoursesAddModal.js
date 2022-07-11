import { css } from "@emotion/core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const style = css`
  .modal-title {
    width: 100%;
  }
  .icon-close {
    width: 10px;
  }
  .icon-close:hover {
    color: var(--danger);
  }
  .btn-delete:hover {
    background-color: transparent;
  }
  .modal-header,
  .modal-body,
  .modal-footer {
    background-color: var(--bg);
  }
`;

function CoursesAddModal(props) {
  const { open, setOpen } = props;
  const [loading, setLoading] = useState(false);

  const toggle = () => {
    if (loading) return;
    setOpen(!open);
  };

  return (
    <Modal css={style} centered isOpen={open} toggle={toggle}>
      <ModalHeader className="w-100">
        <div className="d-flex justify-content-between w-100">
          <span>Delete Course</span>
          <button
            className="btn-delete btn btn-transparent border-none p-0"
            onClick={toggle}
          >
            <FontAwesomeIcon className="icon-close pointer" icon={faTimes} />
          </button>
        </div>
      </ModalHeader>
      <ModalBody>
        are you sure you want to delete the course{" "}
        <b className="text-primary">{""}</b> this action is irreversible?
      </ModalBody>
      <ModalFooter>
        <button
          disabled={loading}
          className="btn btn-outline-danger border-25"
          onClick={() => setOpen(!open)}
        >
          Cancel
        </button>
        <button className="btn btn-danger border-25">
          {!loading ? (
            "Delete"
          ) : (
            <div
              className="spinner-border spinner-border-sm"
              role="status"
            ></div>
          )}
        </button>
      </ModalFooter>
    </Modal>
  );
}

export default CoursesAddModal;
