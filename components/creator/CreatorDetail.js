import React, { useContext, useState } from 'react'
import { UserContext } from '@context/UserContext'
import useSWR from 'swr'
import { getCreator } from '@request/creator'
import CreatorProfile from './CreatorProfile'
import Meta from '@components/layout/Meta'
import Head from 'next/head'
import CreatorUser from './CreatorUser'


const creatorData = `${process.env.baseUrl}/wp-json/portl/v1/channel?user_id=`

function CreatorDetail({ creator_id, isLading = false }) {
  const { user } = useContext(UserContext)
  const { data: creator } = useSWR(creatorData + creator_id, getCreator)
  return (
    <>
      <Meta />
      <Head>
        <title>CREATOR DETAILS</title>
      </Head>
      <CreatorProfile isLading={isLading} creator={creator} />
      <div className="container container-80 pb-5">
        <CreatorUser creator_id={creator_id} user={user} creator={creator} />
      </div>
    </>
  )
}

export default CreatorDetail
