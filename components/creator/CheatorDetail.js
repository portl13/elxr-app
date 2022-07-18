import React, { useContext } from 'react'
import { UserContext } from '@context/UserContext'

const creatorData = `${process.env.baseUrl}/wp-json/portl/v1/channel?user_id=`
const channelUrl = `${process.env.apiV2}/channels?author=`

function CheatorDetail({ creator_id }) {
  const { user } = useContext(UserContext)
  const token = user?.token

  return <div>CheatorDetail</div>
}

export default CheatorDetail
