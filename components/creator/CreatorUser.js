import React, { useState } from "react";
import useSWR from "swr";
import StickyBox from "react-sticky-box";
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
import AboutTab from "@components/creator/tabs/about/AboutTab";
import CreatorFeaturedVideo from "@components/creator/tabs/home/CreatorFeaturedVideo";
import CreatorChannels from "@components/creator/tabs/home/CreatorChannels";
import CreatorEvents from "@components/creator/tabs/home/CreatorEvents";
import CreatorVideos from "@components/creator/tabs/home/CreatorVideos";
import CreatorPodcasts from "@components/creator/tabs/home/CreatorPodcasts";
import CreatorCourses from "@components/creator/tabs/home/CreatorCourses";
import CreatorBlogs from "@components/creator/tabs/home/CreatorBlogs";
import CreatorGalleries from "@components/creator/tabs/home/CreatorGalleries";
import { getCreator, getFetchPublic } from "@request/creator";
import FollowButton from "@components/shared/button/FollowButton";
import ChannelLiveFeed from "@components/channelEvent/ChannelLiveFeed";
import CreatorAlbum from "@components/creator/tabs/home/CreatorAlbum";
import MusicTab from "@components/creator/tabs/music/MusicTab";
import GalleriesTab from "@components/creator/tabs/galleries/GalleriesTab";
import NonSsrWrapper from "../no-ssr-wrapper/NonSSRWrapper";
import usePortlApi from "@hooks/usePortlApi";
import SubscriptionButtonCreator from "@components/shared/button/SubscriptionButtonCreator";
import CreatorAppointment from "@components/creator/tabs/home/CreatorAppointment";
import AppointmentTab from "@components/creator/tabs/products/AppointmentTab";

const channelUrl = `${process.env.apiV2}/channels?author=`;
const eventUrl = `${process.env.apiV2}/channel-event?author=`;
const videoUrl = `${process.env.apiV2}/video?author=`;
const podcastslUrl = `${process.env.apiV2}/podcasts?author=`;
const albumsUrl = `${process.env.apiV2}/albums?author=`;
const coursesUrl = `${process.env.baseUrl}/wp-json/buddyboss-app/learndash/v1/courses?author=`;
const communitiesUrl = `${process.env.bossApi}/groups`;
const url = `${process.env.apiV2}/blogs?author=`;
const galleriesUrl = `${process.env.apiV2}/gallery?author=`;

const swrConfig = {
  revalidateOnFocus: false,
};

