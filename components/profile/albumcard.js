import React, { useState } from "react";
import moment from "moment";
import Router from "next/router";
import { Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faEllipsisH, faFlag } from "@fortawesome/free-solid-svg-icons";
import { getProfileRoute } from "@utils/constant";
import { PhotoAction, Media, ContentWrap } from "../livefeed/photo.style";

function AlbumCard({
  album,
  setAlbumDetailID,
  isGroup,
  setAlbumDet,
  isCurntUser,
  curntUserId,
  setReportModalOpen,
  setSelPhoto,
  setSelPhotoIndex,
  index
}) {
  const [display, setDisplay] = useState(false);
  function handleCardDetail(e) {
    setAlbumDetailID(e);
    setAlbumDet(false);
    const route = isGroup ?
      `${window.location.pathname}?tab=albums&albumId=${e.id}` :
      getProfileRoute(curntUserId.name, curntUserId.id, "photos", "albums", e.id)
    Router.push(route);
  }
  const handleReportAlbum = (photos, i) => {
    setReportModalOpen(true)
    setSelPhoto(photos)
    setSelPhotoIndex(i)
  };

  return (
    <>
      <Col sm={4} lg={4} xl={3}>
        <Media>
        {!isCurntUser &&
          <PhotoAction className="media-action">
            <div className="has-tooltip more">
              <div className="popover bs-popover-top">
                <div className="arrow"></div>
                <div className="popover-body">More Action</div>
              </div>
              <div className="circle">
                <FontAwesomeIcon
                  icon={faEllipsisH}
                  onClick={() => setDisplay(true)}
                />
              </div>
            </div>
            {!isCurntUser && display && (
              <div className="more-action-list">
                <ul>
                  <li>
                    <div
                      className="item-link"
                      onClick={() => handleReportAlbum(album, index)} >
                      <FontAwesomeIcon icon={faFlag} />
                      Report Album
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </PhotoAction>
        }
          <a
            onClick={() => handleCardDetail(album)}
            className="media-wrap album-wrap album-wrap-container"
          >
            {album?.media.medias.length === 0 ? null : (
              <img
                className="photo"
                src={album?.media.medias.map((d) => d.attachment_data.full)[0]}
                alt="Photo"
              />
            )}
            <ContentWrap>
              <h4>{album?.title}</h4>
              <span>{moment(album?.date_created).format("MMMM DD, YYYY")}</span>
              <div className="photos-section">
                <FontAwesomeIcon icon={faImage} />
                {album?.media.total}
              </div>
            </ContentWrap>
          </a>
        </Media>
      </Col>
    </>
  );
}
export default AlbumCard;
