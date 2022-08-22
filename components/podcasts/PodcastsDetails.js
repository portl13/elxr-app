import React from 'react'
import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import useSWR from 'swr'
import { getFetchPublic } from '@request/creator'
import Head from 'next/head'
import PodcastsRelated from './PodcastsRelated'
import ChannelCardMedia from '@components/video/ChannelCardMedia'
import CategoryAndTags from '@components/shared/cards/CategoryAndTags'
import SaveButton from '@components/shared/action/SaveButton'

const podcasturl = `${process.env.apiV2}/podcasts`

function PodcastsDetails({ id }) {
  const { data: audio } = useSWR(`${podcasturl}/${id}`, getFetchPublic)

  return (
    <MainLayout sidebar={<MainSidebar />}>
      <Head>
        <title>Weshare | {audio?.title}</title>
      </Head>
      <article className="container-media">
        <div className="main-item">
          <div
            className="ratio ratio-16x9 bg-gray card-head cover-bg bg-gray"
            style={{
              backgroundImage: `url(${audio?.thumbnail || audio?.cover})`,
            }}
          ></div>
          <div className="d-flex w-100 justify-content-between">
            <h4 className="font-weight-bold mt-4 mb-2 flex-grow">
              {audio?.title}
            </h4>
            <div className="flex-shrink d-flex align-items-center">
              {audio && <SaveButton value={audio?.id} type="podcast" />}
            </div>
          </div>
          {audio && (
            <CategoryAndTags category={audio?.category} tags={audio?.tags} />
          )}
          <div
            className="mt-3"
            dangerouslySetInnerHTML={{
              __html: audio?.description,
            }}
          />
          {audio && audio.channel_id && (
            <ChannelCardMedia channel_id={audio.channel_id} />
          )}
        </div>
        <div className="relative-items mt-4 mt-md-0">
          <h4 className="text-center text-uppercase">
            More podcasts like this
          </h4>
          {audio && <PodcastsRelated category={audio?.category_id} />}
        </div>
      </article>
    </MainLayout>
  )
}

export default PodcastsDetails
