import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { createStreamProcess } from "@components/my-account/CreateStreamProcess.style";
function EditCustomization({
  eventDetails,
  eventParticipants,
  setParticipants,
  participants,
  setLive_chat,
  setTRecord_stream,
  setMessage_delay_time,
  message_delay_time

}) {
  function delayTime(e) {
    const exp = /^[0-9\b]+$/;
    if (e.target.value === "" || exp.test(e.target.value)) {
      if (e.target.value === "" || (e.target.value >= 1 && e.target.value <= 300)) {
        setMessage_delay_time(e.target.value);
      }

    }
  }
  return (
    <section css={createStreamProcess}>
      <div className="create-stream-process">
        <ul>
          <li className="filled">
            Details
            <span><em><FontAwesomeIcon icon={faCheck} /></em></span>
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
              defaultChecked={eventDetails[0]?.live_chat}
              name="live_chat"
              onClick={() => setLive_chat(true)}
            />

            <label className="custom-control-label">
              Live Chat
            </label>

          </div>
          <div className="custom-checkbox checkbox-panel">
            <input
              className="custom-control-input"
              type="checkbox"
              defaultChecked={eventDetails[0]?.record_stream}
              name="record_stream"
              onClick={() => setTRecord_stream(true)}

            />
            <label className="custom-control-label">
              Record Stream
            </label>
          </div>
        </div>
        <div className="live-chat-section">
          <div className="live-chat-tag">Participant modes </div>
          <span>Who can send messages</span>
        </div>
        <div className="option-panel">
          {eventParticipants && eventParticipants.map((result, i) => {
            return <>
              <div className="custom-radio">
                <input className="custom-control-input"
                  type="radio"
                  id={"privacy" + i}
                  name={"privacy" + i}
                  checked={participants === result.value}
                  onChange={() => setParticipants(result.value)
                  }
                />
                <label className="custom-control-label"> {result.label}</label>

              </div>
            </>
          })

          }

        </div>
        <div className="live-chat-section">
          <div className="live-chat-tag">Message delay<em className="req"> *</em></div>
          <span>How long you want participants to wait between sending messages</span>
        </div>
        <div className="custom-checkbox checkbox-panel">
          <input
            className="custom-control-input"
            defaultChecked={eventDetails[0]?.message_delay}
            type="checkbox"

          />
          <label className="custom-control-label">
            Slow Mode <span className="req"> *</span>
          </label>
        </div>
        <div className="category-section">
          <div>Seconds<em className="req"> *</em></div>
          <div className="number-view">
            Seconds
            <input type="text"
              maxLength={3}
              value={message_delay_time}
              onChange={(e) => delayTime(e)}
              placeholder="60" />
          </div>
          <div className="number-text">Enter a number between 1 and 300</div>
          <label>Edit moderators, balcklisted words, and more from your <a>Community settings.</a>
          </label>
        </div>
      </div>
    </section>
  )
}

export default EditCustomization;