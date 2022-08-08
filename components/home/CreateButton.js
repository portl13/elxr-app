import EventModalSelectChannel from '@components/dashboard/events/EventModalSelectChannel'
import { css } from '@emotion/core'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PlusIcon from '@icons/PlusIcon'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap'

// New Channel
// New Event
// New Video
// New Podcast
// New Course
// New Blog
// New Product

const style = css`
  .dropdown-menu {
    padding: 0;
  }
  .dropdown-item {
    background-color: var(--dark-color);
    color: var(--typo);
  }
`

function CreateButton() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [openModalChannel, setOpenModalChannel] = useState(false)
  const [type, setType] = useState('')

  const hadleClick = (type) => {
    setOpenModalChannel(true)
    setOpen(!open)
    setType(type)
  }

  const handleCreate = (id) => {
    switch (type) {
      case 'event':
        router.push(`/dashboard/channel/${id}/create-event`)
        break
      case 'blog':
        router.push(`/dashboard/blog/${id}/add-blog`)
        break
      default:
        router.push(`/dashboard/channel/${id}/create-event`)
        break
    }
  }

  return (
    <>
      <Dropdown
        css={style}
        direction="bottom"
        isOpen={open}
        toggle={() => setOpen(!open)}
      >
        <DropdownToggle tag={'span'}>
          <button className="btn btn-create d-flex">
            <span className="menu-icon d-flex">
              <PlusIcon className="icon-plus" />
            </span>
            <span className="menu-title font-size-14 d-flex mx-2">Create</span>
            <span style={{ marginTop: '2px' }} className="menu-icon d-flex">
              <FontAwesomeIcon icon={faAngleDown} className="icon-plus" />
            </span>
          </button>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem className="pointer" tag={'span'}>
            <Link href="/dashboard/channels/create-channel">
              <a>New Channel</a>
            </Link>
          </DropdownItem>
          <DropdownItem
            onClick={() => hadleClick('event')}
            className="pointer"
            tag={'span'}
          >
            New Event
          </DropdownItem>
          <DropdownItem className="pointer" tag={'span'}>
            New Video
          </DropdownItem>
          <DropdownItem className="pointer" tag={'span'}>
            New Podcast
          </DropdownItem>
          <DropdownItem className="pointer" tag={'span'}>
            <Link href="/dashboard/courses/add-course">
              <a>New Course</a>
            </Link>
          </DropdownItem>
          <DropdownItem
            onClick={() => hadleClick('blog')}
            className="pointer"
            tag={'span'}
          >
            New Blog
          </DropdownItem>
          <DropdownItem className="pointer" tag={'span'}>
            <Link href="/dashboard/products/add-product">
              <a>New Product</a>
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {openModalChannel && (
        <EventModalSelectChannel
          handleCreate={handleCreate}
          open={openModalChannel}
          setOpen={setOpenModalChannel}
        />
      )}
    </>
  )
}

export default CreateButton
