import React, { useState, useEffect, useContext } from "react";
import { Container } from "@material-ui/core";
import Router from "next/router";
import moment from "moment";
import axios from "axios";
import { useAlert } from "react-alert";
import { UserContext } from "@context/UserContext";
import Nodata from "../components/Nodata/index";
import GradientButton from "../components/ui/button/GradientButton";
import CenterLoader from "../components/CenterLoader/index";
import {
  getNotificationDetails,
  deleteNotification,
  updateNotification,
} from "@api/notification.api";
import { TIMEOUT } from "@utils/constant";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import { css } from "@emotion/core";

const style = css`
  .notification-layout {
    max-width: 604px;
    width: 100%;
    margin: 0 auto;
    padding-top: 40px;
    .notification-head-title {
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 20px;
      text-transform: uppercase;
      text-align: center;
    }
    .notification-wrap-card {
      border-radius: 11px;
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      background-color: var(--bg-buttons-bar);
      padding: 21px 40px;
      min-height: calc(100vh - 296px);
      .notification-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 18px 0;
        border-bottom: solid 1px #e9e9e9;
        cursor: pointer;
        &.unread {
          .notification-title {
            font-weight: bold;
          }
        }
        &:hover {
          .cross-icon {
            display: block;
          }
        }
        &:last-child {
          border-bottom: none;
        }
        .notification-icon {
          width: 26px;
          min-width: 26px;
          height: 26px;
          border-radius: 50%;
          margin-right: 10px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
          }
        }
        .notification-itle {
          line-height: normal;
        }
        .notification-subtitle {
          font-size: 12px;
          color: #5f5f5f;
          margin-top: 2px;
        }
        .cross-icon {
          margin-left: 30px;
          cursor: pointer;
          display: none;
          img {
            opacity: 0.6;
          }
        }
        button {
          min-height: 36px;
          height: 36px;
          margin-left: 10px;
          padding: 9px 18px 8px 17px;
        }
      }
    }
  }
  .decline-btn {
    height: 36px;
    padding: 8px 18px 9px 17px;
    border-radius: 18px;
    background-color: #ffe3e3;
    font-size: 15px;
    font-weight: bold;
    color: #ff5353;
    border: 0;
    outline: none;
    box-shadow: none;
  }
  .menu-title {
    cursor: pointer;
    &.new-notification {
      position: relative;
      &::after {
        content: "";
        width: 10px;
        min-width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #ff5e54;
        position: absolute;
        top: -3px;
        right: 22px;
        border: 1px solid #fff;
      }
    }
  }
`;

