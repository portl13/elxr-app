import React, { useState, useEffect } from "react";
import Router from "next/router";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import useSWR from "swr";
import Meta from "@components/layout/Meta";
import { convertToUTC, getFormatedDateFromDate } from "@utils/dateFromat";
import ArrowLeftIcon from "@icons/ArrowLeftIcon";
import TabEvents from "./tabs/events/TabEvents";
import TabVideos from "./tabs/videos/TabVideos";
import TabPodCasts from "./tabs/podcasts/TabPodCasts";
import TabBlogs from "./tabs/blogs/TabBlogs";
import { getCreator, getFetchPublic } from "@request/creator";
import CreatorEvents from "@components/main/details/channel/tabs/home/CreatorEvents";
import CreatorVideos from "@components/main/details/channel/tabs/home/CreatorVideos";
import CreatorPodcasts from "@components/main/details/channel/tabs/home/CreatorPodcasts";
import ChannelBlogs from "@components/main/details/channel/tabs/home/ChannelBlogs";
import ChannelMusic from "./tabs/home/ChannelMusic";
import ChannelGalleries from "./tabs/home/ChannelGalleries";
import TabMusic from "./tabs/music/TabMusic";
import TabGalleries from "./tabs/galleries/TabGalleries";
import { countView } from "@request/shared";

const baseUrl = process.env.apiV2;
const url = `${baseUrl}/channels/`;
const eventUrl = `${baseUrl}/channel-event?channel_id=`;
const videoUrl = `${baseUrl}/video?channel_id=`;
const podcastsUrl = `${baseUrl}/podcasts?channel_id=`;
const blogsUrl = `${baseUrl}/blogs?channel_id=`;
const musicUrl = `${baseUrl}/albums?channel_id=`;
const galleriesUrl = `${baseUrl}/gallery?channel_id=`;

