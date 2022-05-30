import React, { useEffect, useState } from "react";
import {
  Row,
  Button,
  Modal,
  ModalBody,
  Input,
  Spinner,
  Alert,
} from "reactstrap";
import Router from "next/router";
import PhotoCard from "./photocard";
import { PhotoAction, uploadModal} from "../../components/livefeed/photo.style";

import AddPhoto from "./addphoto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ReportModal from "./ReportModal";
function AlbumDetail({
  selAlbumDet,
  setAlbumDetailID,
  handleDelete,
  handleUpdate,
  parentGroupData,
  user,
  isGroup,
  groupId,
  getData,
  updatePrivacy,
  parentCallback,
  isCurntUser,
  curntUserId,
  callAlbum,
  isFromGroup,
  setAlbumDet,
  selectedUseDet,
  parentDescription,
}) {
  const [showAlbum, setShowAlbum] = useState(false);
  const [editAlbum, setEditAlbum] = useState(false);
  const [content, setContent] = useState(selAlbumDet?.title);
  const [albumLoader, setAlbumLoader] = useState(false);
  const [result, setResult] = useState(selAlbumDet?.media.medias);
  const [privacyStatus, setPrivacyStatus] = useState(selAlbumDet?.privacy);
  const [status, setStatus] = useState(true);
  const [length, setLength] = useState(0);
  const [visible, setVisible] = useState(false);
  const [picCount, setPicCount] = useState(selAlbumDet?.media.total);
  const [picId, setPicId] = useState([]);
  const [error, setError] = useState(false);
  const [selectStatus, setSelectStatus] = useState(true);
  const [selectAllPic, setSelectAllPic] = useState(true);
  const [picCheck, setPicCheck] = useState(true);
  const [show, setShow] = useState(false);
  const onDismiss = () => setVisible(false);
  const [reportModalShow, setReportModalOpen] = useState(false);
  const [selPhoto, setSelPhoto] = useState(null);
  const [selPhotoIndex, setSelPhotoIndex] = useState(null);
  const [groupData, setGroupData] = useState(true);
  useEffect(() => {
    parentCallback(picCount);
    setLength(picCount);
  }, [selAlbumDet?.id]);
  function delError() {
    setError(true);
    setTimeout(() => setError(false), [2000]);
  }
  function selectAll() {
    if (selectAllPic === true) {
      setPicId(result.map((d) => d?.id));
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
  function updateAlbum() {
    if (content === "") {
      setVisible(true);
    } else {
      setAlbumLoader(true);
      handleUpdate(selAlbumDet?.id, content);
    }
  }
  useEffect(
    () =>
      setTimeout(() => {
        setEditAlbum(false);
        setAlbumLoader(false);
      }, [3000]),
    [parentGroupData]
  );
  function photoCount() {
    parentCallback(picCount - 1);
    setPicCount(picCount - 1);
    setLength(picCount - 1);
  }
  function handleResponse(childData) {
    const albumId = childData.map((child) => child.album_id)[0];
    var responseData = childData;
    if (albumId == selAlbumDet?.id) {
      Array.prototype.push.apply(responseData, result);
      setResult(responseData);
      parentCallback(childData.length);
      setPicCount(childData.length);
      setLength(childData.length);
    }
    albumId != 0 && getData(responseData, selAlbumDet?.id);
  }
  const deletePhoto = (childData) => {
    const id = childData;
    axios(process.env.bossApi + `/media/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      setResult(result.filter((item) => item?.id !== id));
      photoCount();
      callAlbum(selAlbumDet?.id, [id]);
    });
  };
  function selectPicid(id, data) {
    if (data === true) {
      setPicId([...picId, id]);
    } else {
      const photoId = picId.filter((item) => item !== id);
      setPicId(photoId);
    }
  }
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
      var arr = result.filter((item) => !picId.includes(item?.id));
      setResult(arr);
      setPicId([]);
      setPicCheck(true);
      parentCallback(picCount - picId.length);
      setPicCount(picCount - picId.length);
      setLength(picCount - picId.length);
      callAlbum(selAlbumDet?.id, picId);
    });
  }
  const clearAlbum = () => {
    setAlbumDetailID(null);
    setAlbumDet(true);
    Router.push(`${window.location.pathname}?tab=albums`);
  };
  function handleDescription(photoDesc, photoId, groupStatus) {
    setGroupData(groupStatus);
    axios
      .patch(
        process.env.bossApi + `/media/${photoId}`,
        {
          id: photoId,
          content: photoDesc,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        var index = result.findIndex((item) => item?.id == photoId);
        result[index].description = photoDesc;
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
  function moveImage(photoData) {
    setResult(result.filter((item) => item?.id !== photoData?.id));
    photoCount();
  }
  return (
    <>
      <div className="itemBody">
        <div className="item-body-inner">
          <div
            className={`d-flex justify-content-center group-margin album-wrapper`}
          >
            <div className="album-name-edit-panel">
              {!editAlbum && (
                <>
                  <h2 className="page-title">{selAlbumDet?.title}</h2>
                  {isCurntUser && (
                    <Button
                      onClick={() => setEditAlbum(true)}
                      className="btn btn-outline-primary"
                    >
                      edit
                    </Button>
                  )}
                </>
              )}
            </div>
            {editAlbum && isCurntUser && (
              <div className="album-name-edit-panel">
                <Input
                  type="text"
                  maxLength="50"
                  defaultValue={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    setVisible(false);
                  }}
                />
                <Button
                  onClick={() => updateAlbum()}
                  className="btn btn-outline-primary"
                >
                  Save{" "}
                  {albumLoader && (
                    <Spinner style={{ width: "1.2rem", height: "1.2rem" }} />
                  )}
                </Button>
                <Button
                  onClick={() => {
                    setEditAlbum(false);
                    setContent(selAlbumDet?.title);
                  }}
                  className="btn btn-outline-primary"
                >
                  Cancel
                </Button>

                {visible && (
                  <div>
                    <Alert color="warning" isOpen={visible} toggle={onDismiss}>
                      Title is required.
                    </Alert>
                  </div>
                )}
              </div>
            )}
          </div>
          {isCurntUser && (
            <>
              <div className="album-info-conatiner">
                <div className="button-panel">
                  <div className="button-section">
                    {isFromGroup && (
                      <Button
                        onClick={() => clearAlbum()}
                        className="btn btn-outline-primary"
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      onClick={() => setShowAlbum(true)}
                      className="btn btn-outline-primary"
                    >
                      Delete Album
                    </Button>
                    <AddPhoto
                      user={user}
                      parentResponse={handleResponse}
                      isGroup={isGroup}
                      groupId={groupId}
                      newAlbum={true}
                      album_Id={selAlbumDet?.id}
                    />
                  </div>
                  <div className="button-section">
                    <Input
                      type="select"
                      onChange={(e) => {
                        setPrivacyStatus(e.target.value);
                        updatePrivacy(selAlbumDet?.id, e.target.value);
                      }}
                      value={privacyStatus}
                    >
                      <option value="public">Public</option>
                      <option value="loggedin">All Members</option>
                      <option value="friends">My Connections</option>
                      <option value="onlyme">Only Me</option>
                    </Input>
                  </div>
                </div>
              </div>
              {status && length !== 0 ? (
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
              {error && (
                <Alert color="danger">Please select media to delete.</Alert>
              )}
            </>
          )}
          <Row className="mx-0">
            {result
              ? result.map((photo, index) => (
                  <PhotoCard
                    index={index}
                    id={photo?.id}
                    photo={photo}
                    parentCallback={deletePhoto}
                    parentMember={selectPicid}
                    selection={selectStatus}
                    check={picCheck}
                    isCurntUser={isCurntUser}
                    setReportModalOpen={setReportModalOpen}
                    setSelPhoto={setSelPhoto}
                    setSelPhotoIndex={setSelPhotoIndex}
                    isFromDetail={false}
                    selectedUseDet={selectedUseDet}
                    result={result}
                    activityId={photo.activity_id}
                    user={user}
                    likeAction={likeAction}
                    parentDescription={handleDescription}
                    parentGroupData={groupData}
                    parentImageData={moveImage}
                  />
                ))
              : "No photos Available"}
          </Row>
        </div>
      </div>
      <Modal
        className="modal-dialog-centered modal-sm"
        isOpen={showAlbum}
        css={uploadModal}
      >
        <ModalBody className="text-center">
          <p className="mb-4">Are you sure you want to Delete this album?</p>
          <Button
            color="secondary-text"
            onClick={() => {
              setShowAlbum(false);
            }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              handleDelete(selAlbumDet?.id);
              setShowAlbum(false);
            }}
          >
            Yes, Delete
          </Button>
        </ModalBody>
      </Modal>
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
      />
    </>
  );
}
export default AlbumDetail;
