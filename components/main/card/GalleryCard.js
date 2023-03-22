import React from "react";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";

function GalleryCard({ gallery }) {
  const { creator } = gallery;
  return (
    <div className="card-general-new w-100">
      <Link href={`/gallery/${stringToSlug(gallery?.title)}/${gallery.id}`}>
        <a>
          <div
            style={{
              backgroundImage: `url(${gallery?.thumbnail})`,
            }}
            className="ratio ratio-1x1 bg-gray border-radius-12 card-head cover-bg"
          ></div>
        </a>
      </Link>
      <div className="py-3 px-1 courses">
        <h3 className="title-even-home line-clamp-2 m-0">
          <Link href={`/gallery/${stringToSlug(gallery?.title)}/${gallery.id}`}>
            <a className="color-font">{gallery?.title}</a>
          </Link>
        </h3>
        <div className="d-flex flex-column">
          {creator ? (
            <span className="subtitle-even-home color-font-grey ">
              <Link
                href={`/creator/${stringToSlug(creator.name)}/${creator.id}`}
              >
                <a className={"color-font-grey"}>by {creator.name}</a>
              </Link>
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default GalleryCard;
