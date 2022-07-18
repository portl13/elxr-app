import React, { useState, useEffect } from 'react'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import { genericFetch } from '@request/dashboard'
import useSWR from 'swr'
import ChannelCardAudio from './ChannelCardAudio'

const url = `${process.env.apiV2}/podcasts`

function ChannelTabPodcasts({ token, id }) {
  const limit = 20
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const { data: audios, mutate: mutateAudio } = useSWR(
    token
      ? [`${url}?page=${page}&per_page=${limit}&channel_id=${id}`, token]
      : null,
    genericFetch
  )

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
    if (audios) {
      setIsLoading(false)
    }
  }, [audios])

  return (
    <>
      {isLoading && <SpinnerLoader />}
      {audios &&
        audios.audios &&
        audios.audios.length > 0 &&
        audios.audios.map((audio) => (
          <ChannelCardAudio
            channel_id={id}
            token={token}
            mutateAudiosEdit={mutateAudiosEdit}
            mutateAudios={mutateAudios}
            audio={audio}
            key={audio.id}
          />
        ))}

      {audios && audios.audios && audios.audios.length === 0 && (
        <div className="text-left px-4">
          <h3>NO PODCASTS</h3>
        </div>
      )}
    </>
  )
}

export default ChannelTabPodcasts
