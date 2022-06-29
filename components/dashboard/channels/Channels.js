import React, { useContext, useState } from 'react'
import { UserContext } from '@context/UserContext'
import LupaIcon from '@icons/LupaIcon'
import PlusIcon from '@icons/PlusIcon'
import Link from 'next/link'
import ChannelCard from './ChannelCard'
import useSWR from 'swr'
import { getChannels } from '@request/dashboard'
const url = `${process.env.apiV2}/channels`

function Channels() {
  const limit = 20
  const { user } = useContext(UserContext)
  const token = user?.token
  const [page, setPage] = useState(1)
  const { data: channels, error } = useSWR(
    token ? [`${url}?page=${page}&per_page=${limit}`, token] : null,
    getChannels
  )
  console.log(
    '🚀 ~ file: Channels.js ~ line 15 ~ Channels ~ channels',
    channels
  )

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
            <span className="btn-contain-icon">
              <PlusIcon className="btn-create-icon" />
            </span>
            <Link href={'/dashboard/channels/create-channel'}>
              <a className="btn btn-create">Create a Channel</a>
            </Link>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        {channels &&
          channels.channels &&
          channels.channels.map((channel) => (
            <ChannelCard channel={channel} key={channel.id} />
          ))}
      </div>
    </div>
  )
}

export default Channels
