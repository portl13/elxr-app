import SongAuthorCard from "@components/main/card/SongAuthorCard";
import SongDetailCard from "@components/main/card/SongDetailCard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import React, { useContext, useRef, useState } from "react";
import useSWR from "swr";
import AlbumRelated from "./AlbumRelated";
import { UserContext } from "@context/UserContext";
import AlbumSongList from "@components/album/AlbumSongList";

const baseUrl = process.env.apiV2;
const url = `${baseUrl}/album`;

function AlbumDetail({ id }) {
  const { user } = useContext(UserContext);

  const { data: album, error } = useSWR(`${url}/${id}`, getFetchPublic);

  const isLoading = !album && !error;

  return (
    <div className="container">
      <div className="row">
        <div className="col-12  col-xl-10">
          {isLoading ? (
            <SpinnerLoader />
          ) : (
            <SongDetailCard song={album} user={user} />
          )}

          {album && album.author && (
            <SongAuthorCard author={album.author} song={album} />
          )}
        </div>

        <div className="col-12  col-xl-2">
          <div className="relative-items mt-4 mt-md-0">
            <h4 className="text-center text-capitazice">More like this</h4>
            {album && <AlbumRelated category={album?.category_id} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumDetail;
