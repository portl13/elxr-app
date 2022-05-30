import React, { useState, useEffect } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faReply, } from "@fortawesome/free-solid-svg-icons";

import Loader from '../../../components/loader';
import { getForumTopics } from "../../api/discussion.api";
import DiscussionDetail from "./DiscussionDetail";
import ReplyModal from "./ReplyModal";

const GroupDiscussion = (props) => {
    const { innerNav, tab, user, groupDetails, groupMemberList, router, discussionAction } = props;
    const [forumList, setForumList] = useState([]);
    const [userIds, setUserIds] = useState({});
    const [setLoad, setLoader] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleTopicSelect = (ele) => {
        router.push(`${window.location.pathname}?tab=discusion&nav=${ele.id}`);
    };

    const getForumList = () => {
        getForumTopics(user, { parent: groupDetails?.forum, order: "desc", per_page: 30 }).then(ress => {
            setForumList(ress.data)
            setLoader(false)
        }).catch(() => { setLoader(false) })
    }
    useEffect(() => {
        if (groupDetails.id && tab === "discusion") {
            setLoader(true)
            getForumList()
        }
    }, [groupDetails, tab, innerNav])

    useEffect(() => {
        if (groupMemberList.length) {
            let userIdList = {}
            groupMemberList.forEach(e => { userIdList[e.id] = e })
            setUserIds(userIdList)
        }
    }, [groupMemberList])

    const renderList = () => <>{setLoad || !userIds ? <Loader /> :
        forumList.map((e) => <div className="bs-item-wrap">
            <div className="flex flex-1">
                <div className="item-avatar">
                    <div className="pin-icons">
                        {e.action_states.sticky &&
                            <a href="javascript:void(0);">
                                <img src="https://data.portl.live/wp-content/themes/buddyboss-theme/assets/images/svg/sticky.svg" alt="lock-icon" /></a>
                        }
                        {e.action_states.subscribed &&
                            <a href="javascript:void(0);"><img src="https://data.portl.live/wp-content/themes/buddyboss-theme/assets/images/svg/subscribed.svg" alt="lock-icon" /></a>
                        }
                    </div>
                    <a href="">
                        <img alt="photo" src={userIds[e.author] ? userIds[e.author].avatar_urls.thumb : ''} />
                    </a>
                </div>
                <div className="item">
                    <div className="item-title"
                        onClick={() => handleTopicSelect(e)}>{e.title.rendered}</div>
                    <div className="item-meta">
                        <FontAwesomeIcon icon={faReply} />
                        <a href="">{userIds[e.author]?.name}</a>
                        replied
                        <a href="">{moment(e.date).fromNow()}</a>
                        <div className="bs-voices-wrap">
                            <span className="bs-voices">{e.voice_count} Member</span>
                            <span className="bs-separator">·</span>
                            <span className="bs-replies">{e.total_reply_count} Reply</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bs-forums-meta">
                <div className="bg-tag">{e.group.name}</div>
            </div>
        </div>)}</>

    const renderMessageOrList = () => !forumList.length ?
        <div className="warning-section">
            <span><em>!</em></span>
            <p>Sorry, there were no discussions found.</p>
        </div> : <div className="bb-grid">
            <h5>All Discussions</h5>
            <div className="discussion-panel">
                {renderList()}
            </div>
        </div>

    if (innerNav && tab === "discusion") {
        return (<DiscussionDetail
            userIds={userIds}
            setShowModal={setShowModal}
            showModal={showModal}
            getForumList={getForumList}
            discussionAction={discussionAction}
            forumList={forumList}
            {...props} />)
    } else
        return (
            <>
                <div className="main-wrapper manage-select-panel">
                    {!groupDetails?.forum ? <div className="delete-section">
                        <span><em>!</em></span>
                        <p>This group does not currently have a forum.</p>
                    </div> : <>
                        {!groupDetails.can_join && <div className="bbp-forum-buttons-wrap">
                            <div className="new-post" onClick={() => setShowModal(true)}>
                                <FontAwesomeIcon icon={faEdit} /> New discussion</div>
                        </div>}
                        {renderMessageOrList()}
                    </>}
                </div>
                <ReplyModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    user={user}
                    groupDetails={groupDetails}
                    getForumList={getForumList}
                    innerNav={innerNav}
                />
            </>
        );
};

export default GroupDiscussion;