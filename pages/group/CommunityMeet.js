import React, { useState, useEffect } from 'react'
import Webcam from 'react-webcam'
import JitsiMeet from './JitsiMeet'
import { getMemberDetail, getMeetDetail } from '../api/meet.api'
function CommunityMeet({ user, groupDetails }) {
  const webcamRef = React.useRef(null)
  const [displayName, setDisplayName] = useState('')
  const [meetDetail, setMeetDetail] = useState()
  const [memberDetail, setMemberDetail] = useState()
  const [roomName, setRoomName] = useState('')
  const [onCall, setOnCall] = useState(false)
  useEffect(() => {
    if (user?.id) {
      getMember()
      getMeet()
    }
  }, [user])
  function getMember() {
    getMemberDetail(user).then((res) => {
      setMemberDetail(res.data)
      setDisplayName(res.data.name)
    })
  }
  function getMeet() {
    getMeetDetail(user, groupDetails.id).then((res) => {
      setMeetDetail(res.data.data)
      setRoomName(res.data.data.meet_room)
    })
  }
  const apiReady = (api) => {
    api.addListener('readyToClose', (payload) => setOnCall(false))
    api.addListener('participantLeft', (payload) => setOnCall(false))
  }
  return (
    <>
      {!onCall && meetDetail && memberDetail && (
        <>
          <div className="video-panel">
            <Webcam
              audio={false}
              height={450}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={900}
            />
          </div>
          <div className="meeting-panel">
            <h1>Join meeting</h1>
            <input
              type="text"
              placeholder="Your name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <button onClick={() => setOnCall(true)}> Join meeting</button>
          </div>
        </>
      )}
      {onCall && (
        <JitsiMeet
          onApiReady={apiReady}
          roomName={roomName}
          displayName={displayName}
        />
      )}
    </>
  )
}
export default CommunityMeet
