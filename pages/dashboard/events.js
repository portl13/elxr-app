import React from 'react'
import DashBoard from '@components/dashboard/DashBoard'
import Events from '@components/dashboard/events/Events'

function EventsPage() {
  return (
    <DashBoard title="events">
        <Events />
    </DashBoard>
  )
}

export default EventsPage
