import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router';

import Layout from '../../../components/layout/Layout'
import CarrouselOnlineEvents from '../../../components/events/online/CarrouselOnlineEvents';
import { getMyEvents } from '../../api/events.api'
import { UserContext } from "../../../context/UserContext";

const CategoryPageOnlineEvent = () => {

  const { query } = useRouter()
  const [eventCount, setEventCount] = useState([])
  const [categories, setCategories] = useState(null)
  const { user } = useContext(UserContext);
  const [myEventId, setMyEventId] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const getList = () => {
    setisLoading(true)
    getMyEvents(user, { user_id: user.id, type: "online" }).then((res) => {
      if (res.data.data.events) {
        setMyEventId(res.data.data.events.map(e => e.id))
      } else setMyEventId([])
      setisLoading(false)
    }).catch(() => setisLoading(false))
  }
  useEffect(() => {
    if (user && user.id)
      getList()
  }, [user])

  useEffect(() => {
    if (query?.category) {
      setCategories(query.category)
    }
  }, [query])


  return (
    <Layout>
      {categories && <div className="mt-5">
        <CarrouselOnlineEvents
          eventCount={eventCount}
          setEventCount={setEventCount}
          params={{
            categories,
            per_page: 9
          }}
          link="/online-events"
          category={categories}
          isAllLoading={isLoading}
          hidelink={true}
          isMyEvents={false}
          getEventsList={getList}
          myEventId={myEventId}
        />
      </div>}
    </Layout>
  )
}

export default CategoryPageOnlineEvent
