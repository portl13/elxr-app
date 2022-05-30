import React, { useState, useEffect, useContext } from 'react'
import Layout from '../components/layout/Layout'
import { Col, Input, Spinner, Button } from 'reactstrap'
import InfinitScroll from 'react-infinite-scroll-component'
import { UserContext } from '../context/UserContext'
import {
  LoaderContainer,
  LoadingBtn,
} from '../components/livefeed/livefeed.style'
import Head from 'next/head'
import NotificationCard from '../components/notifications/NotificationCard'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  getNotificationDetails,
  deleteNotification,
  updateNotification,
} from './api/notification.api'
export default function Notifications() {
  const { user } = useContext(UserContext)
  const [result, setResult] = useState([])
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState('DESC')
  const [loader, setLoader] = useState(true)
  const [count, setCount] = useState(0)
  const [notiCheck, setNotiCheck] = useState(false)
  const [status, setStatus] = useState(true)
  const [loadData, setLoadData] = useState(false)
  const [length, setLength] = useState(0)
  const [action, setAction] = useState('')
  const [filter, setFilter] = useState('')
  const [notiId, setNotiId] = useState([])
  const data = {
    page: page,
    per_page: 20,
    sort_order: sort,
    is_new: status,
    component_action: filter,
  }
  const getNotifications = () => {
    getNotificationDetails(user, data).then((res) => {
      setResult([...result, ...res.data])
      var total =
        res.headers['bbp-unread-notifications'] !== undefined
          ? res.headers['bbp-unread-notifications']
          : null
      setCount(total)
      for (var i = 1; i <= page; i++) {
        setLength(length + parseInt(res.data.length))
      }
      setLoadData(true)
      if (res.data.length === 0) {
        setLoader(false)
      } else {
        setLoader(true)
      }
    })
  }
  useEffect(() => {
    if (user?.id) {
      getNotifications()
    }
  }, [page, sort, status, filter, user])
  function selectAll() {
    if (notiCheck === true) {
      setNotiCheck(false)
      setResult(result)
      setNotiId([])
      setAction('')
    } else {
      setResult(result)
      setNotiCheck(true)
      setNotiId(result.map((d) => d.id))
    }
  }
  function emptyStates() {
    setPage(1)
    setResult([])
    setCount(0)
    setLength(0)
    setLoadData(false)
    setLoader(true)
    setNotiCheck(false)
    setAction('')
  }
  const handleDelete = (childData) => {
    const id = childData
    deleteNotification(user, id).then(() => {
      setResult(result.filter((item) => item.id !== id))
      setCount(count - 1)
      setLength(length - 1)
      var len = count - 1
      var leng = length - 1
      len == 0 || (leng == 0 && load())
    })
  }
  function load() {
    setLength(0)
    setLoadData(true)
    setLoader(false)
  }
  const updateNoti = (childData) => {
    const Id = childData
    const formData = {
      id: Id,
      is_new: status ? 0 : 1,
    }
    updateNotification(user, Id, formData).then(() => {
      setResult(result.filter((item) => item.id !== Id))
      setCount(count - 1)
      setLength(length - 1)
      var len = count - 1
      var leng = length - 1
      ;(len == 0 || leng == 0) && load()
    })
  }
  const updateLink = (childData) => {
    const Id = childData
    const formData = {
      id: Id,
      is_new: 0,
    }
    updateNotification(user, Id, formData).then((res) => {
      console.log(res.data)
    })
  }
  function bulkAction() {
    action === 'delete' ? multipleDelete() : multipleUpdate()
  }

  function multipleDelete() {
    notiId.map((id, key) => {
      deleteNotification(user, id).then(() => {
        var arr = result.filter((item) => !notiId.includes(item.id))
        setResult(arr)
        setNotiCheck(false)
        setCount(count - notiId.length)
        setLength(length - notiId.length)
        var len = count - notiId.length
        len == 0 && load()
      })
    })
  }
  function multipleUpdate() {
    notiId.map((Id, key) => {
      const formData = {
        id: Id,
        is_new: status ? 0 : 1,
      }
      updateNotification(user, Id, formData).then(() => {
        var arr = result.filter((item) => !notiId.includes(item.id))
        setResult(arr)
        setNotiCheck(false)
        setCount(count - notiId.length)
        setLength(length - notiId.length)
        var len = count - notiId.length
        len == 0 && load()
      })
    })
  }
  return (
    <Layout>
      <Head>
        <title>WeShare | Notifications</title>
      </Head>
      <Col className="bg-black bd-radius pt-3" xs="12">
        <div className="notification-panel-ui">
          <div className="notification-header">
            <ul>
              <li className={status && 'active'}>
                <Button
                  onClick={() => {
                    setStatus(true)
                    emptyStates()
                    setFilter('')
                  }}
                >
                  Unread
                </Button>
              </li>
              <li className={!status && 'active'}>
                <Button
                  onClick={() => {
                    setStatus(false)
                    emptyStates()
                    setFilter('')
                  }}
                >
                  Read
                </Button>
              </li>
            </ul>
            <Input
              type="select"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value)
                emptyStates()
              }}
            >
              <option value="">- View All -</option>
              <option value="new_at_mention">New Mentions</option>
              <option value="update_reply">New Update Replies</option>
              <option value="comment_reply">New Update Comment Replies</option>
              <option value="friendship_accepted">
                Accepted Connection Request
              </option>
              <option value="friendship_request">
                Pending Connection Requests
              </option>
              <option value="new_membership_request">
                Pending Group Membership Requests
              </option>
              <option value="membership_request_accepted">
                Accepted Group Membership Requests
              </option>
              <option value="membership_request_rejected">
                Rejected Group Membership Requests
              </option>
              <option value="member_promoted_to_admin">
                Group Organiser Promotions
              </option>
              <option value="member_promoted_to_mod">
                Group Moderator Promotions
              </option>
              <option value="group_invite">Group Invitations</option>
              <option value="new_message">New Private Messages</option>
            </Input>
          </div>

          {length !== 0 && loadData && (
            <div className="notification-sub-header">
              <div className="bulk-panel">
                <div className="custom-control custom-checkbox">
                  <input
                    className="custom-control-input"
                    id="public"
                    type="checkbox"
                    name="status"
                    value="public"
                    onChange={() => selectAll()}
                    checked={notiCheck === true}
                  />
                  <label className="custom-control-label group-checkbox-label"></label>
                </div>
                <Input
                  type="select"
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                  disabled={!notiCheck}
                >
                  <option value="">Bulk Actions</option>
                  <option value={status ? 'read' : 'unread'}>
                    {status ? 'Mark Read' : 'Mark Unread'}
                  </option>
                  <option value="delete">Delete</option>
                </Input>
              </div>
              <Input
                type="submit"
                value="Apply"
                className="apply-button"
                disabled={action === ''}
                onClick={() => bulkAction()}
              ></Input>
              <div className="sort-button">
                Sort by date
                <span
                  className="notifications-order-actions"
                  onClick={() => {
                    if (sort === 'DESC') {
                      setSort('ASC')
                    } else setSort('DESC')
                    emptyStates()
                  }}
                >
                  <span className="tooltip-panel">
                    <em></em>
                    {sort === 'DESC' ? 'Oldest First' : 'Newest First'}
                  </span>
                  <span
                    className={sort === 'DESC' ? 'up-arrow' : 'down-arrow'}
                  ></span>
                </span>
              </div>
            </div>
          )}
          {loadData === false ? (
            <p css={LoaderContainer}>
              <span>
                <FontAwesomeIcon icon={faClock} />
              </span>
              Loading Notifications. Please wait.
            </p>
          ) : null}
          {length === 0 && loadData ? (
            <p css={LoaderContainer}>
              <span>
                <FontAwesomeIcon icon={faClock} />
              </span>
              No Results.{' '}
            </p>
          ) : null}
          {loadData === true ? (
            <div className="d-flex flex-column flex-fill w-100">
              <InfinitScroll
                dataLength={result.length}
                next={() => result.length && setPage(page + 1)}
                hasMore={true}
                loader={
                  loader ? (
                    <LoadingBtn>
                      Loading ...{' '}
                      <Spinner
                        style={{ width: '1.2rem', height: '1.2rem' }}
                        color="primary"
                      />
                    </LoadingBtn>
                  ) : (
                    <p style={{ textAlign: 'center' }}>No More Data</p>
                  )
                }
              >
                {result &&
                  result.map((notification, index) => {
                    return (
                      <>
                        <NotificationCard
                          index={index}
                          notification={notification}
                          id={notification.id}
                          check={notiCheck}
                          notiStatus={status}
                          parentCallback={handleDelete}
                          parentUpdate={updateNoti}
                          user={user}
                          parentLinkUpdate={updateLink}
                        />
                      </>
                    )
                  })}
              </InfinitScroll>
            </div>
          ) : null}
          {length === 1 ? (
            <p className="text-left viewing-ui">
              Viewing {length} notification
            </p>
          ) : length > 1 ? (
            <p className="text-left viewing-ui">
              Viewing 1-{length} of {status ? count : length} notifications
            </p>
          ) : null}
        </div>
      </Col>
    </Layout>
  )
}
