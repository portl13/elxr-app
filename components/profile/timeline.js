import React, { useState, useEffect, useMemo, useContext } from "react";
import axios from "axios";
import { EditorState } from "draft-js";
import { useAlert } from "react-alert";
import { Button, Spinner, Progress } from "reactstrap";
import LiveFeedCard from "../livefeed/LiveFeedCard";
import { SubNav } from "../livefeed/livefeed.style";
import { v4 as uuidv5 } from "uuid";
import InfinitScroll from "react-infinite-scroll-component";
import {
  LoaderContainer,
  LoadingBtn,
} from "@components/livefeed/livefeed.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { postActivity } from "@api/feeds.api";
import Router from "next/router";
import { useDropzone } from "react-dropzone";
import useIcon from "../../hooks/useIcon";
import { faWindowClose, faClock } from "@fortawesome/free-solid-svg-icons";
import {
  CloseButton,
  thumb,
  thumbInner,
  thumbImg,
  activeStyle,
  acceptStyle,
  rejectStyle,
} from "@components/profile-edit/profile-edit.style";
import { PROFILE_TAB_NAME, TIMEOUT } from "@utils/constant";
import PostLiveFeed from "../../components/postLiveFeed";
import MediaLibrary from "@components/MediaLibrary/MediaLibrary";
import { UserContext } from "@context/UserContext";

