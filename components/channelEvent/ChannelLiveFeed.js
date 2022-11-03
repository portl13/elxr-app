import React, { useState, useEffect, useContext, useMemo } from "react";
import InfinitScroll from "react-infinite-scroll-component";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Spinner, Col, Button } from "reactstrap";
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

export default function ChannelLiveFeed(props) {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const { user_id, title = "Latest Activity" } = props;

  const [loader, setLoader] = useState(true);
  const [initialData, setInitialData] = useState(true);
  const [result, setResult] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const [size, setSize] = useState(1);

  const [preview, setPreview] = useState(false);
  const [description, setDescription] = useState();
  const [linkLoader, setLinkLoader] = useState(false);
  const [area, setArea] = useState(false);
  const [files, setFiles] = useState([]);
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

  async function getActivity(user_id, page = 1) {
    await axios(process.env.bossApi + "/activity/", {
      method: "GET",
      //   headers: {
      //     Authorization: `Bearer ${user?.token}`,
      //   },
      params: {
        per_page: 20,
        page: page,
        scope: "just-me",
        user_id: user_id,
      },
    }).then((res) => {
      setInitialData(true);
      setResult((data) => [...result, ...res.data]);
      setLoadData(false);
      if (res.data.length === 0) {
        setLoader(false);
      } else {
        setLoader(true);
      }
    });
  }

  const loadMore = async () => {
    setSize(size + 1);
    await getActivity(null, size + 1);
  };

  const handleDelete = (childData) => {
    const actId = childData;
  };

  useEffect(() => {
    if (user_id) {
      getActivity(user_id).then();
    }
  }, [user_id]);

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

  const createActivity = (images) => {
    const formData = { ...form };
    if (!formData.content) formData["content"] = "<div></div>";
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

  const handlerSubmit = (e) => {
    setApiCall(true);
    e.preventDefault();
    if (contentHtml === "<p></p>\n" && !file?.length) {
      alert.error("Please add content to post.", TIMEOUT);
      return;
    }
    setLoader(true);
    setPostLoad(true);
    createActivity(imageData);
  };

  const emptyStates = () => {
    setPreviewsUpload([]);
    setCurrentMediaAccept("");
    setImageData([]);
    setForm({ privacy: "public" });
    setShowImage(false);
    setFiles([]);
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
            <MediaLibrary
              show={showMedia}
              token={token}
              media_type={mediaType}
              selectMedia={selectMediaManager}
              onHide={() => setShowMedia(false)}
            />
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
      {loadData === true ? (
        <p css={LoaderContainer}>
          <span>
            <FontAwesomeIcon icon={faClock} />
          </span>
          Loading your updates. Please wait.
        </p>
      ) : null}
      {!loadData ? (
        <div className="d-flex flex-column flex-fill w-100">
          <InfinitScroll
            dataLength={result.length}
            next={() => loadMore()}
            hasMore={true}
            loader={
              loader ? (
                <LoadingBtn>
                  Loading ...{" "}
                  <Spinner
                    style={{ width: "1.2rem", height: "1.2rem" }}
                    color="primary"
                  />
                </LoadingBtn>
              ) : null
            }
          >
            {result.length
              ? result.map((act) => (
                  <LiveFeedCard
                    key={`${act.id}-${uuidv5()}`}
                    activity={act}
                    parentCallback={handleDelete}
                    activityList={result}
                    setActivityList={setResult}
                  />
                ))
              : ""}

            {result && !result.length && (
              <p style={{ textAlign: "center" }}>No More Data</p>
            )}
          </InfinitScroll>
        </div>
      ) : null}
    </div>
  );
}
