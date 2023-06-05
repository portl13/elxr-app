import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button } from "reactstrap";
import axios from "axios";

function GroupInviteCard({
  userId,
  user,
  date,
  requestId,
  parentCallback,
  parentCall,
}) {
  const [userImage, setUserImage] = useState();
  const [userName, setUserName] = useState();

  function getUser() {
    axios(process.env.bossApi + `/members/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      setUserName(res.data.profile_name);
      setUserImage(res.data.avatar_urls.thumb);
    }).catch(e=>console.log(e));
  }

  useEffect(() => {
    if (userId != null) {
      getUser();
    }
  }, [userId]);

  const getRequestId = () => {
    parentCallback(requestId);
  };

  const getAcceptId = () => {
    parentCall(requestId);
  };

  return (
    <>
      <div className="community-invite-panel manage-invite-panel">
        <div className="left-panel">
          <div className="image-tag">
            <img src={userImage} />
          </div>
          <div className="info-panel">
            <div className="main-tag">{userName}</div>
            <div className="time-by">
              <span>{moment(date).fromNow()}</span>
            </div>
          </div>
        </div>
        <div className="right-panel justify-content-end">
          <button className="btn btn-primary" onClick={() => getAcceptId()}>Accept</button>
          <Button onClick={() => getRequestId()}>Reject</Button>
        </div>
      </div>
    </>
  );
}
export default GroupInviteCard;
