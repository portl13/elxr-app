import { UserContext } from '@context/UserContext'
import { css } from '@emotion/core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { genericDelete } from '@request/dashboard'
import { TIMEOUT } from '@utils/constant'
import React, { useState } from 'react'
import { useContext } from 'react'
import { useAlert } from 'react-alert'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

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
`

const url = `${process.env.apiV2}/blogs`

function BlogsDeleteModal(props) {
  const { user } = useContext(UserContext)
  const token = user?.token
  const alert = useAlert()
  const { open, setOpen, blog, mutate } = props
  const [loading, setLoading] = useState(false)

  const toggle = () => {
    if (loading) return
    setOpen(!open)
  }

  const deleteBlog = async () => {
    try {
      setLoading(true)
      await genericDelete(`${url}/${blog.id}`, token)
      await mutate()
    } catch (error) {
      alert.error(error.message, TIMEOUT)
    }finally{
      setLoading(false)
      toggle()
    }
  }

  return (
    <>
      <Modal css={style} centered isOpen={open} toggle={toggle}>
        <ModalHeader className="w-100">
          <div className="d-flex justify-content-between w-100">
            <span>Delete Blog</span>
            <button
              className="btn-delete btn btn-transparent border-none p-0"
              onClick={toggle}
            >
              <FontAwesomeIcon className="icon-close pointer" icon={faTimes} />
            </button>
          </div>
        </ModalHeader>
        <ModalBody>
          are you sure you want to delete the Blog{' '}
          <b className="text-primary">{blog.title}</b> this action is
          irreversible?
        </ModalBody>
        <ModalFooter>
          <button
            disabled={loading}
            className="btn btn-outline-danger border-25"
            onClick={() => setOpen(!open)}
          >
            Cancel
          </button>
          <button 
          onClick={deleteBlog}
          className="btn btn-danger border-25">
            {!loading ? (
              'Delete'
            ) : (
              <div
                className="spinner-border spinner-border-sm"
                role="status"
              ></div>
            )}
          </button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default BlogsDeleteModal
