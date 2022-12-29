import React, { useState } from "react";
import SubscriptionButton from "@components/shared/button/SubscriptionButton";
import ScrollTags from "@components/shared/slider/ScrollTags";
import CreatorCategory from "./CreatorCategory";
import CreatorSocialList from "./CreatorSocialList";
import ChannelsTab from "@components/creator/tabs/channels/ChannelsTab";
import EventsTab from "@components/creator/tabs/events/EventsTab";
import VideosTab from "@components/creator/tabs/videos/VideosTab";
import PodcastsTab from "@components/creator/tabs/podcasts/PodcastsTab";
import CoursesTab from "@components/creator/tabs/courses/CoursesTab";
import CommunitiesTab from "@components/creator/tabs/communities/CommunitiesTabs";
import BlogsTab from "@components/creator/tabs/blog/BlogsTab";
import ProductsTab from "@components/creator/tabs/products/ProductsTab";
import AboutTab from "@components/creator/tabs/about/AboutTab";
import CreatorFeaturedVideo from "@components/creator/tabs/home/CreatorFeaturedVideo";
import CreatorChannels from "@components/creator/tabs/home/CreatorChannels";
import CreatorEvents from "@components/creator/tabs/home/CreatorEvents";
import CreatorVideos from "@components/creator/tabs/home/CreatorVideos";
import CreatorPodcasts from "@components/creator/tabs/home/CreatorPodcasts";
import CreatorCourses from "@components/creator/tabs/home/CreatorCourses";
import CreatorBlogs from "@components/creator/tabs/home/CreatorBlogs";
import { getCreator, getFetchPublic } from "@request/creator";
import FollowButton from "@components/shared/button/FollowButton";
import ChannelLiveFeed from "@components/channelEvent/ChannelLiveFeed";
import CreatorAlbum from "@components/creator/tabs/home/CreatorAlbum";
import MusicTab from "@components/creator/tabs/music/MusicTab";
import useSWR from "swr";
import NonSsrWrapper from "../no-ssr-wrapper/NonSSRWrapper";
import usePortlApi from "@hooks/usePortlApi";
import CreatorProducts from "@components/creator/tabs/home/CreatorProducts";
import { useStickyBox } from "react-sticky-box";
import SubscriptionButtonCreator from "@components/shared/button/SubscriptionButtonCreator";

const channelUrl = `${process.env.apiV2}/channels?author=`;
const eventUrl = `${process.env.apiV2}/channel-event?author=`;
const videoUrl = `${process.env.apiV2}/video?author=`;
const podcastslUrl = `${process.env.apiV2}/podcasts?author=`;
const albumsUrl = `${process.env.apiV2}/albums?author=`;
const coursesUrl = `${process.env.baseUrl}/wp-json/buddyboss-app/learndash/v1/courses?author=`;
const communitiesUrl = `${process.env.bossApi}/groups`;
const url = `${process.env.apiV2}/blogs?author=`;

const swrConfig = {
  revalidateOnFocus: false,
};

