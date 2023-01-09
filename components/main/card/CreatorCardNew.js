import React from "react";
import { stringToSlug } from "@lib/stringToSlug";
import Link from "next/link";
import { preload } from "swr";
import { genericFetch } from "@request/creator";

function CreatorCardNew({ creator }) {
  const preFetchCreator = () => {
    preload(
      `${process.env.bossApi}/activity?per_page=20&page=1&scope=just-me&user_id=${creator.id}`,
      genericFetch
    );
  };

  return (
    <article onMouseEnter={preFetchCreator}>
      <Link
        href={`/creator/${stringToSlug(creator?.display_name)}/${creator.id}`}
      >
        <a className="z-index">
          <div className="card-avatar-center bg-gray ratio ratio-1x1">
            {creator?.vendor_shop_logo && creator?.vendor_shop_logo && (
              <img
                src={creator?.vendor_shop_logo}
                alt={creator?.display_name}
                className="ratio ratio-1x1"
              />
            )}
          </div>
        </a>
      </Link>
      <h3 className="card-title  text-center mt-2 mt-md-3">
        <Link
          href={`/creator/${stringToSlug(creator?.display_name)}/${creator.id}`}
        >
          <a className="color-font text-ellipsis">
            {creator && creator.vendor_shop_name && creator.vendor_shop_name}
          </a>
        </Link>
      </h3>
    </article>
  );
}

export default CreatorCardNew;
