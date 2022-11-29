import React, { useState, useContext, useEffect, useMemo, useRef } from "react";
import { useAlert } from "react-alert";
import { useDropzone } from "react-dropzone";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import Router, { useRouter } from "next/router";
import useIcon from "@hooks/useIcon";
import { postActivity } from "@pages/api/feeds.api";
import Loader from "@components/loader";
import axios from "axios";
import { v4 as uuidv5 } from "uuid";
import LiveFeedCard from "@components/livefeed/LiveFeedCard";
import { SubNav, LoaderContainer } from "@components/livefeed/livefeed.style";

import { UserContext } from "@context/UserContext";
import {
  CloseButton,
  thumb,
  thumbInner,
  thumbImg,
  activeStyle,
  acceptStyle,
  rejectStyle,
} from "@components/profile-edit/profile-edit.style";
import { Col, Row, Button, Progress, Alert } from "reactstrap";

import PostLiveFeed from "@components/postLiveFeed";
import { EditorState } from "draft-js";

import { TIMEOUT } from "@utils/constant";
import InfiniteList from "@components/infiniteList/InfiniteList";
import Head from "next/head";

import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import ComunitySidebar from "@components/livefeed/ComunitySidebar";
import MediaLibraryUpload from "@components/MediaLibrary/MediaLibraryUpload";
import MediaLibrary from "@components/MediaLibrary/MediaLibrary";

export default function LiveFeePage() {
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

  const { user } = useContext(UserContext);
  const token = user?.token;
  const [initialData, setInitialData] = useState(true);
  const [scope, setScope] = useState("");
  const [loadData, setLoadData] = useState(true);
  const [size, setSize] = useState(1);
  const [empty, setEmpty] = useState(false);
  const [apiCall, setApiCall] = useState(true);
  const [linkLoader, setLinkLoader] = useState(false);
  const [preview, setPreview] = useState(false);
  const [form, setForm] = useState({
    privacy: "public",
  });



  const [contentHtml, setContentHtml] = useState();
  const [loader, setLoader] = useState(true);
  const [result, setResult] = useState([]);
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

  const getActivity = async (
    page = 1,
    searchVal = "",
    scopeVal = "",
    isEmpty = false
  ) => {
    await axios(process.env.bossApi + "/activity", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      params: {
        per_page: 20,
        page: page,
        search: searchVal,
        ...(scopeVal !== "" ? { scope: scopeVal } : null),
      },
    })
      .then((res) => {
        setInitialData(true);
        const list = [...result];
        const memList = isEmpty ? [] : list;
        const groupFeed = [...memList, ...res.data];
        setResult(groupFeed);
        setLoadData(false);
        const allTotal = Number(res.headers["x-wp-total"]);
        const total = allTotal ? allTotal : 0;
        setLoader(groupFeed.length !== total);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (user?.id) {
      getActivity();
    }
  }, [user]);

  const { iconElement: close } = useIcon(faWindowClose, false, "sm");

  const createActivity = (images) => {
    const formData = { ...form };

    if (!formData.content) formData["content"] = "<div></div>";

    if (images?.length)
      formData[currentMediaAccept === 'video' ? "bp_videos" : "bp_media_ids"] = images;

    postActivity(user, formData)
      .then((res) => {
        const resp = [...result];
        resp.unshift(res.data);
        if (pathname) {
          Router.push("/livefeed").then();
        }
        setResult(resp);
        setPostLoad(false);
        emptyStates(true);
      })
      .catch((_) => {
        setLoader(false);
        setPostLoad(false);
        alert.error("Please, enter some content.", TIMEOUT);
      });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    setApiCall(true);
    setLoader(true);
    setPostLoad(true);
    createActivity(imageData);
  };

  const emptyStates = (state) => {
    setPreviewsUpload([]);
    setCurrentMediaAccept('')
    setImageData([]);
    setLoadData(true);
    setScope("");
    setSize(1);
    !state && setResult([]);
    setInitialData(false);
    setLoader(false);
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

  const loadMorePost = async () => {
    if (result.length && loader) {
      setSize(size + 1);
      await getActivity(size + 1);
    }
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
    if (previewsImg.length === 0){
      setCurrentMediaAccept('')
    }
    setImageData([...imagesId]);
    setPreviewsUpload([...previewsImg]);
  };

  return (
    <MainLayout sidebar={<MainSidebar />} title={"Livefeed |PORTL"}>
      <Row>
        <Col xs="12" lg="8">
          <div className="bg-black bd-radius px-md-4 pt-20">
            {showMedia ? <MediaLibrary
                show={showMedia}
                token={token}
                media_type={mediaType}
                selectMedia={selectMediaManager}
                onHide={() => setShowMedia(false)}
            /> : null}
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
              setselectGroup={setselectGroup}
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
                      setPreviewsUpload([])
                      setCurrentMediaAccept('')
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

            {/* {getSubNav({
              scope,
              handleUpdateData,
              handleSearchFeed,
              searchText,
            })} */}

            <InfiniteList
              loaderState={loader}
              loadMore={loadMorePost}
              loading={loader}
              data={result}
              noText={"Feeds"}
              isLiveFeed={true}
              cssStyle={LoaderContainer}
            >
              {result &&
                result.map((act) => (
                  <LiveFeedCard
                    key={`${act.id}-${uuidv5()}`}
                    activity={act}
                    parentCallback={handleDelete}
                    activityList={result}
                    setActivityList={setResult}
                    showProfileGroup={true}
                    apiCall={apiCall}
                    getPreviewLink={getPreviewLink}
                  />
                ))}
            </InfiniteList>
          </div>
        </Col>

        <Col lg="4" className="pl-0 d-none d-lg-block">
          <ComunitySidebar />
        </Col>
      </Row>
    </MainLayout>
  );
}
