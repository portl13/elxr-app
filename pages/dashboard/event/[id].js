import React, { useContext, useEffect, useState } from 'react'
import useSWR from 'swr'
import { UserContext } from '@context/UserContext'
import { getEventByID } from '@request/dashboard'
import EventDetailsScream from '@components/dashboard/events/EventDetailsScream'
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";

const url = `${process.env.apiV2}/channel-event/`

function EventDetailsPage({ data }) {
  const { user, auth } = useContext(UserContext)
  const [author, setAuthor] = useState(false)
  const token = user?.token
  const { id } = data

  const { data: event } = useSWR(
    token ? [`${url}${id}`, token] : null,
    getEventByID
  )

  useEffect(() => {
    if (event && event?.author) {
      setAuthor(event.author)
    }
  }, [event])

  return (
    <MainLayout sidebar={<MainSidebar />} title={"Event Detail"}>
        <EventDetailsScream
          auth={auth}
          author={author}
          user={user}
          event_id={id}
          event={event}
        />
    </MainLayout>
  )
}

export default EventDetailsPage

export async function getServerSideProps({ query }) {
  const { id } = query
  return {
    props: { data: { id } },
  }
}
