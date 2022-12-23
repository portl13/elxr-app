import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Form, FormGroup, Button, Input, Alert } from "reactstrap";
import draftToHtml from "draftjs-to-html";
import Loader from "../../components/loader";
import {
  DropZoneStyle,
  thumbsContainer,
} from "../profile-edit/profile-edit.style";
import {
  CreateFeedTextarea,
  SubNav,
} from "../livefeed/livefeed.style";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const PostLiveFeed = ({
  editorState,
  setContentHtml,
  getRootProps,
  getInputProps,
  thumbs,
  file,
  progress,
  setEditorState,
  showImage,
  diplayUploadCard,
  setEmpty,
  setArea,
  style,
  user,
  placeholderText,
  emptyStates,
  handlerSubmit,
  showButton,
  isLiveFeed,
  activity,
  postLoad,
  group,
  isFeedWrapper,
  setGroup,
  setApiCall,
  pathname,
  linkPreview,
  title,
  linkImage,
  description,
  getPreviewLink,
  linkLoader,
  preview,
  videoPreview,
  area,
  previewUpload,
  msgErrorMediaType = false,
}) => {
  const htmlToDraft =
    typeof window === "object" && require("html-to-draftjs").default;
  useEffect(() => {
    if (pathname) {
      let urlPath = `${window.location.origin}${pathname}`;
      const contentBlock = htmlToDraft(`<a href=${urlPath}>${urlPath}</a>`);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      setContentHtml(`${urlPath}`);
      const editorStateVal = EditorState.createWithContent(contentState);
      setEditorState(editorStateVal);
      setArea(true);
      setEmpty(false);
      setApiCall(false);
    }
  }, [pathname]);
  useEffect(() => {
    if (activity?.content && activity?.content.rendered) {
      const contentBlock = htmlToDraft(activity.content.rendered);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorStateVal = EditorState.createWithContent(contentState);
      setEditorState(editorStateVal);
    }
  }, [activity]);
  function getLink() {
    const data = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    ).replace("<p>", "");
    const content = data.replace("</p>", "");
    var urlRegex =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    var url =
      content.match(urlRegex) === null ? "" : content.match(urlRegex)[0];
    content.match(urlRegex) !== null && !linkPreview && getPreviewLink(url);
  }
  return (
    <>
      <Form>
        <FormGroup>
          <CreateFeedTextarea className="card-bg-light-black create-feed-panel border-0">
            <Editor
              editorState={editorState}
              toolbarClassName="toolbar-wrapper px-0 px-md-1 bg-card-black"
              wrapperClassName="wrapper-editor  bg-card-black"
              editorClassName="editorClassName bg-card-black"
              onFocus={() => {
                setArea(true);
                setEmpty(false);
                setApiCall(false);
              }}
              onChange={() => {
                setContentHtml(
                  draftToHtml(convertToRaw(editorState.getCurrentContent()))
                );
                getLink();
              }}
              placeholder={placeholderText}
              toolbarCustomButtons={[
                <div className="post-update-toolbar ">
                  {videoPreview && file?.length ? (
                    ""
                  ) : (
                    <div
                      onClick={() => diplayUploadCard(false, area, "photo")}
                      className="d-flex btn btn-borde-bg-negro post-element-panel post-editor-icon"
                    >
                      <img src="/img/editor/camera.png" alt="camera" />
                      <span className="d-none d-md-flex post-element-panel-item pl-2 font-weight-normal">
                        Upload Photo
                      </span>
                    </div>
                  )}
                  {showImage && file?.length ? (
                    ""
                  ) : (
                    <div
                      onClick={() => diplayUploadCard(true, area, "video")}
                      className=" d-flex btn btn-borde-bg-negro post-element-panel post-editor-icon"
                    >
                      <img src="/img/editor/video.png" alt="video" />
                      <span className="d-none d-md-flex  post-element-panel-item pl-2 font-weight-normal">
                        Upload Video
                      </span>
                    </div>
                  )}
                </div>,
              ]}
              toolbar={{
                options: ["inline", "emoji"],
                inline: {
                  inDropdown: false,
                  options: ["bold", "italic", "underline"],
                  bold: {
                    icon: "/img/bold-solid.svg",
                    className:
                      "demo-option-custom border-0 prueba px-1 bg-card-black",
                  },
                  italic: {
                    icon: "/img/italic-solid.svg",
                    className:
                      "demo-option-custom border-0 prueba px-1 bg-card-black",
                  },
                  underline: {
                    icon: "/img/icons/underline.svg",
                    className:
                      "demo-option-custom border-0  px-1 bg-card-black",
                  },
                },
                emoji: {
                  icon: "/img/editor/emoji.png",
                  className: "demo-option-custom border-0  px-1 bg-card-black",
                },
              }}
              toolbarStyle={{
                color: "white",
                border: "none",
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
                      value={`Select or Drop ${
                        videoPreview ? "videos" : "images"
                      } here to upload`}
                      className="btn btn-default"
                    ></input>
                  </div>
                  <aside style={thumbsContainer}>{thumbs}</aside>
                </section>
              </div>
            )}
            {msgErrorMediaType && (
              <span className={"text-danger d-block py-2"}>
                To change the media type, remove existing media from your post.
              </span>
            )}
            {previewUpload && (
              <div className="upload-image-conatiner profile-upload-container">
                <section css={DropZoneStyle} className="container">
                  <aside style={thumbsContainer}>{previewUpload}</aside>
                </section>
              </div>
            )}
            {linkLoader && (
              <span className="preview-tag">
                Loading Link Preview..
                <Loader />
              </span>
            )}
            {preview && (
              <Alert color="warning" className="alert-tag">
                No Preview Available.
              </Alert>
            )}
            {linkPreview && (
              <>
                <h4>{title}</h4>
                <img src={linkImage} />
                <span
                  className="description-text"
                  dangerouslySetInnerHTML={{ __html: description }}
                ></span>
              </>
            )}
          </CreateFeedTextarea>
        </FormGroup>
        <SubNav className="mt-2">
          {showButton && !isFeedWrapper && !isLiveFeed && (
            <ul className="pb-2 d-none d-md-flex ">
              <li className="w-auto px-3">
                <Input
                  id="privacy"
                  type="select"
                  name="privacy"
                  onChange={(e) => setGroup(e.target.value)}
                  value={group}
                >
                  <option value="public">Public</option>
                  <option value="loggedin">All Members</option>
                  <option value="friends">My Connections</option>
                  <option value="onlyme">Only Me</option>
                </Input>
              </li>
            </ul>
          )}
          {showButton && !isLiveFeed && (
            <>
              <Button
                className="btn btn-link ml-auto"
                onClick={() => emptyStates()}
              >
                Cancel
              </Button>
              <Button
                className="btn btn-primary"
                onClick={(e) => handlerSubmit(e)}
              >
                Post Activity
                {postLoad ? <Loader /> : ""}
              </Button>
            </>
          )}
        </SubNav>
      </Form>
    </>
  );
};
export default PostLiveFeed;
