import React from "react";
import { stringToSlug } from "@lib/stringToSlug";
import Link from "next/link";

const CardHomeMusic = ({ audio, type }) => {
  return (
      <article className="card-home-music-new mb-3">
        <div>
          <Link href={`/${type}/${stringToSlug(audio.title)}/${audio.id}`}>
            <a>
              <div
                  className="ratio ratio-1x1 bg-gray border-radius-12 cover-bg bg-gray"
                  style={{
                    backgroundImage: `url(${audio.thumbnail || audio.cover})`,
                  }}
              ></div>
            </a>
          </Link>
        </div>
        <div className="px-1 px-md-2 pt-2">
          <h3 className="title-even-home  m-0 line-clamp-2">
            <Link href={`/${type}/${stringToSlug(audio.title)}/${audio.id}`}>
              <a className="color-font">{audio.title}</a>
            </Link>
          </h3>
          {audio?.creator ? (
              <div>
            <span className="subtitle-even-home">
              <Link
                  href={`/professionals/${stringToSlug(audio?.creator?.name)}/${
                      audio?.creator?.id
                  }`}
              >
                <a className="color-font-grey">by {audio?.creator?.name}</a>
              </Link>
            </span>
              </div>
          ) : null}
          <div>
            <span className="date-even-home color-font">{audio.category}</span>
          </div>
        </div>
      </article>
  );
};

export default CardHomeMusic;
