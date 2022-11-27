import React, { useEffect, useState } from "react";
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
import CreatorChannels from "@components/creator/tabs/home/CreatorChannels";
import CreatorEvents from "@components/creator/tabs/home/CreatorEvents";
import CreatorVideos from "@components/creator/tabs/home/CreatorVideos";
import CreatorPodcasts from "@components/creator/tabs/home/CreatorPodcasts";
import CreatorCourses from "@components/creator/tabs/home/CreatorCourses";
import CreatorBlogs from "@components/creator/tabs/home/CreatorBlogs";
import { getCreator, getFetchPublic } from "@request/creator";
import FollowButton from "@components/shared/button/FollowButton";
import ChannelLiveFeed from "@components/channelEvent/ChannelLiveFeed";
import useMediaQuery from "@hooks/useMediaQuery";
import CreatorAlbum from "@components/creator/tabs/home/CreatorAlbum";
import MusicTab from "@components/creator/tabs/music/MusicTab";
import useSWR from "swr";
import NonSsrWrapper from "../no-ssr-wrapper/NonSSRWrapper";

const channelUrl = `${process.env.apiV2}/channels?author=`;
const eventUrl = `${process.env.apiV2}/channel-event?author=`;
const videoUrl = `${process.env.apiV2}/video?author=`;
const podcastslUrl = `${process.env.apiV2}/podcasts?author=`;
const albumsUrl = `${process.env.apiV2}/albums?author=`;
const coursesUrl = `${process.env.baseUrl}/wp-json/buddyboss-app/learndash/v1/courses?author=`;
const communitiesUrl = `${process.env.bossApi}/groups`;
const url = `${process.env.apiV2}/blogs?author=`;

const initialTabs = [
  {
    tab: "home",
    label: "Home",
    empty: false,
  },
  {
    tab: "channels",
    label: "Channels",
    empty: true,
  },
  {
    tab: "events",
    label: "Events",
    empty: true,
  },
  {
    tab: "videos",
    label: "Videos",
    empty: true,
  },
  {
    tab: "music",
    label: "Music",
    empty: true,
  },
  {
    tab: "podcasts",
    label: "Podcasts",
    empty: true,
  },
  {
    tab: "courses",
    label: "Courses",
    empty: true,
  },
  {
    tab: "communities",
    label: "Communities",
    empty: true,
  },
  {
    tab: "blog",
    label: "Blog",
    empty: true,
  },
  {
    tab: "products",
    label: "Products",
    empty: true,
  },
  {
    tab: "about",
    label: "About",
    empty: false,
  },
];

