import React from "react";
import { onlyLettersAndNumbers } from "@utils/onlyLettersAndNumbers";
import { Stream } from "@cloudflare/stream-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player";
import PlayerYouTube from "react-player/youtube";
import PlayerVimeo from "react-player/vimeo";
const urlImage = process.env.SubdomainCloudflare;
function VideoContainer({ video, time = "2", isLoading }) {
  if (isLoading) {
    return (
      <div className="ratio ratio-16x9 pointer bg-gray">
        <span className="duration-video">
          <FontAwesomeIcon className="play-icon" icon={faPlay} />
        </span>
      </div>
    );
  }

  return (
    <>
      {video && onlyLettersAndNumbers(video) && (
        <div>
          <Stream
            controls
            src={`${video}`}
            height={"100%"}
            width={"100%"}
            responsive={false}
            className={"ratio ratio-16x9"}
            poster={`https://${urlImage}/${video}/thumbnails/thumbnail.jpg?time=${time}s`}
          />
        </div>
      )}
      {!video && (
        <div className="ratio ratio-16x9 pointer">
          <span className="duration-video">
            <FontAwesomeIcon className="play-icon" icon={faPlay} />
          </span>
        </div>
      )}

      {video &&
        !video.includes("youtu") &&
        !video.includes("vimeo") &&
        !onlyLettersAndNumbers(video) && (
          <div className="ratio ratio-16x9 pointer  cover-bg">
            <span className="duration-video">
              <FontAwesomeIcon className="play-icon" icon={faPlay} />
            </span>
            <ReactPlayer
              url={video}
              width="100%"
              height="100%"
              controls={true}
              muted={true}
              config={{
                file: {
                  attributes: {
                    controlsList: "nodownload", //<- this is the important bit
                  },
                },
              }}
            />
          </div>
        )}

      {video.includes("youtu") && (
        <div className="ratio ratio-16x9 pointer">
          <PlayerYouTube
            width={"100%"}
            height={"100%"}
            url={video}
            config={{
              youtube: {
                playerVars: {
                  controls: 0,
                  showinfo: 0,
                  fs: 0,
                  disablekb: 1,
                  rel: 0,
                  modestbranding: 1,
                },
              },
            }}
          />
        </div>
      )}

      {video.includes("vimeo") && (
        <div className="ratio ratio-16x9 pointer">
          <PlayerVimeo
            width={"100%"}
            height={"100%"}
            url={video}
            config={{
              vimeo: {
                playerOptions: {
                  title: 1,
                  controls: 1,
                  showinfo: 1,
                  autoplay: false,
                  muted: true,
                },
              },
            }}
          />
        </div>
      )}
    </>
  );
}

export default VideoContainer;
