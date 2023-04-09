import React, { useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MediaLibrary from "@components/MediaLibrary/MediaLibrary";

function MediaLibraryLogo({
  selectMedia,
  cover,
  reset,
  text,
  token,
  error = null,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={`border-moteado d-flex justify-content-center align-items-center ${className} ${
          !cover?.url ? "py-3" : ""
        } overflow-hidden`}
      >
        {!cover?.url && (
          <div
            onClick={() => setOpen(true)}
            className=" position-relative d-flex justify-content-center align-items-center pointer"
          >
            <div className={`upload-image-info text-center p-0`}>
              <p className="upload-cover-info m-0">{text}</p>
              <span className="upload-info">175px x 40px</span>
              {error ? <div className="text-danger">{error}</div> : null}
            </div>
          </div>
        )}

        {cover && cover?.url && (
          <div
            style={{
              minHeight: 70,
              maxHeight: 81,
              overflow: "hidden",
            }}
            className={`position-relative d-flex justify-content-center align-items-center ${className}`}
          >
            <button
              onClick={reset}
              className="btn btn-clean-media banner center-flex"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <img
              src={cover.url}
              className={"img-fluid"}
              alt={"logo-branding"}
            />
          </div>
        )}
      </div>
      {token && open && (
        <MediaLibrary
          token={token}
          show={open}
          onHide={() => setOpen(!open)}
          selectMedia={selectMedia}
          media_type={"image"}
        />
      )}
    </>
  );
}

export default MediaLibraryLogo;
