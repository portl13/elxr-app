import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loader from '../../pages/profile/loader'
import InnerNav from '../innerNav'
import { UserContext } from '../../context/UserContext'
import { Col } from 'reactstrap'
import { getProfileChannelRoute } from '../../utils/constant'

function ChannelProfile() {
  const { user } = useContext(UserContext)
  const [followCount, setfollowStatus] = useState(false)
  const [isCurntUser, setCurrentUserState] = useState(false)
  const [curntUserId, setCurrentUserId] = useState({ name: '', id: null })
  const [selectedUseDet, setSelUserDetails] = useState({})
  const router = useRouter()
  const query = router.query
  const {
    name = null,
    id = null,
    tab = null,
    key = null,
    albumId = null,
  } = query

  useEffect(() => {
    if (user?.id && id && Number(id) !== curntUserId.id) {
      const userID = Number(id)
      setCurrentUserId({ name, id: userID })
      setCurrentUserState(user.id === userID)
    } else {
      const userID = Number(id)
      setCurrentUserId({ name, id: userID })
    }
  }, [id, user])
  return (
    <Col xs="12">
      {!curntUserId.id && !id ? (
        <div style={{ textAlign: 'center' }}>
          {' '}
          <Loader />
        </div>
      ) : (
          <InnerNav
            setfollowStatus={setfollowStatus}
            activeTab={tab}
            activeKey={key}
            curntUserId={curntUserId}
            query={query}
            user={user}
            isCurntUser={isCurntUser}
            albumId={albumId}
            selectedUseDet={selectedUseDet}
            functionRedirect={getProfileChannelRoute}
          />
      )}
    </Col>
  )
}

export default ChannelProfile
