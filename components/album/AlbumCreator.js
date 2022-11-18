import React from "react";
import { css } from "@emotion/core";
import AuthButtons from "@components/home/AuthButtons";
import SubscriptionButton from "@components/shared/button/SubscriptionButton";
import Link from "next/link";
import {stringToSlug} from "@lib/stringToSlug";

const albumCss = css`
  .single-song {
    display: grid;
    grid-template-columns: auto 1fr auto;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 20px 0;
    .index {
      padding-right: 30px;
    }
    .title {
      font-size: 14px;
    }
    .duration {
    }
  }
`;

function AlbumCreator({ album, user, status,vendor_id }) {
  const formatMin = (songs) => {
    const min = songs.map((e) => e.song.length).reduce((p, c) => p + c, 0) / 60;
    return Math.floor(min);
  };
  return (
    <section css={albumCss} className={"row mb-5 mt-5"}>
      <div className="col-3">
        <div
          className="ratio ratio-1x1  cover-bg bg-gray border-radius-17"
          style={{
            backgroundImage: `url(${album?.thumbnail})`,
          }}
        ></div>
        <div className={"mt-3 text-uppercase font-size-14 text-muted"}>
          <span className={"song-length"}>{album?.songs?.length} songs,</span>
          <span> {formatMin(album.songs)} minutes</span>
        </div>
      </div>
      <div className="col-9">
        <h3 className={"font-size-22 mb-2"}>
            <Link href={`/album/${stringToSlug(album.title)}/${album.id}`}>
                {album.title}
            </Link>
        </h3>
        <span className={"d-block mb-4 text-muted text-uppercase font-size-12"}>
          {album.category}
        </span>
        {album?.songs.length > 0
          ? album?.songs?.map((song, index) => (
              <div className="single-song" key={song.id}>
                <span className="index text-muted">{index + 1}</span>
                <span className="title">{song.title}</span>
                <span className="duration text-muted">
                  {song?.song?.length_formatted}
                </span>
              </div>
            ))
          : null}
        {status === "unauthenticated" &&
        status !== "loading" &&
        album.type === "subscribers" ? (
          <>
            this content is private and only available to users of the platform.
            <AuthButtons classNameContainer={"mt-2"} />
          </>
        ) : null}
          {user && !album?.is_subscribed ? (
              <SubscriptionButton vendor_id={vendor_id} user={user} />
          ) : null}
      </div>
    </section>
  );
}

export default AlbumCreator;
