import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faTrashAlt,
  faEdit
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import DeleteEvent from "./DeleteEvent";

function PastEvents({ event, id, spin, setSpin, parentDelete, closeModal, handleRedirect }) {
  const [deleteModal, setDeleteModal] = useState(false);
  useEffect(() => {
    if (closeModal) {
      setDeleteModal(false);
      setSpin(false);
    }
  }, [closeModal]);
  return (
    <section >
      <div className="columns-head"> 
        <div className="events-div-1">
          <input type="checkbox" />
        </div>
        <div className="events-div-2">
          <img
            src={
              event.thumbnail === ""
                ? "https://data.portl.live/wp-content/uploads/woocommerce-placeholder-150x150.png"
                : event.thumbnail
            }
            alt="image"
          />
          <div className="events-text-tag">
            {event.title}
            <span>Scheduled</span>
          </div>
        </div>
        <div className="events-div-3" data-label="Types">Streaming Software</div>
        <div className="events-div-4" data-label="Date">
          <div>
            <div>
              {moment(event.date_time).format("MMM DD YYYY")} 
            </div>
            <span>Scheduled</span>
          </div>
        </div>
        <div
          className={
            event.visability === "public"
              ? "events-div-5"
              : "events-div-private"
          } data-label="Visibility"
        >
          <div>
            <FontAwesomeIcon
              icon={event.visability === "public" ? faEye : faEyeSlash}
            />
            {event.visability}
          </div>
        </div>
        <div className="events-div-6" data-label="Action">
          <div>
            <span
              onClick={() => {
                setDeleteModal(true);
              }}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </span>
            <span
              onClick={() => handleRedirect("golive", "edit-event", id)}

            >
              <FontAwesomeIcon icon={faEdit} />
            </span>
          </div>
        </div>
      </div>
      {deleteModal && (
        <DeleteEvent
          show={deleteModal}
          setDeleteModal={setDeleteModal}
          id={id}
          parentDelete={parentDelete}
          spin={spin}
          setSpin={setSpin}
        />
      )}
    </section>
  );
}
export default PastEvents;
