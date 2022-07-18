import React, { useContext, useState } from 'react'
import { UserContext } from '@context/UserContext'
import LupaIcon from '@icons/LupaIcon'
import PlusIcon from '@icons/PlusIcon'
import Link from 'next/link'
import ChannelCard from './ChannelCard'
import useSWR from 'swr'
import { getChannels } from '@request/dashboard'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
const url = `${process.env.apiV2}/channels`

function Channels() {
  const { user } = useContext(UserContext)
  const token = user?.token
  const limit = 20
  const [page, setPage] = useState(1)
  const {
    data: channels,
    error,
    mutate,
  } = useSWR(
    token ? [`${url}?page=${page}&per_page=${limit}`, token] : null,
    getChannels
  )

  const isLoading = !channels && !error

  const mutateChannels = async (eventId) => {
    const newEvents = {
      channels: [...channels.channels.filter((event) => event.id !== eventId)],
      items: Number(channels.items) - 1,
      status: channels.status,
      total_items: Number(channels.total_items) - 1,
    }

    return await mutate(newEvents)
  }

  return (
    <div className="container ">
      <div className="d-flex  justify-content-between">
        <div>
          <h2 className="title-dashboard">Channels</h2>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <form action="">
            <div className="input-search-contain">
              <span className="input-search-icon">
                <LupaIcon className="input-search-icon-svg" />
              </span>
              <input
                className="input-search"
                type="search"
                name=""
                placeholder="Search"
              />
            </div>
          </form>
          <div className="btn-create-client">
            <Link href={'/dashboard/channels/create-channel'}>
              <a className="btn btn-create">
                <i>
                  <PlusIcon className="btn-create-icon" />
                </i>
                <span>Create a Channel</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        {isLoading && <SpinnerLoader />}
        {channels &&
          channels.channels &&
          channels.channels.map((channel) => (
            <ChannelCard
              mutateChannels={mutateChannels}
              channel={channel}
              key={channel.id}
            />
          ))}
        {channels && channels.channels && channels.channels.length === 0 && (
          <h3 className="col display-4">
            You have not created any channel yet
          </h3>
        )}
      </div>
    </div>
  )
}

export default Channels
