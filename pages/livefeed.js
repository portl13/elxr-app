import React, { useState, useContext, useEffect, useMemo, useRef } from "react";
import { useAlert } from "react-alert";
import { useDropzone } from "react-dropzone";
import { faWindowClose, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Router, { useRouter } from "next/router";
import useIcon from "@hooks/useIcon";
import { postActivity } from "@pages/api/feeds.api";
import Loader from "@components/loader";
import axios from "axios";
import { v4 as uuidv5 } from "uuid";
import Layout from "@components/layout/Layout";
import LiveFeedCard from "@components/livefeed/LiveFeedCard";
import {
  liveFeedTitle,
  SubNav,
  MultiSelectContainer,
  LoaderContainer,
  LoadingBtn,
  MoreButton,
} from "@components/livefeed/livefeed.style";
import { ButtonActionConnect } from "@components/connect/connect.style";
import useAxios from "axios-hooks";
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
import {
  Col,
  Input,
  Row,
  Button,
  Spinner,
  Progress,
  Alert,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostLiveFeed from "@components/postLiveFeed";
import { EditorState } from "draft-js";
import SelectGroup from "./SelectGroup";
import { TIMEOUT } from "@utils/constant";
import InfiniteList from "@components/infiniteList/InfiniteList";
import Head from "next/head";
import ComunitySidebar from "@components/livefeed/ComunitySidebar";
import getSubNav from "@components/livefeed/getSubNav";





export default function LiveFeePage() {
  let selectRef = useRef();
  const router = useRouter();
  const alert = useAlert();
  const query = router.query;
  const { pathname = null } = query;
  const [postLoad, setPostLoad] = useState(false);
  const [profile, setProfile] = useState("profile");
  const [area, setArea] = useState(false);
  const [formError, setFormError] = useState(false);
  const { user } = useContext(UserContext);
  const [type, setType] = useState("active");
  const [initialData, setInitialData] = useState(true);
  const [group, setGroupData] = useState([]);
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
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageData, setImageData] = useState([]);
  const [selectFile, setSelectFile] = useState([]);
  const [finalUrl, setFinalUrl] = useState([]);
  const [selectLoad, setselectLoad] = useState(false);
  const [selectGroup, setselectGroup] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const [videoPreview, setVideoPreview] = useState(false);
  const [linkPreview, setLinkPreview] = useState(false);
  const [title, setTitle] = useState();
  const [linkImage, setLinkImage] = useState();
  const [description, setDescription] = useState();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const baseApi = process.env.bossApi;
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

  const handleSearchFeed = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setResult([]);
      setLoader(true);
      setLoadData(true);
      setSize(1);
      getActivity(1, searchText, scope, true);
    } else {
      const search = e.target ? e.target.value : e;
      setSearchText(search);
      if (!search && searchText) {
        setLoadData(true);
        setLoader(true);
        setResult([]);
        setSize(1);
        getActivity(1, search, scope, true);
      }
    }
  };

  const handlerChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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

  const style = useMemo(
    () => ({
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const sendFiles = () => {
    setPostLoad(true);
    const newList = file.map((file, key) => {
      const body = new FormData();
      body.append("file", file, file.name);
      const imageUrl = `${baseApi}/media/upload`;
      const videoUrl = `${baseApi}/video/upload`;
      return axios.post(videoPreview ? videoUrl : imageUrl, body, {
        headers: { Authorization: `Bearer ${user?.token}` },
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
          setImageData((e) => [...e, ...upload_id]);
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
    if (selectGroup?.value && profile === "group") {
      formData["secondary_item_id"] = selectGroup.value;
      formData["component"] = "groups";
    }
    if (!formData.content) formData["content"] = "<div></div>";
    if (images?.length)
      formData[videoPreview ? "bp_videos" : "bp_media_ids"] = images;
    postActivity(user, formData)
      .then((res) => {
        const resp = [...result];
        resp.unshift(res.data);
        if (pathname) {
          Router.push("/livefeed");
        }
        setResult(resp);
        setPostLoad(false);
        emptyStates(true);
      })
      .catch((err) => {
        setLoader(false);
        setPostLoad(false);
        alert.error("Please, enter some content.", TIMEOUT);
      });
  };

  const handlerSubmit = (e) => {
    setApiCall(true);
    setLoader(true);
    setPostLoad(true);

    if (file?.length) sendFiles();
    else createActivity(null);
  };
  useEffect(() => {
    if (imageData?.length === file?.length) {
      createActivity(imageData);
    }
  }, [imageData]);

  const emptyStates = (state) => {
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
    setFiles([]);
    setFile(null);
    setImageData([]);
    setSelectFile([]);
    setFinalUrl([]);
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

  const [{ data, loading, error: groupsError }, refetch] = useAxios({
    url: process.env.bossApi + "/groups/",
    params: { page: 1, per_page: 30, scope: "all", type: type },
  });

  const handleGroup = () => {
    const selects = document.getElementsByTagName("select");
    if (selects.group.value == "profile") {
      setProfile("profile");
    } else {
      setProfile("group");
    }
  };

  const handleSearch = (e) => {
    axios(process.env.bossApi + "/groups", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      params: { per_page: 20, page: 1, scope: "personal", search: e },
    })
      .then((res) => {
        setselectLoad(false);
        const allGroup = res.data.map((ele) => {
          return { value: ele.id, label: ele.name };
        });
        setGroupData(allGroup.length ? allGroup : []);
      })
      .catch(() => {
        setselectLoad(false);
      });
  };
  function diplayUploadCard(status, isArea) {
    if (isArea) {
      setArea(false);
      setShowImage(false);
      setFiles([]);
      setFile(null);
      setImageData([]);
      setSelectFile([]);
      setFinalUrl([]);
      setProgress(0);
    }
    if (status) {
      setShowImage(false);
      setVideoPreview(!videoPreview);
      setArea(true);
    } else {
      setShowImage(!showImage);
      setVideoPreview(false);
      setArea(true);
    }
    setEmpty(false);
    setApiCall(false);
  }
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

  let styleThumb = thumb;
  const thumbs = files.map((file, i) => (
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
            <source src={file.preview} type="video/mp4" />
          </video>
        ) : (
          <img src={file.preview} style={thumbImg} />
        )}
      </div>
    </div>
  ));

  const loadMorePost = () => {
    if (result.length && loader) {
      setSize(size + 1);
      getActivity(size + 1);
    }
  };

  const handleUpdateData = (ele) => {
    setLoadData(true);
    setScope(ele);
    setSize(1);
    setSearchText("");
    getActivity(1, "", ele, true);
    setResult([]);
  };

  return (
    <Layout>
      <Head>
        <title>Livefeed |WeShare</title>
      </Head>
      <Row>
        <Col  xs="12" lg="8" xl="9">
          <div className="bg-black bd-radius px-md-4 pt-20">
            <PostLiveFeed
              editorState={editorState}
              setContentHtml={setContentHtml}
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              thumbs={thumbs}
              file={file}
              sendFiles={sendFiles}
              progress={progress}
              setEditorState={setEditorState}
              showImage={showImage}
              diplayUploadCard={diplayUploadCard}
              setEmpty={setEmpty}
              setArea={setArea}
              style={style}
              user={user}
              postLoad={postLoad}
              placeholderText={"Write here or use @ to mention someone."}
              setProfile={setProfile}
              isLiveFeed={true}
              setselectGroup={setselectGroup}
              setApiCall={setApiCall}
              pathname={pathname}
              videoPreview={videoPreview}
              setVideoPreview={setVideoPreview}
              linkPreview={linkPreview}
              title={title}
              linkImage={linkImage}
              description={description}
              getPreviewLink={getPreviewLink}
              linkLoader={linkLoader}
              preview={preview}
              area={area}
            />
            {area ? (
              <SubNav className="mt-2 d-flex flex-column flex-md-row ">
                <ul className="pb-2 pb-md-0">
                  <li className="w-auto px-3">
                    <Input type="select" onChange={handleGroup} id="group">
                      <option value="profile">Post in: Profile</option>
                      <option value="group">Post in : Group</option>
                    </Input>
                  </li>

                  {profile == "profile" ? (
                    <li className="w-auto">
                      <Input
                        id="privacy"
                        type="select"
                        name="privacy"
                        onChange={(e) => handlerChange(e)}
                        value={form.privacy}
                      >
                        <option value="public">Public</option>
                        <option value="loggedin">All Members</option>
                        <option value="friends">My Connections</option>
                        <option value="onlyme">Only Me</option>
                      </Input>
                    </li>
                  ) : null}
                  <SelectGroup
                    profile={profile}
                    selectRef={selectRef}
                    group={group}
                    handleSearch={handleSearch}
                    selectLoad={selectLoad}
                    selectGroup={selectGroup}
                    setselectGroup={setselectGroup}
                    setselectLoad={setselectLoad}
                    cssStyle={MultiSelectContainer}
                  />
                </ul>
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
                    setFiles([]);
                    setFile(null);
                    setImageData([]);
                    setProgress(0);
                    setSelectFile([]);
                    setFinalUrl([]);
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
            {getSubNav({ scope, handleUpdateData, handleSearchFeed, searchText })}
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
        <Col  lg="4" xl="3" className="pl-0">
          <div className="bg-black bd-radius px-2 pl-4">
            <ButtonActionConnect
              css={liveFeedTitle}
              
              onClick={() => Router.push("/communities-details")}
            >
              Communities
            </ButtonActionConnect>

            <Row className="mb-3">
              <Col xs="12">
                <ButtonActionConnect
                  
                  active={type === "newest"}
                  onClick={() => setType("newest")}
                >
                  Newest
                </ButtonActionConnect>
                <ButtonActionConnect
                  active={type === "active"}
                  onClick={() => setType("active")}
                  
                >
                  Active
                </ButtonActionConnect>
                <ButtonActionConnect
                  active={type === "popular"}
                  onClick={() => setType("popular")}
                  
                >
                  Popular
                </ButtonActionConnect>
              </Col>
            </Row>
            {loading && (
              <LoadingBtn>
                Loading community ..{" "}
                <Spinner
                  style={{ width: "1.2rem", height: "1.2rem" }}
                  color="primary"
                />
              </LoadingBtn>
            )}
            {data &&
              data.map((comunity) => (
                <ComunitySidebar key={comunity.id} comunity={comunity} />
              ))}
            <MoreButton
              className="btn"
              onClick={() => Router.push("/communities-details")}
            >
              {" "}
              MORE <FontAwesomeIcon icon={faAngleRight} />{" "}
            </MoreButton>
          </div>
        </Col>
      </Row>
    </Layout>
  );
}
