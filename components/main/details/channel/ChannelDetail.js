import React, { useState, useEffect } from 'react'
import Meta from '@components/layout/Meta'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import useSWR from 'swr'
import { convertToUTC, getFormatedDateFromDate } from '@utils/dateFromat'
import ArrowLeftIcon from '@icons/ArrowLeftIcon'
import Link from 'next/link'
import TabEvents from './tabs/events/TabEvents'
import TabVideos from './tabs/videos/TabVideos'
import TabPodCasts from './tabs/podcasts/TabPodCasts'
import TabBlogs from './tabs/blogs/TabBlogs'
import {getCreator, getFetchPublic} from '@request/creator'
import CreatorEvents from "@components/main/details/channel/tabs/home/CreatorEvents";
import CreatorVideos from "@components/main/details/channel/tabs/home/CreatorVideos";
import CreatorPodcasts from "@components/main/details/channel/tabs/home/CreatorPodcasts";
import ChannelBlogs from "@components/main/details/channel/tabs/home/ChannelBlogs";
import Router from "next/router";

const baseUrl = process.env.apiV2
const url = `${baseUrl}/channels/`
const eventUrl = `${baseUrl}/channel-event?channel_id=`
const videoUrl = `${baseUrl}/video?channel_id=`
const podcastsUrl = `${baseUrl}/podcasts?channel_id=`
const blogsUrl = `${baseUrl}/blogs?channel_id=`

function ChannelDetail({ id }) {
  const [tab, setTab] = useState('home')

  const [tabs, setTabs] = useState([
    {
      tab: 'home',
      label: 'Home',
      empty: false,
    },
    {
      tab: 'events',
      label: 'Events',
      empty: true,
    },
    {
      tab: 'videos',
      label: 'Videos',
      empty: true,
    },
    {
      tab: 'podcasts',
      label: 'Podcasts',
      empty: true,
    },
    {
      tab: 'blog',
      label: 'Blog',
      empty: true,
    },
    {
      tab: 'about',
      label: 'About',
      empty: false,
    },
  ])

  const { data: channel } = useSWR(`${url}${id}`, getFetchPublic)


  const { data: events, error: errorEvent } = useSWR(
      `${eventUrl}${id}&page=1&per_page=4`,
      getCreator
  )

  const { data: videos, error: errorVideo } = useSWR(
      `${videoUrl}${id}&page=1&per_page=4`,
      getCreator
  )

  const { data: audios, error: errorAudio } = useSWR(
      `${podcastsUrl}${id}&page=1&per_page=4`,
      getCreator
  )

  const { data: blogs, error: errorBlog } = useSWR(
      `${blogsUrl}${id}&page=1&per_page=4`,
      getCreator
  )

  useEffect(() => {
    if (events && events.data && events.data.length > 0){
      setTabs(prevTas => {
        return prevTas.map(tab => {
          if (tab.tab === 'events'){
            tab.empty = false
                return tab
          }
          return tab
        })
      })
    }
  }, [events]);

  useEffect(() => {
    if (videos && videos.videos && videos.videos.length > 0){
      setTabs(prevTas => {
        return prevTas.map(tab => {
          if (tab.tab === 'videos'){
            tab.empty = false
            return tab
          }
          return tab
        })
      })
    }
  }, [videos]);

  useEffect(() => {
    if (audios && audios.audios && audios.audios.length > 0){
      setTabs(prevTas => {
        return prevTas.map(tab => {
          if (tab.tab === 'podcasts'){
            tab.empty = false
            return tab
          }
          return tab
        })
      })
    }
  }, [audios]);

  useEffect(() => {
    if (blogs && blogs.blogs && blogs.blogs.length > 0){
      setTabs(prevTas => {
        return prevTas.map(tab => {
          if (tab.tab === 'blog'){
            tab.empty = false
            return tab
          }
          return tab
        })
      })
    }
  }, [blogs]);
  

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
              <h1 className="m-0 font-weight-bold line-height-1 font-size-34 mr-3">
                {channel && channel.channel_name && channel.channel_name}
              </h1>
              <div>
                {channel &&
                  channel.channel_privacy &&
                  channel.channel_privacy === 'public' && (
                    <div className="badge badge-pill badge-success d-flex">
                      <span className="badge-icon">
                        <FontAwesomeIcon icon={faLockOpen} />
                      </span>
                      <span className="badge-title">open</span>
                    </div>
                  )}

                {channel &&
                  channel.channel_privacy &&
                  channel.channel_privacy === 'private' && (
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
                  getFormatedDateFromDate( convertToUTC(channel?.date) , 'MMM dd, yyyy')}
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-4">
            <div className="d-none d-md-flex justify-content-between align-items-center">
              <div className="d-flex">
                {tabs &&
                  tabs?.map((item) => (
                    <button
                      key={item.tab}
                      onClick={() => setTab(item.tab)}
                      className={`${
                        tab === item.tab ? 'active' : ''
                      } btn btn-transparent font-weight-500 py-1 px-2 ${
                        item.empty ? 'd-none' : 'd-block'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
              </div>
              <div className="d-flex"></div>
            </div>
          </div>
        </div>
        <div className="pt-0">
          {tab === 'home' && (
              <>
                <CreatorEvents events={events} isLoading={!events && !errorEvent} />
                <CreatorVideos videos={videos} isLoading={!videos && !errorVideo} />
                <CreatorPodcasts audios={audios} isLoading={!audios && !errorAudio} />
                <ChannelBlogs blogs={blogs} isLoading={!blogs && !errorBlog} />
              </>
          )}
          {tab === 'events' && <TabEvents channel_id={id} />}
          {tab === 'videos' && <TabVideos channel_id={id} />}
          {tab === 'podcasts' && <TabPodCasts channel_id={id} />}
          {tab === 'blog' && <TabBlogs channel_id={id} />}
          {tab === 'about' && (
            <div className="mt-5">
              <p
                dangerouslySetInnerHTML={{
                  __html: channel?.channel_description,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ChannelDetail
