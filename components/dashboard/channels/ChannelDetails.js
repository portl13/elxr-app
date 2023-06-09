import React, { useContext, useState } from 'react'
import ChannelCardVideo from '@components/dashboard/channels/ChannelCardVideo'
import Meta from '@components/layout/Meta'
import { UserContext } from '@context/UserContext'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import useSWR, { useSWRConfig } from 'swr'
import { genericFetch, getChannelById } from '@request/dashboard'
import {convertToUTC, getFormatedDateFromDate} from '@utils/dateFromat'
import ClockIcon from '@icons/ClockIcon'
import TvIcon from '@icons/TvIcon'
import ArrowLeftIcon from '@icons/ArrowLeftIcon'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ChannelTabEvents from './ChannelTabEvents'
import ChannelTabAbout from './ChannelTabAbout'
import ChannelVideoUploadButton from './ChannelVideoUploadButton'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import ChannelActions from './ChannelActions'
import ChannelModalDelete from './ChannelModalDelete'
import ChannelTabPodcasts from './ChannelTabPodcasts'
import ChannelAudioUploadBoton from './ChannelAudioUploadBoton'
const baseUrl = process.env.apiV2
const url = `${baseUrl}/channels/`
const urlPodcasts = `${process.env.apiV2}/podcasts`
const urlEvents = `${baseUrl}/video/`

const urlMutate = `${process.env.apiV2}/channels?page=${1}&per_page=${20}`


const tabs = [
  {
    tab: 'videos',
    label: 'Videos',
  },
  {
    tab: 'podcasts',
    label: 'Podcasts',
  },
  {
    tab: 'events',
    label: 'Events',
  },
  {
    tab: 'about',
    label: 'About',
  },
]

