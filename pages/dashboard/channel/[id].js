import React, { useContext } from 'react'
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

const url = `${process.env.apiV2}/channels/`

function ChannelDetails({ data }) {
  const router = useRouter()
  const { user } = useContext(UserContext)
  const { id } = data
  const token = user?.token
  const { data: channel } = useSWR(
    token ? [`${url}${id}`, token] : null,
    getChannelById
  )

  return (
    <div>
      <Meta />
      <Head>
        <title>CHANNEL DETAILS</title>
      </Head>
      <>
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
                  Created on{' '}
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
                  <div>
                    <button className="btn btn-create py-1 px-2 mr-2">
                      Videos
                    </button>
                  </div>
                  <div>
                    <button className="btn btn-transparent font-weight-500 py-1 px-2">
                      About
                    </button>
                  </div>
                </div>
                <div className="d-flex ">
                  <div className="position-relative">
                    <button className="btn btn-borde d-flex">
                      <i className="btn-icon-container">
                        <PlusIcon className="btn-icon" />
                      </i>
                      <span>Upload Video</span>
                    </button>
                  </div>
                  <div className="position-relative">
                    <button
                      onClick={() =>
                        router.push(`/dashboard/channel/${id}/schedule-session`)
                      }
                      className="btn btn-borde btn-border-primary text-primary"
                    >
                      <i className="btn-icon-container">
                        <ClockIcon className="btn-icon text-primary" />
                      </i>
                      <span>Schedule Session</span>
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
          <div className="row">
            <ChannelCardVideo />
          </div>
        </div>
      </>
    </div>
  )
}

export default ChannelDetails

export async function getServerSideProps({ query }) {
  const { id } = query
  return {
    props: { data: { id } },
  }
}
