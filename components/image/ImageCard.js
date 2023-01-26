import React, { useState } from "react";
import ImageModal from "@components/image/ImageModal";

function ImageCard({ image }) {
  const [open, setOpen] = useState(false);
  const onHide = () => setOpen(!open)
  return (
    <>
      <div onClick={onHide} className="card-general-new w-100 pointer">
        <div
          style={{
            backgroundImage: `url(${image?.thumbnail})`,
          }}
          className="ratio ratio-1x1 bg-gray border-radius-17 card-head cover-bg"
        ></div>

        <div className="py-3 px-0 courses">
          <h3 className="font-size-12  m-0 color-font text-ellipsis">
            {image?.title}
          </h3>
          <div className="d-flex flex-column">
            <span className="color-font-grey font-size-13">
              Channel: {image?.channel_name}
            </span>
            <span className="color-font-grey font-size-13">
              Category: {image?.category}
            </span>
          </div>
        </div>
      </div>
      <ImageModal onHide={onHide} show={open} image={image} />
    </>
  );
}

export default ImageCard;
