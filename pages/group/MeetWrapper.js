import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import CommunityMeet from './CommunityMeet'
import useSWR from 'swr'
import Loader from '../../components/loader'
import { css } from '@emotion/core'
import {genericFetch} from "@request/dashboard";


function MeetWrapper(props) {
  const { id, user } = props
  const token = user?.token
  const [meetSettings, setMeetSettings] = useState(null)

  const meetUrl = process.env.baseUrl + `/wp-json/portl/v1/group/meet/${id}`

  const { data, error } = useSWR(token ? [meetUrl, token] : null, genericFetch)

  const [status, setStatus] = useState('friend')

  const isLoading = !data && !error

  useEffect(() => {
    if (!data) return
    if (!data?.meet_members_enabled) {
      setStatus("community")
    }
    setMeetSettings(data)
    
  }, [data])
   console.log('me ejecute')
  return (
    <>
      <div className="subnav-panel">
        <ul>
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
        </>
      )}
    </>
  )
}
export default MeetWrapper
