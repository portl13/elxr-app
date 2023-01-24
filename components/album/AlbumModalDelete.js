import React, { useContext, useState } from 'react'
import { css } from '@emotion/core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { genericDelete } from '@request/dashboard'
import { useAlert } from 'react-alert'
import { TIMEOUT } from '@utils/constant'
import { UserContext } from '@context/UserContext'

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
`

const deleteUrl = `${process.env.apiV2}/album`

function AlbumModalDelete({ open, setOpen, album , mutate}) {
    const alert = useAlert()
    const { user } = useContext(UserContext)
    const token = user?.token
    const [loading, setLoading] = useState(false)

    const toggle = () => {
        if (loading) return
        setOpen(!open)
    }

    const deleteEvent = async () => {
        if(!token) return
        try {
            setLoading(true)
            await genericDelete(`${deleteUrl}/${album.id}/`, token)
            await mutate(album.id)
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
                    <span>Delete Album</span>
                    <button
                        className="btn-delete btn btn-transparent border-none p-0"
                        onClick={toggle}
                    >
                        <FontAwesomeIcon className="icon-close pointer" icon={faTimes} />
                    </button>
                </div>
            </ModalHeader>
            <ModalBody>
                are you sure you want to delete the album <b className={"text-danger"}>{album?.title}</b> this
                action is irreversible?
            </ModalBody>
            <ModalFooter>
                <button
                    disabled={loading}
                    className="btn btn-outline-danger border-25"
                    onClick={() => setOpen(!open)}
                >
                    Cancel
                </button>
                <button className="btn btn-danger border-25" onClick={deleteEvent}>
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

export default AlbumModalDelete
