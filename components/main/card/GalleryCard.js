import React from "react";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";

function GalleryCard({ gallery }) {
  return (
    <div className="card-general-new w-100">
      <Link href={`/gallery/${stringToSlug(gallery?.title)}/${gallery.id}`}>
        <a>
          <div
            style={{
              backgroundImage: `url(${gallery?.thumbnail})`,
            }}
            className="ratio ratio-1x1 bg-gray border-radius-17 card-head cover-bg"
          ></div>
        </a>
      </Link>
      <div className="py-3 px-0 courses">
        <h3 className="font-size-12  m-0">
          <Link href={`/gallery/${stringToSlug(gallery?.title)}/${gallery.id}`}>
            <a className="color-font text-ellipsis">{gallery?.title}</a>
          </Link>
        </h3>
        <div className="d-flex flex-column">
          <span className="color-font-grey font-size-13">
            Channel: {gallery?.channel_name}
          </span>
          <span className="color-font-grey font-size-13">
            Category: {gallery?.category}
          </span>
        </div>
      </div>
    </div>
  );
}

export default GalleryCard;
