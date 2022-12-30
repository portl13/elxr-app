import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import FriendMeet from './FriendMeet'
import CommunityMeet from './CommunityMeet'
import useSWR from 'swr'
import axios from 'axios'
import Loader from '../../components/loader'
import { css } from '@emotion/core'

const fetcher = async (url, user) => {
  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })

  return data.data
}

function MeetWrapper(props) {
  const { id, user } = props

  const [meetSettings, setMeetSettings] = useState(null)

  const meetUrl = process.env.baseUrl + `/wp-json/portl/v1/group/meet/${id}`

  const { data, error } = useSWR(user ? [meetUrl, user] : null, fetcher)

  const [status, setStatus] = useState('friend')

  const isLoading = !data && !error

  useEffect(() => {
    if (!data) return
    if (!data?.meet_members_enabled) {
      setStatus("community")
    }
    setMeetSettings(data)
    
  }, [data])

  return (
    <>
      <div className="subnav-panel">
        <ul>
          {data?.meet_members_enabled && (
            <li className={status === 'friend' ? 'active' : null}>
              <Button onClick={() => setStatus('friend')}>
                {' '}
                Meet with Friends
              </Button>
            </li>
          )}
          <li className={status === 'community' ? 'active' : null}>
            <Button onClick={() => setStatus('community')}>
              {' '}
              Meet with Community
            </Button>
          </li>
        </ul>
      </div>
      {isLoading && !meetSettings ? (
        <Loader />
      ) : (
        <>
          {!data?.meet_enabled && (
            <div
              css={css`
                min-height: 300px;
              `}
              className="d-flex justify-content-center align-items-center"
            >
              <h3>Meetings are disabled for this group.</h3>
            </div>
          )}

          {data?.meet_enabled && (
            status === 'community' ? <CommunityMeet {...props} /> : null
          )}
          {/*{data?.meet_members_enabled && (*/}
          {/*  status === 'friend' ? <FriendMeet {...props} /> : null*/}
          {/*)}*/}
        </>
      )}
    </>
  )
}
export default MeetWrapper
