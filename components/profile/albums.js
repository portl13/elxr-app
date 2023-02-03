import React, { useState, useEffect } from "react";
import { Row, Spinner } from "reactstrap";
import CreateAlbum from "@components/profile/createalbum";
import AlbumCard from "./albumcard";
import axios from "axios";
import InfinitScroll from "react-infinite-scroll-component";
import {
  LoaderContainer,
  LoadingBtn,
} from "@components/livefeed/livefeed.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import AlbumDetail from "./albumDetail";
import Router from "next/router";
import { getProfileRoute } from "@utils/constant";
import ReportModal from "@components/profile/ReportModal";
function Albums({
  user,
  tab,
  isGroup,
  groupId,
  setTabCount,
  tabCount,
  albumDet,
  setAlbumDet,
  parentCallback,
  isCurntUser,
  curntUserId,
  albumId,
  selectedUseDet,
  isGroupMember,
  role,
  groupDetails,
}) {
  const [loader, setLoader] = useState(true);
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [loadData, setLoadData] = useState(false);
  const [length, setLength] = useState(0);
  const [loaderState, setLoaderState] = useState(true);
  const [selAlbumDet, setAlbumDetailID] = useState(null);
  const [groupData, setGroupData] = useState(true);
  const [reportModalShow, setReportModalOpen] = useState(false);
  const [selPhoto, setSelPhoto] = useState(null);
  const [selPhotoIndex, setSelPhotoIndex] = useState(null);

  const getAlbumsDetails = () => {
    axios(process.env.bossApi + `/media/albums/${albumId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      setAlbumDetailID(res.data);
      setAlbumDet(false);
    });
  };

  useEffect(() => {
    if (albumId) {
      getAlbumsDetails();
    }
  }, [albumId]);
  useEffect(() => {
    if (tab === "albums" && !albumId) {
      setResult([]);
      setPage(1);
      setAlbumDetailID(null);
      setLength(0);
      getAlbums(1, true);
    }
  }, [tab, albumId]);
  useEffect(() => {
    if (tab === "albums") {
      getAlbums(page);
    }
  }, [page]);

  async function getAlbums(pages, isempty = false) {
    const formData = {
      page: pages ? pages : page,
      per_page: 20,
    };
    if (isGroup) {
      formData["group_id"] = groupId;
      delete formData.user_id;
    } else formData["user_id"] = curntUserId.id;
    await axios(process.env.bossApi + "/media/albums", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      params: formData,
    })
      .then((res) => {
        const list = isempty ? [] : result;
        setResult((data) => [...list, ...res.data]);
        setLoadData(true);
        if (isGroup) {
          const innerNavVal = { ...tabCount };
          innerNavVal.albums = Number(res.headers["x-wp-total"]);
          setTabCount(innerNavVal);
        }
        setLoaderState(Number(res.headers["x-wp-total"]) !== res.data.length);
        for (var i = 1; i <= page; i++) {
          setLength(length + parseInt(res.data.length));
        }
        if (res.data.length === 0) {
          setLoader(false);
        } else {
          setLoader(true);
        }
      })
      .catch((err) => {
        setLoaderState(false);
      });
  }

  const handleResponse = (childData) => {
    result.unshift(childData);
    setResult(result);
    setLength(result.length);
  };

  const deleteAlbum = (childData) => {
    const albumIdVal = childData;
    axios(process.env.bossApi + `/media/albums/${albumIdVal}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      isGroup && getAlbums(1, true);
      setResult(result.filter((item) => item.id !== albumIdVal));
      const routeLink = isGroup
        ? `${window.location.origin}${window.location.pathname}?tab=albums`
        : getProfileRoute(curntUserId.name, curntUserId.id, "photos", "albums");
      Router.push(routeLink);
      setAlbumDetailID(null);
    });
  };

  const updateAlbum = (childData, content) => {
    setGroupData(false);
    axios
      .patch(
        process.env.bossApi + `/media/albums/${childData}`,
        {
          id: childData,
          title: content,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        setAlbumDetailID(res.data.album);
        getAlbums(page, true);
        setGroupData(true);
      });
  };

  function getData(childData, album_id) {
    const albumId = childData.map((child) => child.album_id)[0];
    var index = result.findIndex((item) => item.id == albumId);
    const data = result.map((d) => d.media.medias)[index];
    if (albumId != album_id) {
      Array.prototype.push.apply(data, childData);
    }
    result.map((d) => d.media)[index].medias =
      albumId != album_id ? data : childData;
    result.map((d) => d.media)[index].total =
      albumId != album_id ? data.length : childData.length;
    setResult(result);
  }

  function callAlbum(album_Id, photo_Id) {
    var index = result.findIndex((item) => item.id == album_Id);
    const data = result.map((d) => d.media.medias)[index];
    const photoId = data.filter((item) => !photo_Id.includes(item.id));
    result.map((d) => d.media)[index].medias = photoId;
    result.map((d) => d.media)[index].total = photoId.length;
    setResult(result);
  }

  function updatePrivacy(childData, privacy) {
    setGroupData(false);
    axios
      .patch(
        process.env.bossApi + `/media/albums/${childData}`,
        {
          id: childData,
          privacy: privacy,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        var index = result.findIndex((item) => item.id === childData);
        result[index].privacy = res.data.album.privacy;
        setResult(result);
        setGroupData(true);
      });
  }

  function groupCheck() {
    return (
      isGroupMember &&
      ((groupDetails.is_member && role === "members") ||
        (groupDetails.is_member && groupDetails.is_mod && role === "members") ||
        (groupDetails.is_member && groupDetails.is_mod && role === "mods") ||
        groupDetails.is_admin) &&
      isGroup
    );
  }

  if (selAlbumDet && !albumDet)
    return (
        <>
      <AlbumDetail
        selAlbumDet={selAlbumDet}
        setAlbumDetailID={setAlbumDetailID}
        handleDelete={deleteAlbum}
        handleUpdate={updateAlbum}
        parentGroupData={groupData}
        user={user}
        isGroup={isGroup}
        groupId={groupId}
        getData={getData}
        updatePrivacy={updatePrivacy}
        parentCallback={parentCallback}
        isCurntUser={isCurntUser}
        curntUserId={curntUserId}
        callAlbum={callAlbum}
        isFromGroup={isGroup}
        setAlbumDet={setAlbumDet}
        selectedUseDet={selectedUseDet}
      />
        </>
    );

  return (
    <>
      <div className="item-body-inner">
        <div className="d-flex justify-content-between">
          <h2 className="page-title">{isGroup ? "Albums" : ""}</h2>
          {(groupCheck() || !isGroup) && isCurntUser && (
            <CreateAlbum
              user={user}
              parentCallback={handleResponse}
              isGroup={isGroup}
              groupId={groupId}
              getAlbums={getAlbums}
            />
          )}
        </div>
        <div className="pt-2">
          {loadData === false ? (
            <p css={LoaderContainer}>
              <span>
                <FontAwesomeIcon icon={faClock} />
              </span>
              Loading member's albums. Please wait.
            </p>
          ) : null}

          {length == 0 && loadData ? (
            <p css={LoaderContainer}>
              <span>
                <FontAwesomeIcon icon={faClock} />
              </span>
              Sorry, no albums were found.{" "}
            </p>
          ) : null}

          {loadData === true ? (
            <div className="d-flex flex-column flex-fill w-100">
              <InfinitScroll
                dataLength={result.length}
                next={() => result.length && setPage(page + 1)}
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
                  ) : (
                    <p style={{ textAlign: "center" }}>No More Data</p>
                  )
                }
              >
                <Row className="pt-2 mx-0">
                  {result.map((album, index) => {
                    return (
                      <AlbumCard
                        key={album.id}
                        album={album}
                        index={index}
                        isGroup={isGroup}
                        setAlbumDetailID={setAlbumDetailID}
                        parentGroupData={groupData}
                        setAlbumDet={setAlbumDet}
                        isCurntUser={isCurntUser}
                        curntUserId={curntUserId}
                        setReportModalOpen={setReportModalOpen}
                        setSelPhoto={setSelPhoto}
                        setSelPhotoIndex={setSelPhotoIndex}
                      />
                    );
                  })}
                </Row>
              </InfinitScroll>
            </div>
          ) : null}
        </div>
      </div>
      <ReportModal
        show={reportModalShow}
        setReportModalOpen={setReportModalOpen}
        selPhoto={selPhoto}
        user={user}
        title={"Album"}
        setResult={setResult}
        result={result}
        setSelPhoto={setSelPhoto}
        selPhotoIndex={selPhotoIndex}
      />
    </>
  );
}
export default Albums;
