import React, { useState, useEffect, useContext, useRef, useMemo } from 'react'
import moment from 'moment'
import Link from 'next/link'
import { useAlert } from 'react-alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrashAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap'
import dayjs from 'dayjs'
import {
  postMessageAction,
  blockMember,
  recipientsDataFetch,
} from '../../pages/api/message.api'
import { TIMEOUT, MSG_SUCCESS } from '../../utils/constant'
import DeleteMsg from './DeleteMsg'
import BlockMemberModal from './BlockMemberModal'
import { UserContext } from '../../context/UserContext'

function UserMessageList({
  userMsg,
  getProfileRoute,
  messages,
  user,
  getDetails,
  selMsgIndex,
  setLoader,
  setMemberBlocked,
  handleDeleteMsg,
  setMemberBlockedId,
  isMemberBlockedId,
  isMemberBlocked,
  setShowChat,
  messageListLoader,
}) {
  const [isOpen, setOpenEllipses] = useState(false)
  const [isModalOpen, setDeleteModal] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)
  const [showBlockMember, setBlockMember] = useState(false)
  const [showScroll, setShowScroll] = useState(false)
  const [moreOption, setMoreOption] = useState('false')
  const [msgData, setMsgData] = useState({})
  const [clickedOutside, setClickedOutside] = useState(false)
  const [avatar, setAvatar] = useState('')
  const myRef = useRef()
  const [mention_name, setMentionName] = useState('')
  const current_user = useContext(UserContext)

  useOnClickOutside(myRef, () => setOpenEllipses(!isOpen))
  // console.log(current_user);
  function findTime(time) {
    const date = new Date()
    const today = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`
    const yesterday = `${date.getFullYear()}-${date.getMonth() + 1}-${
      date.getDate() - 1
    }`
    const inputDate = new Date(time)
    const isDate = `${inputDate.getFullYear()}-${
      inputDate.getMonth() + 1
    }-${inputDate.getDate()}`
    if (isDate === today) {
      return 'Today'
    }
    if (isDate === yesterday) {
      return 'Yesterday'
    }
    return isDate.split('T')[0]
  }

  // hook created for capturing outside click
  function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return
        }
        handler(event)
      }
      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)
      return () => {
        document.removeEventListener('mousedown', listener)
        document.removeEventListener('touchstart', listener)
      }
    }, [ref, handler])
  }

  function groupBy(inputData) {
    const groups = {}

    inputData.forEach((val) => {
      const date = findTime(val.date_sent)
      if (date in groups) {
        groups[date].push(val)
      } else {
        groups[date] = new Array(val)
      }
    })

    return groups
  }

  useEffect(() => {
    setMemberBlocked(false)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (Array.isArray(e?.path) && e?.path[0] !== myRef.current) {
        setClickedOutside(true)
      }
    }

    document.body.addEventListener('click', handleClickOutside)
    return () => document.body.removeEventListener('click', handleClickOutside)
  })

  useEffect(() => {
    if (userMsg?.messages?.length > 0) {
      const groupedData = groupBy(userMsg.messages)
      setMsgData(groupedData)
    } else if (userMsg?.messages?.length === 0) {
      setMsgData([])
    }
    handleMentionName()
  }, [userMsg, userMsg?.recipients])

  const alert = useAlert()

  const handleMentionName = () => {
    if (userMsg?.recipients) {
      const id = Object.keys(userMsg.recipients).filter(
        (id) => id !== userMsg.current_user
      )[0]

      recipientsDataFetch(user, id)
        .then((res) => {
          const mentionName = `@ ${res.data?.mention_name}`
          setAvatar(res.data.avatar_urls?.thumb)
          setMentionName(mentionName)
        })
        .catch((err) => {
        })
    }
  }

  const getResName = () => {
    const name = []
    const count = 0
    if (userMsg?.recipients && !userMsg?.isNewUser) {
      for (const key in userMsg?.recipients) {
        const userVal = userMsg?.recipients[key]
        if (userVal.name === 'Blocked Member') {
          setMemberBlocked(true)
          setMemberBlockedId(userMsg.id)
        }
        if (userMsg.current_user !== userVal.user_id) {
          name.push(
            <Link
              href={getProfileRoute(userVal.name, userVal.user_id, 'profile')}
            >
              {`${userVal.name}${' '}`}
            </Link>
          )
        }
      }
    } else if (userMsg?.isNewUser) {
      name.push(
        <Link href={getProfileRoute(userMsg.name, userMsg.id, 'profile')}>
          {userMsg.name}
        </Link>
      )
    }
    return name
  }

  const updateState = (action, state = true) => {
    const index = action === 'unread' ? selMsgIndex : 0
    getDetails(1, '', index)
    setShowSpinner(false)
    setDeleteModal(false)
    setOpenEllipses(false)
    state && alert.success(MSG_SUCCESS[action], TIMEOUT)
  }

  const handleMsgAction = (action) => {
    const formData = {
      action,
      id: userMsg.id,
      value: true,
    }
    setLoader(true)
    setShowSpinner(true)
    postMessageAction(user, userMsg.id, formData)
      .then((res) => {
        updateState(action)
      })
      .catch(() => {
        setShowSpinner(false)
        setOpenEllipses(false)
      })
  }

  const blockMsgMember = (id) => {
    setLoader(true)
    setShowSpinner(true)
    blockMember(user, { item_id: id })
      .then((res) => {
        alert.success('Member blocked successfully.', TIMEOUT)
        updateState('unread', false)
        setBlockMember(false)
        setShowSpinner(false)
      })
      .catch(() => {
        setBlockMember(false)
        setOpenEllipses(false)
      })
  }

  const getDate = (date) => moment(date).format('MMMM D, YYYY')

  const handleMoreOption = (id) => {
    moreOption == 'false' ? setMoreOption(id) : setMoreOption('false')
  }

  const handleRemove = (selectedData) => {
    // console.log(selectedData,"selectedData");
  }
  const goBack = () => {
    setShowChat(false)
  }

  useEffect(() => {
    document.getElementById('scroll').scrollTop =
      document.getElementById('scroll')?.scrollHeight
  }, [msgData])

  return (
    <>
      <div className="single-message-thread-header">
        <span className="goBack" onClick={goBack}>
          <svg
            width="12"
            height="10"
            viewBox="0 0 12 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.444 9.74A.76.76 0 0 0 5.52 8.666L2.597 5.742h8.463a.76.76 0 0 0 0-1.521H2.597L5.52 1.298A.76.76 0 0 0 4.444.223L.223 4.444a.76.76 0 0 0 0 1.076l4.221 4.22z"
              fill="#313131"
              fillRule="nonzero"
            />
          </svg>
        </span>
        <div className="avatar-flex">
          <div className="avatar-wrap bg-gray p-1">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="thread-participants">
            <div className="participants-name">{getResName()}</div>
            <div className="thread-date">
              {!messages?.length || userMsg?.isNewUser
                ? 'Start a new conversation'
                : ''}
            </div>
            <div className="mask">{mention_name}</div>
          </div>
        </div>

        <div className="chatOption">
          <ol className="list-unstyled">
            <li>
              {' '}
              <div className="actions">
                {/* <FontAwesomeIcon
                  icon={faEllipsisV}
                  onClick={() => setOpenEllipses(!isOpen)}
                /> */}
                <span
                  className="user-actions"
                  onClick={() => setOpenEllipses(!isOpen)}
                >
                  <img src="/img/icons/user-option.svg" />
                </span>
                {isOpen && (
                  <div className="actions-container" ref={myRef}>
                    <ul>
                      {/* <li onClick={() => handleMsgAction("unread")}>
                        <FontAwesomeIcon icon={faInbox} /> Mark unread
                      </li>
                      <li
                        onClick={() => {
                          handleMsgAction("unread");
                          handleMsgAction("hide_thread");
                        }}
                      >
                        <FontAwesomeIcon icon={faTimesCircle} /> Hide
                        conversation
                      </li>
                      {isMemberBlocked && userMsg.id === isMemberBlockedId ? (
                        ""
                      ) : (
                        <li onClick={() => setBlockMember(true)}>
                          <FontAwesomeIcon icon={faBan} /> Block Member
                        </li>
                      )} */}
                      <li onClick={() => setDeleteModal(true)}>
                        <FontAwesomeIcon icon={faTrashAlt} /> Clear All
                      </li>

                      {/*<li>*/}
                      {/*  <FontAwesomeIcon icon={faTimesCircle} /> Remove Chat*/}
                      {/*</li>*/}

                      {/* <li onClick={() => { handleDeleteMsg(userMsg.id); setOpenEllipses(false) }}><FontAwesomeIcon icon={faTrashAlt} /> Delete conversation</li> */}
                    </ul>
                  </div>
                )}
              </div>
            </li>
            {/* <li><span className="user-actions"><img src="/img/video.svg" /></span></li> */}
          </ol>
        </div>
      </div>
      <div
        className={`message-thread-list ${
          showScroll ? 'overflow-auto' : 'overflow-hidden'
        }`}
        id="scroll"
        onMouseEnter={() => setShowScroll(true)}
        onMouseLeave={() => setShowScroll(false)}
      >
        {Object.keys(msgData).length > 0 &&
          Object.keys(msgData).map((time, index) => (
            <div key={`${time}-${index}`}>
              <div
                className="separator"
                id={index === Object.keys(msgData).length - 1 ? 'lastChat' : ''}
              >
                {time === 'Today' || time === 'Yesterday'
                  ? time
                  : dayjs(time).format('MMMM DD, YYYY')}
              </div>
              {msgData[time].map((ele, index) => {
                const recipients = userMsg?.recipients?.[ele.sender_id]
                const timelineData = new Date(ele.date_sent)
                let hours = timelineData.getHours()
                let minutes = timelineData.getMinutes()
                const ampm = hours >= 12 ? 'pm' : 'am'
                hours %= 12
                hours = hours || 12 // the hour '0' should be '12'
                minutes = minutes < 10 ? `0${minutes}` : minutes
                const msgTime = `${hours}:${minutes} ${ampm}`

                return (
                  <div
                    key={ele.id}
                    className={`main-box-panel ${
                      ele.sender_id === current_user.user.id
                        ? 'reciever'
                        : 'sender'
                    }`}
                  >
                    {/* <div className="bp-avatar-wrap">
                        {ele.sender_id !== current_user.user.id && (
                          <img
                            src={
                              userMsg?.recipients[ele.sender_id]?.user_avatars
                                .full
                            }
                          />
                        )}
                      </div> */}
                    <div className="single-message-content">
                      {/* {console.log(ele)} */}
                      <div className="notification-box">
                        <div
                          className="message-content-wrap"
                          dangerouslySetInnerHTML={{
                            __html: ele.message.rendered,
                          }}
                        />
                        {ele.sender_id === current_user.user.id && (
                          <Dropdown
                            direction="left"
                            isOpen={moreOption === ele.id}
                            toggle={() => handleMoreOption(ele.id)}
                            className="profile-menu"
                          >
                            <DropdownToggle>
                              <svg
                                width="3"
                                height="13"
                                viewBox="0 0 3 13"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g
                                  fill="#fff"
                                  fillRule="evenodd"
                                  opacity=".5"
                                >
                                  <circle cx="1.5" cy="1.5" r="1.5" />
                                  <circle cx="1.5" cy="6.5" r="1.5" />
                                  <circle cx="1.5" cy="11.5" r="1.5" />
                                </g>
                              </svg>
                            </DropdownToggle>
                            <DropdownMenu className="profile-menu-list">
                              <DropdownItem onClick={() => handleRemove(ele)}>
                                <span>Remove</span>
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        )}
                      </div>
                      <div className="message-metadata">
                        <span>
                          {recipients?.user_id === user?.id
                            ? 'You'
                            : recipients?.name}
                        </span>
                        {msgTime}
                      </div>
                      <div className="bb-activity-media-wrap">
                      </div>
                    </div>
                    <div />
                  </div>
                )
              })}
            </div>
          ))}
      </div>
      <DeleteMsg
        handleDelete={handleMsgAction}
        show={isModalOpen}
        close={setDeleteModal}
        showSpinner={showSpinner}
      />

      <BlockMemberModal
        handleDelete={blockMsgMember}
        show={showBlockMember}
        close={setBlockMember}
        showSpinner={showSpinner}
        userMsg={userMsg}
        user={user}
        setOpenEllipses={setOpenEllipses}
      />
    </>
  )
}

export default UserMessageList