function ChannelDetails({ id }) {
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const [page, setPage] = useState(1)
  const [pageAudio, setPageAudio] = useState(1)
  const [limit, setLimit] = useState(20)
  const [openDelete, setOpenDelete] = useState(false)
  const { user } = useContext(UserContext)
  const token = user?.token
  const [tab, setTab] = useState('videos')

  const limitAudio = 20

  const { data: channel } = useSWR(
    token ? [`${url}${id}`, token] : null,
    getChannelById
  )

  const { data: videos, mutate: mutateVideo } = useSWR(
    token
      ? [`${urlEvents}?page=${page}&per_page=${limit}&channel_id=${id}`, token]
      : null,
    genericFetch
  )

  const { data: audios, mutate: mutateAudio } = useSWR(
    token
      ? [`${urlPodcasts}?page=${pageAudio}&per_page=${limitAudio}&channel_id=${id}`, token]
      : null,
    genericFetch
  )

  const isLoading = !videos

  const mutateChannels = async (id) => {
    await mutate(urlMutate)
  }

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
      <Meta />
      <Head>
        <title>CHANNEL DETAILS</title>
      </Head>
      <div
        style={{ backgroundImage: `url(${channel?.channel_cover?.full})` }}
        className="channel-details cover-bg position-relative"
      >
        <div className="back-icon-channels pointer">
          <Link href="/dashboard/channels">
            <a>
              <ArrowLeftIcon className="back-icon p-0" />
            </a>
          </Link>
        </div>
      </div>
      <div className="container container-80">
        <div className="d-flex flex-column flex-md-row">
          <div className="contain-channel-img margin-negative bg-gray position-relative">
            {channel && channel.channel_logo && (
              <img src={channel.channel_logo} alt={channel.channel_name} />
            )}
          </div>
          <div className="pl-md-3 pt-2">
            <div className="d-flex align-items-center pl-md-2 font-size-12 mt-2">
              <h1 className="m-0 font-weight-bold line-height-1 font-size-34 mr-3">
                {channel && channel.channel_name && channel.channel_name}
              </h1>
              <div>
                {channel &&
                  channel.channel_privacy &&
                  channel.channel_privacy === 'public' && (
                    <div className="badge badge-pill badge-success d-flex">
                      <span className="badge-icon">
                        <FontAwesomeIcon icon={faLockOpen} />
                      </span>
                      <span className="badge-title">open</span>
                    </div>
                  )}

                {channel &&
                  channel.channel_privacy &&
                  channel.channel_privacy === 'private' && (
                    <div className="badge badge-pill badge-danger d-flex">
                      <span className="badge-icon">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                      <span className="badge-title">close</span>
                    </div>
                  )}
              </div>
            </div>
            <div className="pl-2">
              <span className="text-muted font-size-12">
                Created on
                {channel &&
                  channel.date &&
                  getFormatedDateFromDate(convertToUTC(channel?.date), 'MMM dd, yyyy')}
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-4">
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-left align-items-lg-center">
              <div className="d-flex  mb-4 mb-lg-0">
                {tabs.map((item) => (
                  <button
                    key={item.tab}
                    onClick={() => setTab(item.tab)}
                    className={`${
                      tab === item.tab ? 'active' : ''
                    } btn btn-transparent font-weight-500 py-1 px-2`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className=" d-flex flex-column flex-md-row">
                <div className="d-flex  mb-4 mb-md-0">
                   <div className="position-relative">
                  <ChannelVideoUploadButton
                    mutateVideo={mutateVideo}
                    token={token}
                    id={id}
                  />
                </div>
                <div className="position-relative">
                  <ChannelAudioUploadBoton
                    mutateAudio={mutateAudio}
                    token={token} 
                    id={id} 
                  />
                </div>
                </div>
               <div className="d-flex">
                <div className="position-relative">
                  <button
                    onClick={() =>
                      router.push(`/dashboard/channel/${id}/create-event`)
                    }
                    className="btn btn-borde btn-border-primary mr-1 mr-md-2 "
                  >
                    <i className="btn-icon-container">
                      <ClockIcon className="btn-icon text-primary" />
                    </i>
                    <span>Create Event</span>
                  </button>
                </div>
                <div className="position-relative">
                  <button
                    onClick={() =>
                      router.push(`/dashboard/channel/${id}/go-live`)
                    }
                    className="btn btn-create rounded-lg d-flex"
                  >
                    <i className="btn-icon-container">
                      <TvIcon className="btn-icon" />
                    </i>
                    <span>Go Live</span>
                  </button>
                </div>
                <div className="mx-3 d-flex align-items-center">
                  <span>
                    <ChannelActions
                      setOpenDeleteModal={setOpenDelete}
                      openDeleteModal={openDelete}
                      channel={{ id }}
                    />
                  </span>
                </div>
               </div>
                
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 pt-md-5">
          <div
            className={`row ${tab === 'videos' ? 'd-flex' : 'd-none'}`}
          >
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
                  channel_id={id}
                  token={token}
                />
              ))}

            {videos && videos.videos && videos.videos.length === 0 && (
              <div className="text-left px-4">
                <h3>NO VIDEOS</h3>
              </div>
            )}
          </div>
          <div
            className={`w-100 row ${tab === 'podcasts' ? 'd-flex' : 'd-none'}`}
          >
            <ChannelTabPodcasts
              audios={audios}
              mutateAudio={mutateAudio}
              token={token}
              id={id}
            />
          </div>
          <div className={`w-100 ${tab === 'events' ? 'd-block' : 'd-none'}`}>
            <ChannelTabEvents id={id} />
          </div>
          <div className={`w-100 ${tab === 'about' ? 'd-block' : 'd-none'}`}>
            {channel && channel.channel_description && (
              <ChannelTabAbout description={channel.channel_description} />
            )}
          </div>
        </div>
      </div>
      <ChannelModalDelete
        open={openDelete}
        setOpen={setOpenDelete}
        channel={channel}
        isDetail={true}
        mutateChannels={mutateChannels}
      />
    </>
  )
}

export default ChannelDetails
