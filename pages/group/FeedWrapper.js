import React, { useState, useEffect, useMemo } from "react";
import { v4 as uuidv5 } from "uuid";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { EditorState } from "draft-js";
import {
  Button,
  Progress,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
} from "reactstrap";
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

const renderSearch = ({ handleSearchFeed, searchText }) => {
  return (
    <Col xs="3" lg="3" xl="3">
      <Form>
        <FormGroup>
          <Label for="feedSearch" className="sr-only">
            Search
          </Label>
          <Input
            css={searchField}
            type="search"
            name="search"
            id="feedSearch"
            placeholder="Search Feed…"
            onChange={handleSearchFeed}
            onKeyDown={handleSearchFeed}
            value={searchText}
          />
        </FormGroup>
      </Form>
    </Col>
  );
};

function feedWrapper({ user, id, tab, groupDetails }) {
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
  const [searchText, setSearchText] = useState(null);
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
          res.data.images[0] === undefined ? "" : res.data.images[0].replace(/^https:/, '')
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

  const handleSearchFeed = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setLoader(true);
      setPage(1);
      setResult([]);
      getActivity("groups", 1, searchText, true);
    } else {
      const search = e.target ? e.target.value : e;
      setSearchText(search);
      if (!search && searchText) {
        setLoader(true);
        setResult([]);
        setPage(1);
        getActivity("groups", 1, search, true);
      }
    }
  };
  const diplayUploadCard = (status, isArea) => {
    if (isArea) {
      setShowButton(false);
      setShowImage(false);
      setFiles([]);
      setFile(null);
      setImageData([]);
      setProgress(0);
      setFinalUrl([]);
      setSelectFile([]);
    }
    if (status) {
      setShowImage(false);
      setVideoPreview(!videoPreview);
      setShowButton(true);
    } else {
      setShowImage(!showImage);
      setVideoPreview(false);
      setShowButton(true);
    }
    setEmpty(false);
    setApiCall(false);
  };
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

  const createActivity = (imagess) => {
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
    if (!formData.content) formData["content"] = "<div></div>";
    if (imagess?.length)
      formData[videoPreview ? "bp_videos" : "bp_media_ids"] = imagess;
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

  const sendFiles = () => {
    setPostLoad(true);
    const newList = file.map((filedata, key) => {
      const body = new FormData();
      body.append("file", filedata, filedata.name);
      const baseApi = process.env.bossApi;
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

  const handlerSubmit = (e) => {
    e.preventDefault();
    setApiCall(true);
    if (contentHtml === "<p></p>\n" && !file?.length) {
      alert.error("Please add content to post.", TIMEOUT);
      return;
    }
    setPostLoad(true);
    if (file?.length) sendFiles();
    else createActivity(null);
  };

  useEffect(() => {
    if (imageData?.length === file?.length) {
      createActivity(imageData);
    }
  }, [imageData]);
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
  return (
    <>
      {groupDetails?.is_member && groupDetails?.can_post && (
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
        />
      )}
      {renderSearch({ handleSearchFeed, searchText })}
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
    </>
  );
}
export default feedWrapper;
