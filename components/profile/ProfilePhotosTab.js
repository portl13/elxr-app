import React, { useState } from "react";
import { PhotoAction } from "@components/livefeed/photo.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  LoaderContainer,
  LoadingBtn,
} from "@components/livefeed/livefeed.style";
import InfinitScroll from "react-infinite-scroll-component";
import { Row, Spinner } from "reactstrap";
import ProfilePhotoCard from "@components/profile/ProfilePhotoCard";
import { useAlert } from "react-alert";
import { TIMEOUT } from "@utils/constant";




function ProfilePhotosTab({ isCurrentUser, data, error, size, setSize, mutate, token }) {
  const alert = useAlert();
  const limit = 20;
  const [selectAllPic, setSelectAllPic] = useState(false);
  const [selectPhotos, setSelectPhotos] = useState([]);



  const photos = data ? [].concat(...data) : [];

  const isLoadingInitialData = !data && !error;

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);

  const loadMore = async () => {
    await setSize(size + 1);
  };

  const addSelectPhoto = (id) => {
    if (isSelected(id)) {
      const selected = selectPhotos.filter((photoID) => photoID !== id);
      setSelectPhotos([...selected]);
      return;
    }

    setSelectPhotos([...selectPhotos, id]);
  };

  const isSelected = (id) => {
    return selectPhotos.includes(id);
  };

  const selectedAllPhotos = () => {
    if (selectAllPic) {
      setSelectAllPic(false);
      setSelectPhotos([]);
      return;
    }
    setSelectAllPic(true);
    const selected = photos.map((photos) => photos.id);
    setSelectPhotos([...selected]);
  };

  const deleteAllPhotos = () => {
    if (!selectAllPic) {
      alert.error("Please select media to delete.", TIMEOUT);
      return;
    }
  };

  return (
    <>
      {isCurrentUser ? (
        <PhotoAction>
          <div className="has-tooltip delete">
            <div className="popover bs-popover-top">
              <div className="arrow"></div>
              <div className="popover-body">Delete</div>
            </div>
            <FontAwesomeIcon
              className={"pointer"}
              icon={faTrash}
              onClick={deleteAllPhotos}
            />
          </div>
          <div className="has-tooltip select">
            <div className="popover bs-popover-top">
              <div className="arrow"></div>
              <div className="popover-body">
                {selectAllPic ? "Unselect All" : "Select All"}
              </div>
            </div>
            <div className="custom-control custom-checkbox">
              <input
                className="custom-control-input"
                id="photo2"
                type="checkbox"
                name="status"
                value="photo2"
                onChange={selectedAllPhotos}
                checked={selectAllPic}
              />
              <label className="custom-control-label" htmlFor="photo2"></label>
            </div>
          </div>
        </PhotoAction>
      ) : null}

      {isLoadingInitialData ? (
        <p css={LoaderContainer}>
          <span>
            <FontAwesomeIcon icon={faClock} />
          </span>
          Loading member's photos. Please wait.
        </p>
      ) : null}

      {!isLoadingInitialData ? (
        <InfinitScroll
          dataLength={photos.length}
          next={loadMore}
          hasMore={!isReachingEnd}
          loader={
            !isLoadingInitialData ? (
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
          <Row className="mx-0">
            {photos &&
              photos?.map((photo) => (
                <ProfilePhotoCard
                  key={photo.id}
                  addSelectPhoto={addSelectPhoto}
                  photo={photo}
                  isCurrentUser={isCurrentUser}
                  isSelected={isSelected}
                  token={token}
                  mutate={mutate}
                />
              ))}
          </Row>
        </InfinitScroll>
      ) : null}
    </>
  );
}

export default ProfilePhotosTab;
