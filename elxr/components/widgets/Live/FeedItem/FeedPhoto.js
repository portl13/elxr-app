import React from "react";

export default function FeedPhoto({ index, bp_media_ids, media }) {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${
            media.attachment_data.full
              ? media.attachment_data.full
              : media.attachment_data.thumb
          })`,
        }}
        className={`bg-cover-feed ratio ratio-1x1 act-grid-1-${index + 1}`}
      >
        {index === 4 && bp_media_ids.length > 5 && (
          <div className="bb-photos-length">
            <span>
              +{bp_media_ids.length - 5}
              {/* <em>More Photos</em> */}
            </span>
          </div>
        )}
      </div>
    </>
  );
}
