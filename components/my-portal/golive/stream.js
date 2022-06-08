import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faLock } from "@fortawesome/free-solid-svg-icons";
import { createEventStream, getStream } from "../../../pages/api/stream.api";
import Router from 'next/router';

function Stream(){
//     const { user } = useContext(UserContext);
//    // const [stream, setStream] = useEffect()
//     const [streamKey, setStreamKey] = useEffect()
//     const [streamUrl, setStreamUrl] = useEffect()

//     const submitValue = () =>{
//         const formData = {
//             user_id: user?.id,
//         }
//         createEventStream(user, formData).then((res) =>{
//          console.log(res.data.data);
//          //setStream(res.data.data)

//         })
//     }
//  const params = {
//     user_id: user?.id,
//  }
//   function GetStream() {
//     getStream(user).then((res) =>{
//         console.log(res.data.data);
//     })
//   }  
//   useEffect(() => {
//     if (user) {
//         GetStream()
//     }
// }, [user])

    return(
        <>
            <div className="wcfm-collapse-content">
                <div className="stream-container">
                    Coming Soon...
                </div>
                <div className="stream-category-section">
                    <button className="edit-button">edit</button>
                    <div className="col-12-div">
                        <label>Title</label>
                        <div className="text-tag">Shift Music</div>
                    </div>
                    <div className="col-12-div">
                        <label>Category</label>
                        <div className="text-tag">Nonprofits & Activity</div>
                    </div>
                    <div className="col-panel">
                        <div className="col-1-tag">
                            <label>Privacy</label>
                            <div className="text-tag">Public</div>
                        </div>
                        <div className="col-1-tag">
                            <label>Scheduled for</label>
                            <div className="text-tag">Sep 19 2021 9:10AM</div>
                        </div>
                    </div>
                </div>
                <div className="stream-setting-section">
                    <h3>Stream Settings</h3>
                    <h4>Stream Key</h4>
                    <div className="col-12-div">
                        <label>Stream Key (paste in encoder)</label>
                        <div className="stream-panel">
                            <input className="stream-key" type="text"
                            // value= {streamKey}
                            // onChange={(e) => setStreamKey(e)}
                             />
                            <FontAwesomeIcon icon={faEye} />
                            <button className="reset-button">RESET</button>
                            <button className="reset-button">COPY</button>
                        </div>
                    </div>
                    <div className="col-12-div">
                        <label>Stream URL</label>
                        <div className="stream-panel url-icon">
                            <FontAwesomeIcon icon={faLock} />
                            <input className="stream-url"
                             type="text"
                            //  value= {streamUrl}
                            //  onChange={(e) => setStreamUrl(e)}
                             />
                            <button className="reset-button">COPY</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wcfm-button-panel">
            <button onClick={() => submitValue()}>Save</button>
            </div>
        </>
    )
}
export default Stream;