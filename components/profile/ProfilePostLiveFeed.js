import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Form, FormGroup, Button, Input, Alert } from "reactstrap";
import draftToHtml from "draftjs-to-html";
import Loader from "../../components/loader";
import {
  acceptStyle,
  activeStyle,
  CloseButton,
  DropZoneStyle,
  rejectStyle,
  thumb,
  thumbImg,
  thumbInner,
  thumbsContainer,
} from "../profile-edit/profile-edit.style";
import { CreateFeedTextarea, SubNav } from "../livefeed/livefeed.style";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faVideo } from "@fortawesome/free-solid-svg-icons";
import { postActivity } from "@api/feeds.api";
import { TIMEOUT } from "@utils/constant";
import MediaLibrary from "@components/MediaLibrary/MediaLibrary";
import { useDropzone } from "react-dropzone";
import { useAlert } from "react-alert";
import axios from "axios";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const ProfilePostLiveFeed = ({
  placeholderText,
  activity,
  setApiCall = () => {},
  mutate,
  activities,
  user,
}) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const token = user?.token;
  const alert = useAlert();
  const [videoPreview, setVideoPreview] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [area, setArea] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [mediaType, setMediaType] = useState("image");
  const [msgErrorMediaType, setMsgErrorMediaType] = useState(false);
  const [currentMediaAccept, setCurrentMediaAccept] = useState("");
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [selectFile, setSelectFile] = useState([]);
  const [finalUrl, setFinalUrl] = useState([]);
  const [preview, setPreview] = useState(false);
  const [contentHtml, setContentHtml] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [postLoad, setPostLoad] = useState(false);
  const [linkPreview, setLinkPreview] = useState(false);
  const [title, setTitle] = useState();
  const [linkImage, setLinkImage] = useState();
  const [description, setDescription] = useState();
  const [linkLoader, setLinkLoader] = useState(false);

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
      setSelectFile([...selectFile, ...acceptedFiles]);
      const totalImage = [...selectFile, ...acceptedFiles];
      setFile(totalImage);
      const imageUrl = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFinalUrl([...finalUrl, ...imageUrl]);
      const imageUrls = [...finalUrl, ...imageUrl];
      setFiles(imageUrls);
    },
  });

  const style = useMemo(
    () => ({
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const [previewsUpload, setPreviewsUpload] = useState([]);

  const [imageData, setImageData] = useState([]);

  const emptyStates = () => {
    setPreviewsUpload([]);
    setCurrentMediaAccept("");
    setImageData([]);
    setForm({ privacy: "public" });
    setShowImage(false);
    setFiles([]);
    setFile(null);
    setImageData([]);
    setContentHtml("");
    setShowButton(false);
    setVideoPreview(false);
    setFinalUrl([]);
    setSelectFile([]);
    setEditorState(() => EditorState.createEmpty());
    setLinkPreview(false);
  };

  function displayUploadCard(status, type) {
    if (type === "photo") {
      setMediaType("image");
    }

    if (type === "video") {
      setMediaType("video");
    }

    if (previewsUpload.length === 0) {
      setCurrentMediaAccept(type === "video" ? "video" : "image");
    }

    setShowMedia(true);
  }

  function errorMsg() {
    setPostLoad(false);
    emptyStates();
  }

  const clearMediaData = (media) => {
    const imagesId = imageData.filter((img) => img !== media.id);
    const previewsImg = previewsUpload.filter((img) => img.id !== media.id);
    if (previewsImg.length === 0) {
      setCurrentMediaAccept("");
    }
    setImageData([...imagesId]);
    setPreviewsUpload([...previewsImg]);
  };

  const createActivity = (images) => {
    const formData = { ...form };
    if (!formData.content) formData["content"] = "<div></div>";
    if (images?.length)
      formData[currentMediaAccept === "video" ? "bp_videos" : "bp_media_ids"] =
        images;
    postActivity(user, formData)
      .then(async ({ data }) => {
        setPostLoad(false);
        emptyStates();
        await mutate([data, ...activities], {
          revalidate: false,
        });
      })
      .catch(() => {
        errorMsg();
      });
  };

  const handlerSubmit = (e) => {
    setApiCall(true);
    e.preventDefault();
    if (contentHtml === "<p></p>\n" && !file?.length) {
      alert.error("Please add content to post.", TIMEOUT);
      return;
    }
    setPostLoad(true);
    createActivity(imageData);
  };

  const onCancelFeed = () => {
    setArea(false);
    setForm({
      privacy: "public",
    });
    setShowImage(false);
    setFiles([]);
    setFile(null);
    setImageData([]);
    setFinalUrl([]);
    setSelectFile([]);
    setContentHtml("");
    setEditorState(() => EditorState.createEmpty());
    setLinkPreview(false);
  };

  const [form, setForm] = useState({
    privacy: "public",
  });

  const htmlToDraft =
    typeof window === "object" && require("html-to-draftjs").default;

  const selectMediaManager = (media) => {
    if (
      (currentMediaAccept === "image" && media.mime_type.includes("video")) ||
      (currentMediaAccept === "video" && media.mime_type.includes("image"))
    ) {
      setMsgErrorMediaType(true);
      setTimeout(() => {
        setMsgErrorMediaType(false);
      }, 3000);
      return;
    }
    setImageData([...imageData, media.id]);
    setPreviewsUpload([...previewsUpload, media]);
    setShowButton(true);
  };

  const handlerChange = (value) => {
    setForm({ ...form, privacy: value });
  };

  function getLink() {
    const data = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    ).replace("<p>", "");
    const content = data.replace("</p>", "");
    let urlRegex =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    let url =
      content.match(urlRegex) === null ? "" : content.match(urlRegex)[0];
    content.match(urlRegex) !== null && !linkPreview && getPreviewLink(url);
  }

  function getPreviewLink(childData) {
    setLinkPreview(false);
    setLinkLoader(true);
    axios(process.env.bossApi + `/activity/link-preview?url=${childData}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then((res) => {
        setLinkPreview(true);
        setTitle(res.data.title);
        setLinkImage(
          res.data.images[0] === undefined
            ? ""
            : res.data.images[0].replace(/^https:/, "")
        );
        setDescription(res.data.description);
        setLinkLoader(false);
      })
      .catch(() => {
        setLinkLoader(false);
        setPreview(true);
        setTimeout(() => {
          setPreview(false);
        }, 1500);
      });
  }

  const thumbs = previewsUpload.map((file, i) => (
    <div
      className={"bg-cover"}
      style={{
        ...thumb,
        background: `url(${
          file.media_type === "image" ? file.source_url : ""
        })`,
      }}
      key={file.id}
    >
      <Button
        onClick={() => clearMediaData(file)}
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
        {file.media_type !== "image" && (
          <video style={thumbImg}>
            <source src={file.source_url} />
          </video>
        )}
      </div>
    </div>
  ));

  const previewUpload = thumbs;

  useEffect(
    () => () => {
      files.forEach((filedata) => URL.revokeObjectURL(filedata.preview));
    },
    [files]
  );

  useEffect(() => {
    if (!user) return;
    setForm({
      ...form,
      content: linkPreview
        ? `${contentHtml}<p>${title}</p>\n<p><img alt="preview" src=\"${linkImage}\"/></p>\n<p>${description}</p>`
        : contentHtml,
      user_id: user.id,
      component: "activity",
      type: "activity_update",
    });
  }, [user, contentHtml, linkPreview, title, linkImage, description]);

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
                setApiCall(false);
              }}
              onChange={() => {
                setContentHtml(
                  draftToHtml(convertToRaw(editorState.getCurrentContent()))
                );
                getLink();
                setShowButton(true);
              }}
              placeholder={placeholderText}
              toolbarCustomButtons={[
                <div className="post-update-toolbar ">
                  {videoPreview && file?.length ? null : (
                    <div
                      onClick={() => displayUploadCard(false, "photo")}
                      className="livefeed-border-btn btn btn-borde-bg-negro post-element-panel post-editor-icon"
                    >
                      <span>
                        <FontAwesomeIcon
                          icon={faCamera}
                          className="color-font"
                        />
                      </span>
                      <span className="d-none d-md-flex color-font post-element-panel-item pl-2 font-weight-normal">
                        Upload Photo
                      </span>
                    </div>
                  )}
                  {/*{showImage && file?.length ? null : (*/}
                  {/*  <div*/}
                  {/*    onClick={() => displayUploadCard(true, "video")}*/}
                  {/*    className=" livefeed-border-btn btn btn-borde-bg-negro color-font  post-element-panel post-editor-icon"*/}
                  {/*  >*/}
                  {/*    <span>*/}
                  {/*      <FontAwesomeIcon*/}
                  {/*        icon={faVideo}*/}
                  {/*        className="color-font"*/}
                  {/*      />*/}
                  {/*    </span>*/}
                  {/*    <span className="d-none d-md-flex color-font post-element-panel-item pl-2 font-weight-normal">*/}
                  {/*      Upload Video*/}
                  {/*    </span>*/}
                  {/*  </div>*/}
                  {/*)}*/}
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
                      "demo-option-custom border-0 invert px-1 bg-card-black",
                  },
                  italic: {
                    icon: "/img/italic-solid.svg",
                    className:
                      "demo-option-custom border-0 invert px-1 bg-card-black",
                  },
                  underline: {
                    icon: "/img/underline-solid.svg",
                    className:
                      "demo-option-custom border-0 invert px-1 bg-card-black",
                  },
                },
                emoji: {
                  icon: "/img/smile-regular.svg",
                  className:
                    "demo-option-custom border-0 invert px-1 bg-card-black",
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
          {showButton && (
            <ul className="pb-2 d-none d-md-flex ">
              <li className="w-auto px-3">
                <Input
                  id="privacy"
                  type="select"
                  name="privacy"
                  onChange={(e) => handlerChange(e.target.value)}
                  value={form.privacy}
                >
                  <option value="public">Public</option>
                  <option value="loggedin">All Members</option>
                  <option value="friends">My Connections</option>
                  <option value="onlyme">Only Me</option>
                </Input>
              </li>
            </ul>
          )}
          {showButton && (
            <>
              <Button
                className="btn btn-link ml-auto"
                onClick={() => onCancelFeed()}
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

      {showMedia ? (
        <MediaLibrary
          show={showMedia}
          token={token}
          media_type={mediaType}
          selectMedia={selectMediaManager}
          onHide={() => setShowMedia(false)}
        />
      ) : null}
    </>
  );
};
export default ProfilePostLiveFeed;
