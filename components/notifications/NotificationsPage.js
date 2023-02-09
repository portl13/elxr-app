import React, { useState, useEffect, useContext } from "react";
import { css } from "@emotion/core";
import Router from "next/router";
import moment from "moment";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "react-alert";
import { UserContext } from "@context/UserContext";
import {
  getNotificationDetails,
  deleteNotification,
  updateNotification,
} from "@api/notification.api";
import { TIMEOUT } from "@utils/constant";
import { LoaderContainer } from "@components/livefeed/livefeed.style";

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

const filterOptions = [
    {
        title: 'View All',
        id: 'all'
    },
    {
        title: 'New mentions',
        id: 'new-mentions'
    },
    {
        title: 'New activity comments',
        id: 'new-activity-comments'
    },
    {
        title: 'New activity posts',
        id: 'new-activity-posts'
    },
    {
        title: 'Connection requests',
        id: 'connection-requests'
    },
    {
        title: 'Group invitations and requests',
        id: 'group-invitations-requests'
    },
    {
        title: 'Group promotions',
        id: 'group-promotions'
    },
    {
        title: 'Group details changed',
        id: 'group-details-changed'
    },
    {
        title: 'Forum subscriptions',
        id: 'forum-subscriptions'
    },
    {
        title: 'Password changed',
        id: 'password-changed'
    }
]

const bulkActions = [
    {
        title: 'Bulk Actions',
        id: ''
    },
    {
        title: 'Mark read',
        id: 'mark-read'
    },
    {
        title: 'Delete',
        id: 'delete'
    }
]

export default function NotificationsPage() {
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
  const [bulkActionSelect, setBulkActionSelect] = useState(false);
  const [checkedAll, setCheckedAll] = React.useState(true);

  const handleCheckedAll = (event) => {
    setCheckedAll(event.target.checked);
  };

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
  }, [user]);

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
    <>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Notifications</h4>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-1 mb-3">
            <button
                className="notif-filter-btn"
                onClick={() => console.log('unread')}
            >
                Unread
            </button>
        </div>
        <div className="col-12 col-md-1 mb-3">
            <button
                className="notif-filter-btn"
                onClick={() => console.log('read')}
            >
                Read
            </button>
        </div>
        <div className="col-12 col-md-3 mb-3">
            <select
                className="notif-select"
                type="select"
                id="filterNotification"
                onChange={(event) => setFilter(event.target.value)}
                value={filter}
            >
                {filterOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.title}</option>
                ))}
            </select>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
            {loadData === false && (
                <p css={LoaderContainer}>
                    <span>
                        <FontAwesomeIcon icon={faClock} />
                    </span>
                    Loading notifications. Please wait.
                </p>
            )}

            {loadData === true &&
                result && result.length > 0 && (
                    <table class="table table-borderless table-hover notif-table">
                        <thead>
                            <tr>
                                <th scope="col" className="p-0">
                                    <label class="notif-checkbox-cont">
                                        <input 
                                            type="checkbox" 
                                            checked={checkedAll}
                                            onChange={handleCheckedAll}
                                        />
                                        <span class="checkmark"></span>
                                    </label>
                                </th>
                                <th scope="col">
                                    <div className="row d-flex justify-content-between align-items-center">
                                        <select
                                            className="notif-bulk-action"
                                            type="select"
                                            id="bulk-actions"
                                            onChange={(event) => setBulkActionSelect(event.target.value)}
                                            value={bulkActionSelect}
                                        >
                                            {bulkActions.map(option => (
                                                <option key={option.id} value={option.id}>{option.title}</option>
                                            ))}
                                        </select>

                                        <button
                                            className="notif-apply-btn"
                                            onClick={() => console.log('apply')}
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </th>
                                <th scope="col">
                                    <div className="notif-sort">
                                        <span className="mr-2">
                                            Sort by date
                                        </span>
                                        <FontAwesomeIcon icon={faChevronDown} className='notif-sort-icon' />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        {/* <tbody>
                            {result.map(item => (
                                <tr>
                                    <th scope="row">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id='checkbox'
                                            name='checkbox'
                                            value={checkbox}
                                            onChange={(event) => setCheckbox(event.target.value)}
                                            checked={checkbox}
                                        />
                                    </th>
                                    {/* <td>
                                        <div className="d-flex" onClick={() => handleRedirect(item)}>
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
                                    </td>
                                    <td>
                                        <div className="row mx-0 align-items-center">
                                            <FontAwesomeIcon icon={faTrashO} />
                                            <FontAwesomeIcon icon={faClock} />
                                        </div>
                                    </td> */}
                                {/* </tr>
                            ))}  
                        </tbody> */}
                    </table>
            )}
    
        </div>
      </div>
    </>
  );
}
