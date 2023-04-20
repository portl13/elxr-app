import React, {useState, useEffect, useContext} from "react";
import useSWR from "swr";
import TabEvents from "./tabs/events/TabEvents";
import TabVideos from "./tabs/videos/TabVideos";
import TabPodCasts from "./tabs/podcasts/TabPodCasts";
import TabBlogs from "./tabs/blogs/TabBlogs";
import { getCreator } from "@request/creator";
import CreatorEvents from "@components/creator/tabs/home/CreatorEvents";
import CreatorVideos from "@components/creator/tabs/home/CreatorVideos";
import CreatorPodcasts from "@components/creator/tabs/home/CreatorPodcasts";
import TabMusic from "./tabs/music/TabMusic";
import TabGalleries from "./tabs/galleries/TabGalleries";
import { countView } from "@request/shared";
import SeoMetaComponent from "@components/seo/SeoMetaComponent";
import { stringToSlug } from "@lib/stringToSlug";
import CreatorBlogs from "@components/creator/tabs/home/CreatorBlogs";
import CreatorGalleries from "@components/creator/tabs/home/CreatorGalleries";
import ScrollTags from "@components/shared/slider/ScrollTags";
import MainLayout from "@components/main/MainLayout";
import ChannelFeaturedVideo from "@components/main/details/channel/ChannelFeaturedVideo";
import {UserContext} from "@context/UserContext";

const baseUrl = process.env.apiV2;
const eventUrl = `${baseUrl}/channel-event?channel_id=`;
const videoUrl = `${baseUrl}/video?channel_id=`;
const podcastsUrl = `${baseUrl}/podcasts?channel_id=`;
const blogsUrl = `${baseUrl}/blogs?channel_id=`;
const galleriesUrl = `${baseUrl}/gallery?channel_id=`;

function ChannelDetail({ id, channel }) {
  const { user } = useContext(UserContext);
  const [tab, setTab] = useState("home");
  const [filterChannel, setFilterChannel] = useState("desc");
  const [filterUpEvent, setFilterUpEvent] = useState("desc");
  const [filterVideo, setFilterVideo] = useState("desc");
  const [filterPodcasts, setFilterPodcasts] = useState("desc");
  const [filterAlbum, setFilterAlbum] = useState("desc");
  const [filterBlog, setFilterBlog] = useState("desc");
  const [filterGallery, setFilterGallery] = useState("desc");
  const [filterCommunity, setFilterCommunity] = useState("newest");

  const { data: events, error: errorEvent } = useSWR(
    `${eventUrl}${id}&page=1&per_page=5`,
    getCreator
  );

  const { data: videos, error: errorVideo } = useSWR(
    `${videoUrl}${id}&page=1&per_page=5`,
    getCreator
  );

  const { data: audios, error: errorAudio } = useSWR(
    `${podcastsUrl}${id}&page=1&per_page=5`,
    getCreator
  );

  const { data: blogs, error: errorBlog } = useSWR(
    `${blogsUrl}${id}&page=1&per_page=5`,
    getCreator
  );

  const { data: galleries, error: errorGallery } = useSWR(
    `${galleriesUrl}${id}&page=1&per_page=5`,
    getCreator
  );

  useEffect(() => {
    if (id) {
      countView(id).then();
    }
  }, [id]);

  return (
      <MainLayout branding={channel.branding} classNameContainer={"home"}>
        <SeoMetaComponent
            title={channel?.channel_name}
            description={channel?.description}
            titleContent={channel.channel_name}
            image={channel?.channel_cover?.full}
            url={
                process.env.nextSite +
                `/channel/${stringToSlug(channel.channel_name)}/${id}`
            }
        />
        <ChannelFeaturedVideo
            channel={channel}
            about={channel?.channel_description}
            user={user}
        />
        <div className="container container-creator">
          <div className="pt-4">
            <ScrollTags>
              <button
                  onClick={() => setTab("home")}
                  className={`${
                      tab === "home" ? "active" : ""
                  } text-capitalize d-flex justify-content-center category-btn nowrap mr-3`}
              >
                All
              </button>
              {events && events?.data?.length ? (
                  <button
                      onClick={() => setTab("events")}
                      className={`${
                          tab === "events" ? "active" : ""
                      } text-capitalize d-flex justify-content-center category-btn nowrap mr-3`}
                  >
                    Events
                  </button>
              ) : null}
              {videos && videos?.videos?.length ? (
                  <button
                      onClick={() => setTab("videos")}
                      className={`${
                          tab === "videos" ? "active" : ""
                      } text-capitalize d-flex justify-content-center category-btn nowrap mr-3`}
                  >
                    Videos
                  </button>
              ) : null}
              {audios && audios?.audios?.length ? (
                  <button
                      onClick={() => setTab("podcasts")}
                      className={`${
                          tab === "podcasts" ? "active" : ""
                      } text-capitalize d-flex justify-content-center category-btn nowrap mr-3`}
                  >
                    Podcasts
                  </button>
              ) : null}
              {blogs && blogs?.blogs?.length ? (
                  <button
                      onClick={() => setTab("blog")}
                      className={`${
                          tab === "blog" ? "active" : ""
                      } text-capitalize d-flex justify-content-center category-btn nowrap mr-3`}
                  >
                    Writings
                  </button>
              ) : null}
              {galleries && galleries?.galleries?.length ? (
                  <button
                      onClick={() => setTab("galleries")}
                      className={`${
                          tab === "galleries" ? "active" : ""
                      } text-capitalize d-flex justify-content-center category-btn nowrap mr-3`}
                  >
                    Galleries
                  </button>
              ) : null}
            </ScrollTags>
          </div>
        </div>
        <div className="container container-creator">
          <div className="pt-0">
            {tab === "home" && (
                <>
                  <CreatorEvents
                      events={events}
                      isLoading={!events && !errorEvent}
                      setTab={setTab}
                      text={"Upcoming Events"}
                      setFilter={setFilterUpEvent}
                      filter={filterUpEvent}
                  />
                  <CreatorVideos
                      setTab={setTab}
                      videos={videos}
                      isLoading={!videos && !errorVideo}
                      setFilter={setFilterVideo}
                      filter={filterVideo}
                  />
                  <CreatorPodcasts
                      setTab={setTab}
                      audios={audios}
                      isLoading={!audios && !errorAudio}
                      setFilter={setFilterPodcasts}
                      filter={filterPodcasts}
                  />
                  <CreatorBlogs
                      setTab={setTab}
                      blogs={blogs}
                      isLoading={!blogs && !errorBlog}
                      filter={filterBlog}
                      setFilter={setFilterBlog}
                  />
                  <CreatorGalleries
                      setTab={setTab}
                      galleries={galleries}
                      isLoading={!galleries && !errorGallery}
                      filter={filterGallery}
                      setFilter={setFilterGallery}
                  />
                </>
            )}
            {tab === "events" && <TabEvents channel_id={id} />}
            {tab === "videos" && <TabVideos channel_id={id} />}
            {tab === "podcasts" && <TabPodCasts channel_id={id} />}
            {tab === "blog" && <TabBlogs channel_id={id} />}
            {tab === "music" && <TabMusic channel_id={id} />}
            {tab === "galleries" && <TabGalleries channel_id={id} />}
          </div>
        </div>
      </MainLayout>
  );
}

export default ChannelDetail;
