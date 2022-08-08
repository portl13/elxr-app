import React, { useContext, useEffect, useState } from 'react'
import InputDashSearch from '@components/shared/form/InputDashSearch'
import PlusIcon from '@icons/PlusIcon'
import EventModalSelectChannel from '../events/EventModalSelectChannel'
import { UserContext } from '@context/UserContext'
import useSWR from 'swr'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import ChannelCardAudio from '../channels/ChannelCardAudio'
import { genericFetch } from '@request/dashboard'
import ChannelAddAudioModal from '../channels/ChannelAddAudioModal'
import Pagination from '@components/shared/pagination/Pagination'

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
  const [total, setTotal] = useState(0)

  const { data: audios, mutate: mutateAudio } = useSWR(
    token ? [`${url}?author=${user?.id}&page=${page}&per_page=${limit}`, token] : null,
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

  useEffect(() => {
    if (audios && audios.total_items) {
      setTotal(audios.total_items)
    }
  }, [audios])

  return (
    <>
      <div className="container ">
        <div className="d-flex flex-column flex-md-row justify-content-between mb-3">
          <h2 className="title-dashboard">Podcasts</h2>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-left align-items-md-center">
            <InputDashSearch className='mb-3 mb-md-0' name={'search'} />
            <div className="btn-create-client ml-md-3">
              <button onClick={() => setOpen(!open)} className="btn btn-create w-100">
                <i>
                  <PlusIcon className="btn-create-icon" />
                </i>
                <span>Create A Podcast</span>
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-4 mt-md-5">
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
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <Pagination
              totalCount={total || 0}
              onPageChange={setPage}
              currentPage={page}
              pageSize={limit}
            />
          </div>
        </div>
      </div>
      {open && (
        <EventModalSelectChannel
          handleCreate={createPodcast}
          open={open}
          setOpen={setOpen}
        />
      )}
      {token && addAudio && (
        <ChannelAddAudioModal
          token={token}
          id={channelId}
          open={addAudio}
          setOpen={setAddAudio}
          mutateAudio={mutateAudio}
        />
      )}
    </>
  )
}

export default Podcasts
