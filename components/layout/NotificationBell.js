import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import Router from 'next/router'
import axios from 'axios'
import {
  getNotificationDetails,
  updateAllNotification,
} from '../../pages/api/notification.api'
import Loader from '../../components/loader'
import { getTopicDetails } from '../../pages/api/discussion.api'

const getDiscussionId = (e, user) => {
  let url_string = e.replaceAll('#038;', '&')
  let url = new URL(url_string)
  let id = url.searchParams.get('topic_id')
  getTopicDetails(user, id).then((res) => {
    const { group } = res.data
    Router.push(`/group/${group.name}/${group.id}?tab=discusion&nav=${id}`)
  })
}

export const handleRedirection = (
  ele,
  user,
  markUnreadMsg,
  setOpenNotification
) => {
  const action = ele.action
  if (action === 'update_reply' || action === 'comment_reply')
    Router.push(`/activity/${ele.item_id}`)
  if (
    action === 'member_promoted_to_admin' ||
    action === 'membership_request_rejected' ||
    action === 'member_promoted_to_mod'
  )
    Router.push(`/group/group_detail/${ele.item_id}?tab=feeds`)
  if (action === 'membership_request_accepted')
    Router.push(
      `/profile/${user.name}/${ele.user_id}?key=connections&tab=connection`
    )
  if (action === 'group_invite')
    Router.push(
      `/profile/${user.name}/${ele.user_id}?key=community&tab=invitation`
    )
  if (action === 'new_membership_request' || action === 'friendship_request')
    Router.push(
      `/profile/${user.name}/${ele.user_id}?key=connections&tab=request`
    )
  if (action === 'new_message' || action === 'friendship_accepted')
    Router.push(`/messages/compose/${user.name}/${user.id}`)
  if (action === 'bbp_new_reply') getDiscussionId(ele.link_url, user)
  if (markUnreadMsg) {
    setOpenNotification(false)
    markUnreadMsg([ele])
  }
}

const NotificationBell = ({ user }) => {
  const [openNotification, setOpenNotification] = useState(false)
  const [notificationList, setNotificationList] = useState([])
  const [loaderSatus, setLoader] = useState(false)
  const [stopLoad, setStopLoad] = useState(true)

  const getList = () => {
    const data = {
      user_id: user?.id,
      sort_order: 'DESC',
      per_page: 20,
    }
    getNotificationDetails(user, data)
      .then((res) => {
        setLoader(false)
        setStopLoad(true)
        if (res.data) setNotificationList(res.data)
      })
      .catch(() => {
        setLoader(false)
      })
  }

  useEffect(() => {
    if (user?.id) {
      getList()
    }
  }, [user])

  const markUnreadMsg = (list) => {
    setLoader(true)
    setStopLoad(false)
    updateAllNotification(user, list, {})
      .then(
        axios.spread((...responses) => {
          getList()
        })
      )
      .catch((errors) => {
        setLoader(false)
      })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (stopLoad && user?.id) getList()
    }, 20000)
    return () => clearInterval(interval)
  }, [user])

  const extractContent = (s) => {
    var span = document.createElement('span')
    span.innerHTML = s
    return span.textContent || span.innerText
  }
  const renderList = () => (
    <>
      {!notificationList.length ? (
        <>
          <li className="flex-column">
            <div className="notification-content w-100">
              No new notifications!
            </div>
          </li>
          <li className="flex-column">
            <div
              onClick={() => Router.push('/notifications')}
              className="notification-content w-100"
            >
              See all
            </div>
          </li>
        </>
      ) : (
        <>
          {notificationList.map((ele) => (
            <li key={ele.id}>
              <div className="notification-avatar">
                <a>
                  <img src={ele.avatar_urls.thumb} alt="Profile Photo" />
                </a>
              </div>
              <div
                className="bb-full-link"
                onClick={() =>
                  handleRedirection(
                    ele,
                    user,
                    markUnreadMsg,
                    setOpenNotification
                  )
                }
              >
                <a>{extractContent(ele.description.rendered)}</a>
                <span>{moment(new Date(ele.date)).fromNow()}</span>
              </div>
            </li>
          ))}
        </>
      )}
    </>
  )
  return (
    <div>
      {openNotification ? (
        <div
          className="notification-click-event"
          onClick={() => setOpenNotification(false)}
        ></div>
      ) : (
        ''
      )}
      <div className="notification-bell">
        <FontAwesomeIcon
          icon={faBell}
          onClick={() => setOpenNotification(!openNotification)}
        />
        {notificationList.length ? (
          <span className="count">{notificationList.length}</span>
        ) : (
          ''
        )}
        <div
          className="notification-wrapper"
          style={{ display: openNotification ? 'block' : 'none' }}
        >
          <div className="notification-header">
            <h2>Notifications</h2>
            {notificationList.length ? (
              <div
                className="mark-tag"
                onClick={() => markUnreadMsg(notificationList)}
              >
                Mark all as read
              </div>
            ) : (
              ''
            )}
          </div>
          <ul className="notification-list">
            {loaderSatus ? (
              <li style={{ display: 'contents' }}>
                <div style={{ textAlign: 'center' }}>
                  <Loader color="primary" />
                </div>
              </li>
            ) : (
                renderList()
            )}
          </ul>
          {notificationList.length ? (
            <div className="notification-header">
              <div
                className="mark-tag"
                onClick={() => Router.push('/notifications')}
              >
                See all
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}
export default NotificationBell
