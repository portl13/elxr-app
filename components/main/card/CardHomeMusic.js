import React from "react";
import { stringToSlug } from "@lib/stringToSlug";
import Link from "next/link";

const CardHomeMusic = ({ audio, type }) => {
  return (
    <article className="card-home-music ">
      <div className="mr-3">
        <Link href={`/${type}/${stringToSlug(audio.title)}/${audio.id}`}>
          <a className=" pr-1">
            <div
              className="ratio ratio-1x1 width-heigth-150 bg-gray card-head cover-bg bg-gray"
              style={{
                backgroundImage: `url(${audio.thumbnail || audio.cover})`,
              }}
            ></div>
          </a>
        </Link>
      </div>

      <div className="">
        <h3 className="title-music  m-0">
          <Link href={`/${type}/${stringToSlug(audio.title)}/${audio.id}`}>
            <a className="color-font">{audio.title}</a>
          </Link>
        </h3>
        <span className="card-category ">{audio.category}</span>

        <div className="d-flex alig-items-center color-font-grey pt-2">
          <div className="card-avatar-music  "></div>

          <div className="ml-2">
            <h4 className="font-size-12 mb-0">Alan W. Smith</h4>
            <span className="font-size-12">@alan.smith</span>
          </div>
        </div>
        <Link href={`/${type}/${stringToSlug(audio.title)}/${audio.id}`}>
          <a className="card-listen-now mt-3 d-block pointer">Listen Now</a>
        </Link>
      </div>
    </article>
  );
};

export default CardHomeMusic;