function CreatorUser({ creator, user, creator_id }) {
  const [tab, setTab] = useState("home");
  const stickyRef = useStickyBox({ offsetTop: 20, offsetBottom: 20 });

  const { data: channels, error: errorChanel } = useSWR(
    `${channelUrl}${creator_id}&page=1&per_page=3`,
    getCreator,
    swrConfig
  );

  const { data: events, error: errorEvent } = useSWR(
    `${eventUrl}${creator_id}&page=1&per_page=3&date_filter=upcoming`,
    getCreator,
    swrConfig
  );
  const { data: pastEvents, error: errorPastEvents } = useSWR(
    `${eventUrl}${creator_id}&page=1&per_page=3&date_filter=past`,
    getCreator,
    swrConfig
  );
  if (pastEvents){
    console.log(pastEvents)
  }

  const { data: videos, error: errorVideo } = useSWR(
    `${videoUrl}${creator_id}&page=1&per_page=3`,
    getCreator,
    swrConfig
  );

  const { data: audios, error: errorAudio } = useSWR(
    `${podcastslUrl}${creator_id}&page=1&per_page=3`,
    getCreator,
    swrConfig
  );

  const { data: album, error: errorAlbum } = useSWR(
    `${albumsUrl}${creator_id}&page=1&per_page=4`,
    getCreator,
    swrConfig
  );

  const { data: courses, error: errorCourse } = useSWR(
    `${coursesUrl}${creator_id}&page=1&per_page=4`,
    getCreator,
    swrConfig
  );

  const { data: communities, error: errorCommunity } = useSWR(
    `${communitiesUrl}?page=1&per_page=3&user_id=${creator_id}&scope=personal`,
    getFetchPublic,
    swrConfig
  );

  const { data: blogs, error: errorBlog } = useSWR(
    `${url}${creator_id}&page=1&per_page=4`,
    getFetchPublic,
    swrConfig
  );

  const { data: products } = usePortlApi(
    `channel/product/?id=${creator_id}&page=1&per_page=4&type=simple`
  );

  return (
    <>
      <div className="container container-80">
        <div className="d-flex flex-column flex-md-row">
          <div
            style={{
              backgroundImage: `url(${
                creator?.vendor_shop_logo ? creator?.vendor_shop_logo : ""
              })`,
            }}
            className="contain-channel-img margin-negative bg-gray position-relative cover-bg"
          ></div>
          <div className="pl-md-3 pt-2">
            <div className="d-flex align-items-center pl-md-2 font-size-12 mt-2">
              <h1 className="m-0 color-font font-weight-bold line-height-1 font-size-34 mr-3">
                {creator &&
                  creator.vendor_shop_name &&
                  creator.vendor_shop_name}
              </h1>
            </div>
            <div className="pl-2 pt-2">
              {creator_id && <CreatorCategory id={creator_id} />}
            </div>
          </div>
        </div>

        <div className="pt-3 pt-md-5">
          <div className="col-12 px-0">
            <div className="d-flex flex-column flex-md-row justify-content-end  align-items-left  align-items-md-center">
              <div className="d-flex  align-items-center mr-4 mb-3 mb-md-0">
                {creator && <CreatorSocialList social={creator.social} />}
              </div>
              <div className="d-flex">
                <div className="position-relative mr-3">
                  {creator && creator.vendor_id && (
                    <FollowButton user_id={creator.vendor_id} />
                  )}
                </div>
                <div className="position-relative">
                  <SubscriptionButtonCreator
                    user={user}
                    vendor_id={creator?.vendor_id}
                    subscription_id={creator?.subscription_id}
                    is_subscriber={creator?.is_subscribed}
                    is_following={creator?.is_following}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <ScrollTags>
            <button
              onClick={() => setTab("home")}
              className={`${
                tab === "home" ? "active" : ""
              } btn btn-transparent btn-transparent-grey font-weight-500 py-2 px-3 mr-3`}
            >
              Home
            </button>

            {channels && !errorChanel && (
              <button
                onClick={() => setTab("channels")}
                className={`${
                  tab === "channels" ? "active" : ""
                } btn btn-transparent btn-transparent-grey font-weight-500 py-2 px-3 mr-3`}
              >
                Channels
              </button>
            )}

            {events && !errorEvent && (
              <button
                onClick={() => setTab("events")}
                className={`${
                  tab === "events" ? "active" : ""
                } btn btn-transparent btn-transparent-grey font-weight-500 py-2 px-3 mr-3`}
              >
                Events
              </button>
            )}

            {videos && !errorVideo && (
              <button
                onClick={() => setTab("videos")}
                className={`${
                  tab === "videos" ? "active" : ""
                } btn btn-transparent btn-transparent-grey font-weight-500 py-2 px-3 mr-3`}
              >
                Videos
              </button>
            )}

            {album && !errorAlbum && (
              <button
                onClick={() => setTab("music")}
                className={`${
                  tab === "music" ? "active" : ""
                } btn btn-transparent btn-transparent-grey font-weight-500 py-2 px-3 mr-3`}
              >
                Music
              </button>
            )}

            {audios && !errorAudio && (
              <button
                onClick={() => setTab("podcasts")}
                className={`${
                  tab === "podcasts" ? "active" : ""
                } btn btn-transparent btn-transparent-grey font-weight-500 py-2 px-3 mr-3`}
              >
                Podcasts
              </button>
            )}

            {courses && !errorCourse && (
              <button
                onClick={() => setTab("courses")}
                className={`${
                  tab === "courses" ? "active" : ""
                } btn btn-transparent btn-transparent-grey font-weight-500 py-2 px-3 mr-3`}
              >
                Courses
              </button>
            )}

            {communities && !errorCommunity && (
              <button
                onClick={() => setTab("communities")}
                className={`${
                  tab === "communities" ? "active" : ""
                } btn btn-transparent btn-transparent-grey font-weight-500 py-2 px-3 mr-3`}
              >
                Communities
              </button>
            )}

            {blogs && !errorBlog && (
              <button
                onClick={() => setTab("blog")}
                className={`${
                  tab === "blog" ? "active" : ""
                } btn btn-transparent btn-transparent-grey font-weight-500 py-2 px-3 mr-3`}
              >
                Blog
              </button>
            )}

            {products && (
              <button
                onClick={() => setTab("products")}
                className={`${
                  tab === "products" ? "active" : ""
                } btn btn-transparent btn-transparent-grey font-weight-500 py-2 px-3 mr-3`}
              >
                Products
              </button>
            )}

            {creator?.vendor_description && (
              <button
                onClick={() => setTab("about")}
                className={`${
                  tab === "about" ? "active" : ""
                } btn btn-transparent btn-transparent-grey font-weight-500 py-2 px-3 mr-3`}
              >
                About
              </button>
            )}
          </ScrollTags>
        </div>
      </div>

      <div className="container">
        {tab === "home" && (
          <NonSsrWrapper>
            <div className="row align-items-start">
              <div
                ref={stickyRef}
                className="creator-home-left col-12 col-lg-6"
              >
                <div className="position-sticky">
                  <CreatorFeaturedVideo
                    creator={creator}
                    about={creator?.vendor_description}
                    setTab={setTab}
                  />
                  <CreatorChannels
                    channels={channels}
                    isLoading={!channels && !errorChanel}
                    setTab={setTab}
                  />
                  <CreatorEvents
                    events={events}
                    isLoading={!events && !errorEvent}
                    setTab={setTab}
                    text={"Upcoming Events"}
                  />
                  <CreatorEvents
                    events={pastEvents}
                    isLoading={!pastEvents && !errorPastEvents}
                    setTab={setTab}
                    text={"Past Events"}
                  />
                  <CreatorCourses
                    courses={courses}
                    isLoading={!courses && !errorCourse}
                    setTab={setTab}
                  />
                  <CreatorVideos
                    videos={videos}
                    isLoading={!videos && !errorVideo}
                    setTab={setTab}
                  />
                  <CreatorPodcasts
                    audios={audios}
                    isLoading={!audios && !errorAudio}
                    setTab={setTab}
                  />
                  <CreatorAlbum
                    albums={album}
                    isLoading={!album && !errorAlbum}
                    setTab={setTab}
                  />
                  <CreatorBlogs
                    blogs={blogs}
                    error={errorBlog}
                    setTab={setTab}
                  />
                  <CreatorProducts setTab={setTab} products={products} />
                </div>
              </div>
              <div className="creator-home-feed col-12 col-lg-6 pb-5">
                <ChannelLiveFeed title={"Latest Posts"} user_id={creator_id} />
              </div>
            </div>
          </NonSsrWrapper>
        )}
        {tab === "channels" && <ChannelsTab creator_id={creator_id} />}
        {tab === "events" && <EventsTab creator_id={creator_id} />}
        {tab === "videos" && <VideosTab creator_id={creator_id} />}
        {tab === "podcasts" && <PodcastsTab creator_id={creator_id} />}
        {tab === "music" && <MusicTab creator_id={creator_id} />}
        {tab === "courses" && <CoursesTab creator_id={creator_id} />}
        {tab === "communities" && <CommunitiesTab creator_id={creator_id} />}
        {tab === "blog" && <BlogsTab creator_id={creator_id} />}
        {tab === "products" && <ProductsTab creator_id={creator_id} />}
        {tab === "about" && (
          <AboutTab vendor_description={creator?.vendor_description} />
        )}
      </div>
    </>
  );
}

export default CreatorUser;
