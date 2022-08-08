import ChannelAddAudioModal from '@components/dashboard/channels/ChannelAddAudioModal'
import ChannelAddVideoModal from '@components/dashboard/channels/ChannelAddVideoModal'
import EventModalSelectChannel from '@components/dashboard/events/EventModalSelectChannel'
import { UserContext } from '@context/UserContext'
import { css } from '@emotion/core'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PlusIcon from '@icons/PlusIcon'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
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
  @media (max-width: 767px) {
    .btn-plux {
      padding: 0;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .b-icon-p {
      width: 16px;
      height: 18px;
    }
  }
`

function CreateButton() {
  const router = useRouter()
  const { user } = useContext(UserContext)
  const token = user?.token
  const [open, setOpen] = useState(false)
  const [openAudio, setopenAudio] = useState(false)
  const [openAddVideo, setOpenAddVideo] = useState(false)
  const [channelID, setChannelID] = useState(null)
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
      case 'video':
        setChannelID(id)
        setOpenAddVideo(true)
        break
      case 'podcast':
        setChannelID(id)
        setopenAudio(true)
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
          <button className="btn btn-create d-flex btn-plux">
            <span className="menu-icon d-flex b-icon-p">
              <PlusIcon className="icon-plus" />
            </span>
            <span className="menu-title font-size-14 d-none d-md-flex mx-2">
              Create
            </span>
            <span
              style={{ marginTop: '2px' }}
              className="menu-icon d-none d-md-flex"
            >
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
          <DropdownItem
            onClick={() => hadleClick('video')}
            className="pointer"
            tag={'span'}
          >
            New Video
          </DropdownItem>
          <DropdownItem
            onClick={() => hadleClick('podcast')}
            className="pointer"
            tag={'span'}
          >
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
          <DropdownItem className="pointer" tag={'span'}>
            <Link href="/community/create-group">
              <a>New Community</a>
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
      {token && channelID && openAudio && (
        <ChannelAddAudioModal
          token={token}
          id={channelID}
          open={openAudio}
          setOpen={setopenAudio}
          mutateAudio={()=>{}}
        />
      )}
      {openAddVideo && channelID && token && (
        <ChannelAddVideoModal
          token={token}
          id={channelID}
          open={openAddVideo}
          setOpen={setOpenAddVideo}
          mutateVideo={()=>{}}
        />
      )}
    </>
  )
}

export default CreateButton
