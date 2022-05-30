import React, { useState, useEffect } from "react";
import { Button, Input, Form, Label } from "reactstrap";
import moment from "moment";

import { splitTopics } from "../../api/discussion.api";
import Loader from '../../../components/loader';
import { convertToPlain } from './MergeTopic'

const SplitTopic = ({ topic, user, forumList, router, groupDetails, replyId, innerNav }) => {
    const [dropdownOption, setDropdownOption] = useState([])
    const [selOption, setSelOption] = useState([])
    const [subscribers, setSubscribers] = useState(true)
    const [favorites, setFavorites] = useState(true)
    const [tags, setTags] = useState(true)
    const [postDataLoader, setPostDataLoader] = useState(false);
    const [titleName, setTitleName] = useState("");
    const [titleStatus, setTitleStatus] = useState("reply");

    useEffect(() => {
        setTitleName(`Split: ${topic?.title.rendered}`)
    }, [])
    useEffect(() => {
        if (forumList.length) {
            let option = forumList.map((optn, i) => optn.id !== topic.id && (
                <option value={optn.id}>{moment(optn.date).format('MM/DD/YYYY')} -
                    {" "}{optn?.title.rendered}{" "}({convertToPlain(optn.short_content).trim()})
                </option>))
            setSelOption(forumList[0].id)
            setDropdownOption(option)
        }
    }, [forumList, innerNav])

    const handleMerge = () => {
        setPostDataLoader(true)
        const formData = {
            subscribers,
            favorites,
            tags,
            id: topic.id,
            reply_id: replyId,
            split_option: titleStatus,
        }
        if (titleStatus === "reply")
            formData['new_destination_title'] = titleName
        else formData['destination_id'] = selOption
        splitTopics(user, topic.id, formData).then(() => {
            setPostDataLoader(false)
            router.push(`${window.location.pathname}?tab=discusion`)
        }).catch(() => {
            setPostDataLoader(false)
        })
    }

    return (
        <>
            <h5>Split discussion "{topic?.title.rendered}"</h5>
            <Form>
                <div className="warning-section">
                    <span><em>!</em></span>
                    <p>When you split a discussion, you are slicing it in half starting with the
                        reply you just selected. Choose to use that reply as a new discussion with
                        a new title, or merge those replies into an existing discussion.
                    </p>
                </div>
                <div className="warning-section">
                    <span><em>!</em></span>
                    <p>If you use the existing discussion option, replies within both discussions
                        will be merged chronologically. The order of the merged replies is based
                        on the time and date they were posted.
                    </p>
                </div>
                <h5>Split Method</h5>
                <div className="form-group">
                    <input
                        name="publicAbout"
                        className="custom-control-input"
                        id="publicAbout"
                        type="radio"
                        value="reply"
                        checked={titleStatus === "reply"}
                        onChange={(e) => setTitleStatus(e.target.value)}
                    />
                    <label className="custom-control-label" for="publicAbout">
                        New discussion in {groupDetails?.name} titled:
                    </label>
                    <Input
                        type="text"
                        className="custom-select-panel"
                        value={titleName}
                        onChange={(e) => setTitleName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        name="publicAbout"
                        className="custom-control-input"
                        id="publicAbout1"
                        type="radio"
                        value="existing"
                        checked={titleStatus === "existing"}
                        onChange={(e) => setTitleStatus(e.target.value)}
                    />
                    <label className="custom-control-label" for="publicAbout1">
                        Use an existing discussion in this forum:
                    </label>
                    <Input
                        type="select"
                        className="custom-select-panel"
                        onChange={(e) => setSelOption(e.target.value)}
                    >
                        {dropdownOption}
                    </Input>
                </div>
                <h5>Discussion Extras</h5>
                <div className="form-group">
                    <div className="custom-control custom-checkbox mb-3">
                        <input
                            className="custom-control-input"
                            id="subscribers"
                            type="checkbox"
                            defaultChecked={subscribers}
                            name="status"
                            value="public"
                            onChange={() => setSubscribers(!subscribers)}
                        />
                        <label className="custom-control-label" htmlFor="subscribers">
                            <b>Copy subscribers to the new discussion</b>
                        </label>
                    </div>
                    <div className="custom-control custom-checkbox mb-3">
                        <input
                            className="custom-control-input"
                            id="favorites"
                            type="checkbox"
                            defaultChecked={favorites}
                            name="status"
                            value="public"
                            onChange={() => setFavorites(!favorites)}
                        />
                        <label className="custom-control-label" htmlFor="favorites">
                            <b>Copy favoriters to the new discussion</b>
                        </label>
                    </div>
                    <div className="custom-control custom-checkbox mb-3">
                        <input
                            className="custom-control-input"
                            id="tags"
                            type="checkbox"
                            defaultChecked={tags}
                            name="status"
                            value="public"
                            onChange={() => setTags(!tags)}
                        />
                        <label className="custom-control-label" htmlFor="tags">
                            <b>Copy discussion tags to the new discussion</b>
                        </label>
                    </div>
                </div>
                <div className="delete-section">
                    <span><em>!</em></span>
                    <p>WARNING: This process cannot be undone.</p>
                </div>
                <Button className="delete-button" onClick={() => handleMerge()}>
                    Submit{postDataLoader ? <Loader /> : ""}</Button>
                <Button className="delete-button"
                    onClick={() => router.push(`${window.location.pathname}?tab=discusion&nav=${topic.id}`)}>Back</Button>
            </Form>
        </>
    );
};

export default SplitTopic;
