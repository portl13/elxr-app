import { css } from "@emotion/core";
import CloseIcon from "@icons/CloseIcon";
import PlusIcon from "@icons/PlusIcon";
import React from "react";
import { Modal, ModalBody } from "reactstrap";

const modalStyle = css`
  .modal-content {
    background-color: var(--bg);
    border: 1px solid var(--white-color);
  }
  .Contain-img-width {
    width: 90px;
    height: 90px;
    border-radius: 20px;
    border: 2px dotted var(--white-color);
  }
  .icon-modal {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    bottom: 32px;
    left: 32px;
  }
`;

function LibraryAddModal({ open, setOpen }) {
  return (
    <Modal css={modalStyle} isOpen={open} toggle={() => setOpen(!open)}>
      <ModalBody>
        <div>
          <div>
            <div className="d-flex justify-content-end">
              <span onClick={()=> setOpen(!open)} className="pointer">
                <CloseIcon className="icon-setting" />
              </span>
            </div>
            <h5>Add Neew</h5>
          </div>
          <form action="">
            <div className="d-flex mt-4">
              <div className="form-check mr-5">
                <input
                  className="form-check-input"
                  type="radio"
                  name="library"
                  id="library"
                  value="option"
                  checked
                />
                <label className="form-check-label" for="library">
                  Video
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="library"
                  id="library"
                  value="option"
                />
                <label className="form-check-label" for="library">
                  Article
                </label>
              </div>
            </div>
            <div className="mt-4">
              <div className="input-default mr-0">
                <label htmlFor="category" className="w-100 mb-0">
                  Select Category
                  <select
                    name="category"
                    id=""
                    placeholder="Select Category"
                    className="w-100 bg-transparent border-0 text-white"
                  >
                    <option className="bg-dark" value="">
                      Food
                    </option>
                    <option className="bg-dark" value="">
                      Art
                    </option>
                    <option className="bg-dark" value="">
                      Music
                    </option>
                  </select>
                </label>
              </div>
              <div className="input-default mt-4 mr-0">
                <label htmlFor="title" className="w-100 mb-0">
                  Title
                  <input
                    name="title"
                    type="name"
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
              <div className="d-flex mt-4">
                <div className="form-check mr-5">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="method"
                    id="method"
                    value="option"
                    checked
                  />
                  <label className="form-check-label" for="method">
                    Free
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="method"
                    id="method"
                    value="option"
                  />
                  <label className="form-check-label" for="method">
                    Paid
                  </label>
                </div>
              </div>
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
          <div className="mt-4">
            <div className="Contain-img-width bg-segundary position-relative">
              <span className="pointer">
                <PlusIcon className="icon-modal" />
              </span>
            </div>
            <div>
                <span className="p-4 font-size-12">Upload</span>
            </div>
          </div>
          <div className="mt-3">
            <div>
              <button onClick={()=> setOpen(!open)} className="btn btn-create w-100 py-3">Add</button>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default LibraryAddModal;
