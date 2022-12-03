import React, { useState, useEffect, useMemo, useContext } from "react";
import { v4 as uuidv5 } from "uuid";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { EditorState } from "draft-js";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { useAlert } from "react-alert";
import LiveFeedCard from "../../components/livefeed/LiveFeedCard";
import { PROFILE_TAB_NAME, TIMEOUT } from "../../utils/constant";
import InfiniteList from "../../components/infiniteList/InfiniteList";
import PostLiveFeed from "../../components/postLiveFeed";
import { getGroupFeeds, postActivity, deleteActivity } from "../api/feeds.api";
import { searchField } from "../../components/livefeed/livefeed.style";
import {
  CloseButton,
  thumb,
  thumbInner,
  thumbImg,
  activeStyle,
  acceptStyle,
  rejectStyle,
} from "../../components/profile-edit/profile-edit.style";
import MediaLibrary from "@components/MediaLibrary/MediaLibrary";
import { UserContext } from "@context/UserContext";

function feedWrapper({ user, id, tab, groupDetails }) {
  const { user: currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const [loader, setLoader] = useState(true);
  const [result, setResult] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [contentHtml, setContentHtml] = useState("");
  const [empty, setEmpty] = useState(false);
  const [page, setPage] = useState(1);
  const [postLoad, setPostLoad] = useState(false);
  const [apiCall, setApiCall] = useState(true);
  const [videoPreview, setVideoPreview] = useState(false);
  const [linkPreview, setLinkPreview] = useState(false);
  const [title, setTitle] = useState();
  const [linkImage, setLinkImage] = useState();
  const [description, setDescription] = useState();
  const [linkLoader, setLinkLoader] = useState(false);
  const [preview, setPreview] = useState(false);
  const [selectFile, setSelectFile] = useState([]);
  const [finalUrl, setFinalUrl] = useState([]);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const alert = useAlert();

  const [showMedia, setShowMedia] = useState(false);
  const [mediaType, setMediaType] = useState("image");
  const [previewsUpload, setPreviewsUpload] = useState([]);
  const [msgErrorMediaType, setMsgErrorMediaType] = useState(false);
  const [currentMediaAccept, setCurrentMediaAccept] = useState("");

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
      setProgress(0);
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

  useEffect(() => {
    if (id && tab === "feeds") {
      setLoader(true);
      getActivity("groups");
    }
  }, [id, tab]);

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

  const getActivity = (
    scopeName,
    pages = 1,
    searchVal = "",
    isEmpty = false
  ) => {
    const formData = {
      per_page: 20,
      page: pages,
      scope: PROFILE_TAB_NAME[scopeName],
      group_id: id,
      privacy: "public, loggedin, onlyme, friends, media",
    };
    if (searchVal) formData["search"] = searchVal;
    getGroupFeeds(user, formData)
      .then((res) => {
        const list = [...result];
        const memList = isEmpty ? [] : list;
        const groupFeed = [...memList, ...res.data];
        setResult(groupFeed);
        const allTotal = Number(res.headers["x-wp-total"]);
        const total = allTotal ? allTotal : 0;
        setLoader(groupFeed.length !== total);
      })
      .catch(() => {
        setEmpty(empty);
        setLoader(false);
      });
  };

  function diplayUploadCard(status, isArea, type) {
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

  const loadMore = () => {
    if (result.length && loader) {
      setPage(page + 1);
      getActivity("personal", page + 1);
    }
  };

  function errorMsg() {
    setLoader(false);
    setPostLoad(false);
    emptyStates();
  }

  const createActivity = (images) => {
    const formData = {
      privacy: "public",
      component: "groups",
      type: "activity_update",
      user_id: user.id,
      primary_item_id: id,
      content: linkPreview
        ? `${contentHtml}<p>${title}</p>\n<p><img src=\"${linkImage}\"/></p>\n<p>${description}</p>`
        : contentHtml,
    };
    if (!formData.content) formData["content"] = "<div>\n</div>";
    if (images?.length)
      formData[currentMediaAccept === "video" ? "bp_videos" : "bp_media_ids"] =
        images;
    postActivity(user, formData)
      .then((res) => {
        const data = [...result];
        data.unshift(res.data);
        setResult(data);
        setLoader(false);
        setPostLoad(false);
        emptyStates();
      })
      .catch(() => {
        errorMsg();
      });
  };

  const emptyStates = () => {
    setPreviewsUpload([]);
    setCurrentMediaAccept("");
    setImageData([]);
    setShowImage(false);
    setFiles([]);
    setFile(null);
    setImageData([]);
    setProgress(0);
    setContentHtml();
    setShowButton(false);
    setVideoPreview(false);
    setEditorState(() => EditorState.createEmpty());
    setLinkPreview(false);
    setFinalUrl([]);
    setSelectFile([]);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    setApiCall(true);
    if (contentHtml === "<p></p>\n" && !file?.length) {
      alert.error("Please add content to post.", TIMEOUT);
      return;
    }
    setPostLoad(true);
    createActivity(imageData);
  };

  const handleDelete = (actId) => {
    deleteActivity(user, actId)
      .then((res) => {
        let data = [...result];
        data = data.filter((item) => item.id !== actId);
        setResult(data);
      })
      .catch(() => {});
  };

  let styleThumb = thumb;

  const thumbs = previewsUpload.map((file, i) => (
    <div
      className={"bg-cover"}
      style={{
        ...styleThumb,
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

  const clearMediaData = (media) => {
    const imagesId = imageData.filter((img) => img !== media.id);
    const previewsImg = previewsUpload.filter((img) => img.id !== media.id);
    if (previewsImg.length === 0) {
      setCurrentMediaAccept("");
    }
    setImageData([...imagesId]);
    setPreviewsUpload([...previewsImg]);
  };
  
  return (
    <>
      {groupDetails?.is_member && groupDetails?.can_post && (
        <>
          {showMedia ? (
            <MediaLibrary
              show={showMedia}
              token={token}
              media_type={mediaType}
              selectMedia={selectMediaManager}
              onHide={() => setShowMedia(false)}
            />
          ) : null}
          <PostLiveFeed
            editorState={editorState}
            setContentHtml={setContentHtml}
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            thumbs={thumbs}
            file={file}
            progress={progress}
            setEditorState={setEditorState}
            showImage={showImage}
            diplayUploadCard={diplayUploadCard}
            setEmpty={setEmpty}
            setArea={setShowButton}
            style={style}
            user={user}
            placeholderText={"Share something with this group..."}
            emptyStates={emptyStates}
            handlerSubmit={handlerSubmit}
            area={showButton}
            showButton={showButton}
            postLoad={postLoad}
            isFeedWrapper={true}
            setApiCall={setApiCall}
            videoPreview={videoPreview}
            setVideoPreview={setVideoPreview}
            linkPreview={linkPreview}
            title={title}
            linkImage={linkImage}
            description={description}
            getPreviewLink={getPreviewLink}
            linkLoader={linkLoader}
            preview={preview}
            previewUpload={thumbs}
            msgErrorMediaType={msgErrorMediaType}
          />
        </>
      )}

      {groupDetails?.is_member ? (
        <InfiniteList
          loaderState={loader}
          loadMore={loadMore}
          loading={loader}
          data={result}
          noText={"Feeds"}
        >
          {result.length
            ? result.map((act) => (
                <LiveFeedCard
                  key={`${act.id}-${uuidv5()}`}
                  activity={act}
                  parentCallback={handleDelete}
                  activityList={result}
                  setActivityList={setResult}
                  isFeedWrapper={true}
                />
              ))
            : ""}
        </InfiniteList>
      ) : (
          <p
              className={"border-white mt-4 border-radius-17 text-center"}
          >
            no more content to show
          </p>
      )}
    </>
  );
}
export default feedWrapper;
