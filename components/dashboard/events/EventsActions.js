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

function EventsActions({event, openDeleteModal, setOpenDeleteModal}) {
  const [open, setOpen] = useState(false)
  const openModalDelete = () => {
    setOpen(!open)
    setOpenDeleteModal(!openDeleteModal)
  }
  return (
    <>
      <span css={style} className="actions-events d-block mr-2">
        <Dropdown direction="left" isOpen={open} toggle={() => setOpen(!open)}>
          <DropdownToggle className="button-icon">
            <FontAwesomeIcon className="avatar-icon" icon={faEllipsisH} />
          </DropdownToggle>
          <DropdownMenu>
            <span className="d-flex item-event-actions">
              <Link href={`/dashboard/event/edit/${event.id}`}>
                <a>Edit</a>
              </Link>
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

export default EventsActions
