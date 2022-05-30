import React, { useState, useEffect } from "react";
import { Button, Input, Form } from "reactstrap";
import moment from "moment";

import { moveTopicReply } from "../../api/discussion.api";
import Loader from '../../../components/loader';
import { convertToPlain } from './MergeTopic'

const MoveTopic = ({ topic, user, forumList, router, groupDetails, replyId, innerNav }) => {

    const [dropdownOption, setDropdownOption] = useState([])
    const [selOption, setSelOption] = useState([])
    const [postDataLoader, setPostDataLoader] = useState(false);
    const [titleName, setTitleName] = useState("");
    const [titleStatus, setTitleStatus] = useState("topic");

    useEffect(() => {
        setTitleName(`Moved: Reply To: ${topic?.title.rendered}`)
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
            id: replyId,
            move_option: titleStatus,
        }
        if (titleStatus === "topic")
            formData['destination_topic_title'] = titleName
        else formData['destination_topic_id'] = selOption
        moveTopicReply(user, topic.id, formData).then(() => {
            setPostDataLoader(false)
            router.push(`${window.location.pathname}?tab=discusion`)
        }).catch(() => {
            setPostDataLoader(false)
        })
    }

    return (
        <>
            <h5>Move reply "Reply To: {topic?.title.rendered}"</h5>
            <Form>
                <div className="warning-section">
                    <span><em>!</em></span>
                    <p>You can either make this reply a new discussion with a new title, or merge it into an existing discussion.
                    </p>
                </div>
                <div className="warning-section">
                    <span><em>!</em></span>
                    <p>If you choose an existing discussion, replies will be ordered by the time and date they were created.
                    </p>
                </div>
                <h5>Move Method</h5>
                <div className="form-group">
                    <input
                        name="publicAbout"
                        className="custom-control-input"
                        id="publicAbout"
                        type="radio"
                        value="topic"
                        checked={titleStatus === "topic"}
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

export default MoveTopic;
