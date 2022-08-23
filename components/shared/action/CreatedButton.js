import ChannelAddAudioModal from '@components/dashboard/channels/ChannelAddAudioModal'
import ChannelAddVideoModal from '@components/dashboard/channels/ChannelAddVideoModal'
import EventModalSelectChannel from '@components/dashboard/events/EventModalSelectChannel'
import { UserContext } from '@context/UserContext'
import AddPlusIcon from '@icons/AddPlusIcon'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'

function CreatedButton({ typeAdd }) {
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

  if(!user || !user?.roles?.includes('wcfm_vendor')) {
    return ''
  }

  return (
    <>
      <button
        onClick={() => hadleClick(typeAdd)}
        className="btn btn-detail-action"
      >
        <span>ADD</span>
        <span className="btn-detail-icon">
          <AddPlusIcon />
        </span>
      </button>
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
          mutateAudio={() => {}}
        />
      )}
      {openAddVideo && channelID && token && (
        <ChannelAddVideoModal
          token={token}
          id={channelID}
          open={openAddVideo}
          setOpen={setOpenAddVideo}
          mutateVideo={() => {}}
        />
      )}
    </>
  )
}

export default CreatedButton
