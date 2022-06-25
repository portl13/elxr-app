import React, { useContext, useState } from 'react'
import { UserContext } from '@context/UserContext'
import { getCommunities } from '@request/dashboard'
import useSWR from 'swr'
import PlusIcon from '@icons/PlusIcon'
import LupaIcon from '@icons/LupaIcon'
import Link from 'next/link'
import CommunityCard from './CommunityCard'

const communitiesUrl = `${process.env.bossApi}/groups`

function Community() {
  const { user } = useContext(UserContext)
  const [page, setPage] = useState(1)
  const { token = null, id = null } = user?.token ? user : {}

  const { data: communities, error } = useSWR(
    token
      ? [
          `${communitiesUrl}?page=${page}&per_page=20&user_id=${id}&scope=personal`,
          token,
        ]
      : null,
    getCommunities
  )
  console.log(
    '🚀 ~ file: Community.js ~ line 12 ~ Community ~ communities',
    communities
  )

  return (
    <div className="container ">
      <div className="d-flex  justify-content-between">
        <div>
          <h2 className="title-dashboard">Courses</h2>
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
            <Link href={'/dashboard/courses/add-course'}>
              <a className="btn btn-create">Create a Community</a>
            </Link>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        {communities &&
          communities.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
      </div>
    </div>
  )
}

export default Community
