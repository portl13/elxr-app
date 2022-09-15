import React from 'react'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import useSWR from 'swr'
import { getFetchPublic } from '@request/creator'
import Link from 'next/link'
import CreatorCardNew from '../card/CreatorCardNew'

const url = `${process.env.apiV2}/creator?page=1&per_page=4`

function SectionCreator() {
  const { data: creators } = useSWR(url, getFetchPublic)

  const isLoading = !creators

  return (
    <div className="row mt-4">
      <div className="col-12 d-flex justify-content-between mb-2">
        <h4 className="font-size-14">CREATORS</h4>
        <Link href={'/creators'}>
          <a className="font-size-14 text-white">See all</a>
        </Link>
      </div>
      {isLoading && <SpinnerLoader />}
      {creators &&
        creators.users.length > 0 &&
        creators.users &&
        creators.users.map((creator) => (
          <div key={creator.id} className="col-4 col-md-2 col-xl-1 px-2 px-md-2 px-lg-2 mb-4">
            <CreatorCardNew creator={creator} /> 
          </div>
        ))}
    </div>
  )
}

export default SectionCreator