export default function Notifications() {
  const alert = useAlert();
  const { user } = useContext(UserContext);
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("DESC");
  const [loader, setLoader] = useState(false);
  const [count, setCount] = useState(0);
  const [notiCheck, setNotiCheck] = useState(false);
  const [status, setStatus] = useState(true);
  const [loadData, setLoadData] = useState(false);
  const [length, setLength] = useState(0);
  const [action, setAction] = useState("");
  const [filter, setFilter] = useState("");
  const [notiId, setNotiId] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const data = {
    page,
    per_page: 20,
    sort_order: sort,
    is_new: status,
    component_action: filter,
  };

  const getNotifications = () => {
    getNotificationDetails(user, data).then((res) => {
      console.log(res);
      const resData = res?.data?.filter(
        (item) =>
          item.action === "friendship_accepted" ||
          item.action === "friendship_request" ||
          item.action === "update_reply" ||
          item.action === "comment_reply" ||
          item.action === "member_promoted_to_admin" ||
          item.action === "membership_request_rejected" ||
          item.action === "member_promoted_to_mod" ||
          item.action === "membership_request_accepted" ||
          item.action === "group_invite" ||
          item.action === "new_membership_request" ||
          item.action === "new_message" ||
          item.action === "bbp_new_reply" ||
          item.action === "bb_activity_following_post" ||
          item.action === "bb_connections_request_accepted"
      );
      setResult(resData);
      setLoadData(true);
      const total =
        res.headers["bbp-unread-notifications"] !== undefined
          ? res.headers["bbp-unread-notifications"]
          : null;
      setCount(total);
      for (let i = 1; i <= page; i++) {
        setLength(length + parseInt(res.data.length));
      }
      setLoadData(true);
      setLoader(false);
    });
  };

  useEffect(() => {
    if (user?.id) {
      getNotifications();
    }
  }, [page, sort, status, filter, user]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (user?.id) {
        setLoaded(loaded + 1);
        getNotifications();
      }
    }, 20000);
    return () => clearInterval(interval);
  }, [user]);

  function selectAll() {
    if (notiCheck === true) {
      setNotiCheck(false);
      setResult(result);
      setNotiId([]);
      setAction("");
    } else {
      setResult(result);
      setNotiCheck(true);
      setNotiId(result.map((d) => d.id));
    }
  }
  function emptyStates() {
    setPage(1);
    setResult([]);
    setCount(0);
    setLength(0);
    setLoadData(false);
    setNotiCheck(false);
    setAction("");
  }
  const handleDelete = (childData) => {
    const id = childData;
    deleteNotification(user, id).then(() => {
      setResult(result.filter((item) => item.id !== id));
      setCount(count - 1);
      setLength(length - 1);
      const len = count - 1;
      const leng = length - 1;
      len == 0 || (leng == 0 && load());
    });
  };
  function load() {
    setLength(0);
    setLoadData(true);
  }
  const updateNoti = (childData) => {
    const Id = childData;
    const formData = {
      id: Id,
      is_new: status ? 0 : 1,
    };
    updateNotification(user, Id, formData).then(() => {
      setResult(result.filter((item) => item.id !== Id));
      setCount(count - 1);
      setLength(length - 1);
      const len = count - 1;
      const leng = length - 1;
      (len == 0 || leng == 0) && load();
    });
  };
  const updateLink = (childData) => {
    const Id = childData;
    const formData = {
      id: Id,
      is_new: 0,
    };
    updateNotification(user, Id, formData).then((res) => {
      console.log(res.data);
    });
  };
  function bulkAction() {
    action === "delete" ? multipleDelete() : multipleUpdate();
  }

  function multipleDelete() {
    notiId.map((id, key) => {
      deleteNotification(user, id).then(() => {
        const arr = result.filter((item) => !notiId.includes(item.id));
        setResult(arr);
        setNotiCheck(false);
        setCount(count - notiId.length);
        setLength(length - notiId.length);
        const len = count - notiId.length;
        len == 0 && load();
      });
    });
  }
  function multipleUpdate() {
    notiId.map((Id, key) => {
      const formData = {
        id: Id,
        is_new: status ? 0 : 1,
      };
      updateNotification(user, Id, formData).then(() => {
        const arr = result.filter((item) => !notiId.includes(item.id));
        setResult(arr);
        setNotiCheck(false);
        setCount(count - notiId.length);
        setLength(length - notiId.length);
        const len = count - notiId.length;
        len == 0 && load();
      });
    });
  }

  const extractContent = (s) => {
    const span = document.createElement("span");
    span.innerHTML = s;
    return span.textContent || span.innerText;
  };

  const handleConnectionDecline = (item) => {
    const id = item?.secondary_item_id;
    console.log(user?.token);
    axios
      .delete(`${process.env.bossApi}/friends/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        getNotifications();
        alert.success("Request declined.", TIMEOUT);
      });
  };

  const handleConnectionAccept = (item) => {
    const id = item?.secondary_item_id;
    axios
      .patch(
        `${process.env.bossApi}/friends/${id}`,
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        getNotifications();
      });
  };

  const handleNotificationDelete = (item) => {
    deleteNotification(user, item.id).then((res) => {
      getNotifications();
    });
  };

  const handleRedirect = (item) => {
    updateNotification(user, item.id, {}).then(() => {
      const action = item?.action;
      if (action === "new_message") {
        Router.push(`/messages/compose/${user.name}/${user.id}`);
      }
      // dispatch(setCommunityUserId(user.id));
      if (action === "update_reply" || action === "comment_reply") {
        Router.push(`/activity/${item.item_id}`);
      }
      if (
        action === "member_promoted_to_admin" ||
        action === "membership_request_rejected" ||
        action === "member_promoted_to_mod"
      ) {
        Router.push(`/group/group_detail/${item.item_id}?tab=feeds`);
      }
      if (action === "membership_request_accepted") {
        Router.push(
          `/profile/${user.name}/${item.user_id}?key=connections&tab=connection`
        );
      }
      if (action === "group_invite") {
        Router.push(
          `/profile/${user.name}/${item.user_id}?key=community&tab=invitation`
        );
      }
      if (
        action === "new_membership_request" ||
        action === "friendship_request"
      ) {
        Router.push(
          `/profile/${user.name}/${item.user_id}?key=connections&tab=request`
        );
      }
      if (action === "bbp_new_reply") getDiscussionId(item.link_url, user);
    });
  };

  return (
    <MainLayout title="Notifications | elxr" sidebar={<MainSidebar />}>
      <Container
        css={style}
        maxWidth="lg"
        className="main-inner d-flex flex-column justify-content-between"
      >
        {loadData === false && (
          <div className="full-page-loader">
            <CenterLoader />
          </div>
        )}
        {result.length === 0 && loadData && (
          <Nodata text="No Notifications yet!" />
        )}
        {result.length > 0 && (
          <div className="notification-layout">
            <div className="notification-head-title">ALL NOTIFICATIONS</div>
            <div className="notification-wrap-card">
              {/* div to be repeated */}
              {/* NOTE : use unread class for new notifications */}
              {result &&
                result.map((item, i) => (
                  <div className="notification-row unread" key={i}>
                    <div
                      className="d-flex"
                      onClick={() => handleRedirect(item)}
                    >
                      <div className="notification-icon">
                        <img src={item?.avatar_urls?.full} alt="icon" />
                      </div>
                      <div>
                        <div className="notification-title">
                          {`${extractContent(item?.description?.rendered)}.`}
                        </div>
                        <div className="notification-subtitle">
                          {moment(item?.date).format("MMMM DD, YYYY")}
                        </div>
                      </div>
                    </div>
                    {item.action === "new_message" ||
                    item.action === "friendship_accepted" ||
                    item.action === "update_reply" ||
                    item.action === "comment_reply" ||
                    item.action === "member_promoted_to_admin" ||
                    item.action === "membership_request_rejected" ||
                    item.action === "member_promoted_to_mod" ||
                    item.action === "membership_request_accepted" ||
                    item.action === "group_invite" ||
                    item.action === "new_membership_request" ||
                    item.action === "bbp_new_reply" ? (
                      <div className="d-flex align-items-center">
                        <div
                          className="cross-icon"
                          onClick={() => handleNotificationDelete(item)}
                        >
                          <img src="/img/cross-icon.svg" alt="icon" />
                        </div>
                      </div>
                    ) : item.action === "friendship_request" ? (
                      <div className="d-flex align-items-center">
                        <button
                          className="decline-btn"
                          onClick={() => handleConnectionDecline(item)}
                        >
                          Decline
                        </button>
                        <GradientButton
                          type="button"
                          onClick={() => handleConnectionAccept(item)}
                        >
                          Accept
                        </GradientButton>
                      </div>
                    ) : null}
                  </div>
                ))}
            </div>
          </div>
        )}
      </Container>
      {/* Notifications section */}
    </MainLayout>
  );
}
