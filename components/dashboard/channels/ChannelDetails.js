import React, { useContext, useState } from 'react'
import ChannelCardVideo from '@components/dashboard/channels/ChannelCardVideo'
import Meta from '@components/layout/Meta'
import { UserContext } from '@context/UserContext'
import {
  faEllipsisH,
  faLock,
  faLockOpen,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import useSWR from 'swr'
import { getChannelById } from '@request/dashboard'
import { getFormatedDateFromDate } from '@utils/dateFromat'
import PlusIcon from '@icons/PlusIcon'
import ClockIcon from '@icons/ClockIcon'
import TvIcon from '@icons/TvIcon'
import ArrowLeftIcon from '@icons/ArrowLeftIcon'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ChannelTabEvents from './ChannelTabEvents'
import ChannelTabAbout from './ChannelTabAbout'

const url = `${process.env.apiV2}/channels/`

const tabs = [
  {
    tab: 'videos',
    label: 'Videos',
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
  const { user } = useContext(UserContext)
  const [tab, setTab] = useState('videos')

  const token = user?.token
  const { data: channel } = useSWR(
    token ? [`${url}${id}`, token] : null,
    getChannelById
  )

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
                  getFormatedDateFromDate(channel?.date, 'MMM dd, yyyy')}
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-4">
            <div className="d-none d-md-flex justify-content-between align-items-center">
              <div className="d-flex">
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
              <div className="d-flex">
                <div className="position-relative">
                  <button
                    onClick={() =>
                      router.push(`/dashboard/channel/${id}/create-event`)
                    }
                    className="btn btn-borde btn-border-primary text-primary"
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
                    <FontAwesomeIcon
                      className="icon-setting"
                      icon={faEllipsisH}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-5">
          <div className={`w-100 ${tab === 'videos' ? 'd-block' : 'd-none'}`}>
            <ChannelCardVideo />
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
    </>
  )
}

export default ChannelDetails