function TimeLine({
  user,
  tab,
  queryParam,
  curntUserId,
  isCurntUser,
  functionRedirect,
}) {
  const alert = useAlert();
  const { user: currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const [loader, setLoader] = useState(true);
  const [initialData, setInitialData] = useState(true);
  const [result, setResult] = useState([]);
  const [scope, setScope] = useState(null);
  const [area, setArea] = useState(false);
  const [size, setSize] = useState(1);
  const [loadData, setLoadData] = useState(true);
  const [contentHtml, setContentHtml] = useState();
  const [empty, setEmpty] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [showMedia, setShowMedia] = useState(false);
  const [mediaType, setMediaType] = useState("image");
  const [previewsUpload, setPreviewsUpload] = useState([]);
  const [msgErrorMediaType, setMsgErrorMediaType] = useState(false);
  const [currentMediaAccept, setCurrentMediaAccept] = useState("");

  const [showButton, setShowButton] = useState(false);
  const [apiCall, setApiCall] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageData, setImageData] = useState([]);
  const [postLoad, setPostLoad] = useState(false);
  const [linkPreview, setLinkPreview] = useState(false);
  const [title, setTitle] = useState();
  const [linkImage, setLinkImage] = useState();
  const [description, setDescription] = useState();
  const [linkLoader, setLinkLoader] = useState(false);
  const [preview, setPreview] = useState(false);
  const [videoPreview, setVideoPreview] = useState(false);
  const [selectFile, setSelectFile] = useState([]);
  const [finalUrl, setFinalUrl] = useState([]);
  const [form, setForm] = useState({
    privacy: "public",
  });
  const baseApi = process.env.bossApi;
  useEffect(() => {
    if (tab === "timeline") {
      setScope(queryParam);
      getActivity(queryParam);
    }
  }, [tab, curntUserId]);
  useEffect(() => {
    if (scope && tab === "timeline")
      Router.push(
        functionRedirect(curntUserId.name, curntUserId.id, "timeline", scope)
      );
  }, [scope]);

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
  async function getActivity(scopeName, page = 1) {
    await axios(process.env.bossApi + "/activity/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      params: {
        per_page: 20,
        page: page,
        scope: PROFILE_TAB_NAME[scopeName],
        user_id: curntUserId.id,
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
  const handlerChange = (value) => {
    setForm({ ...form, privacy: value });
  };
  const { iconElement: close } = useIcon(faWindowClose, false, "sm");
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

  useEffect(
    () => () => {
      files.forEach((filedata) => URL.revokeObjectURL(filedata.preview));
    },
    [files]
  );

  const style = useMemo(
    () => ({
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );
  function errorMsg() {
    setLoader(false);
    setPostLoad(false);
    emptyStates();
  }
  const sendFiles = () => {
    const newList = file.map((filedata, key) => {
      const body = new FormData();
      body.append("file", filedata, filedata.name);
      const imageUrl = `${baseApi}/media/upload`;
      const videoUrl = `${baseApi}/video/upload`;
      return axios.post(videoPreview ? videoUrl : imageUrl, body, {
        headers: { Authorization: `Bearer ${user.token}` },
        onUploadProgress: function (progressEvent) {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor((loaded * 100) / total);
          setProgress(percentage);
        },
      });
    });
    axios
      .all(newList)
      .then(
        axios.spread((...args) => {
          let upload_id = args.map((e) => e.data.upload_id);
          setImageData((data) => [...data, ...upload_id]);
        })
      )
      .catch(() => {
        setLoader(false);
        setPostLoad(false);
        emptyStates();
      });
  };

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

  // useEffect(() => {
  //   if (imageData?.length === file?.length) {
  //     createActivity(imageData);
  //   }
  // }, [imageData]);

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

  const cleanFile = (i) => {
    const image = [...files];
    const imageid = [...imageData];
    const setFinalUrlnew = [...finalUrl];
    const uploadImage = [...file];
    const select = [...selectFile];
    image.splice(i, 1);
    setFiles(image);
    imageid.splice(i, 1);
    setImageData(imageid);
    setFinalUrlnew.splice(i, 1);
    setFinalUrl(setFinalUrlnew);
    select.splice(i, 1);
    setSelectFile(select);
    uploadImage.splice(i, 1);
    setFile(uploadImage);
    setProgress(0);
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

  const handleTabChange = (scopeName) => {
    setLoadData(true);
    setScope(scopeName);
    setSize(1);
    setResult([]);
    getActivity(scopeName);
  };

  const loadMore = () => {
    setSize(size + 1);
    getActivity(scope, size + 1);
  };

  const handleDelete = (childData) => {
    const actId = childData;
    axios(process.env.bossApi + `/activity/${actId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    setResult(result.filter((item) => item.id !== actId));
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
    setProgress(0);
    setContentHtml("");
    setEditorState(() => EditorState.createEmpty());
    setLinkPreview(false);
  };

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
      <SubNav className="w-100">
        <ul className="d-none d-md-flex">
          <li className={scope === "personal" ? "active" : ""}>
            <Button onClick={() => handleTabChange("personal")}>
              Personal
            </Button>
          </li>
          <li className={scope === "likes" ? "active" : ""}>
            <Button onClick={() => handleTabChange("likes")}>Likes</Button>
          </li>
          <li className={scope === "connections" ? "active" : ""}>
            <Button onClick={() => handleTabChange("connections")}>
              Connections
            </Button>
          </li>
          <li className={scope === "groups" ? "active" : ""}>
            <Button onClick={() => handleTabChange("groups")}>
              Communities
            </Button>
          </li>
          <li className={scope === "mentions" ? "active" : ""}>
            <Button onClick={() => handleTabChange("mentions")}>
              Mentions
            </Button>
          </li>
          <li className={scope === "following" ? "active" : ""}>
            <Button onClick={() => handleTabChange("following")}>
              Following
            </Button>
          </li>
        </ul>
      </SubNav>

      {scope === "personal" ? (
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
      ) : null}

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
                  <React.Fragment key={`${act.id}-${uuidv5()}`}>
                    <LiveFeedCard
                      activity={act}
                      parentCallback={handleDelete}
                      activityList={result}
                      setActivityList={setResult}
                      apiCall={apiCall}
                    />
                  </React.Fragment>
                ))
              : ""}
            {result && !result.length && (
              <p style={{ textAlign: "center" }}>No More Data</p>
            )}
          </InfinitScroll>
        </div>
      ) : null}
    </>
  );
}
export default TimeLine;
