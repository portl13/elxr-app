import React, { useState } from "react"
import useSWR from "swr"
import ScrollTags from "@components/shared/slider/ScrollTags"
import ChannelsTab from "@components/creator/tabs/channels/ChannelsTab"
import EventsTab from "@components/creator/tabs/events/EventsTab"
import VideosTab from "@components/creator/tabs/videos/VideosTab"
import PodcastsTab from "@components/creator/tabs/podcasts/PodcastsTab"
import CoursesTab from "@components/creator/tabs/courses/CoursesTab"
import CommunitiesTab from "@components/creator/tabs/communities/CommunitiesTabs"
import BlogsTab from "@components/creator/tabs/blog/BlogsTab"
import AboutTab from "@components/creator/tabs/about/AboutTab"
import CreatorChannels from "@components/creator/tabs/home/CreatorChannels"
import CreatorEvents from "@components/creator/tabs/home/CreatorEvents"
import CreatorVideos from "@components/creator/tabs/home/CreatorVideos"
import CreatorPodcasts from "@components/creator/tabs/home/CreatorPodcasts"
import CreatorCourses from "@components/creator/tabs/home/CreatorCourses"
import CreatorBlogs from "@components/creator/tabs/home/CreatorBlogs"
import CreatorGalleries from "@components/creator/tabs/home/CreatorGalleries"
import { getCreator, getFetchPublic } from "@request/creator"
import ChannelLiveFeed from "@components/channelEvent/ChannelLiveFeed"
import GalleriesTab from "@components/creator/tabs/galleries/GalleriesTab"
import NonSsrWrapper from "../no-ssr-wrapper/NonSSRWrapper"
import usePortlApi from "@hooks/usePortlApi"
import CreatorAppointment from "@components/creator/tabs/home/CreatorAppointment"
import AppointmentTab from "@components/creator/tabs/products/AppointmentTab"
import CreatorCommunities from "./tabs/home/CreatorCommunities"
import CreatorProducts from "./tabs/home/CreatorProducts"
import ProductsTab from "./tabs/products/ProductsTab"

const channelUrl = `${process.env.apiV2}/channels?author=`
const eventUrl = `${process.env.apiV2}/channel-event?author=`
const videoUrl = `${process.env.apiV2}/video?author=`
const podcastslUrl = `${process.env.apiV2}/podcasts?author=`
const coursesUrl = `${process.env.baseUrl}/wp-json/buddyboss-app/learndash/v1/courses?author=`
const communitiesUrl = `${process.env.bossApi}/groups`
const url = `${process.env.apiV2}/blogs?author=`
const galleriesUrl = `${process.env.apiV2}/gallery?author=`
const wcfmApiURl = process.env.baseUrl + "/wp-json/portl/v1/channel/product/"

const swrConfig = {
  revalidateOnFocus: false,
}

