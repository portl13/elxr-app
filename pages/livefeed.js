import React, { useState, useContext, useEffect } from "react";
import { useAlert } from "react-alert";
import { faClock, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import useIcon from "@hooks/useIcon";
import { postActivity } from "@pages/api/feeds.api";
import Loader from "@components/loader";
import axios from "axios";
import LiveFeedCard from "@components/livefeed/LiveFeedCard";
import {
  SubNav,
  LoaderContainer,
  LoadingBtn,
} from "@components/livefeed/livefeed.style";

import { UserContext } from "@context/UserContext";
import {
  CloseButton,
  thumb,
  thumbInner,
  thumbImg,
} from "@components/profile-edit/profile-edit.style";
import { Col, Row, Button, Alert, Spinner } from "reactstrap";

import PostLiveFeed from "@components/postLiveFeed";
import { EditorState } from "draft-js";

import { TIMEOUT } from "@utils/constant";

import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import ComunitySidebar from "@components/livefeed/ComunitySidebar";
import MediaLibrary from "@components/MediaLibrary/MediaLibrary";
import useSWRInfinite from "swr/infinite";
import { genericFetch as fetchPublic } from "@request/creator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfinitScroll from "react-infinite-scroll-component";
import { genericFetch } from "@request/dashboard";

export default function LiveFeePage() {
  const PAGE_SIZE = 20;
  const router = useRouter();
  const alert = useAlert();
  const query = router.query;
  const { pathname = null } = query;
  const [postLoad, setPostLoad] = useState(false);
  const [profile, setProfile] = useState("profile");
  const [area, setArea] = useState(false);
  const [formError, setFormError] = useState(false);

  const [mediaType, setMediaType] = useState("image");
  const [showMedia, setShowMedia] = useState(false);
  const [previewsUpload, setPreviewsUpload] = useState([]);
  const [msgErrorMediaType, setMsgErrorMediaType] = useState(false);
  const [currentMediaAccept, setCurrentMediaAccept] = useState("");

  const { user, status } = useContext(UserContext);
  const token = user?.token;
  const [initialData, setInitialData] = useState(true);
  const [scope, setScope] = useState("");
  const [loadData, setLoadData] = useState(true);
  const [empty, setEmpty] = useState(false);
  const [apiCall, setApiCall] = useState(true);
  const [linkLoader, setLinkLoader] = useState(false);
  const [preview, setPreview] = useState(false);
  const [form, setForm] = useState({
    privacy: "public",
  });

  const [contentHtml, setContentHtml] = useState();
  const [showImage, setShowImage] = useState(false);
  const [file, setFile] = useState([]);
  const [progress, setProgress] = useState(0);
  const [imageData, setImageData] = useState([]);
  const [selectGroup, setselectGroup] = useState(null);
  const [videoPreview, setVideoPreview] = useState(false);
  const [linkPreview, setLinkPreview] = useState(false);
  const [title, setTitle] = useState();
  const [linkImage, setLinkImage] = useState();
  const [description, setDescription] = useState();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

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

  const { data, error, size, setSize, mutate } = useSWRInfinite(
    (index) =>
      status !== "loading" && status === "authenticated" && user
        ? [
            `${process.env.bossApi}/activity?per_page=${PAGE_SIZE}&page=${
              index + 1
            }&scope=following`,
            user?.token,
          ]
        : `${process.env.bossApi}/activity?per_page=20&page=1`,
    status !== "loading" && status === "authenticated" && user
      ? genericFetch
      : fetchPublic
  );

  const activities = data ? [].concat(...data) : [];

  const isLoadingInitialData = !data && !error;
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  const { iconElement: close } = useIcon(faWindowClose, false, "sm");

  const createActivity = (images) => {
    const formData = { ...form };

    if (!formData.content) formData["content"] = "<div></div>";

    if (images?.length)
      formData[currentMediaAccept === "video" ? "bp_videos" : "bp_media_ids"] =
        images;

    postActivity(user, formData)
      .then(async ({ data }) => {
        setPostLoad(false);
        emptyStates(true);
        await mutate([data, ...activities], {
          revalidate: false,
        });
      })
      .catch((_) => {
        setPostLoad(false);
        alert.error("Please, enter some content.", TIMEOUT);
      });
  };

  const setActivityList = async (activities) => {
    await mutate(activities, {
      revalidate: false,
    });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    setApiCall(true);
    setPostLoad(true);
    createActivity(imageData);
  };

  const emptyStates = (state) => {
    setPreviewsUpload([]);
    setCurrentMediaAccept("");
    setImageData([]);
    setLoadData(true);
    setScope("");
    setSize(1);
    setInitialData(false);
    setFormError(false);
    setForm({
      privacy: "public",
    });
    setArea(false);
    setShowImage(false);
    setFile(null);
    setProgress(0);
    setVideoPreview(false);
    setContentHtml();
    setEditorState(() => EditorState.createEmpty());
    setLinkPreview(false);
  };

  useEffect(() => {
    if (!user) return;
    setForm({
      ...form,
      user_id: user.id,
      component: "activity",
      content: linkPreview
        ? `${contentHtml}<p>${title}</p>\n<p><img src=\"${linkImage}\"/></p>\n<p>${description}</p>`
        : contentHtml,
      type: "activity_update",
    });
  }, [user, contentHtml, linkPreview, title, linkImage, description]);

  const handleDelete = async (childData) => {
    const actId = childData;
    await axios(process.env.bossApi + `/activity/${actId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    const data = activities.filter((item) => item.id !== actId);
    await mutate(data, {
      revalidate: false,
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

  const loadMore = async () => {
    await setSize(size + 1);
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
    setArea(true);
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
    <MainLayout sidebar={<MainSidebar />} title={"Livefeed |PORTL"}>
      <Row>
        <Col xs="12" lg="8">
          <div className="bg-black bd-radius px-md-4 pt-20">
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
              file={file}
              progress={progress}
              setEditorState={setEditorState}
              showImage={showImage}
              diplayUploadCard={diplayUploadCard}
              setEmpty={setEmpty}
              setArea={setArea}
              user={user}
              postLoad={postLoad}
              placeholderText={"What's on your mind?"}
              setProfile={setProfile}
              isLiveFeed={true}
              setApiCall={setApiCall}
              pathname={pathname}
              videoPreview={videoPreview}
              linkPreview={linkPreview}
              title={title}
              linkImage={linkImage}
              description={description}
              getPreviewLink={getPreviewLink}
              linkLoader={linkLoader}
              preview={preview}
              area={area}
              previewUpload={thumbs}
              msgErrorMediaType={msgErrorMediaType}
            />
            {area ? (
              <SubNav className=" mt-2 d-flex flex-column flex-md-row justify-content-end">
                <div className="d-flex flex-row container-live-feed">
                  <Button
                    className="btn btn-link ml-auto px-5 btn-live-feed white-border"
                    onClick={(e) => {
                      setArea(false);
                      setForm({
                        privacy: "public",
                      });
                      setEditorState(() => EditorState.createEmpty());
                      setShowImage(false);
                      setFile(null);
                      setImageData([]);
                      setPreviewsUpload([]);
                      setCurrentMediaAccept("");
                      setProgress(0);
                      setContentHtml();
                      setLinkPreview(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="btn btn-primary btn-live-feed"
                    onClick={(e) => {
                      form.content === "<p></p>\n" && imageData == 0
                        ? setEmpty(true)
                        : handlerSubmit(e);
                    }}
                  >
                    Post Activity {postLoad ? <Loader /> : ""}
                  </Button>
                </div>
              </SubNav>
            ) : null}
            {empty && (
              <Alert color="danger"> Sorry, Your update cannot be empty.</Alert>
            )}

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
                        activityList={activities}
                        setActivityList={setActivityList}
                        showProfileGroup={true}
                        apiCall={apiCall}
                        getPreviewLink={getPreviewLink}
                      />
                    ))}

                  {isEmpty ? (
                    <p style={{ textAlign: "center" }}>
                      This Creator has not made any publications yet.
                    </p>
                  ) : null}

                  {isReachingEnd && !isEmpty ? (
                    <LoadingBtn
                      style={{
                        width: "100%",
                        textAlign: "center",
                        color: "#fff",
                      }}
                    >
                      There are no more publications available.
                    </LoadingBtn>
                  ) : null}
                </InfinitScroll>
              </div>
            ) : null}
          </div>
        </Col>

        <Col lg="4" className="pl-0 d-none d-lg-block">
          <ComunitySidebar />
        </Col>
      </Row>
    </MainLayout>
  );
}
