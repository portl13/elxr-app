import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import { useAlert } from 'react-alert'
import { EditorState } from 'draft-js';
import { Button, Col } from 'reactstrap';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import Head from 'next/head'

import { UserContext } from '../../../context/UserContext';
import { TIMEOUT, getProfileRoute } from '../../../utils/constant';
import Layout from '../../../components/layout/Layout';
import Loader from "../../../components/loader";
import {
    getMessageList, postMessage, createMessage, uploadMedia,
    deleteMsg, postMessageAction
} from "../../api/message.api";
import { memberDetails } from "../../api/member.api";
import EditorTextArea from "../EditorTextArea";
import NewMessage from "../NewMessage";
import UserMessageList from "../UserMessageList";


const MessageWrapper = () => {
    const alert = useAlert()
    const { user } = useContext(UserContext)
    const router = useRouter();
    const query = router.query;
    const [messages, setMessages] = useState([])
    const [userMsg, setUserMessage] = useState({})
    const [loader, setLoader] = useState(true)
    const [msgText, setMsgtext] = useState("")
    const [loadMsg, setLoadMsg] = useState(false)
    const [slugId, setslugId] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [isNewMsg, setIsNewMsg] = useState(false)
    const [images, setImages] = useState([]);
    const [uploadView, setUploadView] = useState(false);
    const [progress, setProgress] = useState(0)
    const [imageData, setImageData] = useState([])
    const [selMsgIndex, setSelMsgIndex] = useState(0)
    const [selectedUser, setSelectedUser] = useState([])
    const [isMemberBlocked, setMemberBlocked] = useState(false)
    const [isMemberBlockedId, setMemberBlockedId] = useState(null)
    const { slug = null } = query;
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    const getDetails = (page = 1, search = "", msgIndex = 0) => {
        const formData = {
            user_id: user?.id,
            page: page,
            per_page: 100,
            search: search,
        }
        getMessageList(user, formData).then((res) => {
            const msgs = res.data;
            let isUser = false;
            let respId = [];
            msgs.forEach(e => {
                if (Object.keys(e.recipients).length === 2) {
                    respId = [...respId, ...Object.keys(e.recipients)]
                }
            });
            const index = respId.indexOf(slug[1]);
            if (index === -1)
                isUser = true;
            if (isUser && user?.id !== respId[index] && user?.id !== Number(slug[1])) {
                memberDetails(user, slug[1]).then((val) => {
                    const { avatar_urls, name, id } = val.data
                    let data = {
                        name,
                        id,
                        avatar: avatar_urls.thumb,
                        isNewUser: true
                    }
                    msgs.unshift(data)
                    setMessages(msgs)
                    setUserMessage(msgs[msgIndex])
                    setLoader(false)
                })
            } else {
                setMessages(msgs)
                if (msgs.length)
                    setUserMessage(msgs[msgIndex])
                setLoader(false)
            }
        })
    }
    useEffect(() => {
        if (slug && user) {
            setslugId(slug)
            getDetails(1, "", selMsgIndex)
        }
    }, [slug])

    useEffect(() => {
        const interval = setInterval(() => {
            if (slug && user) {
                getDetails(1, "", selMsgIndex)
            }
        }, 10000);
        return () => clearInterval(interval);
    }, [slug, selMsgIndex]);

    const emptyEditorState = () => {
        setMsgtext("")
        setEditorState(() => EditorState.createEmpty())
        setLoadMsg(false)
    }

    const getResName = (data, state) => {
        if (!data.recipients)
            return ""
        const list = [...Object.keys(data.recipients)]
        let index = list.indexOf((data.current_user).toString());
        if (index !== -1)
            list.splice(index, 1);
        if (state)
            return list[0]
        return data.recipients[list[0]];
    }

    const sendUserMessage = () => {
        if (!userMsg.isNewUser && !isNewMsg) {
            const formData = {
                id: userMsg?.id,
                message: msgText,
                sender_id: user?.id,
                recipients: Object.keys(userMsg.recipients)
            }
            postMessage(user, formData).then((res) => {
                setSelMsgIndex(0)
                setUserMessage(res.data)
                emptyEditorState()
                setMemberBlocked(false)
                setMemberBlockedId(null)
            })
        } else {
            const formData = {
                message: msgText,
                sender_id: userMsg?.id,
                recipients: isNewMsg ? selectedUser.map((e) => e.value) : slugId[1]
            }
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
            formData.append('file', filedata, filedata.name);
            uploadMedia(user, formData, setProgress).then(res => {
                setImageData((data) => [...data, res.data.upload_id])
            }).catch(() => {
                setLoadMsg(false);
            })
        })
    }

    const handleSendMesg = () => {
        if (!msgText && !images.length) {
            alert.error('Please add content.', TIMEOUT);
            return
        }
        if (isNewMsg && !selectedUser.length) {
            alert.error('Please add people to send message.', TIMEOUT);
            return
        }
        setLoadMsg(true)
        if (images?.length)
            sendFiles()
        else sendUserMessage()
    }

    useEffect(() => {
        if (images.length && (imageData.length === images.length)) {
            sendUserMessage()
        }
    }, [imageData])

    const getUserMsg = (e, recipients) => {
        return Number(e.last_sender_id) === user?.id ?
            "You" : recipients?.name
    }

    const updateState = () => {
        setLoader(true)
        setMessages([]);
        setUserMessage({})
    }

    const handleSearch = (e) => {
        if (e.keyCode === 13) {
            updateState()
            getDetails(1, searchText)
        } else {
            const search = e.target ? e.target.value : e;
            setSearchText(search)
            if (!search) {
                updateState()
                getDetails(1, search)
            }
        }
    }
    const handleDeleteMsg = (id) => {
        setLoader(true)
        deleteMsg(user, id, { id, user_id: user?.id, recipients_pagination: true }).then(res => {
            const formData = {
                action: "unread",
                id: id,
                value: false,
            }
            postMessageAction(user, id, formData).then((res) => {
                getDetails()
                emptyEditorState()
            })
        }).catch(() => {
            emptyEditorState()
        })
    }

    const setSelctedMsg = (e, index) => {
        setMemberBlocked(false)
        setMemberBlockedId(null)
        setUserMessage(e);
        emptyEditorState();
        setSelMsgIndex(index)
        setIsNewMsg(false);
        const formData = {
            action: "unread",
            id: e.id,
            value: false,
        }
        postMessageAction(user, e.id, formData).then((res) => {
            getDetails(1, "", index)
        })
    }
    const getDate = (date) => {
        return moment(date).format("MMM D")
    }
    return (
        <Layout>
            <Head>
                <title>Messages-WeShare</title>
            </Head>
            <Col className='bg-black bd-radius pb-4' xs="12">
                <div className="messages-container">
                    <div className="bp-messages-nav-panel">
                        <div className="main-tag">Messages <FontAwesomeIcon icon={faEdit}
                            onClick={() => { setIsNewMsg(true); setMemberBlocked(false); setMemberBlockedId(null) }} /></div>
                        <div className="subnav-filters">
                            <input type="search"
                                value={searchText}
                                placeholder="Search Messages"
                                onChange={handleSearch}
                                onKeyDown={handleSearch}
                            />
                            {searchText && <span className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button">
                                    <FontAwesomeIcon
                                        icon={faTimes}
                                        onClick={() => handleSearch("")}
                                    />
                                </button>
                            </span>}
                        </div>
                        <div className="message-left-panel">
                            {loader ? <div style={{ textAlign: "center" }}><Loader color="primary" /></div> : ""}
                            {!messages.length && !loader ? <div className="message-left-empty">
                                <h4>No new messages yet</h4>
                                <span>Looks like you haven't initiated a conversation with any other member.</span>
                            </div> : ""}
                            {messages && messages.map((e, index) => {
                                const recipients = !e.isNewUser ?
                                    e.recipients[e.last_sender_id] : null;
                                return (<div className="message-notfication-box"
                                    onClick={() => setSelctedMsg(e, index)}>
                                    {e.avatar.length === 1 || e.isNewUser ? <div className="image-tag">
                                        <img src={!e.isNewUser ? e.avatar[0].full : e.avatar} />
                                    </div> : <div className="multi-image-tag">
                                        <img src={e.avatar[0].full} className="img-tag" />
                                        <img src={e.avatar[1].full} className="img-avtar" />
                                    </div>}
                                    <div className="thread-content">
                                        <div className="thread-to">{recipients ? getResName(e).name : e.name}</div>
                                        <div className="thread-subject">
                                            {recipients ? `${getUserMsg(e, recipients)} :` : ""}
                                            <span dangerouslySetInnerHTML={{ __html: !e.excerpt ? "" : e.excerpt.rendered }}></span>
                                        </div>
                                    </div>
                                    <div className="thread-date">
                                        {getDate(e.date)}
                                        {e.unread_count ? <span className="dots-tag"></span> : ""}
                                    </div>
                                    <div className="cross-icon" onClick={() => handleDeleteMsg(e.id)}>+</div>
                                </div>)
                            })}
                        </div>
                    </div>
                    <div className="bp-messages-content">
                        {isNewMsg ?
                            <NewMessage
                                user={user}
                                selectedUser={selectedUser}
                                setSelectedUser={setSelectedUser} /> :
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
                                handleDeleteMsg={handleDeleteMsg} />}
                        {(isMemberBlocked && userMsg.id === isMemberBlockedId) ? "" :
                            <div className="send-reply">
                                <div className="bp-message-content">
                                    <div className="medium-editor-element">
                                        <EditorTextArea
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
                                        <div className="messages-toolbar">
                                            <div className="post-update-toolbar">
                                            </div>
                                        </div>
                                        <Button className="reply-submit-button"
                                            onClick={() => handleSendMesg()}>Send {" "}
                                            {loadMsg ? <Loader /> : ""}</Button>
                                    </div>
                                </div>
                            </div>}
                    </div>
                </div>
            </Col>
        </Layout >
    );
}

export default MessageWrapper;
