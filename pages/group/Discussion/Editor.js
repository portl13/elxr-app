import React, { useState, useEffect } from "react";
import { useAlert } from 'react-alert'
import dynamic from "next/dynamic";
import { convertToRaw } from "draft-js";
import { Form, FormGroup, Row, Col, Input } from "reactstrap";
import draftToHtml from "draftjs-to-html";
import { DropZoneStyle, thumbsContainer } from "../../../components/profile-edit/profile-edit.style";
import { CreateFeedTextarea, CreateFeedAvatar, } from "../../../components/livefeed/livefeed.style";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToPlain } from './MergeTopic'
import { TIMEOUT } from '../../../utils/constant';

const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), { ssr: false });

const ToolbarStyle = {
    options: ["inline", "list", "blockType", "emoji"],
    inline: {
        inDropdown: false,
        options: ["bold", "italic"],
        bold: { icon: '/img/editor/bold.png', className: "demo-option-custom" },
        italic: { icon: '/img/editor/italic.png', className: "demo-option-custom" },
    },
    blockType: {
        inDropdown: false,
        options: ["Blockquote"],
    },
    list: {
        inDropdown: false,
        options: ["unordered", "ordered"],
        unordered: { icon: '/img/editor/bullets.png', className: "demo-option-custom" },
        ordered: { icon: '/img/editor/numbered.png', className: "demo-option-custom" },
    },
    emoji: {
        icon: '/img/editor/emoji.png',
        className: 'demo-option-custom',
    }
}

const EditorWrapper = ({ user, thumbs, style, showImage, setContentHtml, editorState, setEditorState,
    getRootProps, getInputProps, fileData, diplayUploadCard, videoPreview, replyTo, userIds,
    setDiscussionTitle, placeholderText, innerNav, isEdit, contentHtml, discussionTitle, contentError, setContentError }) => {
    const [contentLength, setLength] = useState(0);
    const alert = useAlert()
    useEffect(() => {
        let text = convertToPlain(contentHtml).trim()
        setLength(text.length)
    }, [contentHtml])
    const maxLength = 500;
    return (
        <>
            {!isEdit && <Row className="mt-4">
                <Col sm="12">
                    {user && !innerNav && (<>
                        <div css={CreateFeedAvatar}>
                            <img
                                className="avatar"
                                src={user?.avatar_urls?.thumb}
                                alt={`avatar ${user.displayName}`}
                            />
                            {!innerNav && <Input
                                type="text"
                                placeholder="Discussion title"
                                value={discussionTitle}
                                onChange={(e) => {
                                    let str = e.target.value.substring(0, 100)
                                    setDiscussionTitle(str)
                                }} />}
                        </div>
                    </>
                    )}
                    {innerNav && <div css={CreateFeedAvatar}>
                        <div className="reply-text-panel">
                            {/* TODO: userIds[replyTo?.author]?.name causes an error */}
                            <div>Reply to: </div>
                            <div dangerouslySetInnerHTML={{ __html: replyTo.short_content }} />
                        </div>
                    </div>}
                </Col>
            </Row>}
            <Form>
                <FormGroup>
                    <CreateFeedTextarea className="create-feed-panel">
                        <Editor
                            editorState={editorState}
                            toolbarClassName="toolbar-wrapper"
                            wrapperClassName="wrapper-editor"
                            editorClassName="editorClassName"
                            onChange={() => {
                                setContentError(false)
                                setContentHtml(
                                    draftToHtml(convertToRaw(editorState.getCurrentContent()))
                                );
                            }}
                            placeholder={placeholderText}
                            toolbarCustomButtons={[
                                <div className="post-update-toolbar">
                                    {videoPreview && fileData?.length ? (
                                        ""
                                    ) : (
                                        <div className="post-element-panel post-editor-icon">
                                            <img src="/img/editor/camera.png" alt="camera"
                                                onClick={() => diplayUploadCard(false)} />
                                            <div className="tooltip-panel">
                                                Attach a photo <em></em>
                                            </div>
                                        </div>
                                    )}
                                    {showImage && fileData?.length ? (
                                        ""
                                    ) : (
                                        <div className="post-element-panel post-editor-icon">
                                            <img src="/img/editor/video.png" alt="video"
                                                onClick={() => diplayUploadCard(true)} />
                                            <div className="tooltip-panel">
                                                Attach a video <em></em>
                                            </div>
                                        </div>
                                    )}
                                </div>,
                            ]}
                            toolbar={ToolbarStyle}
                            toolbarStyle={{
                                color: 'white',
                                border: "none"
                            }}
                            handleBeforeInput={val => {
                                const textLength = editorState.getCurrentContent().getPlainText().length;
                                if (val && textLength >= maxLength) {
                                    return 'handled';
                                }
                                return 'not-handled';
                            }}
                            handlePastedText={val => {
                                const textLength = editorState.getCurrentContent().getPlainText().length;
                                if ((val.length + textLength) >= maxLength)
                                    alert.error("Pasted text length exceded max limit.", TIMEOUT)
                                return ((val.length + textLength) >= maxLength);
                            }}
                            onEditorStateChange={setEditorState}
                        />
                        {(showImage || videoPreview) && (
                            <div className="upload-image-conatiner profile-upload-container">
                                <section css={DropZoneStyle} className="container">
                                    <div {...getRootProps({ style, className: "dropzone" })}>
                                        <input {...getInputProps()} />

                                        <input
                                            id="browse-button"
                                            type="button"
                                            value={`Select or Drop ${videoPreview ? "videos" : "images"
                                                } here to upload`}
                                            className="btn btn-default"
                                        ></input>
                                    </div>
                                    <aside style={thumbsContainer}>{thumbs}</aside>
                                </section>
                            </div>
                        )}
                        <div className="message-length">
                            <span className="error">{contentError ? "Please add discussion content to post." : ""}</span>
                            <span>{contentLength}/500</span></div>
                    </CreateFeedTextarea>
                </FormGroup>
            </Form>
        </>
    );
};
export default EditorWrapper;
