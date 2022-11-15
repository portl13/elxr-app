import SongAuthorCard from "@components/main/card/SongAuthorCard";
import SongDetailCard from "@components/main/card/SongDetailCard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import React, {useContext} from "react";
import useSWR from "swr";
import SongsRelated from "./SongsRelated";
import {UserContext} from "@context/UserContext";

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
          {isLoading ? <SpinnerLoader /> : <SongDetailCard user={user} song={song} />}

          {song && song.author && (
            <SongAuthorCard author={song.author} song={song} />
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
