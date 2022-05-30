import React, { useState, useEffect, useMemo } from "react";
import { Button, Input, Form, Row, Col, Progress } from "reactstrap";
import { EditorState, ContentState } from "draft-js";
import { useDropzone } from "react-dropzone";
import axios from "axios";

import { getTopicReply } from "../../api/discussion.api";
import Editor from "./Editor";
import { convertToPlain } from './MergeTopic'
import Loader from '../../../components/loader';
import { CreateFeedAvatar, } from "../../../components/livefeed/livefeed.style";
import { uploadContent, updateTopic, getTpoicDetails, updateReply } from "../../../pages/api/discussion.api";
import { getAllForums, getForums } from "../../api/forum.api";
import {
    CloseButton, thumb, thumbInner, thumbImg, activeStyle,
    acceptStyle, rejectStyle,
} from "../../../components/profile-edit/profile-edit.style";
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import useIcon from '../../../hooks/useIcon';

const EditTopic = ({ topic, user, forumList, router, groupDetails, replyId, innerNav, replyTo, userIds }) => {

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [postDataLoader, setPostDataLoader] = useState(false);
    const [progress, setProgress] = useState(0);
    const [videoPreview, setVideoPreview] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [loader, setLoader] = useState(false);
    const [selTopic, setSelTopic] = useState({});
    const [formOption, setFormOption] = useState([]);

    const [fileData, setFiles] = useState([]);
    const [type, setType] = useState("unstick");
    const [contentHtml, setContentHtml] = useState("<p></p>");
    const [discussionTitle, setDiscussionTitle] = useState();
    const [forumVal, setSelForumVal] = useState();
    const [optionalReason, setOptionalReason] = useState("");
    const [attachmentId, setAttachmentId] = useState([]);
    const [contentError, setContentError] = useState(false);

    const { iconElement: close } = useIcon(faWindowClose, false, 'sm');
    const htmlToDraft =
        typeof window === "object" && require("html-to-draftjs").default;
    const updateHtmlContent = () => {
        let str = convertToPlain(selTopic.short_content).trim()
        if (str) {
            const contentBlock = htmlToDraft(selTopic.short_content);
            const contentState = ContentState.createFromBlockArray(
                contentBlock.contentBlocks
            );
            setContentHtml(selTopic.content.raw);
            const editorStateVal = EditorState.createWithContent(contentState);
            setEditorState(editorStateVal);
        }
    }

    const getFormData = (data) => {
        getForums(user, { id: selTopic.forum_id }).then((res) => {
            let newOption = [...data]
            newOption.push(res.data)
            setFormOption(newOption)
        })
    }

    const geForumList = () => {
        getAllForums(user, { page: 1, per_page: 10 }).then((res) => {
            if (!(res.data.some(el => selTopic.forum_id === el.id))) {
                getFormData(res.data)
            } else setFormOption(res.data)
        })
    }

    const getSelTopicdetails = () => {
        if (innerNav === replyId)
            getTpoicDetails(user, replyId).then((res) => {
                setSelTopic(res.data)
            })
        else getTopicReply(user, replyId).then((res) => {
            setSelTopic(res.data)
        })
    }

    const updateVideoContent = (bbp_media, bbp_videos, status) => {

        if (bbp_media || bbp_videos) {
            if (status === "image")
                setShowImage(true)
            else setVideoPreview(true)
            let data = bbp_media ? bbp_media : bbp_videos;
            const imageId = [];
            setFiles(data.map((e, i) => {
                imageId.push(e.attachment_id);
                let dataFile = {
                    name: `uploaded-image-${i}`,
                    preview: e.url,
                    attachment_id: e.attachment_id,
                };
                if (status === "video")
                    dataFile['media_album_cover'] = e.attachment_data.media_album_cover
                return dataFile
            }));
            setAttachmentId(imageId)
        }
    }
    useEffect(() => {
        if (selTopic.id) {
            if (innerNav === replyId) geForumList()
            const { forum_id, title, sticky, bbp_media, bbp_videos } = selTopic
            setDiscussionTitle(title.rendered)
            setSelForumVal(forum_id)
            setType(sticky ? "stick" : "unstick")
            updateHtmlContent()
            let status = bbp_media ? "image" : "video"
            updateVideoContent(bbp_media, bbp_videos, status)
        }
    }, [selTopic, innerNav])
    useEffect(() => {
        getSelTopicdetails()
    }, [innerNav])

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        accept: videoPreview ? "video/*" : "image/*",
        maxFiles: 0,
        multiple: true,
        onDrop: (acceptedFiles) => {
            setFiles([...acceptedFiles, ...fileData]);
            setProgress(0);
        },
    });


    const cleanFile = (i, id) => {
        if (id) {
            const attachmentIds = [...attachmentId];
            let index = attachmentIds.indexOf(id)
            attachmentIds.splice(index, 1);
            setAttachmentId(attachmentIds);
        }
        const image = [...fileData];
        image.splice(i, 1);
        setFiles(image);
        setProgress(0);
    };

    const style = useMemo(
        () => ({
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isDragActive, isDragReject, isDragAccept]
    );

    let styleThumb = thumb;
    const thumbs = fileData.map((file, i) => {
        let videoPoster = file.attachment_id ? file.media_album_cover : "";
        let url = file.attachment_id ? file.preview : URL.createObjectURL(file);
        return (<div style={styleThumb} key={file.name}>
            <Button
                onClick={() => cleanFile(i, file.attachment_id)}
                css={CloseButton}
                className="btn-icon btn-2"
                color="primary"
                type="button"
            >
                <span className="btn-inner--icon">
                    <i>{close}</i>
                </span>
            </Button>
            <div style={thumbInner}>
                <div className="loading-container">
                    {progress !== 0 && !file.attachment_id && (
                        <Progress max="100" value={progress} color="success" />
                    )}
                </div>
                {videoPreview ? <video style={thumbImg} poster={videoPoster} >
                    <source src={url} type="video/mp4" />
                </video >
                    : (
                        <img src={url} style={thumbImg} />
                    )}
            </div>
        </div>
        )
    });

    const diplayUploadCard = (status, isArea) => {
        setFiles([])
        if (status) {
            setShowImage(false);
            setVideoPreview(!videoPreview);
        } else {
            setShowImage(!showImage);
            setVideoPreview(false);
        }
    };
    const checkError = () => {
        let status = true
        if (!discussionTitle && !innerNav) {
            alert.error("Please enter discussion title.", TIMEOUT)
            status = false
        }
        let text = convertToPlain(contentHtml).trim()
        if (!text.length && !text && !fileData.length && attachmentId.length) {
            alert.error("Please add content to post.", TIMEOUT)
            status = false
        }

        if (!text.length || !text) {
            setContentError(true)
            status = false
        }
        return status
    }

    const emptyState = () => {
        setShowImage(false)
        setVideoPreview(false)
        setShowModal(false)
        setPostDataLoader(false)
        setFiles([])
        setContentHtml("<p></p>")
        setEditorState(() => EditorState.createEmpty());
    }

    const updateTopicReply = (fileIds) => {
        const formData = {
            id: replyId,
            topic_id: innerNav,
            content: contentHtml,
            forum_id: forumVal,
            reason: optionalReason,
            log: true
        }
        if (fileIds.length)
            formData[videoPreview ? "bbp_videos" : "bbp_media"] = fileIds;
        updateReply(user, replyId, formData).then(() => {
            router.push(`${window.location.pathname}?tab=discusion&nav=${innerNav}`)
        }).catch(() => setLoader(false))
    }

    const updateDiscussionTopic = (fileIds) => {
        const formData = {
            id: replyId,
            title: discussionTitle,
            content: contentHtml,
            parent: forumVal,
            reason_editing: optionalReason,
            sticky: type
        }
        if (fileIds.length)
            formData[videoPreview ? "bbp_videos" : "bbp_media"] = fileIds;
        updateTopic(user, replyId, formData).then(() => {
            router.push(`${window.location.pathname}?tab=discusion&nav=${innerNav}`)
            emptyState()
        }).catch(() => setPostDataLoader(false))
    }

    const callPostFunction = (upload_id) => {
        if (innerNav === replyId)
            updateDiscussionTopic(upload_id)
        else
            updateTopicReply(upload_id)
    }
    const postActivity = () => {
        if (checkError()) {
            setPostDataLoader(true)
            let fileList = fileData.filter((el) => !el.attachment_id)
            if (fileList.length)
                uploadContent(user, fileList, videoPreview, setProgress).then(
                    axios.spread((...args) => {
                        let upload_id = args.map((e) => e.data.upload_id);
                        callPostFunction([...attachmentId, ...upload_id])
                    })
                ).catch(() => setPostDataLoader(false))
            else callPostFunction(attachmentId.length ? attachmentId : [])
        }
    }

    return (
        <>
            <Row className="mt-4">
                <Col sm="12">
                    {user && innerNav === replyId ? (<>
                        <div css={CreateFeedAvatar} className="optional-form-panel">
                            <img
                                className="avatar"
                                src={user?.avatar_urls?.thumb}
                                alt={`avatar ${user.displayName}`}
                            />
                            <Input type="text"
                                placeholder="Discussion title"
                                value={discussionTitle}
                                onChange={(e) => {
                                    let str = e.target.value.substring(0, 100)
                                    setDiscussionTitle(str)
                                }} />
                        </div>
                    </>
                    ) : <div css={CreateFeedAvatar}>
                        <h5>Reply to: {userIds && userIds[selTopic?.author] !== undefined ? userIds[selTopic?.author]?.name : null }</h5> 
                    </div>}
                </Col>
            </Row>
            <Editor
                user={user}
                editorState={editorState}
                setContentHtml={setContentHtml}
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                thumbs={thumbs}
                placeholderText={"Type your discussion content here..."}
                progress={progress}
                fileData={fileData}
                showImage={showImage}
                diplayUploadCard={diplayUploadCard}
                style={style}
                videoPreview={videoPreview}
                setEditorState={setEditorState}
                innerNav={innerNav}
                isEdit={true}
                contentHtml={contentHtml}
                contentError={contentError}
                setContentError={setContentError}
            />
            {/* <div className="form-group">
                <div className="custom-control custom-checkbox mb-3">
                    <input
                        className="custom-control-input"
                        id="subscribers"
                        type="checkbox"
                        // defaultChecked={subscribers}
                        name="status"
                        value="public"
                    // onChange={() => setSubscribers(!subscribers)}
                    />
                    <label className="custom-control-label" htmlFor="subscribers">
                        <b>Keep a log of this edit:</b>
                    </label>
                </div>
            </div> */}
            <Form className="optional-form-panel">
                <div className="form-group">
                    <label>
                        Optional reason for editing:
                    </label>
                    <Input
                        type="text"
                        className="custom-select-panel"
                        placeholder="Optional reason for editing"
                        value={optionalReason}
                        onChange={(e) => setOptionalReason(e.target.value)}
                    />
                </div>
                {innerNav === replyId &&
                    <><div className="form-group">
                        <label >
                            Forum:
                        </label>
                        <Input
                            type="select"
                            className="custom-select-panel"
                            defaultValue={forumVal}
                            value={forumVal}
                            onChange={(e) => setSelForumVal(e.target.value)}>
                            {formOption.map((optn, i) => optn.id !== topic.id && (
                                <option value={optn.id}>{optn.title.rendered}</option>))}
                        </Input>
                    </div>
                        <div className="form-group">
                            <label>
                                Type:
                            </label>
                            <Input
                                type="select"
                                className="custom-select-panel"
                                defaultValue={type}
                                value={type}
                                onChange={(e) => setType(e.target.value)}>
                                <option value={"unstick"}>Type: Normal</option>
                                <option value={"stick"}>Type: Stick</option>
                            </Input>
                        </div></>}
                {/* <div className="form-group">
                    <div className="custom-control custom-checkbox mb-3">
                        <input
                            className="custom-control-input"
                            id="subscribers"
                            type="checkbox"
                            // defaultChecked={subscribers}
                            name="status"
                            value="public"
                        // onChange={() => setSubscribers(!subscribers)}
                        />
                        <label className="custom-control-label" htmlFor="subscribers">
                            <b>Notify me of replies via email</b>
                        </label>
                    </div>
                </div> */}
                <div className="custom-button-panel">
                    <Button className="delete-button"
                        onClick={() => router.push(`${window.location.pathname}?tab=discusion&nav=${topic.id}`)}>Back</Button>
                    <Button className="delete-button" onClick={() => postActivity()}>
                        Submit{postDataLoader ? <Loader /> : ""}</Button>
                </div>
            </Form>
        </>
    );
};

export default EditTopic;
