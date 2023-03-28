import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button } from "reactstrap";
import axios from "axios";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import jstz from "jstz";
import {utcToZonedTime} from "date-fns-tz";
import {formatDistanceToNow} from "date-fns";

const postedData = (date) => {
  const newDate = new Date(`${date}Z`)
  const timeZone = jstz.determine().name()
  const zonedDate = utcToZonedTime(newDate, timeZone)
  const posted = formatDistanceToNow(zonedDate, { addSuffix: true })
  return <> {posted === 'less than a minute' ? `${posted} ago` : posted}</>
}

function InvitationCard({
  message,
  date,
  userId,
  groupId,
  user,
  id,
  parentCallback,
  parentCall,
  current,
  isLoading,
  setCurrent,
  currentState,
  setCurrentState,
}) {
  const [groupName, setGroupName] = useState();
  const [groupImage, setGroupImage] = useState();
  const [userName, setUserName] = useState();
  
  function getGroup() {
    axios(process.env.bossApi + `/groups/${groupId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      setGroupName(res.data.name);
      setGroupImage(res.data.avatar_urls.thumb);
    });
  }

  useEffect(() => {
    if (groupId != null) {
      getGroup();
    }
  }, [groupId]);

  function getUser() {
    axios(process.env.bossApi + `/members/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      setUserName(res.data.name);
    });
  }

  useEffect(() => {
    if (userId != null) {
      getUser();
    }
  }, [userId]);

  const onTrigger = () => {
    setCurrentState("reject");
    setCurrent(id);
    parentCallback(id);
  };

  const getId = () => {
    setCurrentState("accept");
    setCurrent(id);
    parentCall(id);
  };

  return (
    <>
      <div className="community-invite-panel">
        <div className="left-panel">
          <div className="image-tag">
            <img src={groupImage} />
          </div>
          <div className="info-panel">
            <div className="main-tag">{groupName}</div>
            <div className="invited-by">
              Invited by
              <a href="@components/profile/invitationcard#">{userName}</a>
            </div>
            <div className="time-by">
              <span>{postedData(date)}</span>
            </div>
            <div className="message-by">
              <span>{message}</span>
            </div>
          </div>
        </div>
        <div className="right-panel">
          <Button onClick={() => getId()}>
            {currentState === "accept" && isLoading && current === id ? (
              <SpinnerLoader width={"20px"} height={"20px"} pd={0} />
            ) : (
              "Accept"
            )}
          </Button>
          <Button onClick={() => onTrigger()}>
            {currentState === "reject" && isLoading && current === id ? (
              <SpinnerLoader width={"20px"} height={"20px"} pd={0} />
            ) : (
              "Reject"
            )}
          </Button>
        </div>
      </div>
    </>
  );
}

export default InvitationCard;
