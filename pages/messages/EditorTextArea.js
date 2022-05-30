import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { convertToRaw } from 'draft-js';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { Button, Progress } from "reactstrap";
import draftToHtml from 'draftjs-to-html';

import { CloseButton, thumb, thumbInner, thumbImg, activeStyle, acceptStyle, rejectStyle, DropZoneStyle, thumbsContainer, } from '../../components/profile-edit/profile-edit.style';
import { CreateFeedTextarea } from "../../components/livefeed/livefeed.style";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const Editor = dynamic(() => import("react-draft-wysiwyg").then(mod => mod.Editor), { ssr: false });

const EditorTextArea = ({
    editorState,
    setMsgtext,
    images,
    progress,
    setEditorState,
    setImages,
    uploadView,
    setUploadView,
    setProgress
}) => {
    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        accept: 'image/*',
        maxFiles: 0,
        multiple: true,
        onDrop: acceptedFiles => {
            setImages(acceptedFiles?.map(filedata => Object.assign(filedata, {
                preview: URL.createObjectURL(filedata)
            })))
            setProgress(0)
        }
    });

    const style = useMemo(() => ({
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    let styleThumb = thumb;
    const removeImage = (i) => {

    }
    const thumbs = images?.map((e, i) => (
        <div style={styleThumb} key={e.name}>
            <Button
                onClick={() => removeImage(i)}
                css={CloseButton}
                className="btn-icon btn-2"
                color="primary"
                type="button">
                <span className="btn-inner--icon">
                    <i>{close}</i>
                </span>
            </Button>
            <div
                style={thumbInner}
            >
                <div className='loading-container'>
                    {progress !== 0 && <Progress max="100" value={progress} color="success" />}
                </div>
                <img
                    src={e.preview}
                    style={thumbImg}
                />
            </div>
        </div>
    ));

    return (
        <CreateFeedTextarea className="create-feed-panel remove-border">
            <Editor
                editorState={editorState}
                toolbarClassName="toolbar-wrapper"
                wrapperClassName="wrapper-editor"
                editorClassName="editorClassName"
                // onFocus={() => }
                onChange={() => setMsgtext(draftToHtml(convertToRaw(editorState.getCurrentContent())))}
                placeholder="Type Message"
                // toolbarCustomButtons={[
                //     <div className="post-update-toolbar">
                //         <div className="post-element-panel">
                //             <FontAwesomeIcon icon={faCamera} onClick={() => setUploadView(true)} />
                //             <div className="tooltip-panel">Attach a photo <em></em></div>
                //         </div>
                //     </div>
                // ]}
                toolbar={{
                    options: ['inline', 'list', 'blockType', 'emoji'],
                    inline: {
                        inDropdown: false,
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                        options: ['bold', 'italic'],
                        bold: { icon: '/img/editor/bold.png', className: "demo-option-custom" },
                        italic: { icon: '/img/editor/italic.png', className: "demo-option-custom" },
                        color: 'white'
                    },
                    blockType: {
                        inDropdown: false,
                        options: ['Blockquote'],
                        blockquote: { icon: '/img/editor/quotes.png', className: "demo-option-custom" },
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                    },
                    list: {
                        inDropdown: false,
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                        options: ['unordered', 'ordered'],
                        unordered: { icon: '/img/editor/bullets.png', className: "demo-option-custom" },
                        ordered: { icon: '/img/editor/numbered.png', className: "demo-option-custom" },
                        color: 'white'
                    },
                    emoji: {
                        icon: '/img/editor/emoji.png',
                        className: 'demo-option-custom',
                    }
                }}
                toolbarStyle={{
                    color: 'white',
                    border: "none"
                }}
                onEditorStateChange={setEditorState}
            />
            {uploadView ?
                <div className="upload-image-conatiner profile-upload-container">
                    <section css={DropZoneStyle} className="container">
                        <div {...getRootProps({ style, className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <input id="browse-button" type="button" value="Select or Drop images here to upload" className="btn btn-default"></input>
                        </div>
                        <aside style={thumbsContainer}>
                            {thumbs}
                        </aside>
                    </section>
                </div>
                : null}
        </CreateFeedTextarea>
    );
};

export default EditorTextArea;
