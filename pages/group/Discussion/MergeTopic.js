import React, { useState, useEffect } from "react";
import { Button, Input, Form, Label } from "reactstrap";
import moment from "moment";

import { mergeTopics } from "../../api/discussion.api";
import Loader from '../../../components/loader';

export const convertToPlain = (html) => {
    if (!document)
        return false
    // Create a new div element
    let tempDivElement = document.createElement("div");
    // Set the HTML content with the given value
    tempDivElement.innerHTML = html;
    // Retrieve the text property of the element 
    return tempDivElement.textContent || tempDivElement.innerText || "";
}

const MergeTopic = ({ topic, user, forumList, router, innerNav }) => {
    const [dropdownOption, setDropdownOption] = useState([])
    const [selOption, setSelOption] = useState([])
    const [subscribers, setSubscribers] = useState(true)
    const [favorites, setFavorites] = useState(true)
    const [tags, setTags] = useState(true)
    const [postDataLoader, setPostDataLoader] = useState(false);
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
            destination_id: selOption,
        }
        mergeTopics(user, topic.id, formData).then(() => {
            setPostDataLoader(false)
            router.push(`${window.location.pathname}?tab=discusion&nav=${selOption}`)
        }).catch(() => {
            setPostDataLoader(false)
        })
    }

    return (
        <>
            <h5>Merge discussion "{topic?.title.rendered}"</h5>
            <Form>
                <div className="warning-section">
                    <span><em>!</em></span>
                    <p>Select the discussion to merge this one into. The destination topic will remain
                        the lead discussion, and this one will change into a reply.
                        To keep this discussion as the lead, go to the other discussion and use the
                        merge tool from there instead.
                    </p>
                </div>
                <div className="warning-section">
                    <span><em>!</em></span>
                    <p>All replies within both discussions will be merged chronologically. The order
                        of the merged replies is based on the time and date they were posted. If the
                        destination discussion was created after this one, it's post date will be updated
                        to second earlier than this one.
                    </p>
                </div>
                <h5>Destination</h5>
                <div className="form-group discussion-input-group">
                    <Label>Merge with this topic:</Label>
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
                            <b>Merge discussion subscribers</b>
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
                            <b>Merge discussion favoriters</b>
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
                            <b>Merge discussion tags</b>
                        </label>
                    </div>
                </div>
                <div className="delete-section">
                    <span><em>!</em></span>
                    <p>WARNING: This process cannot be undone.</p>
                </div>
                <div className="custom-button-panel">
                    <Button className="delete-button" onClick={() => handleMerge()}>
                        Submit{postDataLoader ? <Loader /> : ""}</Button>
                    <Button className="delete-button"
                        onClick={() => router.push(`${window.location.pathname}?tab=discusion&nav=${topic.id}`)}>Back</Button>
                </div>
            </Form>
        </>
    );
};

export default MergeTopic;