import React, { useState } from 'react'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap'
import { css } from '@emotion/core'
import Link from 'next/link'

const style = css`
  .button-icon {
    background-color: transparent;
    border: none;
    padding: 0;
    color: var(--typo);
    margin-right: 0;
  }
  .dropdown-menu {
    background-color: var(--bg);
    min-width: 5rem;
  }
  .item-event-actions{
    padding: 0 0.5rem;
    color: var(--typo);
    cursor: pointer;
  }
  .item-event-actions a{
    color: inherit;
  }
  .item-event-actions:hover{
    color: var(--primary-color);
  }
`

function ChannelVideoActions({openDeleteModal, setOpenDeleteModal, openEditModal, setOpenEditModal}) {

  const [open, setOpen] = useState(false)

  const openModalDelete = () => {
    setOpen(!open)
    setOpenDeleteModal(!openDeleteModal)
  }

  const openModalEdit = () => {
    setOpen(!open)
    setOpenEditModal(!openEditModal)
  }

  return (
    <>
    <span css={style} className="d-block">
      <Dropdown direction="left" isOpen={open} toggle={() => setOpen(!open)}>
        <DropdownToggle className="button-icon">
          <FontAwesomeIcon className="avatar-icon" icon={faEllipsisH} />
        </DropdownToggle>
        <DropdownMenu>
          <span 
          onClick={openModalEdit}
          className="d-flex item-event-actions">
            Edit
          </span>
          <span 
          onClick={openModalDelete}
          className="d-flex item-event-actions">
              Delete
          </span>
        </DropdownMenu>
      </Dropdown>
    </span>
  </>
  )
}

export default ChannelVideoActions
