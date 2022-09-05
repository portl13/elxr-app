import React, { useEffect, useState } from 'react'
import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import Head from 'next/head'
import { getFetchPublic } from '@request/creator'
import useSWR from 'swr'
import FilterEventImage from '@helpers/FilterEventImage'
import EventPartnerRelated from '@components/events/EventPartnerRelated'

const baseUrl = process.env.NEXT_PUBLIC_API_EVENTS_WP
const eventlUrl = `${baseUrl}events`

function PartnerEventDetailPage({ id }) {
  const { data: event } = useSWR(`${eventlUrl}/${id}`, getFetchPublic)
  const [category, setCategory] = useState(null)

  useEffect(() => {
    if (event && event.categories) {
        setCategory(event.categories[0].id)
    }
  }, [event])
  

  return (
    <MainLayout sidebar={<MainSidebar />}>
      <Head>
        <title>Weshare | {event?.title}</title>
      </Head>
      <article className="container-media">
        <div className="main-item">
          <div
            className="ratio ratio-16x9 bg-gray card-head cover-bg bg-gray"
            style={{
              backgroundImage: `url(${FilterEventImage(event?.image)})`,
            }}
          ></div>
          <div className="d-flex w-100 justify-content-between">
            <h4
              className="font-weight-bold mt-4 mb-2 flex-grow"
              dangerouslySetInnerHTML={{
                __html: event?.title,
              }}
            />
          </div>
          <div className=" d-flex my-2 text-grey">
            <span className="font-size-13 mr-1">Category:</span>
            <span className="font-size-13">
              {event &&
                event.categories &&
                event.categories.map((item) => item.name)}
            </span>
          </div>
          <div
            className="mt-3"
            dangerouslySetInnerHTML={{
              __html: event?.description,
            }}
          />
        </div>
        <div className="relative-items mt-4 mt-md-0">
          <h4 className="text-center text-uppercase font-size-18">
            More Partner Events like this
          </h4>
          {category && <EventPartnerRelated category={category} />}
        </div>
      </article>
    </MainLayout>
  )
}

export default PartnerEventDetailPage

export async function getServerSideProps({ query }) {
  const { id } = query
  return {
    props: { id },
  }
}
