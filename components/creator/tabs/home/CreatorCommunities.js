
import React from 'react'
import CommunityCard from '@components/creator/cards/CommunityCard'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'


function CreatorCommunities({ communities, isLoading }) {
  if (communities && communities.length === 0) {
    return ''
  }

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
    </div>
  )
}

export default CreatorCommunities
