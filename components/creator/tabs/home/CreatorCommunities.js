
import React from 'react'
import useSWR from 'swr'
import CommunityCard from '@components/creator/cards/CommunityCard'
import { getFetchPublic } from '@request/creator'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
const communitiesUrl = `${process.env.bossApi}/groups`

function CreatorCommunities({ creator_id }) {
  const { data: communities, error } = useSWR(
    `${communitiesUrl}?page=1&per_page=4&user_id=${creator_id}&scope=personal`,
    getFetchPublic
  )

  const isLoading = !communities && !error
  return (
    <div className="row mt-5">
      <div className="col-12">
        <h4 className="font-size-14 mb-3">COMMUNITIES</h4>
      </div>
      {isLoading && <SpinnerLoader />}
      {communities &&
        communities.map((community) => (
          <div key={community.id} className="col-12 col-md-6 col-lg-3 mb-4">
            <CommunityCard community={community} />
          </div>
        ))}
      {communities && communities.length === 0 && (
        <h3 className="col display-4">
          You have not created any community yet
        </h3>
      )}
    </div>
  )
}

export default CreatorCommunities
