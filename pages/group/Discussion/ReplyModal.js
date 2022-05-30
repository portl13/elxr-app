import React, { useState, useMemo } from "react";
import axios from "axios";
import { EditorState } from "draft-js";
import { Button, Progress, Modal, ModalBody } from "reactstrap";
import { useAlert } from "react-alert";
import { useDropzone } from "react-dropzone";

import { TIMEOUT } from "../../../utils/constant";
import Loader from "../../../components/loader";
import Editor from "./Editor";
import { createNewTopic, uploadContent, postDiscussionReply } from "../../../pages/api/discussion.api";
import {
  CloseButton,
  thumb,
  thumbInner,
  thumbImg,
  activeStyle,
  acceptStyle,
  rejectStyle,
} from "../../../components/profile-edit/profile-edit.style";
import { SubNav } from "../../../components/livefeed/livefeed.style";
import { uploadModal } from "../../../components/profile/photo.style";
import { convertToPlain } from './MergeTopic'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import useIcon from '../../../hooks/useIcon';

function ReplyModal({ user, groupDetails, getForumList, setShowModal, showModal, innerNav,
  replyTo, userIds, getSelTopicsReply, getTopic }) {
  const alert = useAlert()
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [fileData, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [contentHtml, setContentHtml] = useState("<p></p>");
  const [videoPreview, setVideoPreview] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [loader, setLoader] = useState(false);
  const [discussionTitle, setDiscussionTitle] = useState();
  const [contentError, setContentError] = useState(false);

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

  const { iconElement: close } = useIcon(faWindowClose, false, 'sm');
  const style = useMemo(
    () => ({
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  let styleThumb = thumb;
  const thumbs = fileData.map((file, i) => (
    <div style={styleThumb} key={file.name}>
      <Button
        onClick={() => cleanFile(i)}
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
          {progress !== 0 && (
            <Progress max="100" value={progress} color="success" />
          )}
        </div>
        {videoPreview ? (
          <video style={thumbImg}>
            <source src={URL.createObjectURL(file)} type="video/mp4" />
          </video>
        ) : (
          <img src={URL.createObjectURL(file)} style={thumbImg} />
        )}
      </div>
    </div>
  ));

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
    if (!text.length && !text && !fileData.length) {
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
    setLoader(false)
    setFiles([])
    setDiscussionTitle()
    setEditorState(() => EditorState.createEmpty());
  }

  const createDiscussionTopic = (fileIds) => {
    const formData = {
      title: discussionTitle,
      content: contentHtml,
      parent: groupDetails.forum
    }
    if (fileIds.length)
      formData[videoPreview ? "bbp_videos" : "bbp_media"] = fileIds;
    createNewTopic(user, formData).then(() => {
      getForumList()
      emptyState()
    }).catch(() => { setLoader(false) })
  }

  const createTopicReply = (fileIds) => {
    const formData = {
      topic_id: innerNav,
      content: contentHtml,
      reply_to: replyTo.id,
      forum_id: replyTo.forum_id
    }
    if (fileIds.length)
      formData[videoPreview ? "bbp_videos" : "bbp_media"] = fileIds;
    postDiscussionReply(user, formData).then(() => {
      getSelTopicsReply()
      getTopic()
      emptyState()
    }).catch(() => { setLoader(false) })
  }

  const callPostFunction = (upload_id) => {
    if (innerNav)
      createTopicReply(upload_id)
    else
      createDiscussionTopic(upload_id)
  }

  const postActivity = () => {
    if (checkError()) {
      setLoader(true)
      if (fileData.length)
        uploadContent(user, fileData, videoPreview, setProgress).then(
          axios.spread((...args) => {
            let upload_id = args.map((e) => e.data.upload_id);
            callPostFunction(upload_id)
          })
        ).catch(() => setLoader(false))
      else callPostFunction([])
    }
  }
  return (
    <>
      <Modal className="modal-dialog-centered discussion-modal" isOpen={showModal} css={uploadModal}>
        <ModalBody className="text-center edit-feed-modal edit-feed-panel">
          <div className="d-flex flex-column flex-fill ">
            <Editor
              user={user}
              setDiscussionTitle={setDiscussionTitle}
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
              replyTo={replyTo}
              userIds={userIds}
              contentHtml={contentHtml}
              discussionTitle={discussionTitle}
              setContentError={setContentError}
              contentError={contentError}
            />
            <SubNav className="mt-2">
              <ul className="pb-2"></ul>
              <Button className="btn btn-link ml-auto" onClick={emptyState}>{" "}Cancel</Button>
              <Button className="btn btn-primary"
                onClick={() => postActivity()}>
                Post {loader ? <Loader /> : ""}
              </Button>
            </SubNav>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ReplyModal;
