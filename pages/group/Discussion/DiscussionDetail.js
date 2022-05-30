import React, { useState, useEffect } from "react";
import moment from "moment";

import Loader from '../../../components/loader';
import { getRepliesList, getTopicDetails, postSubscribe, deleteTopic } from "../../api/discussion.api";
import ReplyModal from "./ReplyModal";
import MergeTopic from "./MergeTopic"
import SplitTopic from "./SplitTopic"
import MoveTopic from "./MoveTopic"
import EditTopic from "./EditTopic"
import ReplyCard from "./ReplyCard"

const DiscussionDetail = (props) => {
    const { user, userIds, setShowModal, showModal, groupDetails,
        getForumList, innerNav, router, discussionAction } = props

    const [replies, setReplies] = useState([]);
    const [setLoad, setLoader] = useState(false);
    const [topic, setTopicDetails] = useState(null);
    const [replyTo, setReplyTo] = useState(null);
    const [postDataLoader, setPostDataLoader] = useState(false);

    const getSelTopicsReply = () => {
        getRepliesList(user, { parent: innerNav, per_page: 30 }).then(ress => {
            setReplies(ress.data)
            setLoader(false)
        }).catch(() => { setLoader(false) })
    }

    const getTopic = () => {
        getTopicDetails(user, innerNav).then(ress => {
            setTopicDetails(ress.data)
            setPostDataLoader(false)
            setLoader(false)
        }).catch(() => {
            setLoader(false)
            setPostDataLoader(false)
        })
    }

    useEffect(() => {
        setLoader(true)
        getTopic()
        if (!discussionAction) getSelTopicsReply()
    }, [innerNav, discussionAction])

    const openModal = (ele) => {
        setShowModal(true)
        setReplyTo(ele)
    }

    const handleSubscribe = (e, action, value) => {
        setPostDataLoader(true)
        if (action === "trash") {
            deleteTopic(user, e.id).then(ress => {
                getTopic()
            }).catch(() => { setPostDataLoader(false) })
        } else {
            const formData = {
                action,
                value,
                id: e.id,
            }
            postSubscribe(user, e.id, formData).then(ress => {
                getTopic()
            }).catch(() => { setPostDataLoader(false) })
        }
    }

    const handleRedirection = (action, id) => {
        if (action === "split" || action === "move" || action === "edit")
            router.push(`${window.location.pathname}?tab=discusion&nav=${innerNav}&action=${action}&replyId=${id}`)
        else
            router.push(`${window.location.pathname}?tab=discusion&nav=${innerNav}&action=${action}`)
    }

    const isActive = (e) => !e ? "icon-tag " : "icon-tag icon-opacity"

    if (topic && discussionAction === "merge") {
        return (<MergeTopic topic={topic} {...props} />)
    } else if (topic && discussionAction === "split") {
        return (<SplitTopic topic={topic} {...props} />)
    } else if (topic && discussionAction === "move") {
        return (<MoveTopic topic={topic} {...props} />)
    } else if (topic && discussionAction === "edit") {
        return (<EditTopic topic={topic} {...props} />)
    } else
        return (
            <>
                <div className="main-wrapper manage-select-panel">
                    {postDataLoader ? <Loader /> : ""}
                    <div className="bbp-forum-buttons-wrap">
                    </div>
                    <div className="bb-grid">
                        <div className="replies-content">
                            <div className="discussion-panel">
                                {setLoad || !userIds || !topic ? <Loader /> : <>
                                    <div className="discuuion-header">
                                        <h5>{topic.title.rendered}</h5>
                                        <div className="bb-topic-states">
                                            {!groupDetails?.can_join && <>
                                                <span className="icon-tag"
                                                    onClick={() => router.push(`${window.location.pathname}?tab=discusion`)}>
                                                    <a href="javascript:void(0);"><img src="https://data.portl.live/wp-content/themes/buddyboss-theme/assets/images/svg/lock.svg" alt="lock-icon" /></a>
                                                    <div className="tooltip-panel"><em></em>Close</div>
                                                </span>
                                                <span className={isActive(topic.action_states?.sticky)}
                                                    onClick={() => handleSubscribe(topic, "sticky", !topic.action_states.sticky)}>
                                                    <a href="javascript:void(0);"><img src="https://data.portl.live/wp-content/themes/buddyboss-theme/assets/images/svg/sticky.svg" alt="lock-icon" /></a>
                                                    <div className="tooltip-panel"><em></em>Sticky</div>
                                                </span></>}
                                            <span className={isActive(topic.action_states?.favorited)}
                                                onClick={() => handleSubscribe(topic, "favorite", !topic.action_states.favorited)}>
                                                <a href="javascript:void(0);"><img src="https://data.portl.live/wp-content/themes/buddyboss-theme/assets/images/svg/star.svg" alt="lock-icon" /></a>
                                                <div className="tooltip-panel"><em></em>Favorite</div>
                                            </span>
                                            {/* <span className="icon-tag">
                                                <FontAwesomeIcon icon={faEllipsisV} />
                                                <div className="tooltip-panel1"><em></em>More Options</div>
                                                <div className="more-action-list">
                                                    <div className="inner-tag">
                                                        <div className="main-tag">
                                                            <div className="item-link">
                                                                <FontAwesomeIcon icon={faFlag} />
                                                                Report Discussion
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </span> */}
                                        </div>
                                    </div>
                                    <div className="bs-item-wrap inner-wrap">
                                        <div className="flex flex-1">
                                            <div className="item">
                                                <div className="item-meta">
                                                    <a href="">{userIds[topic?.author]?.name}</a>
                                                    replied
                                                    <a href="">{moment(topic.date).fromNow()}</a>
                                                    <div className="bs-voices-wrap">
                                                        <span className="bs-voices">{topic.voice_count} Member</span>
                                                        <span className="bs-separator">·</span>
                                                        <span className="bs-replies">{topic.total_reply_count} Reply</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bs-forums-meta">
                                                <div className="bg-tag">{topic.group.name}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <ReplyCard
                                        item={topic}
                                        user={user}
                                        userIds={userIds}
                                        handleRedirection={handleRedirection}
                                        openModal={openModal}
                                        handleSubscribe={handleSubscribe}
                                        status={true}
                                        groupDetails={groupDetails} />
                                    {replies.map((e) =>
                                        <ReplyCard
                                            item={e}
                                            user={user}
                                            userIds={userIds}
                                            handleRedirection={handleRedirection}
                                            openModal={openModal}
                                            handleSubscribe={handleSubscribe}
                                            status={false}
                                            groupDetails={groupDetails} />)}
                                </>}
                            </div>
                        </div>
                        <div className="bs-single-topic-sidebar">
                            {!groupDetails?.can_join && <div className="reply-button" onClick={() => openModal(topic)}>Reply</div>}
                            <button className="subscription-button"
                                onClick={() => handleSubscribe(topic, "subscribe", !topic.action_states.subscribed)}>
                                {`${topic?.action_states?.subscribed ? "Unsubscribe" : "Subscribe"}`}</button>
                        </div>
                    </div>
                </div>
                {replyTo && <ReplyModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    user={user}
                    groupDetails={groupDetails}
                    getForumList={getForumList}
                    innerNav={innerNav}
                    topicDetail={topic}
                    replyTo={replyTo}
                    getSelTopicsReply={getSelTopicsReply}
                    userIds={userIds}
                    getTopic={getTopic}
                />}
            </>
        );
};

export default DiscussionDetail;
