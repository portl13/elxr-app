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

function ChangePasswordAddModal({ openModal, setOpenModal }) {
  return (
    <div>
      <Modal
        css={modalInviteStyle}
        isOpen={openModal}
        toggle={() => setOpenModal(!openModal)}
      >
        <ModalBody>
          <div>
            <div>
              <div className="d-flex justify-content-end">
                <span
                  onClick={() => setOpenModal(!openModal)}
                  className="pointer"
                >
                  <CloseIcon className="icon-setting" />
                </span>
              </div>
            </div>
            <form action="">
              <div className="mt-5">
                <div className="input-default mt-4 mr-0">
                  <label htmlFor="current-password" className="w-100 mb-0">
                    Current Password
                    <input
                      name="current-password"
                      type="password"
                      id=""
                      className="w-100 bg-transparent border-0 text-white"
                    />
                  </label>
                </div>
                <div className="input-default mt-4 mr-0">
                  <label htmlFor="new-password" className="w-100 mb-0">
                    New Password
                    <input
                      name="new-password"
                      type="password"
                      id=""
                      className="w-100 bg-transparent border-0 text-white"
                    />
                  </label>
                </div>
                <div className="input-default mt-4 mr-0">
                  <label htmlFor="confirm-new-password" className="w-100 mb-0">
                    Confirm New Password
                    <input
                      name="confirm-new-password"
                      type="password"
                      id=""
                      className="w-100 bg-transparent border-0 text-white"
                    />
                  </label>
                </div>
              </div>
            </form>
            <div className="mt-4 mb-3">
              <div className="d-flex justify-content-end">
                <button
                  onClick={() => setOpenModal(!openModal)}
                  className="btn btn-create w-100 py-3"
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ChangePasswordAddModal;
