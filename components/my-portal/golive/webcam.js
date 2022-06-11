import React, { useState, useEffect, useContext } from 'react'
import WebDetail from './WebDetail'
import WebCustomization from './WebCustomization'
import WebVisibility from './WebVisibility'
import WebCommunity from './WebCommunity'
import axios from 'axios'
import { UserContext } from '../../../context/UserContext'
import { css } from '@emotion/core'
//import Router from "next/router";

const btnStyledisabled = css`
  &:disabled {
    background: #7e7d7b !important;
    border-color: #7e7d7b !important;
  }
`

const baseUrl = process.env.baseUrl + '/wp-json/portl/v1/'

function Webcam() {
  const { user } = useContext(UserContext)

  const [status, setStatus] = useState('detail')

  const [categories, setCategories] = useState([])

  const [streamForm, setStreamForm] = useState({
    title: '',
    description: '',
    thumbnail: '',
    category: '',
    live_chat: true,
    record_stream: false,
    participants: 'anyone',
    visability: 'public',
    date_time: '',
    type_stream: 'webcam',
  })

  //   useEffect(() => {
  //     Router.push(`/my-portal?tab=golive&nav=webcam&status=${status}`);
  //   }, [status]);

  function getPrevStatus() {
    if (status === 'customization') {
      setStatus('detail')
    } else if (status === 'visibility') {
      setStatus('customization')
    }
  }
  function getNextStatus() {
    if (status === 'detail') {
      setStatus('customization')
    } else {
      setStatus('visibility')
    }
  }

  const getCategories = async () => {
    try {
      const { data } = await axios.get(baseUrl + 'channel_event/categories', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      setCategories(data)
    } catch (e) {}
  }

  const createChannelEvent = async () => {
    console.log(streamForm)
  }

  useEffect(() => {
    if (!user) return
    getCategories()
  }, [user])

  return (
    <>
      <div className="wcfm-collapse-content">
        <div className="create-stream-session">
          {status !== 'community' && <h1>Create Stream</h1>}
          {status === 'detail' && (
            <WebDetail
              categories={categories}
              streamForm={streamForm}
              setStreamForm={setStreamForm}
            />
          )}
          {status === 'customization' && (
            <WebCustomization
              streamForm={streamForm}
              setStreamForm={setStreamForm}
              setStatus={setStatus}
            />
          )}
          {status === 'visibility' && (
            <WebVisibility
              streamForm={streamForm}
              setStreamForm={setStreamForm}
            />
          )}
          {status === 'community' && <WebCommunity setStatus={setStatus} />}
          <div className="button-section">
            {status !== 'detail' && status !== 'community' && (
              <button onClick={() => getPrevStatus()}>Back</button>
            )}
            {status !== 'visibility' && status !== 'community' && (
              <button
                css={btnStyledisabled}
                disabled={streamForm.title.length === 0}
                onClick={() => getNextStatus()}
              >
                Next
              </button>
            )}
            {status === 'visibility' && (
              <button onClick={() => createChannelEvent}>Done</button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default Webcam
