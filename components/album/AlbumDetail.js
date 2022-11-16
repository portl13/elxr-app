import SongDetailCard from "@components/main/card/SongDetailCard";
import { getFetchPublic } from "@request/creator";
import React, { useContext } from "react";
import useSWR from "swr";
import AlbumRelated from "./AlbumRelated";
import { UserContext } from "@context/UserContext";
import SkeletonMusic from "@components/SkeletonLoading/music/SkeletonMusic";
import ChannelCardMedia from "@components/video/ChannelCardMedia";

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
            <SkeletonMusic />
          ) : (
            <SongDetailCard song={album} user={user} />
          )}

          {album && album.author && (
            <ChannelCardMedia author={album.author} is_subscribed={album?.is_subscribed} />
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
