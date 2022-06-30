import React, { useState } from 'react'
import { Modal, ModalBody } from 'reactstrap'
import { css } from '@emotion/core'
import Editor from '@components/shared/editor/Editor'
import CloseIcon from '@icons/CloseIcon'

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
`
function PolicySettingsForm({ title = '', data = '', form, field }) {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)

  return (
    <>
      <div className="border-white mb-5">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4 className="m-0 font-size-18 ">{title}</h4>
          <button
            onClick={toggle}
            className="bg-transparent text-white border-0"
          >
            Edit
          </button>
        </div>
        <p className="mb-0" dangerouslySetInnerHTML={{ __html: data }} />
      </div>
      <Modal size="lg" css={modalStyle} centered isOpen={open} toggle={toggle}>
        <ModalBody>
            <div className='d-flex justify-content-end'>
                <span 
                onClick={toggle}
                className='pointer'>
                    <CloseIcon className="icon-modal position-static" />
                </span>
            </div>
          <header className="mb-4">
            <h5>Edit {title}</h5>
          </header>
          <form onSubmit={form.handleSubmit}>
            <div className={`input-search mr-0 border-radius-35 mb-4`}>
              <label className="w-100 upload-info mb-0">
                <div className="d-flex justify-content-between">
                  <span>Title</span>
                </div>

                <input
                  className="bg-transparent border-0 text-white w-100 mr-0"
                  readOnly
                  type={'text'}
                  value={title}
                />
              </label>
            </div>
            <Editor
              onChange={(value) => form.setFieldValue(field, value)}
              className="editor-styles"
              value={form.values[field]}
            />
            <div className="d-flex mt-3 justify-content-center justify-content-md-end w-100">
              <button className="btn btn-create px-5" type="submit">
                Update
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  )
}

export default PolicySettingsForm
