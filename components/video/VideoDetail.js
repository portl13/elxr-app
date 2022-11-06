import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import { getFetchPublic } from "@request/creator";
import React from "react";
import useSWR from "swr";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPlayer from "react-player";
import PlayerYouTube from "react-player/youtube";
import PlayerVimeo from "react-player/vimeo";
import VideoRelated from "./VideoRelated";
import Head from "next/head";
import ChannelCardMedia from "./ChannelCardMedia";
import CategoryAndTags from "@components/shared/cards/CategoryAndTags";
import SaveButton from "@components/shared/action/SaveButton";
import CreatedButton from "@components/shared/action/CreatedButton";
import SharedButton from "@components/shared/action/SharedButton";
import { onlyLettersAndNumbers } from "@utils/onlyLettersAndNumbers";
import { Stream } from "@cloudflare/stream-react";

const videourl = `${process.env.apiV2}/video`;

function VideoDetail({ id }) {
  const { data: video } = useSWR(`${videourl}/${id}`, getFetchPublic);
  return (
    <MainLayout sidebar={<MainSidebar />}>
      <Head>
        <title>PORTL | {video?.title}</title>
      </Head>
      <article className="container-media">
        <div className="main-item">
          {video?.video && onlyLettersAndNumbers(video?.video) && (
            <div>
              <Stream
                controls
                src={video.video}
                height={"100%"}
                width={"100%"}
                responsive={false}
                className={"ratio ratio-16x9"}
              />
            </div>
          )}
          {!video?.video && (
            <div className="ratio ratio-16x9 pointer">
              <span className="duration-video">
                <FontAwesomeIcon className="play-icon" icon={faPlay} />
              </span>
            </div>
          )}

          {video?.video &&
            !video?.video.includes("youtu") &&
            !video?.video.includes("vimeo") &&
            !onlyLettersAndNumbers(video?.video) && (
              <div className="ratio ratio-16x9 pointer  cover-bg">
                <span className="duration-video">
                  <FontAwesomeIcon className="play-icon" icon={faPlay} />
                </span>
                <ReactPlayer
                  url={video?.video}
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

          {video?.video.includes("youtu") && (
            <div className="ratio ratio-16x9 pointer">
              <PlayerYouTube
                width={"100%"}
                height={"100%"}
                url={video?.video}
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

          {video?.video.includes("vimeo") && (
            <div className="ratio ratio-16x9 pointer">
              <PlayerVimeo
                width={"100%"}
                height={"100%"}
                url={video?.video}
                config={{
                  vimeo: {
                    playerOptions: {
                      title: 1,
                      controls: 1,
                      showinfo: 1,
                      autoplay: false,
                      muted: true
                    },
                  },
                }}
              />
            </div>
          )}
          <div className="d-flex flex-column flex-md-row w-100 justify-content-between">
            <h4 className="font-weight-bold mt-4 mb-2 flex-grow">
              {video?.title}
            </h4>
            <div className="flex-shrink d-flex align-items-center">
              {video && <SaveButton value={video?.id} type="video" />}
              <SharedButton title={video?.title} />
            </div>
          </div>

          {video && (
            <CategoryAndTags category={video.category} tags={video.tags} />
          )}
          <div
            className="mt-3"
            dangerouslySetInnerHTML={{
              __html: video?.description,
            }}
          />

          {video && video.author && (
            <ChannelCardMedia author={video.author} />
          )}
        </div>
        <div className="relative-items mt-4 mt-md-0">
          <h4 className="text-center text-uppercase font-size-18">
            More videos like this
          </h4>
          {video && <VideoRelated category={video?.category_id} />}
        </div>
      </article>
    </MainLayout>
  );
}

export default VideoDetail;
