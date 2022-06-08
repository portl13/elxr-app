import React, { useState, useEffect, useContext } from 'react'
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { css } from '@emotion/core'
import { createStreamProcess } from "@components/my-account/CreateStreamProcess.style";
function Visibility({
  setVisability,
  visability,
  privacy,
  setDateTime,
  date_time,
  format,
  setTime,
  type_stream,
  setTypeStream,
  typeStream,
  schedule,
  setSchedule,
}) {
  function onChange(eventTime) {
    setTime(eventTime.format(format))
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
          <li className="filled">
            Customization
            <span>
              <em>
                <FontAwesomeIcon icon={faCheck} />
              </em>
            </span>
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
          {privacy &&
            privacy.map((item, i) => {
              return (
                <div key={item.value} className="custom-radio">
                  <input
                    className="custom-control-input"
                    type="radio"
                    value={item.value}
                    id={'privacy' + i}
                    name={'privacy' + i}
                    checked={visability === item.value}
                    onChange={(e) => {
                      setVisability(e.target.value)
                    }}
                  />
                  <label className="custom-control-label">
                    {item.name}
                    <span>{item.description}</span>
                  </label>

                </div>

              )
            })}
        </div>


        <h2>
          Streaming Method
          <span>Choose how you are going to create your live stream</span>
        </h2>
        <div className="privacy-panel">
          {type_stream &&
            type_stream.map((item, i) => {
              return (
                <div key={item.value} className="custom-radio">
                  <input
                    className="custom-control-input"
                    type="radio"
                    value={item.value}
                    id={'type_stream' + i}
                    name={'type_stream' + i}
                    checked={typeStream === item.value}
                    onChange={(e) => {
                      setTypeStream(e.target.value)
                    }}
                  />
                  <label className="custom-control-label">
                    {item.name}
                    <span>{item.description}</span>
                  </label>
                </div>
              )
            })}
        </div>

        <div className="custom-radio">
          <input
            className="custom-control-input"
            type="radio"
            value="now"
            id={'schedule'}
            name={'schedule'}
            checked={schedule === 'now'}
            onChange={(e) => {
              setSchedule(e.target.value)
            }}
          />
          <label className="custom-control-label">Go Live Now</label>
        </div>

        <div className="custom-radio">
          <input
            className="custom-control-input"
            type="radio"
            value="schedule"
            id={'schedule'}
            name={'schedule'}
            checked={schedule === 'schedule'}
            onChange={(e) => {
              setSchedule(e.target.value)
            }}
          />
          <label className="custom-control-label">
            Schedule
            <span className="d-block">
              Select the date and time you want to go live
            </span>
            <span>
              <div className="schedule-tag">
                <input
                  type="date"
                  className="date-selector"
                  value={date_time}
                  onChange={(e) => setDateTime(e.target.value)}
                  min={moment().format('YYYY-MM-DD')}
                />
                <TimePicker
                  showSecond={false}
                  onChange={onChange}
                  format={format}
                  use12Hours
                  placeholder="1.35pm"
                  defaultValue={moment()}
                  inputReadOnly
                />
              </div>
            </span>
          </label>
        </div>
      </div>
    </section>
  )
}
export default Visibility
