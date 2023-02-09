import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import moment from "moment";
import axios from "axios";
import { UncontrolledTooltip } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faChevronDown, faTrashAlt, faEyeSlash, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "react-alert";
import { UserContext } from "@context/UserContext";
import {
  getNotificationDetails,
  deleteNotif,
  updateNotification,
} from "@api/notification.api";
import { TIMEOUT } from "@utils/constant";
import { LoaderContainer } from "@components/livefeed/livefeed.style";

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
    deleteNotif(user, id).then(() => {
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
      deleteNotif(user, id).then(() => {
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
                onClick={() => multipleUpdate()}
            >
                Unread
            </button>
        </div>
        <div className="col-12 col-md-1 mb-3">
            <button
                className="notif-filter-btn"
                onClick={() => multipleUpdate()}
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
                    <option key={option.id} value={option.id}>
                        {option.title}
                    </option>
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

            {loadData === true && result && result?.length > 0 && (
                <ul class="p-0">
                    <li className="row mx-0 w-100 notif-list-head">
                        <div className="col-12 col-md-1 d-flex align-items-center mb-2">
                            <label class="notif-checkbox-cont">
                                <input 
                                    type="checkbox" 
                                    checked={checkedAll}
                                    onChange={handleCheckedAll}
                                />
                                <span class="checkmark"></span>
                            </label>
                        </div>
                        <div className="col-12 col-md-6 mb-2">
                            <div className="row d-flex justify-content-between align-items-center">
                                <select
                                    className="notif-bulk-action mb-2"
                                    type="select"
                                    id="bulk-actions"
                                    onChange={(event) => setBulkActionSelect(event.target.value)}
                                    value={bulkActionSelect}
                                >
                                    {bulkActions.map(option => (
                                        <option key={option.id} value={option.id}>
                                            {option.title}
                                        </option>
                                    ))}
                                </select>

                                <button
                                    className="notif-apply-btn mb-2"
                                    onClick={() => multipleUpdate()}
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                        <div className="col-12 col-md-5 mb-2">
                            <div className="notif-sort">
                                <span className="mr-2">
                                    Sort by date
                                </span>
                                <FontAwesomeIcon 
                                    icon={faChevronDown} 
                                    className='notif-sort-icon'
                                    id="TooltipExample"
                                />
                                 <UncontrolledTooltip target="TooltipExample">
                                    Newest First
                                </UncontrolledTooltip>
                            </div>
                        </div>
                    </li>
            
                    {result.map(item => (
                        <li className="row mx-0 w-100">
                            <div className="col-12 col-md-1 d-flex align-items-center mb-2">
                                <label class="notif-checkbox-cont">
                                    <input 
                                        type="checkbox" 
                                        checked={checkedAll}
                                        onChange={handleCheckedAll}
                                    />
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                            <div className="col-12 col-md-6 mb-2">
                                <div className="d-flex" onClick={() => handleRedirect(item)}>
                                    <div className="notif-avatar">
                                        <img 
                                            src={item?.avatar_urls?.full} 
                                            alt="icon" 
                                            className="notif-img" 
                                        />
                                    </div>
                                    <div>
                                        <div className="notif-title">
                                            {`${extractContent(item?.description?.rendered)}.`}
                                        </div>
                                        <div className="notif-subtitle">
                                            {moment(item?.date).format("MMMM DD, YYYY")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-5 mb-2 d-flex justify-content-center align-items-center">
                                <div className="row mx-0 d-flex align-items-center justify-content-end">
                                    <FontAwesomeIcon 
                                        icon={faEyeSlash} 
                                        className='notif-sort-icon mr-3' 
                                        onClick={() => updateNoti(item?.id)}
                                        id='MarkRead'
                                    />
                                     <UncontrolledTooltip target="MarkRead">
                                        Mark Read
                                    </UncontrolledTooltip>
                                    <FontAwesomeIcon 
                                        icon={faTrashAlt} 
                                        className='notif-sort-icon'
                                        onClick={() => handleDelete(item?.id)}
                                        id='DeleteNotif'
                                    />
                                     <UncontrolledTooltip target="DeleteNotif">
                                        Delete
                                    </UncontrolledTooltip>
                                </div>
                            </div>
                        </li>
                    ))}  

                </ul>
            )}
    
        </div>
      </div>
    </>
  );
}
