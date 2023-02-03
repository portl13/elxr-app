import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Button, Alert } from "reactstrap";
import { getProfileRoute } from "@utils/constant";
import Link from "next/link";
function ConnectionRequestCard({
  id,
  user,
  initiatorId,
  parentCallback,
  parentCall,
}) {
  const [userActive, setUserActive] = useState();
  const [userImage, setUserImage] = useState();
  const [userName, setUserName] = useState();
  const [acceptStatus, setAcceptStatus] = useState(false);
  const [rejectStatus, setRejectStatus] = useState(false);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState(false);
  const [userId, setUserId] = useState();
  const onDismiss = () => setVisible(false);
  function getUser() {
    axios(process.env.bossApi + `/members/${initiatorId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      setUserName(res.data.profile_name);
      setUserImage(res.data.avatar_urls.thumb);
      setUserActive(res.data.last_activity);
      setUserId(res.data.id);
      setAcceptStatus(false);
      setRejectStatus(false);
      setStatus(true);
    });
  }
  useEffect(() => {
    if (initiatorId != null) {
      getUser();
    }
  }, [initiatorId]);
  const onTrigger = () => {
    parentCallback(id);
  };
  const getId = () => {
    parentCall(id);
  };
  return (
    <>
      <li className="list-wrap">
        <div className="list-wrap-inner">
          <div className="item-avatar">
            {status && (
              <Link
                className="mr-1"
                href={getProfileRoute(userName, userId, "timeline", "personal")}
              >
                <a>
                  <img src={userImage} className="avatar" alt="Profile photo" />
                </a>
              </Link>
            )}
          </div>
          <div className="item">
            <div className="item-block">
              <h2 className="list-title">
                {status && (
                  <Link
                    className="mr-1"
                    href={getProfileRoute(
                      userName,
                      userId,
                      "timeline",
                      "personal"
                    )}
                  >
                    <a>{userName}</a>
                  </Link>
                )}
              </h2>
              <p className="item-meta">{moment(userActive).fromNow()}</p>
            </div>
            <div className="member-button-wrap">
              <Button
                className={
                  acceptStatus === false
                    ? "primary-button"
                    : "connection-button"
                }
                onClick={() => {
                  setAcceptStatus(true);
                  setTimeout(() => getId(), 100);
                }}
              >
                {acceptStatus === false ? "Accept" : "Connection Accepted"}
              </Button>
              <Button
                className={
                  rejectStatus === false
                    ? "primary-button"
                    : "connection-button"
                }
                onClick={() => {
                  setRejectStatus(true);
                  setTimeout(() => onTrigger(), 100);
                }}
              >
                {rejectStatus === false ? "Ignore" : "Connection Rejected"}
              </Button>
              <Button
                className="primary-button"
                onClick={() => setVisible(true)}
              >
                View As
              </Button>
            </div>
          </div>
        </div>
        <Alert color="warning" isOpen={visible} toggle={onDismiss}>
          Coming Soon..
        </Alert>
      </li>
    </>
  );
}
export default ConnectionRequestCard;