function CreatorUser({ creator, user, creator_id }) {
  const [tab, setTab] = useState("home");
  const [tabs, setTabs] = useState(initialTabs);

  const match = useMediaQuery("(min-width: 1024px)");

  const { data: channels, error: errorChanel } = useSWR(
    `${channelUrl}${creator_id}&page=1&per_page=${match ? 2 : 4}`,
    getCreator
  );

  const { data: events, error: errorEvent } = useSWR(
    `${eventUrl}${creator_id}&page=1&per_page=${match ? 2 : 4}`,
    getCreator
  );

  const { data: videos, error: errorVideo } = useSWR(
    `${videoUrl}${creator_id}&page=1&per_page=${match ? 2 : 4}`,
    getCreator
  );

  const { data: audios, error: errorAudio } = useSWR(
    `${podcastslUrl}${creator_id}&page=1&per_page=${match ? 2 : 4}`,
    getCreator
  );

  const { data: album, error: errorAlbum } = useSWR(
    `${albumsUrl}${creator_id}&page=1&per_page=${match ? 2 : 4}`,
    getCreator
  );

  const { data: courses, error: errorCourse } = useSWR(
    `${coursesUrl}${creator_id}&page=1&per_page=${match ? 2 : 4}`,
    getCreator
  );

  const { data: communities, error: errorCommunity } = useSWR(
    `${communitiesUrl}?page=1&per_page=${
      match ? 2 : 4
    }&user_id=${creator_id}&scope=personal`,
    getFetchPublic
  );

  const { data: blogs, error: errorBlog } = useSWR(
    `${url}${creator_id}&page=1&per_page=4`,
    getFetchPublic
  );

  // const { data: products, isLoading } = usePortlApi(
  //   `channel/product/?id=${creator_id}&page=1&per_page=4`
  // );

  useEffect(() => {
    if (channels && channels?.channels && channels.channels.length > 0) {
      setTabs((preTabs) => {
        return preTabs.map((tab) => {
          if (tab.tab === "channels") {
            tab.empty = false;
          }
          return tab;
        });
      });
    }
  }, [channels]);

  useEffect(() => {
    if (events && events?.data && events.data.length > 0) {
      setTabs((preTabs) => {
        return preTabs.map((tab) => {
          if (tab.tab === "events") {
            tab.empty = false;
          }
          return tab;
        });
      });
    }
  }, [events]);

  // useEffect(() => {
  //   if (products && products.length  > 0) {
  //
  //     setTabs(preTabs => {
  //       return preTabs.map((tab) => {
  //         if (tab.tab === "products") {
  //           tab.empty = false;
  //         }
  //         return tab;
  //       });
  //     });
  //
  //   }
  // }, [products]);

  useEffect(() => {
    if (videos && videos?.videos && videos.videos.length > 0) {
      setTabs((preTabs) => {
        return preTabs.map((tab) => {
          if (tab.tab === "videos") {
            tab.empty = false;
          }
          return tab;
        });
      });
    }
  }, [videos]);

  useEffect(() => {
    if (audios && audios?.audios && audios.audios.length > 0) {
      setTabs((preTabs) => {
        return preTabs.map((tab) => {
          if (tab.tab === "podcasts") {
            tab.empty = false;
          }
          return tab;
        });
      });
    }
  }, [audios]);

  useEffect(() => {
    if (courses && courses.length > 0) {
      setTabs((preTabs) => {
        return preTabs.map((tab) => {
          if (tab.tab === "courses") {
            tab.empty = false;
          }
          return tab;
        });
      });
    }
  }, [courses]);

  useEffect(() => {
    if (communities && communities.length > 0) {
      setTabs((preTabs) => {
        return preTabs.map((tab) => {
          if (tab.tab === "communities") {
            tab.empty = false;
          }
          return tab;
        });
      });
    }
  }, [communities]);

  useEffect(() => {
    if (blogs && blogs?.blogs && blogs.blogs.length > 0) {
      setTabs((preTabs) => {
        return preTabs.map((tab) => {
          if (tab.tab === "blog") {
            tab.empty = false;
          }
          return tab;
        });
      });
    }
  }, [blogs]);

  useEffect(() => {
    if (album && album?.albums && album.albums.length > 0) {
      setTabs((preTabs) => {
        return preTabs.map((tab) => {
          if (tab.tab === "music") {
            tab.empty = false;
          }
          return tab;
        });
      });
    }
  }, [album]);

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
              <h1 className="m-0 font-weight-bold line-height-1 font-size-34 mr-3">
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
                  <SubscriptionButton
                    user={user}
                    vendor_id={creator?.vendor_id}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <ScrollTags>
            {tabs.map((item) => (
              <React.Fragment key={item.tab}>
                {!item.empty && (
                  <button
                    onClick={() => setTab(item.tab)}
                    className={`${
                      tab === item.tab ? "active" : ""
                    } btn btn-transparent btn-transparent-grey font-weight-500 py-2 px-3 mr-3`}
                  >
                    {item.label}
                  </button>
                )}
              </React.Fragment>
            ))}
          </ScrollTags>
        </div>
      </div>
      <div className="container overflow-x-hidden">
        {tab === "home" && (
          <NonSsrWrapper>
            <div className={"creator-home"}>
              <div className="creator-home-left">
                <CreatorChannels
                  match={match}
                  channels={channels}
                  isLoading={!channels && !errorChanel}
                  setTab={setTab}
                />
                <CreatorEvents
                  events={events}
                  isLoading={!events && !errorEvent}
                  setTab={setTab}
                  match={match}
                />
                <CreatorCourses
                  courses={courses}
                  isLoading={!courses && !errorCourse}
                  setTab={setTab}
                  match={match}
                />
              </div>
              <div className="creator-home-feed">
                <ChannelLiveFeed title={"Latest Posts"} user_id={creator_id} />
              </div>
              <div className="creator-home-right">
                <CreatorVideos
                  videos={videos}
                  isLoading={!videos && !errorVideo}
                  setTab={setTab}
                  match={match}
                />
                <CreatorPodcasts
                  audios={audios}
                  isLoading={!audios && !errorAudio}
                  setTab={setTab}
                  match={match}
                />
                <CreatorAlbum
                  albums={album}
                  isLoading={!album && !errorAlbum}
                  setTab={setTab}
                  match={match}
                />
                <CreatorBlogs
                  blogs={blogs}
                  error={errorBlog}
                  setTab={setTab}
                  match={match}
                />
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
