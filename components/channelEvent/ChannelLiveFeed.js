import React, { useState, useEffect, useContext, useMemo } from "react";
import { useRouter } from "next/router";
import InfinitScroll from "react-infinite-scroll-component";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner, Button } from "reactstrap";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { LoaderContainer, LoadingBtn } from "../livefeed/livefeed.style";
import LiveFeedCard from "../livefeed/LiveFeedCard";
import { v4 as uuidv5 } from "uuid";
import { UserContext } from "@context/UserContext";
import PostLiveFeed from "@components/postLiveFeed";
import { EditorState } from "draft-js";
import { useDropzone } from "react-dropzone";
import {
  acceptStyle,
  activeStyle,
  CloseButton,
  rejectStyle,
  thumb,
  thumbImg,
  thumbInner,
} from "@components/profile-edit/profile-edit.style";
import MediaLibrary from "@components/MediaLibrary/MediaLibrary";
import { TIMEOUT } from "@utils/constant";
import { postActivity } from "@api/feeds.api";
import useSWRInfinite from "swr/infinite";
import { genericFetch } from "@request/creator";

const PAGE_SIZE = 20;

export default function ChannelLiveFeed(props) {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const { user_id, title = "Latest Activity" } = props;

  const router = useRouter();
  const { id: creatorId } = router.query;
  const authUserId = user?.id || 0;

  const [loader, setLoader] = useState(true);
  const [result, setResult] = useState([]);

  const [preview, setPreview] = useState(false);
  const [description, setDescription] = useState();
  const [linkLoader, setLinkLoader] = useState(false);
  const [file, setFile] = useState(null);
  const [msgErrorMediaType, setMsgErrorMediaType] = useState(false);
  const [currentMediaAccept, setCurrentMediaAccept] = useState("");
  const [showMedia, setShowMedia] = useState(false);
  const [mediaType, setMediaType] = useState("image");
  const [previewsUpload, setPreviewsUpload] = useState([]);
  const [videoPreview, setVideoPreview] = useState(false);
  const [contentHtml, setContentHtml] = useState();
  const [selectFile, setSelectFile] = useState([]);
  const [finalUrl, setFinalUrl] = useState([]);
  const [apiCall, setApiCall] = useState(true);
  const [form, setForm] = useState({
    privacy: "public",
  });
  const [linkPreview, setLinkPreview] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [postLoad, setPostLoad] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [linkImage, setLinkImage] = useState();

  const { data, error, size, setSize, mutate } = useSWRInfinite(
    (index) =>
      `${process.env.bossApi}/activity?per_page=${PAGE_SIZE}&page=${
        index + 1
      }&scope=just-me&user_id=${user_id}`,
    genericFetch
  );

  const activities = data ? [].concat(...data) : [];

  const isLoadingInitialData = !data && !error;
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  const loadMore = async () => {
    await setSize(size + 1);
  };

  const handleDelete = async (childData) => {
    const actId = childData;
    await axios.delete(process.env.bossApi + `/activity/${actId}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    const data = activities.filter((item) => item.id !== actId);
    await mutate(data, {
      revalidate: false,
    });
  };

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
      setProgress(0);
    },
  });

  const clearMediaData = (media) => {
    const imagesId = imageData.filter((img) => img !== media.id);
    const previewsImg = previewsUpload.filter((img) => img.id !== media.id);
    if (previewsImg.length === 0) {
      setCurrentMediaAccept("");
    }
    setImageData([...imagesId]);
    setPreviewsUpload([...previewsImg]);
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

  const handlerChange = (value) => {
    setForm({ ...form, privacy: value });
  };

  function errorMsg() {
    setLoader(false);
    setPostLoad(false);
    emptyStates();
  }

  const createActivity = async (images) => {
    const formData = { ...form };
    if (!formData.content) formData["content"] = "<div></div>";
    if (images?.length)
      formData[currentMediaAccept === "video" ? "bp_videos" : "bp_media_ids"] =
        images;
    try {
      const { data } = await postActivity(user, formData);
      setLoader(false);
      setPostLoad(false);
      emptyStates();
      await mutate([data,...activities], {
        revalidate: false,
      });
    } catch (e) {
      errorMsg();
    } finally {
    }
  };

  const handlerSubmit =  async (e) => {
    setApiCall(true);
    e.preventDefault();
    if (contentHtml === "<p></p>\n" && !file?.length) {
      alert.error("Please add content to post.", TIMEOUT);
      return;
    }
    setLoader(true);
    setPostLoad(true);
    await createActivity(imageData);
  };

  const emptyStates = () => {
    setPreviewsUpload([]);
    setCurrentMediaAccept("");
    setImageData([]);
    setForm({ privacy: "public" });
    setShowImage(false);
    setFile(null);
    setImageData([]);
    setProgress(0);
    setContentHtml();
    setShowButton(false);
    setVideoPreview(false);
    setFinalUrl([]);
    setSelectFile([]);
    setEditorState(() => EditorState.createEmpty());
    setLinkPreview(false);
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

  const onCancelFeed = () => {
    setForm({
      privacy: "public",
    });
    setShowImage(false);
    setFile(null);
    setImageData([]);
    setFinalUrl([]);
    setSelectFile([]);
    setProgress(0);
    setContentHtml("");
    setEditorState(() => EditorState.createEmpty());
    setLinkPreview(false);
  };

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

  useEffect(() => {
    if (!user) return;
    setForm({
      ...form,
      content: linkPreview
        ? `${contentHtml}<p>${title}</p>\n<p><img src=\"${linkImage}\"/></p>\n<p>${description}</p>`
        : contentHtml,
      user_id: user.id,
      component: "activity",
      type: "activity_update",
    });
  }, [user, contentHtml, linkPreview, title, linkImage, description]);
  

  return (
    <div>
      <h3 className="mt-5 mb-4 section-main-title">{title}</h3>

      <div>
        {Number(user?.id) === Number(user_id) && (
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
              placeholderText={"Write here or use @ to mention someone."}
              emptyStates={onCancelFeed}
              handlerSubmit={handlerSubmit}
              showButton={showButton}
              postLoad={postLoad}
              setGroup={handlerChange}
              group={form.privacy}
              //area={area}
              setApiCall={setApiCall}
              linkPreview={linkPreview}
              title={title}
              linkImage={linkImage}
              description={description}
              getPreviewLink={getPreviewLink}
              linkLoader={linkLoader}
              area={showButton}
              preview={preview}
              videoPreview={videoPreview}
              setVideoPreview={setVideoPreview}
              previewUpload={thumbs}
              msgErrorMediaType={msgErrorMediaType}
            />
          </>
        )}
      </div>

      {isLoadingInitialData ? (
        <p css={LoaderContainer}>
          <span>
            <FontAwesomeIcon icon={faClock} />
          </span>
          Loading your updates. Please wait.
        </p>
      ) : null}

      {!isLoadingInitialData ? (
        <div className="d-flex flex-column flex-fill w-100">
          <InfinitScroll
            dataLength={activities.length}
            next={() => loadMore()}
            hasMore={!isReachingEnd}
            loader={
              <LoadingBtn>
                Loading ...{" "}
                <Spinner
                  style={{ width: "1.2rem", height: "1.2rem" }}
                  color="primary"
                />
              </LoadingBtn>
            }
          >
            {activities &&
              activities?.map((act) => (
                <LiveFeedCard
                  key={`${act.id}`}
                  activity={act}
                  parentCallback={handleDelete}
                  activityList={result}
                  setActivityList={setResult}
                  isAuthor={
                    parseInt(creatorId, 10) === parseInt(authUserId, 10)
                  }
                  apiCall={apiCall}
                />
              ))}

            {isEmpty ? (
              <p style={{ textAlign: "center" }}>
                This Creator has not made any publications yet.
              </p>
            ) : null}

            {isReachingEnd && !isEmpty ? (
              <LoadingBtn
                style={{ width: "100%", textAlign: "center", color: "#fff" }}
              >
                There are no more publications available.
              </LoadingBtn>
            ) : null}
          </InfinitScroll>
        </div>
      ) : null}
    </div>
  );
}