function CreatorUser({ creator, user, creator_id }) {
  const { groups_id = [] } = creator
  const has_group = groups_id.length > 0
  const [tab, setTab] = useState("home")
  const [filterChannel, setFilterChannel] = useState("desc")
  const [filterUpEvent, setFilterUpEvent] = useState("desc")
  const [filterPastEvent, setFilterPastEvent] = useState("desc")
  const [filterVideo, setFilterVideo] = useState("desc")
  const [filterPodcasts, setFilterPodcasts] = useState("desc")
  const [filterAlbum, setFilterAlbum] = useState("desc")
  const [filterBlog, setFilterBlog] = useState("desc")
  const [filterGallery, setFilterGallery] = useState("desc")
  const [filterCommunity, setFilterCommunity] = useState("newest")

  const { data: channels, error: errorChanel } = useSWR(
    `${channelUrl}${creator_id}&page=1&per_page=5`,
    getCreator,
    swrConfig
  )

  const { data: events, error: errorEvent } = useSWR(
    `${eventUrl}${creator_id}&page=1&per_page=5&date_filter=upcoming`,
    getCreator,
    swrConfig
  )

  const { data: videos, error: errorVideo } = useSWR(
    `${videoUrl}${creator_id}&page=1&per_page=5`,
    getCreator,
    swrConfig
  )

  const { data: audios, error: errorAudio } = useSWR(
    `${podcastslUrl}${creator_id}&page=1&per_page=5`,
    getCreator,
    swrConfig
  )



  const { data: courses, error: errorCourse } = useSWR(
    `${coursesUrl}${creator_id}&page=1&per_page=5`,
    getCreator,
    swrConfig
  )

  const {
    data: communities,
    error: errorCommunity,
    isLoading: isLoadingCommunity,
  } = useSWR(
    has_group
      ? `${communitiesUrl}?page=1&per_page=20&user_id=${creator_id}&scope=personal&include=${groups_id.join(
          ","
        )}`
      : null,
    getFetchPublic,
    swrConfig
  )

  const { data: blogs, error: errorBlog } = useSWR(
    `${url}${creator_id}&page=1&per_page=5`,
    getFetchPublic,
    swrConfig
  )


  const {
    data: appointments,
    isLoading,
    isError: isErrorAppointments,
  } = usePortlApi(
    `channel/product/?id=${creator_id}&page=1&type=appointment&per_page=4`
  )

  const { data: galleries, error: errorGallery } = useSWR(
    `${galleriesUrl}${creator_id}&page=1&per_page=4`,
    getFetchPublic,
    swrConfig
  )

  const {
    data: products,
    error: errorProduct,
    isLoading: isLoadingProduct,
  } = useSWR(
    `${wcfmApiURl}?page=1&id=${creator_id}&per_page=6&status="publish"&type=simple`,
    getFetchPublic
  )

  return (
    <>
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

            {channels?.channels?.length && !errorChanel && (
              <button
                onClick={() => setTab("channels")}
                className={`${
                  tab === "channels" ? "active" : ""
                } text-capitalize d-flex justify-content-center category-btn nowrap mr-3`}
              >
                Channels
              </button>
            )}

            {events?.data?.length && !errorEvent && (
              <button
                onClick={() => setTab("events")}
                className={`${
                  tab === "events" ? "active" : ""
                } text-capitalize d-flex justify-content-center category-btn nowrap mr-3`}
              >
                Events
              </button>
            )}

            {videos?.videos?.length && !errorVideo && (
              <button
                onClick={() => setTab("videos")}
                className={`${
                  tab === "videos" ? "active" : ""
                } text-capitalize d-flex justify-content-center category-btn nowrap mr-3`}
              >
                Videos
              </button>
            )}

            {audios?.audios?.length && !errorAudio && (
              <button
                onClick={() => setTab("podcasts")}
                className={`${
                  tab === "podcasts" ? "active" : ""
                } text-capitalize d-flex justify-content-center category-btn nowrap mr-3`}
              >
                Podcasts
              </button>
            )}

            {courses?.length && !errorCourse && (
              <button
                onClick={() => setTab("courses")}
                className={`${
                  tab === "courses" ? "active" : ""
                } text-capitalize d-flex justify-content-center category-btn nowrap mr-3`}
              >
                Courses
              </button>
            )}

            {communities?.length && !errorCommunity && (
              <button
                onClick={() => setTab("communities")}
                className={`${
                  tab === "communities" ? "active" : ""
                } text-capitalize d-flex justify-content-center category-btn nowrap mr-3`}
              >
                Communities
              </button>
            )}

            {blogs?.blogs?.length && !errorBlog && (
              <button
                onClick={() => setTab("blog")}
                className={`${
                  tab === "blog" ? "active" : ""
                } text-capitalize d-flex justify-content-center category-btn nowrap mr-3`}
              >
                Writings
              </button>
            )}

            {products?.length && !errorProduct && (
              <button
                onClick={() => setTab("products")}
                className={`${
                  tab === "products" ? "active" : ""
                } text-capitalize d-flex justify-content-center category-btn nowrap mr-3`}
              >
                Products
              </button>
            )}

            {appointments?.length && !isErrorAppointments && (
              <button
                onClick={() => setTab("appointments")}
                className={`${
                  tab === "appointments" ? "active" : ""
                } text-capitalize d-flex justify-content-center category-btn nowrap mr-3`}
              >
                Appointments
              </button>
            )}

            {galleries?.galleries.length && !errorGallery && (
              <button
                onClick={() => setTab("galleries")}
                className={`${
                  tab === "galleries" ? "active" : ""
                } text-capitalize d-flex justify-content-center category-btn nowrap mr-3`}
              >
                Galleries
              </button>
            )}
            <button
              onClick={() => setTab("feed")}
              className={`${
                tab === "feed" ? "active" : ""
              } text-capitalize d-flex justify-content-center category-btn nowrap mr-3`}
            >
              Activity Feed
            </button>
          </ScrollTags>
        </div>
      </div>
      <div className="container container-creator">
        {tab === "home" && (
          <NonSsrWrapper>
            <div className="row">
              <div className="col-12">
                <CreatorChannels
                  channels={channels}
                  isLoading={!channels && !errorChanel}
                  setTab={setTab}
                  setFilter={setFilterChannel}
                  filter={filterChannel}
                />
                <CreatorEvents
                  events={events}
                  isLoading={!events && !errorEvent}
                  setTab={setTab}
                  text={"Upcoming Events"}
                  setFilter={setFilterUpEvent}
                  filter={filterUpEvent}
                />

                <CreatorCourses
                  courses={courses}
                  isLoading={!courses && !errorCourse}
                  setTab={setTab}
                  setFilter={setFilterPastEvent}
                  filter={filterPastEvent}
                />
                <CreatorProducts
                  products={products}
                  isLoading={isLoadingProduct}
                  setTab={setTab}
                />
                <CreatorVideos
                  videos={videos}
                  isLoading={!videos && !errorVideo}
                  setTab={setTab}
                  setFilter={setFilterVideo}
                  filter={filterVideo}
                />
                <CreatorPodcasts
                  audios={audios}
                  isLoading={!audios && !errorAudio}
                  setTab={setTab}
                  setFilter={setFilterPodcasts}
                  filter={filterPodcasts}
                />
                <CreatorBlogs
                  blogs={blogs}
                  error={errorBlog}
                  setTab={setTab}
                  setFilter={setFilterBlog}
                  filter={filterBlog}
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
                  setFilter={setFilterGallery}
                  filter={filterGallery}
                />
                <CreatorCommunities
                  communities={communities}
                  isLoading={isLoadingCommunity}
                  setTab={setTab}
                  setFilter={setFilterCommunity}
                  filter={filterCommunity}
                  has_group={has_group}
                />
              </div>
            </div>
          </NonSsrWrapper>
        )}
        {tab === "channels" && <ChannelsTab creator_id={creator_id} />}
        {tab === "events" && <EventsTab creator_id={creator_id} />}
        {tab === "videos" && <VideosTab creator_id={creator_id} />}
        {tab === "podcasts" && <PodcastsTab creator_id={creator_id} />}
        {/*{tab === "music" && <MusicTab creator_id={creator_id} />}*/}
        {tab === "courses" && <CoursesTab creator_id={creator_id} />}
        {tab === "communities" && (
          <CommunitiesTab creator_id={creator_id} groups_id={groups_id} />
        )}
        {tab === "blog" && <BlogsTab creator_id={creator_id} />}
        {tab === "products" && <ProductsTab creator_id={creator_id} />}
        {tab === "appointments" && <AppointmentTab creator_id={creator_id} />}
        {tab === "about" && (
          <AboutTab vendor_description={creator?.vendor_description} />
        )}
        {tab === "galleries" && <GalleriesTab creator_id={creator_id} />}
        {tab === "feed" && (
          <div className="creator-home-feed col-12 col-lg-6 pb-5 mx-auto mt-5">
            <ChannelLiveFeed title={"Latest Posts"} user_id={creator_id} />
          </div>
        )}
      </div>
    </>
  )
}

export default CreatorUser
