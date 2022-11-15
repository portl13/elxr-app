import React, { useState } from "react";
import SaveButton from "@components/shared/action/SaveButton";
import SharedButton from "@components/shared/action/SharedButton";
import CategoryAndTags from "@components/shared/cards/CategoryAndTags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

function SongDetailCard({ song, play, playMusic }) {
  return (
    <article className="song-card-reponsive">
      <div>
        <div
          className="ratio ratio-1x1  cover-bg bg-gray"
          style={{
            backgroundImage: `url(${song?.thumbnail})`,
          }}
        ></div>
      </div>
      <div className="  pl-lg-3  ">
        <h4 className="font-weight-bold mt-1  mb-0">{song?.title}</h4>
        <h5 className="text-primary m-0">{song?.channel_name}</h5>
        {song && (
          <CategoryAndTags category={song?.category} tags={song?.tags} />
        )}

        <div
          className="mt-3"
          dangerouslySetInnerHTML={{
            __html: song?.content,
          }}
        />
        <div className="mt-2 flex-shrink d-flex justify-content-between align-items-center">
          <div>
            {play ? (
              <button
                onClick={playMusic}
                className="btn  btn-primary radius-sm text-capitalize "
              >
                <i className="pr-2">
                  <FontAwesomeIcon className="icon-setting" icon={faPause} />
                </i>
                Pause
              </button>
            ) : (
              <button
                onClick={playMusic}
                className="btn btn-primary text-capitalize "
              >
                <i className="pr-2">
                  <FontAwesomeIcon className="icon-setting" icon={faPlay} />
                </i>
                Play
              </button>
            )}
          </div>
          <div className="d-flex">
            {song && <SaveButton value={song?.id} type="song" />}
            <SharedButton title={song?.title} />
          </div>
        </div>
      </div>
    </article>
  );
}

export default SongDetailCard;
