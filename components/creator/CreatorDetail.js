import React, { useContext, useState } from 'react'
import { UserContext } from '@context/UserContext'
import useSWR from 'swr'
import { getCreator } from '@request/creator'
import CreatorProfile from './CreatorProfile'
import Meta from '@components/layout/Meta'
import Head from 'next/head'
import CreatorUser from './CreatorUser'
import TabHome from './tabs/home/TabHome'
import ChannelsTab from './tabs/channels/ChannelsTab'
import EventsTab from './tabs/events/EventsTab'
import VideosTab from './tabs/videos/VideosTab'
import PodcastsTab from './tabs/podcasts/PodcastsTab'
import CoursesTab from './tabs/courses/CoursesTab'
import CommunitiesTab from './tabs/communities/CommunitiesTabs'
import BlogsTab from './tabs/blog/BlogsTab'
import ProductsTab from './tabs/products/ProductsTab'
import AboutTab from './tabs/about/AboutTab'

const creatorData = `${process.env.baseUrl}/wp-json/portl/v1/channel?user_id=`

function CreatorDetail({ creator_id }) {
  const { user } = useContext(UserContext)
  const [tab, setTab] = useState('home')
  const token = user?.token

  const { data: creator, error } = useSWR(creatorData + creator_id, getCreator)
  
  return (
    <div>
      <Meta />
      <Head>
        <title>CREATOR DETAILS</title>
      </Head>
      <CreatorProfile creator={creator} />
      <div className="container container-80 pb-5">
        <CreatorUser tab={tab} setTab={setTab} creator={creator} />
        {tab === 'home' && <TabHome creator_id={creator_id} />}
        {tab === 'channels' && <ChannelsTab creator_id={creator_id} />}
        {tab === 'events' && <EventsTab creator_id={creator_id} />}
        {tab === 'videos' && <VideosTab creator_id={creator_id} />}
        {tab === 'podcasts' && <PodcastsTab creator_id={creator_id} />}
        {tab === 'courses' && <CoursesTab creator_id={creator_id} />}
        {tab === 'communities' && <CommunitiesTab creator_id={creator_id} />}
        {tab === 'blog' && <BlogsTab creator_id={creator_id} />}
        {tab === 'products' && <ProductsTab creator_id={creator_id} />}
        {tab === 'about' && <AboutTab vendor_description={creator?.vendor_description} />}
      </div>
    </div>
  )
}

export default CreatorDetail
