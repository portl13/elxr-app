import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Button, Alert } from 'reactstrap'
import { useAlert } from 'react-alert'
import { TIMEOUT } from '@utils/constant'
function Meet({ user, groupDetails }) {
  const focusDiv = useRef(null)
  const [showError, setShowError] = useState(false)
  const [loading, setLoading] = useState(false)
  const alert = useAlert()
  const HEADER = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  }
  const meetUrl =
    process.env.baseUrl + `/wp-json/portl/v1/group/meet/${groupDetails?.id}`
  const [meetDetail, setMeetDetail] = useState()
  const [meetEnabled, setMeetEnabled] = useState(false)
  const [meetMembersEnabled, setMeetMembersEnabled] = useState(false)
  const [roomName, setRoomName] = useState('')
  useEffect(() => {
    if (focusDiv.current) {
      focusDiv.current.focus()
    }
  }, [showError])
  useEffect(() => {
    if (user?.id) {
      getMeet()
    }
  }, [user])

  function getMeet() {
    axios.get(meetUrl, HEADER).then((res) => {
      let data = res.data.data
      setMeetDetail(data)
      setMeetEnabled(data.meet_enabled)
      setMeetMembersEnabled(data.meet_members_enabled)
      setRoomName(data.meet_room)
    })
  }
  function updateRoom() {
    setLoading(true)
    axios
      .post(
        meetUrl,
        {
          meet_room: roomName,
          meet_enabled: meetEnabled,
          meet_members_enabled: meetMembersEnabled,
        },
        HEADER
      )
      .then((res) => {
        alert.success('Meet enable successfully.', TIMEOUT)
      })
      .finally(()=> setLoading(false))
  }

  const updateCheck = (e) => {
    if (e.target.name === 'meet_enabled') {
      setMeetEnabled(!meetEnabled)
    }
    if (e.target.name === 'meet_members_enabled') {
      setMeetMembersEnabled(!meetMembersEnabled)
    }
  }

  return (
    <>
      {meetDetail && (
        <div className="meet-conatiner">
          <h4>Meet Settings</h4>
          <div className="allow-text">
            Allow members of this group to enter the same video conference room.
          </div>
          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                name="meet_enabled"
                onChange={updateCheck}
                checked={meetEnabled}
              />
              <span>Activate</span>
            </div>
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                name="meet_members_enabled"
                onChange={updateCheck}
                checked={meetMembersEnabled}
              />
              <span>Display 'Meet Members' menu</span>
            </div>
          </div>
          <Button
            className="save-button w-100"
            onClick={() => {
              roomName === '' ? setShowError(true) : updateRoom()
            }}
          >
            {loading ? 'Updating' : 'Save'}
          </Button>
        </div>
      )}
    </>
  )
}
export default Meet
