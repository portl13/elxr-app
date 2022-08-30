import React, { useState, useContext, useEffect } from 'react'
import moment from 'moment'
import { useAlert } from 'react-alert'
import { EditorState } from 'draft-js'
import { Button } from 'reactstrap'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '@material-ui/core'
import CenterLoader from '../../../components/CenterLoader/index'
import { UserContext } from '../../../context/UserContext'
import { TIMEOUT, getProfileRoute } from '../../../utils/constant'
import Loader from '../../../components/loader/index'
import {
  getMessageList,
  postMessage,
  createMessage,
  uploadMedia,
  deleteMsg,
  postMessageAction,
} from '../../api/message.api'
import { memberDetails } from '../../api/member.api'
import EditorTextArea from '../EditorTextArea'
import UserMessageList from '../UserMessageList'
import ComposeModal from '../../../components/messages/ComposeModal'
import {
  setCommunityUserId,
  setNewMessageCount,
} from '../../../store/features/messages/message-slice'
import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import Head from 'next/head'

function MessageWrapper() {
  const alert = useAlert()
  const { user } = useContext(UserContext)
  const router = useRouter()
  const dispatch = useDispatch()
  const { query } = router
  const { slug = null } = query
  const { communityUserId } = useSelector((state) => state.messageState)
  const [messages, setMessages] = useState([])
  const [userMsg, setUserMessage] = useState({})
  const [loader, setLoader] = useState(true)
  const [msgText, setMsgtext] = useState('')
  const [loadMsg, setLoadMsg] = useState(false)
  const [slugId, setslugId] = useState(false)
  const [isModaOpen, setIsModaOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [isNewMsg, setIsNewMsg] = useState(!!communityUserId)
  const [images, setImages] = useState([])
  const [uploadView, setUploadView] = useState(false)
  const [progress, setProgress] = useState(0)
  const [imageData, setImageData] = useState([])
  const [selMsgIndex, setSelMsgIndex] = useState(0)
  const [newMsgLoader, setNewMessageLoader] = useState(false)
  const [isMemberBlocked, setMemberBlocked] = useState(false)
  const [isMemberBlockedId, setMemberBlockedId] = useState(null)
  const [messageId, setMessageId] = useState('')
  const [showChat, setShowChat] = useState(false)
  const [selectedMessageId, setSelectedMessageId] = useState('')
  const [messageLoading, setMessageLoading] = useState(false)
  const [messageListLoader, setMessageListLoader] = useState(false)
  const [userListLoader, setUserListLoader] = useState(false)
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )
  const [newUserId, setNewUserId] = useState('')
  const { newMessageCount } = useSelector((state) => state.messageState)

  const getDetails = (page = 1, search = '', msgIndex = 0) => {
    const formData = {
      user_id: user?.id,
      page,
      per_page: 100,
      search,
    }

    getMessageList(user, formData).then((res) => {
      const msgs = res.data
      let isUser = false
      let respId = []
      msgs.forEach((e) => {
        if (Object.keys(e.recipients).length === 2) {
          respId = [...respId, ...Object.keys(e.recipients)]
        }
      })
      const index = respId.indexOf(slug[1])
      if (index === -1) isUser = true
      if (
        isUser &&
        user?.id !== respId[index] &&
        user?.id !== Number(slug[1])
      ) {
        memberDetails(user, slug[1]).then((val) => {
          const { avatar_urls, name, id } = val.data
          const data = {
            name,
            id,
            avatar: avatar_urls.thumb,
            isNewUser: true,
          }
          msgs.unshift(data)
          setMessages(msgs)
          console.log(msgs[msgIndex])
          setUserMessage(msgs[msgIndex])
          setLoader(false)
        })
      } else {
        setMessages(msgs)
        if (msgs.length) setUserMessage(msgs[msgIndex])
        setLoader(false)
      }
      setMessageListLoader(false)
      setUserListLoader(false)
    })
  }

  useEffect(async () => {
    if (slug && user) {
      setslugId(slug)
      setUserListLoader(true)
      getDetails(1, '', selMsgIndex)
    }
    if (slug && communityUserId) {
      setMessageId(communityUserId)
      selectNewUser(communityUserId)
      dispatch(setCommunityUserId(''))
    }
  }, [slug, communityUserId])

  const emptyEditorState = () => {
    setMsgtext('')
    setEditorState(() => EditorState.createEmpty())
    setLoadMsg(false)
  }

  const getResName = (data, state) => {
    if (!data.recipients) return ''
    const list = [...Object.keys(data.recipients)]
    const index = list.indexOf(data.current_user.toString())
    if (index !== -1) list.splice(index, 1)
    if (state) return list[0]
    return data.recipients[list[0]]
  }

  const sendUserMessage = () => {
    if (!userMsg.isNewUser && !isNewMsg) {
      setMessageLoading(true)
      console.log(userMsg.recipients)
      const formData = {
        id: userMsg?.id,
        message: msgText,
        sender_id: user?.id,
        recipients: Object.keys(userMsg.recipients),
      }
      postMessage(user, formData).then((res) => {
        setSelMsgIndex(0)
        setUserMessage(res.data)
        emptyEditorState()
        setMemberBlocked(false)
        setMemberBlockedId(null)
        setMessageLoading(false)
      })
    } else {
      const formData = {
        message: msgText,
        sender_id: userMsg?.id,
        recipients: isNewMsg ? newUserId : '',
      }
      console.log(formData, isNewMsg, newUserId)
      createMessage(user, formData).then((res) => {
        emptyEditorState()
        getDetails()
        setIsNewMsg(false)
      })
    }
  }

  const sendFiles = () => {
    images.map((filedata, key) => {
      const formData = new FormData()
      formData.append('file', filedata, filedata.name)
      uploadMedia(user, formData, setProgress)
        .then((res) => {
          setImageData((data) => [...data, res.data.upload_id])
        })
        .catch(() => {
          setLoadMsg(false)
        })
    })
  }

  const getId = (id) => {
    setMessageId(id)
    selectNewUser(id)
  }

  const selectNewUser = (id) => {
    const formData = {
      user_id: user?.id,
      page: 1,
      per_page: 100,
    }
    setNewMessageLoader(true)
    getMessageList(user, formData).then((res) => {
      const msgs = res.data
      let respId = []
      let thread = null
      msgs.forEach((e) => {
        if (Object.keys(e.recipients).length === 2) {
          respId = [...respId, ...Object.keys(e.recipients)]
          Object.keys(e.recipients).map((i) => {
            if (Number(i) === Number(id)) {
              thread = e.recipients[i]?.thread_id
            }
          })
        }
      })
      if (!thread) {
        memberDetails(user, id).then((val) => {
          const { avatar_urls, name, id } = val.data
          const data = {
            name,
            id,
            avatar: avatar_urls.thumb,
            isNewUser: true,
          }
          msgs.unshift(data)
          setMessages(msgs)
          const userData = {
            recipients: { [id]: val.data },
            current_user: user.id,
            ...val.data,
            messages: [],
          }
          setNewUserId(val.data.id)
          setUserMessage(userData)
          setIsNewMsg(true)
        })
        setNewMessageLoader(false)
      } else {
        setSelectedMessageId(thread)
        const apiData = {
          action: 'unread',
          id: thread,
          value: false,
        }
        postMessageAction(user, thread, apiData).then((res) => {
          setUserMessage(res.data)
          setNewMessageLoader(false)
        })
      }
    })
  }

  const handleSendMesg = () => {
    setLoadMsg(true)
    if (images?.length) sendFiles()
    else sendUserMessage()
  }

  useEffect(() => {
    if (images.length && imageData.length === images.length) {
      sendUserMessage()
    }
  }, [imageData])

  const getUserMsg = (e, recipients) =>
    Number(e.last_sender_id) === user?.id ? 'You' : recipients?.name

  const updateState = () => {
    setLoader(true)
    setMessages([])
    setUserMessage({})
  }

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      updateState()
      getDetails(1, searchText)
    } else {
      const search = e.target ? e.target.value : e
      setSearchText(search)
      if (!search) {
        updateState()
        getDetails(1, search)
      }
    }
  }

  const handleDeleteMsg = (id) => {
    setLoader(true)
    deleteMsg(user, id, { id, user_id: user?.id, recipients_pagination: true })
      .then((res) => {
        const formData = {
          action: 'unread',
          id,
          value: false,
        }
        postMessageAction(user, id, formData).then((res) => {
          getDetails()
          emptyEditorState()
        })
      })
      .catch(() => {
        emptyEditorState()
      })
  }

  const setSelctedMsg = (e, index) => {
    setMemberBlocked(false)
    setMemberBlockedId(null)
    setUserMessage(e)
    emptyEditorState()
    setSelMsgIndex(index)
    setIsNewMsg(false)
    setShowChat(true)
    setSelectedMessageId(e.id)
    const formData = {
      action: 'unread',
      id: e.id,
      value: false,
    }
    setMessageListLoader(true)
    postMessageAction(user, e.id, formData).then((res) => {
      dispatch(setNewMessageCount(newMessageCount - e.unread_count))
      getDetails(1, '', index)
    })
  }

  const getDate = (date) => moment(date).format('MMM DD, YYYY')

  const handleComposeBtn = () => {
    setIsModaOpen(true)
    setMemberBlocked(false)
    setMemberBlockedId(null)
    setIsNewMsg(true)
  }

  const setError = () => {
    alert.error('Please select the user', TIMEOUT)
  }

  return (
    <>
      <Head>
        <title>Inbox</title>
      </Head>
      <MainLayout sidebar={<MainSidebar />}>
        <div className="chatBox bd-radius">
          <Container
            maxWidth="lg"
            className="main-inner d-flex flex-column justify-content-between"
          >
            <div>
              <div className="main-tag chatHeader">
                <span className='text-white'>Inbox</span>
                <a
                  href="#"
                  onClick={() => handleComposeBtn()}
                  className="dark_bdr"
                >
                  {/* <FontAwesomeIcon icon={faEdit} />  */}
                  <img src="/img/icons/icon-compose.svg" alt="icon" />
                  <span>Compose</span>
                </a>
              </div>
              <div
                className={
                  showChat
                    ? 'messages-container show-chat-modal'
                    : 'messages-container'
                }
              >
                <div className="bp-messages-nav-panel">
                  <div className="subnav-filters">
                    <span className="searchIcon">
                      <img src="/img/icons/search.svg" alt="search" />
                    </span>
                    <input
                      type="search"
                      value={searchText}
                      style={{ color: 'black' }}
                      placeholder="Search"
                      onChange={(e) => handleSearch(e)}
                      onKeyDown={(e) => handleSearch(e)}
                    />
                    {searchText && (
                      <span className="input-group-append">
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                        >
                          <FontAwesomeIcon
                            icon={faTimes}
                            onClick={(e) => handleSearch(e)}
                          />
                        </button>
                      </span>
                    )}
                  </div>
                  <div className="message-left-panel">
                    {loader || newMsgLoader ? (
                      <div style={{ textAlign: 'center' }}>
                        <Loader color="primary" />
                      </div>
                    ) : (
                      ''
                    )}
                    {!messages.length && !loader ? (
                      <div className="message-left-empty">
                        <h4>No new messages yet</h4>
                        <span>
                          Looks like you haven't initiated a conversation with
                          any other member.
                        </span>
                      </div>
                    ) : (
                      ''
                    )}
                    {!newMsgLoader &&
                      messages.map((e, index) => {
                        const recipients = !e.isNewUser
                          ? e.recipients[e.last_sender_id]
                          : null
                        return (
                          <div
                            className={
                              userMsg.id == e.id
                                ? 'message-active-user message-notfication-box'
                                : 'message-notfication-box'
                            }
                            onClick={() => setSelctedMsg(e, index)}
                          >
                            {e.avatar.length === 1 || e.isNewUser ? (
                              <div className="image-tag">
                                <img
                                  src={
                                    !e.isNewUser ? e.avatar[0].full : e.avatar
                                  }
                                />
                              </div>
                            ) : (
                              <div className="multi-image-tag">
                                <img
                                  src={e.avatar[0].full}
                                  className="img-tag"
                                />
                                <img
                                  src={e.avatar[1].full}
                                  className="img-avtar"
                                />
                              </div>
                            )}
                            <div className="thread-content">
                              <div className="thread-to">
                                {recipients ? getResName(e)?.name : e.name}
                              </div>
                              <div className="thread-subject">
                                {recipients
                                  ? `${getUserMsg(e, recipients)} :`
                                  : ''}
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: !e.excerpt
                                      ? ''
                                      : e.excerpt.rendered,
                                  }}
                                />
                              </div>
                            </div>
                            <div className="thread-date">
                              {getDate(e.date)}
                              {e.unread_count ? (
                                <span className="dots-tag" />
                              ) : (
                                ''
                              )}
                            </div>
                            <div
                              className="cross-icon"
                              onClick={() => handleDeleteMsg(e.id)}
                            >
                              +
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>
                <div className="bp-messages-content">
                  {newMsgLoader || messageListLoader || userListLoader ? (
                    <div className="full-page-loader">
                      <CenterLoader />
                    </div>
                  ) : (
                    <UserMessageList
                      getProfileRoute={getProfileRoute}
                      userMsg={userMsg}
                      messages={messages}
                      user={user}
                      getDetails={getDetails}
                      selMsgIndex={selMsgIndex}
                      alert={alert}
                      setLoader={setLoader}
                      setMemberBlocked={setMemberBlocked}
                      setMemberBlockedId={setMemberBlockedId}
                      isMemberBlocked={isMemberBlocked}
                      isMemberBlockedId={isMemberBlockedId}
                      handleDeleteMsg={handleDeleteMsg}
                      setShowChat={setShowChat}
                      messageListLoader={messageListLoader}
                    />
                  )}
                  {isMemberBlocked && userMsg.id === isMemberBlockedId ? (
                    ''
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        if (!userMsg?.id) {
                          setError()
                        } else {
                          handleSendMesg()
                        }
                      }}
                    >
                      <div className="send-reply">
                        <div className="bp-message-content">
                          <div className="sendFlex">
                            <div className="medium-editor-element">
                              <EditorTextArea
                                msgText={msgText}
                                setMsgtext={setMsgtext}
                                editorState={editorState}
                                setEditorState={setEditorState}
                                images={images}
                                setImages={setImages}
                                uploadView={uploadView}
                                setUploadView={setUploadView}
                                progress={progress}
                                setProgress={setProgress}
                              />
                            </div>
                            <div className="submit-wrapper">
                              <Button
                                type="submit"
                                className="reply-submit-button"
                                disabled={msgText.trim().length === 0}
                              >
                                <span>
                                  {messageLoading ? <Loader /> : 'Send'}
                                </span>{' '}
                                <img src="/img/send-white.svg" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </div>
        <ComposeModal
          getId={getId}
          isOpen={isModaOpen}
          handleClose={() => {
            setIsModaOpen(false), setIsNewMsg(false)
          }}
        />
      </MainLayout>
    </>
  )
}

export default MessageWrapper