function ChannelDetail({ id }) {
  const [tab, setTab] = useState("home");

  const { data: channel } = useSWR(`${url}${id}`, getFetchPublic);

  const { data: events, error: errorEvent } = useSWR(
    `${eventUrl}${id}&page=1&per_page=4`,
    getCreator
  );

  const { data: videos, error: errorVideo } = useSWR(
    `${videoUrl}${id}&page=1&per_page=4`,
    getCreator
  );

  const { data: audios, error: errorAudio } = useSWR(
    `${podcastsUrl}${id}&page=1&per_page=4`,
    getCreator
  );

  const { data: blogs, error: errorBlog } = useSWR(
    `${blogsUrl}${id}&page=1&per_page=4`,
    getCreator
  );

  const { data: music, error: errorMusic } = useSWR(
    `${musicUrl}${id}&page=1&per_page=4`,
    getCreator
  );

  const { data: galleries, error: errorGallery } = useSWR(
    `${galleriesUrl}${id}&page=1&per_page=4`,
    getCreator
  );

  useEffect(() => {
    if (id) {
      countView(id).then();
    }
  }, [id]);

  return (
    <>
      <Meta />
      <Head>
        <title>CHANNEL DETAILS</title>
      </Head>
      <div
        style={{ backgroundImage: `url(${channel?.channel_cover?.full})` }}
        className="channel-details cover-bg position-relative"
      >
        <div className="back-icon-channels pointer">
          <span onClick={() => Router.back()}>
            <ArrowLeftIcon className="back-icon p-0" />
          </span>
        </div>
      </div>
      <div className="container container-80">
        <div className="d-flex flex-column flex-md-row">
          <div className="contain-channel-img margin-negative bg-gray position-relative">
            {channel && channel.channel_logo && (
              <img src={channel.channel_logo} alt={channel.channel_name} />
            )}
          </div>
          <div className="pl-md-3 pt-2">
            <div className="d-flex align-items-center pl-md-2 font-size-12 mt-2">
              <h1 className="color-font m-0 font-weight-bold line-height-1 font-size-34 mr-3">
                {channel && channel.channel_name && channel.channel_name}
              </h1>
              <div>
                {channel &&
                  channel.channel_privacy &&
                  channel.channel_privacy === "public" && (
                    <div className="badge badge-pill badge-success d-flex">
                      <span className="badge-icon">
                        <FontAwesomeIcon icon={faLockOpen} />
                      </span>
                      <span className="badge-title">open</span>
                    </div>
                  )}

                {channel &&
                  channel.channel_privacy &&
                  channel.channel_privacy === "private" && (
                    <div className="badge badge-pill badge-danger d-flex">
                      <span className="badge-icon">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                      <span className="badge-title">close</span>
                    </div>
                  )}
              </div>
            </div>
            <div className="pl-2">
              <span className="text-muted font-size-12">
                Created on
                {channel &&
                  channel.date &&
                  getFormatedDateFromDate(
                    convertToUTC(channel?.date),
                    "MMM dd, yyyy"
                  )}
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-4">
            <div className="d-none d-md-flex justify-content-between align-items-center">
              <div className="d-flex">
                <button
                  onClick={() => setTab("home")}
                  className={`${
                    tab === "home" ? "active" : ""
                  } btn btn-transparent font-weight-500 py-1 px-2`}
                >
                  Home
                </button>
                {events && events?.data?.length ? (
                  <button
                    onClick={() => setTab("events")}
                    className={`${
                      tab === "events" ? "active" : ""
                    } btn btn-transparent font-weight-500 py-1 px-2`}
                  >
                    Events
                  </button>
                ) : null}
                {videos && videos?.videos?.length ? (
                  <button
                    onClick={() => setTab("videos")}
                    className={`${
                      tab === "videos" ? "active" : ""
                    } btn btn-transparent font-weight-500 py-1 px-2`}
                  >
                    Videos
                  </button>
                ) : null}
                {audios && audios?.audios?.length ? (
                  <button
                    onClick={() => setTab("podcasts")}
                    className={`${
                      tab === "podcasts" ? "active" : ""
                    } btn btn-transparent font-weight-500 py-1 px-2`}
                  >
                    Podcasts
                  </button>
                ) : null}
                {blogs && blogs?.blogs?.length ? (
                  <button
                    onClick={() => setTab("blog")}
                    className={`${
                      tab === "blog" ? "active" : ""
                    } btn btn-transparent font-weight-500 py-1 px-2`}
                  >
                    Writings
                  </button>
                ) : null}
                {music && music?.albums?.length ? (
                  <button
                    onClick={() => setTab("music")}
                    className={`${
                      tab === "music" ? "active" : ""
                    } btn btn-transparent font-weight-500 py-1 px-2`}
                  >
                    Music
                  </button>
                ) : null}
                <button
                  onClick={() => setTab("about")}
                  className={`${
                    tab === "about" ? "active" : ""
                  } btn btn-transparent font-weight-500 py-1 px-2`}
                >
                  About
                </button>
                {galleries && galleries?.galleries?.length ? (
                  <button
                    onClick={() => setTab("galleries")}
                    className={`${
                      tab === "galleries" ? "active" : ""
                    } btn btn-transparent font-weight-500 py-1 px-2`}
                  >
                    Galleries
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="pt-0">
          {tab === "home" && (
            <>
              <CreatorEvents
                setTab={setTab}
                events={events}
                isLoading={!events && !errorEvent}
              />
              <CreatorVideos
                setTab={setTab}
                videos={videos}
                isLoading={!videos && !errorVideo}
              />
              <CreatorPodcasts
                setTab={setTab}
                audios={audios}
                isLoading={!audios && !errorAudio}
              />
              <ChannelBlogs
                setTab={setTab}
                blogs={blogs}
                isLoading={!blogs && !errorBlog}
              />
              <ChannelMusic
                setTab={setTab}
                music={music}
                isLoading={!music && !errorMusic}
              />
              <ChannelGalleries
                setTab={setTab}
                galleries={galleries}
                isLoading={!galleries && !errorGallery}
              />
            </>
          )}
          {tab === "events" && <TabEvents channel_id={id} />}
          {tab === "videos" && <TabVideos channel_id={id} />}
          {tab === "podcasts" && <TabPodCasts channel_id={id} />}
          {tab === "blog" && <TabBlogs channel_id={id} />}
          {tab === "music" && <TabMusic channel_id={id} />}
          {tab === "about" && (
            <div className="mt-5">
              <p
                dangerouslySetInnerHTML={{
                  __html: channel?.channel_description,
                }}
              />
            </div>
          )}
          {tab === "galleries" && <TabGalleries channel_id={id} />}
        </div>
      </div>
    </>
  );
}

export default ChannelDetail;
