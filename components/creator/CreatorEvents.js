import EventCard from '@components/dashboard/events/EventCard';
import SpinnerLoader from '@components/shared/loader/SpinnerLoader';
import { getCreator } from '@request/creator';
import React from 'react'
import useSWR from 'swr';



const eventlUrl = `${process.env.apiV2}/channel-event?author=`;

function CreatorEvents({creator_id}) {
    const { data: events, error } = useSWR(`${eventlUrl}${creator_id}&page=1&per_page=4`, getCreator);
    const isLoading = !events && !error
    const mutateEvents = () => {}
  
  return (
    <>
       <div className="row mt-5">
       <div className="col-12">
                <h4 className='font-size-14'>EVENTS</h4>
            </div>
          {isLoading && <SpinnerLoader />}
          {events && events.data && events.data.length === 0 && (
            <h3 className="col display-4">
              You have not created any events yet
            </h3>
          )}
          {events &&
            events.data &&
            events.data.length > 0 &&
            events.data.map((event) => (
              <EventCard
                mutateEvents={mutateEvents}
                event={event}
                key={event.id}
              />
            ))}
        </div> 
    </>
  )
}
export default CreatorEvents