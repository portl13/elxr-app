import React, { useState, useEffect, useContext } from "react";
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import DatePicker from 'react-datepicker';
import 'rc-time-picker/assets/index.css';
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function EditVisibility({
    eventDetails,
    privacy,
    setVisability,
    visability,
    date_time,
    setDateTime,
    format,
    setTime,
    eventTime,
    
})


{
    function onChange(eventTime) {
        setTime(eventTime)

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
                        <div className="live-chat-tag">Privacy <em className="req"> *</em></div>
                        <span>Make your video public, unlisted or private</span>
                    </div>

                    {privacy && privacy.map((item, i) => {
                        return <>
                            <div className="custom-radio">
                                <input className="custom-control-input"
                                    type="radio"
                                    id={"privacy" + i}
                                    name={"privacy" + i}
                                    checked={visability === item.value}
                                    onChange={() => {
                                        setVisability(item.value);
                                    }}
                                />
                                <label className="custom-control-label">
                                    {item.name}
                                    <span>{item.description}</span>
                                </label>


                            </div>
                        </>
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

                    <DatePicker
                        minDate={moment().toDate()}
                        selected={date_time}
                        value={date_time}
                        onChange={(date) => setDateTime(date)}
                    />
                    <TimePicker
                        showSecond={false}
                        onChange={onChange}
                        defaultValue={eventTime}
                        format={format}
                        use12Hours
                        inputReadOnly
                        

                    />


                </div>
            </div>
        </>
    )
}

export default EditVisibility;

