import React from 'react'
import { Button } from 'reactstrap'
import CommunityMeet from './CommunityMeet'
import useSWR from 'swr'
import Loader from '../../components/loader'
import { css } from '@emotion/core'
import {genericFetch} from "@request/dashboard";


function MeetWrapper(props) {
  const { id, user } = props
  const token = user?.token

  const meetUrl = process.env.baseUrl + `/wp-json/portl/v1/group/meet/${id}`

  const { data, error } = useSWR(token ? [meetUrl, token] : null, genericFetch)

  const isLoading = !data && !error

  return (
    <>
      <div className="subnav-panel">
        <ul>
          <li className={'active'}>
            <Button onClick={() => {}}>
              Meet with Community
            </Button>
          </li>
        </ul>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {!data?.data?.meet_enabled && (
            <div
              css={css`
                min-height: 300px;
              `}
              className="d-flex justify-content-center align-items-center"
            >
              <h3>Meetings are disabled for this group.</h3>
            </div>
          )}

          {data?.data?.meet_enabled && (
             <CommunityMeet {...props} />
          )}
        </>
      )}
    </>
  )
}
export default MeetWrapper
