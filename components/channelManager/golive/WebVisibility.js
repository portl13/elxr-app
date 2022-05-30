import React from "react";
import { PRIVACY, STREAM_METHOD } from "../../../utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
function WebVisibility(props) {

  const {setStreamForm, streamForm } = props

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
    <>
      <div className="create-stream-process">
        <ul>
          <li className="filled">
            Details
            <span><em><FontAwesomeIcon icon={faCheck} /></em></span>
          </li>
          <li className="filled">
            Customization
            <span><em><FontAwesomeIcon icon={faCheck} /></em></span>
          </li>
          <li className="active">
            Visibility
            <span></span>
          </li>
        </ul>
      </div>
      <div className="details-data-section">
        <h2>
          Visibility
          <span>Choose when to go live and who can see your stream</span>
        </h2>
        <div className="privacy-panel">
          <div className="live-chat-section">
            <div className="live-chat-tag">
              Privacy <em className="req"> *</em>
            </div>
            <span>Make your video public, unlisted or private</span>
          </div>

          {PRIVACY.map((item, i) => {
            return (
                <div key={item.value} className="custom-radio">
                  <input
                    className="custom-control-input"
                    type="radio"
                    value={item.value}
                    id="visability"
                    name="visability"
                    onChange={e => handleChange(e)}
                    checked={streamForm.visability === item.value}
                  />
                  <label className="custom-control-label">
                    {item.name}
                    <span>{item.description}</span>
                  </label>
                </div>
            );
          })}
        </div>
      </div>
      <div className="details-data-section">
        <h2>
          Streaming Method
          <span>Choose how you are going to create your live stream</span>
        </h2>
        <div className="privacy-panel">
          {STREAM_METHOD.map((item, i) => {
            return (
                <div key={item.value} className="custom-radio">
                  <input
                    className="custom-control-input"
                    type="radio"
                    value={item.value}
                    id="type_stream"
                    name="type_stream"
                    onChange={e => handleChange(e)}
                    checked={streamForm.type_stream === item.value}
                  />
                  <label className="custom-control-label">
                    {item.name}
                    <span>{item.description}</span>
                  </label>
                </div>
            );
          })}
        </div>
        <div className="live-chat-section">
            Streaming Method
            <span>Choose how you are going to create your live stream</span>
        </div>
        <div className="privacy-panel">
            <div className="custom-radio">
                <input className="custom-control-input"
                    type="radio"
                />
                <label className="custom-control-label">
                    Webcam
                    <span>Stream directly from your web browser</span>
                </label>
            </div>
            <div className="custom-radio">
                <input className="custom-control-input"
                    type="radio"
                />
                <label className="custom-control-label">
                    Software Stream
                    <span>Stream using 3rd party software such as OBS</span>
                </label>
            </div>
        </div>
        <div className="live-chat-section">
          Schedule
          <span>Select the date and time you want to go live</span>
        </div>
        <div className="schedule-tag">
          <input type="datetime-local" />
        </div>
      </div>
    </>
  );
}
export default WebVisibility;
