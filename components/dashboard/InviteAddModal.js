import { css } from "@emotion/core";
import CloseIcon from "@icons/CloseIcon";
import React from "react";
import { Modal, ModalBody } from "reactstrap";

const modalInviteStyle = css`
  .modal-content {
    background-color: var(--bg);
    border: 1px solid var(--white-color);
  }
  
`;

function InviteAddModal({ open, setOpen }) {
  return (
    <Modal css={modalInviteStyle} isOpen={open} toggle={() => setOpen(!open)}>
      <ModalBody>
        <div>
          <div>
            <div className="d-flex justify-content-end">
              <span onClick={() => setOpen(!open)} className="pointer">
                <CloseIcon className="icon-setting" />
              </span>
            </div>
            <h5>Invite Client</h5>
          </div>
          <form action="">
            <div className="mt-4">
              <div className="input-default mt-4 mr-0">
                <label htmlFor="title" className="w-100 mb-0">
                  Email Address <span className="text-primary">*</span>
                  <input
                    name="title"
                    type="email"
                    id=""
                    className="w-100 bg-transparent border-0 text-white"
                  />
                </label>
              </div>
              <div className="input-default mt-4 mr-0">
                <label htmlFor="description" className="w-100">
                  Description
                  <textarea
                    name="description"
                    id="description"
                    className="bg-transparent border-0 w-100 text-white"
                    cols="30"
                    rows="6"
                  ></textarea>
                </label>
              </div>
            </div>
          </form>
          <div className="mt-3">
            <div className="d-flex justify-content-end">
              <button
                onClick={() => setOpen(!open)}
                className="btn btn-create  py-3"
              >
                Invite to Weshare
              </button>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default InviteAddModal;
