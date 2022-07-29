import React, { useContext, useState } from 'react'
import InputDashSearch from '@components/shared/form/InputDashSearch'
import { UserContext } from '@context/UserContext'
import PlusIcon from '@icons/PlusIcon'
import { genericFetch } from '@request/dashboard'
import EventModalSelectChannel from '../events/EventModalSelectChannel'
import useSWR from 'swr'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import ChannelCardVideo from '../channels/ChannelCardVideo'
import ChannelAddVideoModal from '../channels/ChannelAddVideoModal'
const baseUrl = process.env.apiV2
const urlEvents = `${baseUrl}/video/`

function Videos() {
  const { user } = useContext(UserContext)
  const token = user?.token
  const limit = 20
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [openAddVideo, setOpenAddVideo] = useState(false)
  const [channelId, setChannelId] = useState(null)
  const createVideo = (id) => {
    setChannelId(id)
    setOpenAddVideo(true)
  }

  const { data: videos, mutate: mutateVideo } = useSWR(
    token ? [`${urlEvents}?author=${user?.id}&page=${page}&per_page=${limit}`, token] : null,
    genericFetch
  )

  const isLoading = !videos

  const mutateVideos = async (id) => {
    const newVideos = {
      videos: [...videos.videos.filter((event) => event.id !== id)],
      items: Number(videos.items) - 1,
      total_items: Number(videos.total_items) - 1,
    }

    return await mutateVideo(newVideos, { revalidate: true })
  }

  const mutateVideosEdit = async (video) => {
    const newVideos = {
      videos: [
        ...videos.videos.map((event) => {
          if (event.id === video.id) {
            return eventData
          }
          return event
        }),
      ],
      items: Number(videos.items) - 1,
      total_items: Number(videos.total_items) - 1,
    }

    return await mutateVideo(newVideos, { revalidate: true })
  }

  return (
    <>
      <div className="container ">
        <div className="d-flex flex-column flex-md-row justify-content-between mb-3">
          <h2 className="title-dashboard">Videos</h2>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-left align-items-md-center ">
            <InputDashSearch className='mb-3 mb-md-0' name={'search'} />
            <div className="btn-create-client ml-md-3">
              <button onClick={() => setOpen(!open)} className="btn w-100 btn-create ">
                <i>
                  <PlusIcon className="btn-create-icon" />
                </i>
                <span>Create A Video</span>
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-4 mt-md-5">
          {isLoading && <SpinnerLoader />}
          {videos &&
            videos.videos &&
            videos.videos.length > 0 &&
            videos.videos.map((video) => (
              <ChannelCardVideo
                mutateVideos={mutateVideos}
                mutateVideosEdit={mutateVideosEdit}
                key={video.id}
                video={video}
                channel_id={video.channel_id}
                token={token}
              />
            ))}

          {videos && videos.videos && videos.videos.length === 0 && (
            <h3 className="col display-4">
              You have not created any videos yet
            </h3>
          )}
        </div>
      </div>
      {open && (
        <EventModalSelectChannel
          handleCreate={createVideo}
          open={open}
          setOpen={setOpen}
        />
      )}
      {openAddVideo && channelId && token && (
        <ChannelAddVideoModal
          token={token}
          id={channelId}
          open={openAddVideo}
          setOpen={setOpenAddVideo}
          mutateVideo={mutateVideo}
        />
      )}
    </>
  )
}

export default Videos
