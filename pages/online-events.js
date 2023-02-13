import React, { useState, useEffect, useContext, } from 'react'
import Head from 'next/head'
import Layout from '../components/layout/Layout'
import CarrouselOnlineEvents from '../components/events/online/CarrouselOnlineEvents'
import { EventTab } from '../components/layout/EventLayout.style'
import { CATEGORIES, EVENT_TAB } from '../utils/events'
import CarrouselOnlineMyEvents from '../components/events/online/CarrouselOnlineMyEvents'
import { getMyEvents } from './api/events.api'
import { UserContext } from "../context/UserContext";

export default function onlineEvents() {
  const [eventCount, setEventCount] = useState([])
  const [ismyEvents, setMyEvents] = useState("all")
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [myEventId, setMyEventId] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const getList = () => {
    setisLoading(true)
    getMyEvents(user, { user_id: user.id, type: "online" }).then((res) => {
      if (res.data.data.events) {
        setEvents(res.data.data.events)
        setMyEventId(res.data.data.events.map(e => e.id))
      } else {
        setEvents([])
        setMyEventId([])
      }
      setisLoading(false)
    }).catch(() => setisLoading(false))
  }
  useEffect(() => {
    if (user && user.id)
      getList()
  }, [user])

  return (
    <Layout>
      <Head>
        <title>elxr | Events</title>
      </Head>
      <div className="w-100 bg-black bd-radius px-4 pt-20">
        <div css={EventTab} className="pb-2">
          <ul>
            {EVENT_TAB.map((e) =>
              <li className={e.value === ismyEvents && "active"}
                onClick={() => setMyEvents(e.value)}>{e.name}</li>)}
          </ul>
        </div>
        {ismyEvents === "all" ? CATEGORIES.map(category => (
          <div key={category.link}>
            <CarrouselOnlineEvents
              eventCount={eventCount}
              setEventCount={setEventCount}
              params={category.params}
              link={`event/category/${category.link}`}
              category={category.name}
              isAllLoading={isLoading}
              myEventId={myEventId}
              getEventsList={getList}
            />
          </div>
        )) :
          <CarrouselOnlineMyEvents
            setisLoading={setisLoading}
            isLoading={isLoading}
            events={events}
            setEvents={setEvents}
            getList={getList} />}
      </div>
    </Layout>
  )
}
