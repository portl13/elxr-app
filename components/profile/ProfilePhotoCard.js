import React, { useState } from "react";
import { Col } from "reactstrap";
import { Media, PhotoAction } from "@components/livefeed/photo.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faFlag,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ProfileDeletePhoto from "@components/profile/ProfileDeletePhoto";

function ProfilePhotoCard({
  photo,
  isCurrentUser,
  isSelected,
  addSelectPhoto,
  token,
  mutate,
}) {
  const [display, setDisplay] = useState(false);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPhotoPage, setShowPhotoPage] = useState(false);
  const [openEditModal, setEditModal] = useState(false);

  function openModal() {
    console.log("hola")
    setShowPhotoPage(true);
  }

  return (
    <>
      <Col sm={4} lg={4} xl={3} className="px-2">
        <Media className={!display ? "" : "show"}>
          <PhotoAction className="media-action">
            <div className="has-tooltip more">
              <div className="popover bs-popover-top">
                <div className="arrow"></div>
                <div className="popover-body">More Action</div>
              </div>
              <div className="circle">
                <FontAwesomeIcon
                  icon={faEllipsisH}
                  onClick={() => setDisplay(!display)}
                />
              </div>
            </div>
            {display && isCurrentUser ? (
              <div className="more-action-list">
                <ul>
                  {/*<li>*/}
                  {/*  <div*/}
                  {/*    className="item-link"*/}
                  {/*    onClick={() => {*/}
                  {/*      setShowModal(true);*/}
                  {/*      setDisplay(false);*/}
                  {/*    }}*/}
                  {/*  >*/}
                  {/*    <FontAwesomeIcon icon={faImages} />*/}
                  {/*    Move*/}
                  {/*  </div>*/}
                  {/*</li>*/}
                  <li>
                    <div className="item-link" onClick={() => setShow(true)}>
                      <FontAwesomeIcon icon={faTrash} />
                      Delete
                    </div>
                  </li>
                </ul>
              </div>
            ) : null}
            {!isCurrentUser && display && (
              <div className="more-action-list">
                <ul>
                  <li>
                    <div className="item-link" onClick={() => {}}>
                      <FontAwesomeIcon icon={faFlag} />
                      Report Photo
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </PhotoAction>
          <div onClick={openModal} className="media-wrap">
            <img
              className="photo"
              src={photo?.attachment_data?.full}
              alt="Photo"
              onMouseOut={() => setDisplay(false)}
            />
          </div>
          {isCurrentUser && (
            <div className="custom-control custom-checkbox select-popover">
              <input
                className="custom-control-input"
                id={"public" + photo.id}
                type="checkbox"
                name={"status" + photo.id}
                value={"public" + photo.id}
                onChange={() => addSelectPhoto(photo.id)}
                checked={isSelected(photo.id)}
              />
              <label
                className="custom-control-label"
                htmlFor={"public" + photo.id}
              ></label>
              <div className="tooltip-panel">
                {!isSelected(photo.id) ? "Select" : "Unselect"}
                <em></em>
              </div>
            </div>
          )}
        </Media>
      </Col>
      <ProfileDeletePhoto
        mutate={mutate}
        token={token}
        photoId={photo.id}
        show={show}
        setShow={setShow}
      />
    </>
  );
}

export default ProfilePhotoCard;
