import React, { useContext, useState } from 'react'
import InputDashSearch from '@components/shared/form/InputDashSearch'
import PlusIcon from '@icons/PlusIcon'
import EventModalSelectChannel from '../events/EventModalSelectChannel'
import { UserContext } from '@context/UserContext'
import useSWR from 'swr'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import ChannelCardAudio from '../channels/ChannelCardAudio'
import { genericFetch } from '@request/dashboard'
import ChannelAddAudioModal from '../channels/ChannelAddAudioModal'

const url = `${process.env.apiV2}/podcasts`

function Podcasts() {
  const { user } = useContext(UserContext)
  const token = user?.token
  const [open, setOpen] = useState(false)
  const [channelId, setChannelId] = useState(null)
  const [addAudio, setAddAudio] = useState(false)
  const createPodcast = (id) => {
    setChannelId(id)
    setAddAudio(true)
  }
  const limit = 20
  const [page, setPage] = useState(1)

  const { data: audios, mutate: mutateAudio } = useSWR(
    token ? [`${url}?page=${page}&per_page=${limit}`, token] : null,
    genericFetch
  )

  const isLoading = !audios
 
  const mutateAudios = async (id) => {
    const newAudio = {
      audios: [...audios.audios.filter((audio) => audio.id !== id)],
      items: Number(audios.items) - 1,
      total_items: Number(audios.total_items) - 1,
    }

    return await mutateAudio(newAudio, { revalidate: true })
  }

  const mutateAudiosEdit = async (video) => {
    const newAudio = {
      audios: [
        ...audios.audios.map((event) => {
          if (event.id === video.id) {
            return eventData
          }
          return event
        }),
      ],
      items: Number(audios.items) - 1,
      total_items: Number(audios.total_items) - 1,
    }

    return await mutateAudio(newAudio, { revalidate: true })
  }

  return (
    <>
      <div className="container ">
        <div className="d-flex  justify-content-between mb-3">
          <h2 className="title-dashboard">Podcasts</h2>
          <div className="d-flex justify-content-between align-items-center">
            <InputDashSearch name={'search'} />
            <div className="btn-create-client">
              <button onClick={() => setOpen(!open)} className="btn btn-create">
                <i>
                  <PlusIcon className="btn-create-icon" />
                </i>
                <span>Create A Podcasts</span>
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          {isLoading && <SpinnerLoader />}
          {audios &&
            audios.audios &&
            audios.audios.length > 0 &&
            audios.audios.map((audio) => (
              <ChannelCardAudio
                channel_id={audio.channel_id}
                token={token}
                mutateAudiosEdit={mutateAudiosEdit}
                mutateAudios={mutateAudios}
                audio={audio}
                key={audio.id}
              />
            ))}
          {audios && audios.audios && audios.audios.length === 0 && (
            <h3 className="col display-4">
              You have not created any events yet
            </h3>
          )}
        </div>
      </div>
      {open && (
        <EventModalSelectChannel
          handleCreate={createPodcast}
          open={open}
          setOpen={setOpen}
        />
      )}
      {token && addAudio && token && (
        <ChannelAddAudioModal
          token={token}
          id={channelId}
          open={addAudio}
          setOpen={setAddAudio}
        />
      )}
    </>
  )
}

export default Podcasts