function CreatorUser({ creator, user, creator_id }) {
  const [tab, setTab] = useState("home");

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

  // const { data: products, isLoading: isLoadingProduct, isError } = usePortlApi(
  //   `channel/product/?id=${creator_id}&page=1&per_page=4&type=simple`
  // );

  const {
    data: appointments,
    isLoading,
    isError: isErrorAppointments,
  } = usePortlApi(
    `channel/product/?id=${creator_id}&page=1&type=appointment&per_page=4`
  );

  const { data: galleries, error: errorGallery } = useSWR(
    `${galleriesUrl}${creator_id}&page=1&per_page=4`,
    getFetchPublic,
    swrConfig
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

            {channels?.channels?.length && !errorChanel && (
              <button
                onClick={() => setTab("channels")}
                className={`${
                  tab === "channels" ? "active" : ""
                } btn btn-transparent btn-transparent-grey font-weight-500 py-2 px-3 mr-3`}
              >
                Channels
              </button>
            )}

            {events?.data?.length && !errorEvent && (
              <button
                onClick={() => setTab("events")}
                className={`${
                  tab === "events" ? "active" : ""
                } btn btn-transparent btn-transparent-grey font-weight-500 py-2 px-3 mr-3`}
              >
                Events
              </button>
            )}

            {videos?.videos?.length && !errorVideo && (
              <button
                onClick={() => setTab("videos")}
                className={`${
                  tab === "videos" ? "active" : ""
                } btn btn-transparent btn-transparent-grey font-weight-500 py-2 px-3 mr-3`}
              >
                Videos
              </button>
            )}

            {album?.albums?.length && !errorAlbum && (
              <button
                onClick={() => setTab("music")}
                className={`${
                  tab === "music" ? "active" : ""
                } btn btn-transparent btn-transparent-grey font-weight-500 py-2 px-3 mr-3`}
              >
                Music
              </button>
            )}

            {audios?.audios?.length && !errorAudio && (
              <button
                onClick={() => setTab("podcasts")}
                className={`${
                  tab === "podcasts" ? "active" : ""
                } btn btn-transparent btn-transparent-grey font-weight-500 py-2 px-3 mr-3`}
              >
                Podcasts
              </button>
            )}

            {courses?.length && !errorCourse && (
              <button
                onClick={() => setTab("courses")}
                className={`${
                  tab === "courses" ? "active" : ""
                } btn btn-transparent btn-transparent-grey font-weight-500 py-2 px-3 mr-3`}
              >
                Courses
              </button>
            )}

            {communities?.length && !errorCommunity && (
              <button
                onClick={() => setTab("communities")}
                className={`${
                  tab === "communities" ? "active" : ""
                } btn btn-transparent btn-transparent-grey font-weight-500 py-2 px-3 mr-3`}
              >
                Communities
              </button>
            )}

            {blogs?.blogs?.length && !errorBlog && (
              <button
                onClick={() => setTab("blog")}
                className={`${
                  tab === "blog" ? "active" : ""
                } btn btn-transparent btn-transparent-grey font-weight-500 py-2 px-3 mr-3`}
              >
                Blog
              </button>
            )}

            {/*{products?.length && !isError && (*/}
            {/*  <button*/}
            {/*    onClick={() => setTab("products")}*/}
            {/*    className={`${*/}
            {/*      tab === "products" ? "active" : ""*/}
            {/*    } btn btn-transparent btn-transparent-grey font-weight-500 py-2 px-3 mr-3`}*/}
            {/*  >*/}
            {/*    Products*/}
            {/*  </button>*/}
            {/*)}*/}

            {appointments?.length && !isErrorAppointments && (
              <button
                onClick={() => setTab("appointments")}
                className={`${
                  tab === "appointments" ? "active" : ""
                } btn btn-transparent btn-transparent-grey font-weight-500 py-2 px-3 mr-3`}
              >
                Appointments
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

            {galleries?.galleries.length && !errorGallery && (
              <button
                onClick={() => setTab("galleries")}
                className={`${
                  tab === "galleries" ? "active" : ""
                } btn btn-transparent btn-transparent-grey font-weight-500 py-2 px-3 mr-3`}
              >
                Galleries
              </button>
            )}
          </ScrollTags>
        </div>
      </div>
      <div className="container">
        {tab === "home" && (
          <NonSsrWrapper>
            <div className="row align-items-start">
              <StickyBox
                offsetTop={20}
                offsetBottom={20}
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
                  {/*<CreatorProducts*/}
                  {/*  isLoading={isLoadingProduct}*/}
                  {/*  setTab={setTab}*/}
                  {/*  products={products}*/}
                  {/*/>*/}
                  <CreatorAppointment
                    products={appointments}
                    isLoading={isLoading}
                    setTab={setTab}
                  />
                  <CreatorGalleries
                    galleries={galleries}
                    error={errorGallery}
                    setTab={setTab}
                  />
                </div>
              </StickyBox>
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
        {/*{tab === "products" && <ProductsTab creator_id={creator_id} />}*/}
        {tab === "appointments" && <AppointmentTab creator_id={creator_id} />}
        {tab === "about" && (
          <AboutTab vendor_description={creator?.vendor_description} />
        )}
        {tab === "galleries" && <GalleriesTab creator_id={creator_id} />}
      </div>
    </>
  );
}

export default CreatorUser;
