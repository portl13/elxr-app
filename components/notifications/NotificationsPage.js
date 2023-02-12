import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import moment from "moment";
import { UncontrolledTooltip } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faClock, 
  faChevronDown, 
  faChevronUp,
  faTrashAlt, 
  faEyeSlash,
  faEye,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "@context/UserContext";
import {
  getNotificationDetails,
  deleteNotification,
  updateNotification,
} from "@api/notification.api";
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
  const { user } = useContext(UserContext);
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("DESC");
  const [status, setStatus] = useState(true);
  const [loadData, setLoadData] = useState(false);
  const [action, setAction] = useState("");
  const [filter, setFilter] = useState("");
  const [notiId, setNotiId] = useState([]);
  const [bulkActionSelect, setBulkActionSelect] = useState('');
  const [checkedAll, setCheckedAll] = useState(false);
  const [data, setData] = useState({
    page,
    per_page: 20,
    sort_order: sort,
    is_new: status,
    component_action: filter,
  })

  const getNotifications = () => {
    setLoadData(false);
    getNotificationDetails(user, data).then((res) => {
      console.log('res', res);
      const resData = res?.data?.filter((item) =>
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
    });
  };

  useEffect(() => {
    if (user?.id) {
      getNotifications();
    }
  }, [user, data]);

  const getUnread = () => {
    setStatus(true)
    setData({
      ...data,
      is_new: true,
    })
  }

  const getRead = () => {
    setStatus(false)
    setData({
      ...data,
      is_new: false,
    })
  }

  const sortNotifications = () => {
    const newSort = sort === 'ASC' ? 'DESC' : 'ASC'
    setSort(newSort)
    setData({
      ...data,
      sort_order: newSort,
    })
  }

  const updateNoti = (item) => {
    const id = item?.id;
    const formData = {
      id,
      is_new: status ? 0 : 1,
    };
    updateNotification(user, id, formData).then(() => {
      setResult(result.filter((r) => r.id !== id));
    });
  };

  const handleDelete = (item) => {
    const id = item.id;
    deleteNotification(user, id).then(() => {
      setResult(result.filter((n) => n.id !== id));
    });
  };

  function bulkAction() {
    bulkActionSelect === "delete" ? multipleDelete() : multipleUpdate();
  }

  function multipleDelete() {
    notiId.map((id) => {
      deleteNotification(user, id).then(() => {
        const arr = result.filter((item) => !notiId.includes(item.id));
        setResult(arr);
        setNotiId([])
        setBulkActionSelect('')
        setCheckedAll(false)
      });
    });
  }

  function multipleUpdate() {
    notiId.map((id) => {
      const formData = {
        id,
        is_new: status ? 0 : 1,
      };
      updateNotification(user, id, formData).then(() => {
        const arr = result.filter((item) => !notiId.includes(item.id));
        setResult(arr);
        setNotiId([])
        setBulkActionSelect('')
        setCheckedAll(false)
      });
    });
  }

  const extractContent = (s) => {
    const span = document.createElement("span");
    span.innerHTML = s;
    return span.textContent || span.innerText;
  };

  const handleRedirect = (item) => {
    updateNotification(user, item.id, {}).then(() => {
      const action = item?.action;
      if (action === "new_message") {
        Router.push(`/messages/compose/${user.name}/${user.id}`);
      }
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

  const handleChecked = (item) => {
    if(checkInNotifications(item.id)){
      const idsFilters = notiId.filter(id => id !== item.id)
      setNotiId([...idsFilters])
      return;
    }

    setNotiId([...notiId, item.id])
  }

  const handleCheckedAll = (event) => {
    setCheckedAll(event.target.checked);

    if (event.target.checked) {
      setNotiId(result.map(d => d.id));
      return;
    }

    setNotiId([]);
  };

  const checkInNotifications = (id) => {
    return notiId.includes(id)
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
                className={`notif-filter-btn
                  ${status ? 'active' : ''}
                `}
                onClick={() => getUnread()}
            >
                Unread
            </button>
        </div>
        <div className="col-12 col-md-1 mb-3">
            <button
                className={`notif-filter-btn
                  ${!status ? 'active' : ''}
                `}
                onClick={() => getRead()}
            >
                Read
            </button>
        </div>
        {/* <div className="col-12 col-md-3 mb-3">
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
        </div> */}
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

          {loadData === true && result && result?.length === 0 && (
            <p css={LoaderContainer}>
              <span>
                  <FontAwesomeIcon icon={faInfoCircle} />
              </span>
              You have no notifications.
            </p>
          )}

          {loadData === true && result && result?.length > 0 && (
            <ul className="p-0">
              <li className="row mx-0 w-100 notif-list-head notif-item">
                <div className="col-12 col-md-1 d-flex align-items-center mb-2">
                    <label className="notif-checkbox-cont">
                        <input 
                            type="checkbox" 
                            checked={checkedAll}
                            onChange={handleCheckedAll}
                        />
                        <span className="checkmark"></span>
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
                      onClick={() => bulkAction()}
                      disabled={bulkActionSelect === '' || notiId.length === 0}
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
                            icon={sort === 'ASC' ? faChevronDown : faChevronUp} 
                            className='notif-sort-icon'
                            id="TooltipExample"
                            onClick={() => sortNotifications()}
                        />
                          <UncontrolledTooltip target="TooltipExample">
                            {sort === 'ASC' ? 'Oldest First' : 'Newest First'}
                        </UncontrolledTooltip>
                    </div>
                </div>
              </li>
        
              {result.map(item => (
                <li className="row mx-0 w-100 notif-item" key={item.id}>
                  <div className="col-12 col-md-1 d-flex align-items-center mb-2">
                      <label className="notif-checkbox-cont">
                          <input 
                            type="checkbox" 
                            checked={checkInNotifications(item.id)}
                            onChange={() => handleChecked(item)}
                          />
                          <span className="checkmark"></span>
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
                  <div className="col-12 col-md-5 mb-2 d-flex justify-content-end align-items-center">
                    <div className="row mx-0 d-flex align-items-center justify-content-end">
                      <FontAwesomeIcon 
                        icon={status ? faEyeSlash : faEye} 
                        className='notif-sort-icon mr-3' 
                        onClick={() => updateNoti(item)}
                        id='MarkRead'
                      />
                      <UncontrolledTooltip target="MarkRead">
                        {status ? 'Mark Read': 'Mark Unread'}
                      </UncontrolledTooltip>
                      <FontAwesomeIcon 
                        icon={faTrashAlt} 
                        className='notif-sort-icon'
                        onClick={() => handleDelete(item)}
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
