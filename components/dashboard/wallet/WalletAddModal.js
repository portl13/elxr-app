import { css } from "@emotion/core";
import CloseIcon from "@icons/CloseIcon";
import PlusIcon from "@icons/PlusIcon";
import React from "react";
import { Modal, ModalBody } from "reactstrap";

const modalWalletStyle = css`
  .modal-content {
    background-color: var(--bg);
    border: 1px solid var(--white-color);
  }
  .img-bank{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--primary-color);
  }
 
`;

function WalletAddModal({ open, setOpen }) {
  return (
    <Modal css={modalWalletStyle} isOpen={open} toggle={() => setOpen(!open)}>
      <ModalBody>
        <div>
          <div>
            <div className="d-flex justify-content-end">
              <span onClick={() => setOpen(!open)} className="pointer">
                <CloseIcon className="icon-setting" />
              </span>
            </div>
            <div>
              <h4 className="mb-0">WITHDRAW MONEY</h4>
              <p>
                You want to withdraw from wallet and send to your account? Enter
                withdraw amount and send a request.
              </p>
            </div>
          </div>
          <form action="">
            <div className="mt-4">
              <div className="input-default mr-0 mt-4">
                <label htmlFor="number" className="w-100 mb-0">
                  $
                  <input
                    name="number"
                    type="number"
                    id=""
                    className="w-100 bg-transparent border-0 text-white"
                  />
                </label>
              </div>
            </div>
          </form>
          <div>
            <div className="pt-3">
              <span>Transfer to Bank</span>
            </div>
            <div className="d-flex justify-content-between align-items-center
            ">
              <div className="d-flex">
                <div className="img-bank">

                </div>
                <div className="pl-2">
                    <span className="d-block">xxxxxxxxxx6598</span>
                    <span>Bank of America</span>
                </div>
              </div>
              <div className="d-flex">
                <i className="pr-1">
                  <PlusIcon className="icon-unlock" />
                </i>
                <span>Add New Bank</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div>
              <button
                onClick={() => setOpen(!open)}
                className="btn btn-create w-100 py-3"
              >
                Send Withdrawal Request
              </button>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default WalletAddModal;
