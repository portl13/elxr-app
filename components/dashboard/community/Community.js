import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '@context/UserContext'
import { genericFetchWithHeader, getCommunities } from '@request/dashboard'
import useSWR from 'swr'
import PlusIcon from '@icons/PlusIcon'
import LupaIcon from '@icons/LupaIcon'
import Link from 'next/link'
import CommunityCard from './CommunityCard'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import InputDashSearch from '@components/shared/form/InputDashSearch'
import useDebounce from '@hooks/useDebounce'
import Pagination from '@components/shared/pagination/Pagination'

const communitiesUrl = `${process.env.bossApi}/groups`

function Community() {
  const { user } = useContext(UserContext)
  const limit = 20
  const [page, setPage] = useState(1)
  const { token = null, id = null } = user?.token ? user : {}

  const [search, setSearch] = useState('')
  const debounceTerm = useDebounce(search, 500)
  const [total, setTotal] = useState(0)

  const { data: communities, error } = useSWR(
    token
      ? [
          `${communitiesUrl}?page=${page}&per_page=${limit}&user_id=${id}&scope=personal&search=${debounceTerm}`,
          token,
        ]
      : null,
      genericFetchWithHeader
  )

  const isLoading = !communities && !error

  useEffect(() => {
    if(communities && communities.headers && communities.headers["x-wp-total"]) {
      setTotal(communities.headers["x-wp-total"])
    }
  }, [communities])

  return (
    <div className="container ">
      <div className="d-flex flex-column flex-md-row justify-content-between">
        <h2 className="title-dashboard">Communities</h2>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-left align-items-md-center">
          <div>
            <InputDashSearch
              value={search}
              name={'search'}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
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
        {communities && communities.data &&
          communities.data.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        {communities && communities.length === 0 && (
          <h3 className="col display-4">
            You have not created any community yet
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
  )
}

export default Community
