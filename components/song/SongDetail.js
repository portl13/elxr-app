import SongDetailCard from "@components/main/card/SongDetailCard";
import { getFetchPublic } from "@request/creator";
import React, {useContext} from "react";
import useSWR from "swr";
import SongsRelated from "./SongsRelated";
import {UserContext} from "@context/UserContext";
import ChannelCardMedia from "@components/video/ChannelCardMedia";
import SkeletonMusic from "@components/SkeletonLoading/music/SkeletonMusic";

const baseUrl = process.env.apiV2;
const url = `${baseUrl}/song`;

function SongDetail({ id }) {
  const {user} = useContext(UserContext)
  const { data: song, error } = useSWR(`${url}/${id}`, getFetchPublic);
  const isLoading = !song && !error;
  return (
    <div className="container">
      <div className="row">
        <div className="col-12  col-xl-10">
          {isLoading ? <SkeletonMusic /> : <SongDetailCard user={user} song={song} />}
          {song && song.author && (
            <ChannelCardMedia author={song.author} is_subscribed={song?.is_subscribed} />
          )}
        </div>
        <div className="col-12  col-xl-2">
          <div className="relative-items mt-4 mt-md-0">
            <h4 className="text-center text-capitazice">More like this</h4>
            {song && <SongsRelated category={song?.category_id} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongDetail;
