import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Button, Alert } from 'reactstrap'
import { useAlert } from 'react-alert'
import { TIMEOUT } from '../../../utils/constant'
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
          <div className="form-group">
            <label>Domain</label>
            <input
              type="text"
              className="input-tag"
              value={meetDetail.meet_domain}
              disabled
            />
            <div className="description">
              The domain the Jitsi Meet server runs. Defaults to their free
              hosted service.
            </div>
          </div>
          <div className="form-group">
            <label>Room *</label>
            <input
              type="text"
              className="input-tag"
              value={roomName}
              onChange={(e) => {
                setRoomName(e.target.value)
                setShowError(false)
              }}
              maxLength="100"
              ref={focusDiv}
            />
            {showError && (
              <Alert color="danger">Please provide room name.</Alert>
            )}
            <div className="description">
              Set the room group members will enter automatically when visiting
              the 'Meet the Group' menu
            </div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="text" className="input-tag" disabled></input>
            <div className="description">
              Set the password the group members will have to enter to join the
              room. The first to visit - and therefore create - the room will
              enter without any password. The rest participants will have to
              fill-in the password.
            </div>
          </div>
          <div className="form-group">
            <label>Toolbar</label>
            <textarea
              type="text"
              className="textarea-tag"
              value={meetDetail.meet_toolbar}
              disabled
            />
            <div className="description">
              The toolbar buttons to get displayed in comma separated format.
              For more information refer to <a>TOOLBAR_BUTTONS</a>
            </div>
          </div>
          <div className="form-group">
            <label>Settings</label>
            <input
              type="text"
              className="input-tag"
              value={meetDetail.meet_settings}
              disabled
            />
            <div className="description">
              The settings to be available in comma separated format. For more
              information refer to <a>SETTINGS_SECTIONS</a>
            </div>
          </div>
          <div className="form-group">
            <label>Width</label>
            <input
              type="text"
              className="input-tag"
              value={meetDetail.meet_width}
              disabled
            />
            <div className="description">
              The width in pixels or percentage of the embedded window.
            </div>
          </div>
          <div className="form-group">
            <label>Height</label>
            <input
              type="text"
              className="input-tag"
              value={meetDetail.meet_height}
              disabled
            />
            <div className="description">
              The height in pixels or percentage of the embedded window.
            </div>
          </div>
          <div className="form-group">
            <label>Background Color</label>
            <input
              type="text"
              className="input-tag"
              value={meetDetail.meet_background_color}
              disabled
            />
            <div className="description">
              The background color of the window when camera is off.
            </div>
          </div>
          <div className="form-group">
            <label>Default Language</label>
            <input
              type="text"
              className="input-tag"
              value={meetDetail.meet_default_language}
              disabled
            />
            <div className="description">The default language.</div>
          </div>
          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                checked={meetDetail.meet_show_watermark === true}
                disabled
              />
              <span>Show Watermark</span>
            </div>
            <div className="description">
              Show/Hide the Jitsi Meet watermark. Please leave it checked unless
              you use your own domain.
            </div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" disabled />
              <span>Show Brand Watermark</span>
            </div>
            <div className="description">
              Show/Hide the Jitsi Meet Brand watermark.
            </div>
          </div>
          <div className="form-group">
            <label>Brand Watermark Link</label>
            <input type="text" className="input-tag" disabled></input>
            <div className="description">The link for the brand watermark.</div>
          </div>
          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" disabled />
              <span>Film Strip Mode Only</span>
            </div>
            <div className="description">
              Display the window in film strip only mode.
            </div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" disabled />
              <span>Start Audio Only</span>
            </div>
            <div className="description">
              Every participant enters the room having enabled only their
              microphone. Camera is off.
            </div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" disabled />
              <span>Disable Video Quality Indicator</span>
            </div>
            <div className="description">
              Hide/Show the video quality indicator.
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
