import React from "react";
import { stringToSlug } from "@lib/stringToSlug";
import Link from "next/link";

const CardHomeMusic = ({ audio, type }) => {
  return (
    <article className="card-home-music mb-3 border-radius-12">
      <div>
        <Link href={`/${type}/${stringToSlug(audio.title)}/${audio.id}`}>
          <a>
            <div
              className="ratio ratio-1x1 width-height-170 bg-gray card-head cover-bg bg-gray"
              style={{
                backgroundImage: `url(${audio.thumbnail || audio.cover})`,
              }}
            ></div>
          </a>
        </Link>
      </div>
      <div>
        <h3 className="title-music  m-0 line-clamp-2">
          <Link href={`/${type}/${stringToSlug(audio.title)}/${audio.id}`}>
            <a className="color-font">{audio.title}</a>
          </Link>
        </h3>
        <span className="card-category ">{audio.category}</span>

        <div className="d-flex alig-items-center color-font-grey pt-2 ">
          {audio?.author_data ? (
            <>
              <div
                  style={{
                    backgroundImage: `url(${audio?.author_data?.avatar_urls?.thumb})`
                  }}
                  className="card-avatar-music bg-cover d-none d-md-block"></div>
              <div className="ml-2">
                <h4 className="font-size-12 mb-0">{audio?.author_data?.display_name}</h4>
                <span className="font-size-12">@{audio?.author_data?.login_name}</span>
              </div>
            </>
          ) : null}
        </div>
        <Link href={`/${type}/${stringToSlug(audio.title)}/${audio.id}`}>
          <a className="card-listen-now mt-3 d-none d-md-block pointer">Listen Now</a>
        </Link>
      </div>
    </article>
  );
};

export default CardHomeMusic;
