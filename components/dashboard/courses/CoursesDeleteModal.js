import { UserContext } from '@context/UserContext'
import { css } from '@emotion/core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { genericDelete } from '@request/dashboard'
import { TIMEOUT } from '@utils/constant'
import React, { useContext, useState } from 'react'
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

const deleteUrl = `${process.env.baseUrl}/wp-json/ldlms/v2/sfwd-courses`

function CoursesDeleteModal(props) {
  const alert = useAlert()
  const { user } = useContext(UserContext)
  const token = user?.token
  const { open, setOpen, course, mutateCourse } = props
  const [loading, setLoading] = useState(false)

  const toggle = () => {
    if (loading) return
    setOpen(!open)
  }

  const deleteCourse = async () => {
    if (!token) return
    try {
      setLoading(true)
      await genericDelete(`${deleteUrl}/${course.id}/?force=true`, token)
      await mutateCourse()
      setLoading(false)
      setOpen(false)
    } catch (error) {
      alert.error(error.message, TIMEOUT)
      setLoading(false)
    }
  }

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
        are you sure you want to delete the course{' '}
        <b className="text-primary">{course.title.rendered}</b> this action is
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
        <button onClick={deleteCourse} className="btn btn-danger border-25">
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
  )
}

export default CoursesDeleteModal
