import React, { useContext, useState } from 'react'
import { UserContext } from '@context/UserContext'
import { getCommunities } from '@request/dashboard'
import useSWR from 'swr'
import PlusIcon from '@icons/PlusIcon'
import LupaIcon from '@icons/LupaIcon'
import Link from 'next/link'
import CommunityCard from './CommunityCard'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'

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

  const isLoading = !communities && !error

  return (
    <div className="container ">
      <div className="d-flex flex-column flex-md-row justify-content-between">
        <div>
          <h2 className="title-dashboard">Communities</h2>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-left align-items-md-center">
          <form action="">
            <div className="input-search-contain ">
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
          <div className="btn-create-client mt-3 mt-md-0 ml-0 ml-md-3">
            <Link href={'/community/create-group'}>
              <a className="btn btn-create w-100">
                <i>
                  <PlusIcon className="btn-create-icon" />
                </i>
                <span>Create a Community</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="row mt-4 mt-md-5">
        {isLoading && <SpinnerLoader />}
        {communities &&
          communities.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        {communities && communities.length === 0 && (
          <h3 className="col display-4">
            You have not created any community yet
          </h3>
        )}
      </div>
    </div>
  )
}

export default Community
