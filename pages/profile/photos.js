import React, { useState, useEffect } from "react";
import { Button, Row, Spinner, Modal, ModalBody, Alert } from "reactstrap";
import { PhotoAction, uploadModal} from "../../components/livefeed/photo.style";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faClock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PhotoCard from "./photocard";
import Albums from "./albums";
import AddPhoto from "./addphoto";
import ReportModal from "./ReportModal";
import InfinitScroll from "react-infinite-scroll-component";
import { getProfileRoute } from "../../utils/constant";
import {
  LoaderContainer,
  SubNav,
  LoadingBtn,
} from "../../components/livefeed/livefeed.style";

function Photos({
  user,
  parentCallback,
  tab,
  queryParam,
  photoCount,
  isGroup,
  groupId,
  curntUserId,
  isCurntUser,
  albumId,
  selectedUseDet,
  isGroupMember,
  functionRedirect
}) {
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [loadData, setLoadData] = useState(false);
  const [status, setStatus] = useState(true);
  const [loader, setLoader] = useState(true);
  const [albumView, setAlbumView] = useState(false);
  const [value, setValue] = useState(null);
  const [length, setLength] = useState(0);
  const [count, setCount] = useState(0);
  const [picId, setPicId] = useState([]);
  const [error, setError] = useState(false);
  const [selectStatus, setSelectStatus] = useState(true);
  const [selectAllPic, setSelectAllPic] = useState(true);
  const [picCheck, setPicCheck] = useState(true);
  const [show, setShow] = useState(false);
  const [loaderState, setLoaderState] = useState(true);
  const [groupData, setGroupData] = useState(true);
  const [albumDet, setAlbumDet] = useState(false);
  const [reportModalShow, setReportModalOpen] = useState(false);
  const [selPhoto, setSelPhoto] = useState(null);
  const [selPhotoIndex, setSelPhotoIndex] = useState(null);
  const totalPic = "x-wp-total";
  //console.log("isGroup:",isGroup)
  useEffect(() => {
    if (tab === "photos") {
      setStatus(true);
      setResult([]);
      setPage(1);
      setValue(queryParam);
      let state = albumId && queryParam === "photos";
      handleTabChange(queryParam, state);
    }
  }, [tab, queryParam]);
  const handleTabChange = (e, isEmpty = false) => {
    let albumIdVal = albumId;
    if (isEmpty) {
      setAlbumDet(false);
      albumIdVal = null;
    }
    !isGroup &&
      Router.push(
        functionRedirect(
          curntUserId.name,
          curntUserId.id,
          "photos",
          e,
          albumIdVal
        )
      );
    if (e === "albums") {
      setStatus(false);
      setLoadData(false);
      setAlbumView(true);
      setResult([]);
    } else {
      setAlbumView(false);
      setStatus(true);
      setValue(e);
      setPage(1);
      getPhotos(1, true);
    }
    setValue(e);
  };
  const handleResponse = (childData) => {
    const len = childData.length;
    var responseData = childData;
    Array.prototype.push.apply(responseData, result);
    setResult(responseData);
    setLength(childData.length);
    parentCallback(parseInt(photoCount) + len);
  };
  function selectPicid(id, data) {
    if (data === true) {
      setPicId([...picId, id]);
    } else {
      const photoId = picId.filter((item) => item !== id);
      setPicId(photoId);
    }
  }
  function delError() {
    setError(true);
    setTimeout(() => setError(false), [2000]);
  }
  async function getPhotos(pages, isempty = false) {
    const formData = {
      page: pages ? pages : page,
      per_page: 20,
      scope: "personal",
    };
    if (isGroup) {
      formData["group_id"] = groupId;
      formData["scope"] = "groups";
    } else formData["user_id"] = curntUserId.id;
    await axios(process.env.bossApi + "/media", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      params: formData,
    })
      .then((res) => {
        const list = isempty ? [] : result;
        setResult((data) => [...list, ...res.data]);
        var total =
          res.headers[totalPic] != undefined ? res.headers[totalPic] : null;
        setCount(total);
        parentCallback(total);
        setLoadData(true);
        const totalVal = Number(res.headers[totalPic])
          ? Number(res.headers[totalPic])
          : 0;
        setLoaderState(totalVal !== res.data.length);
        for (var i = 1; i <= page; i++) {
          setLength(length + parseInt(res.data.length));
        }
        if (res.data.length === 0) {
          setLoader(false);
        } else {
          setLoader(true);
        }
      })
      .catch(() => {});
  }
  const handleDelete = (childData) => {
    const id = childData;
    axios(process.env.bossApi + `/media/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    setResult(result.filter((item) => item.id !== id));
    parentCallback(photoCount - 1);
    setCount(count - 1);
    var len = count - 1;
    len == 0 ? load() : null;
  };

  function deleteMultiplePhoto() {
    setSelectStatus(true);
    axios(process.env.bossApi + `/media`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      data: {
        media_ids: picId,
      },
    }).then((res) => {
      setSelectStatus(false);
      var arr = result.filter((item) => !picId.includes(item.id));
      setResult(arr);
      setPicId([]);
      setPicCheck(true);
      parentCallback(photoCount - picId.length);
      setCount(count - picId.length);
      var len = count - picId.length;
      len == 0 ? load() : null;
    });
  }
  function load() {
    setLength(0);
    setLoadData(true);
    setLoader(false);
  }
  function selectAll() {
    if (selectAllPic === true) {
      setPicId(result.map((d) => d.id));
      setSelectAllPic(false);
      setPicCheck(false);
      setResult(result);
      setStatus(true);
    } else {
      setPicId([]);
      setSelectAllPic(true);
      setResult(result);
      setPicCheck(true);
      setStatus(true);
    }
  }
  function moveImage(photoData) {
    setResult(result.filter((item) => item.id !== photoData.id));
  }
  function handleDescription(content, photoId, groupStatus) {
    setGroupData(groupStatus);
    axios
      .patch(
        process.env.bossApi + `/media/${photoId}`,
        {
          id: photoId,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        var index = result.findIndex((item) => item.id == photoId);
        result[index].description = content;
        setResult(result);
        setGroupData(true);
      });
  }
  function likeAction(childData, groupStatus) {
    setGroupData(groupStatus);
    axios(process.env.bossApi + `/activity/${childData}/favorite`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      setGroupData(true);
    });
  }

  const loadMorePhoto = () => {
    if (result.length && loaderState) {
      setPage(page + 1);
      getPhotos(page + 1);
    }
  };
  return (
    <>
      <div className="itemBody">
        <div className="item-body-inner">
          <div
            className={`d-flex justify-content-between ${
              isGroup && "group-margin"
            }`}
          >
            <h2 className="page-title">{status ? "Photos" : "Albums"}</h2>
            {isGroupMember && isGroup || !isGroup ? (
              <AddPhoto
                user={user}
                parentResponse={handleResponse}
                isGroup={isGroup}
                groupId={groupId}
              />
            ) : null}
          </div>
          {!isGroup && (
            <SubNav>
              <ul>
                <li className={status === true ? "active" : " "}>
                  <Button
                    type="button"
                    onClick={() => handleTabChange("photos", true)}
                  >
                    Photos
                  </Button>
                </li>
                <li className={status === false ? "active" : " "}>
                  <Button
                    type="button"
                    onClick={() => {
                      handleTabChange("albums", true);
                      setAlbumDet(true);
                      parentCallback(count);
                    }}
                  >
                    Albums
                  </Button>
                </li>
              </ul>
            </SubNav>
          )}
          {status && length !== 0 && isCurntUser ? (
            <PhotoAction>
              <div className="has-tooltip delete">
                <div className="popover bs-popover-top">
                  <div className="arrow"></div>
                  <div className="popover-body">Delete</div>
                </div>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => (picId == 0 ? delError() : setShow(true))}
                />
              </div>
              <div className="has-tooltip select">
                <div className="popover bs-popover-top">
                  <div className="arrow"></div>
                  <div className="popover-body">
                    {selectAllPic === true ? "Select All" : "Unselect All"}
                  </div>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    className="custom-control-input"
                    id="photo2"
                    type="checkbox"
                    name="status"
                    value="photo2"
                    onChange={() => selectAll()}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="photo2"
                  ></label>
                </div>
              </div>
            </PhotoAction>
          ) : null}
          <div className="w-100">
            {error && (
              <Alert color="danger">Please select media to delete.</Alert>
            )}
            {loadData === false && albumView === false ? (
              <p css={LoaderContainer}>
                <span>
                  <FontAwesomeIcon icon={faClock} />
                </span>
                Loading member's photos. Please wait.
              </p>
            ) : null}
            {length == 0 && loadData ? (
              <p css={LoaderContainer}>
                <span>
                  <FontAwesomeIcon icon={faClock} />
                </span>
                Sorry, no photos were found.{" "}
              </p>
            ) : null}
            {loadData && !albumView ? (
              <InfinitScroll
                dataLength={result.length}
                next={loadMorePhoto}
                hasMore={loaderState}
                loader={
                  loader === true ? (
                    <LoadingBtn>
                      Loading ...{" "}
                      <Spinner
                        style={{ width: "1.2rem", height: "1.2rem" }}
                        color="primary"
                      />
                    </LoadingBtn>
                  ) : (
                    <p style={{ textAlign: "center" }}>No More Data</p>
                  )
                }
              >
                <Row className="mx-0">
                  {status &&
                    result.map((photo, index) => {
                      return (
                        <>
                          <PhotoCard
                            selectedUseDet={selectedUseDet}
                            index={index}
                            id={photo.id}
                            photo={photo}
                            parentCallback={handleDelete}
                            parentMember={selectPicid}
                            selection={selectStatus}
                            check={picCheck}
                            user={user}
                            parentImageData={moveImage}
                            isGroup={isGroup}
                            date={photo.date_created}
                            description={photo.description}
                            parentDescription={handleDescription}
                            parentGroupData={groupData}
                            activityId={photo.activity_id}
                            result={result}
                            likeAction={likeAction}
                            groupId={groupId}
                            isCurntUser={isCurntUser}
                            setReportModalOpen={setReportModalOpen}
                            setSelPhoto={setSelPhoto}
                            setSelPhotoIndex={setSelPhotoIndex}
                          />
                        </>
                      );
                    })}
                </Row>
              </InfinitScroll>
            ) : null}
            {status === false && albumView ? (
              <Albums
                user={user}
                tab={"albums"}
                isGroup={isGroup}
                albumDet={albumDet}
                setAlbumDet={setAlbumDet}
                parentCallback={parentCallback}
                groupId={groupId}
                isCurntUser={isCurntUser}
                curntUserId={curntUserId}
                albumId={albumId}
                selectedUseDet={selectedUseDet}
              />
            ) : null}
          </div>
        </div>
      </div>
      <Modal
        className="modal-dialog-centered modal-sm"
        isOpen={show}
        css={uploadModal}
      >
        <ModalBody className="text-center">
          <p className="mb-4">
            Are you sure you want to Delete selected photos?
          </p>
          <Button
            color="secondary-text"
            onClick={() => {
              setShow(false);
              setPicId([]);
              setSelectAllPic(true);
              setPicCheck(true);
            }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              deleteMultiplePhoto();
              setShow(false);
            }}
          >
            Yes, Delete
          </Button>
        </ModalBody>
      </Modal>
      <ReportModal
        show={reportModalShow}
        setReportModalOpen={setReportModalOpen}
        selPhoto={selPhoto}
        user={user}
        title={"Photo"}
        setResult={setResult}
        result={result}
        setSelPhoto={setSelPhoto}
        selPhotoIndex={selPhotoIndex}
        getPhotos={getPhotos}
      />
    </>
  );
}
export default Photos;
