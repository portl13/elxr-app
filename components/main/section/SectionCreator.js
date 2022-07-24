import React from 'react'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import CreatorCard from '../card/CreatorCard'
import useSWR from 'swr'
import { getFetchPublic } from '@request/creator'

const url = `${process.env.apiV2}/creator?page=1&per_page=4`

function SectionCreator() {

  const { data: creators } = useSWR(url, getFetchPublic)

  const isLoading = !creators 

  return (
    <div className="row mt-4">
      <div className="col-12">
        <h4 className="font-size-14">CREATORS</h4>
      </div>
      {isLoading && <SpinnerLoader />}
      {creators &&
        creators.users.length > 0 &&
        creators.users &&
        creators.users.map((creator) => (
          <div key={creator.id} className="col-12 col-md-6 col-lg-3 mb-4">
            <CreatorCard creator={creator} />
          </div>
        ))}
    </div>
  )
}

export default SectionCreator
