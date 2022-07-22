import React, { useContext, useState } from 'react'
import ChannelCardVideo from '@components/dashboard/channels/ChannelCardVideo'
import Meta from '@components/layout/Meta'
import { UserContext } from '@context/UserContext'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import useSWR, { useSWRConfig } from 'swr'
import { genericFetch, getChannelById } from '@request/dashboard'
import { getFormatedDateFromDate } from '@utils/dateFromat'
import ClockIcon from '@icons/ClockIcon'
import TvIcon from '@icons/TvIcon'
import ArrowLeftIcon from '@icons/ArrowLeftIcon'
import Link from 'next/link'
import { useRouter } from 'next/router'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import TabHome from './tabs/home/TabHome'

const baseUrl = process.env.apiV2
const url = `${baseUrl}/channels/`
const urlEvents = `${baseUrl}/video/`
const urlMutate = `${process.env.apiV2}/channels?page=${1}&per_page=${20}`

const tabs = [
  {
    tab: "home",
    label: "Home",
  },
  {
    tab: "channels",
    label: "Channels",
  },
  {
    tab: "events",
    label: "Events",
  },
  {
    tab: "videos",
    label: "Videos",
  },
  {
    tab: "podcasts",
    label: "Podcasts",
  },
  {
    tab: "blog",
    label: "Blog",
  },
  {
    tab: "about",
    label: "About",
  },
];

function ChannelDetail({ id }) {
  const router = useRouter()
  const { user } = useContext(UserContext)
  const token = user?.token
  const [tab, setTab] = useState('home')

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
          <Link href="/">
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
              <div className="d-flex"></div>
            </div>
          </div>
        </div>
        <div className="pt-5">
            {tab === 'home' && <TabHome channel_id={id} />}
        </div>
      </div>
    </>
  )
}

export default ChannelDetail
