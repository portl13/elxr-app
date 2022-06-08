import React from 'react'
import { EVENT_PARTICIPANTS } from '../../../utils/constant'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { createStreamProcess } from "@components/my-account/CreateStreamProcess.style";
function WebCustomization(props) {
  const { setStatus, setStreamForm, streamForm } = props

  const handleChange = (e) => {
    const target = e.target
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value
    setStreamForm({
      ...streamForm,
      [name]: value,
    })
  }

  return (
    <section css={createStreamProcess}>
      <div className="create-stream-process">
        <ul>
          <li className="filled">
            Details
            <span>
              <em>
                <FontAwesomeIcon icon={faCheck} />
              </em>
            </span>
          </li>
          <li className="active">
            Customization
            <span></span>
          </li>
          <li>
            Visibility
            <span></span>
          </li>
        </ul>
      </div>
      <div className="details-data-section">
        <h2>
          Customization
          <span>Settings to tailor your stream to your needs</span>
        </h2>
        <div className="live-chat-section">
          <div className="live-chat-tag">Live Chat </div>
          <span>Settings to tailor your stream to your needs</span>
        </div>
        <div className="option-panel">
          <div className="custom-checkbox checkbox-panel">
            <input
              className="custom-control-input"
              type="checkbox"
              onChange={(e) => handleChange(e)}
              name="live_chat"
              checked={streamForm.live_chat}
            />

            <label className="custom-control-label">Live Chat</label>
          </div>
          <div className="custom-checkbox checkbox-panel">
            <input
              className="custom-control-input"
              type="checkbox"
              onChange={(e) => handleChange(e)}
              name="record_stream"
            />
            <label className="custom-control-label">Record Stream</label>
          </div>
        </div>
        <div className="live-chat-section">
          <div className="live-chat-tag">Participant modes </div>
          <span>Who can send messages</span>
        </div>
        <div className="option-panel">
          {EVENT_PARTICIPANTS.map((result, i) => {
            return (
              <div key={result.value} className="custom-radio">
                <input
                  className="custom-control-input"
                  type="radio"
                  id="participants"
                  name="participants"
                  onChange={(e) => handleChange(e)}
                  value={result.value}
                  checked={streamForm.participants === result.value}
                />
                <label className="custom-control-label"> {result.label}</label>
              </div>
            )
          })}
        </div>
        {/* <div className="live-chat-section">
          <div className="live-chat-tag">
            Message delay<em className="req"> *</em>
          </div>
          <span>
            How long you want participants to wait between sending messages
          </span>
        </div>
        <div className="custom-checkbox checkbox-panel">
          <input className="custom-control-input" type="checkbox" />
          <label className="custom-control-label">
            Slow Mode <span className="req"> *</span>
          </label>
        </div>
        <div className="category-section">
          <div className="number-view">
            Seconds
            <input type="text" placeholder="60" />
          </div>
          <div className="number-text">Enter a number between 1 and 300</div>
          <label>
            Edit moderators, balcklisted words, and more from your{" "}
            <a onClick={() => setStatus("community")}>Community settings.</a>
          </label>
        </div> */}
      </div>
    </section>
  )
}
export default WebCustomization
