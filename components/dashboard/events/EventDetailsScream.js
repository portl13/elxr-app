import ChatEvent from '@components/eventChat/component/ChatEvent'
import EventVideoStream from '@components/main/details/event/EventVideoStream'
import StreamWebVideo from '@components/shared/stream/StreamWebVideo'
import useStream from '@hooks/stream/useStream'
import React, { useState } from 'react'

function EventDetailsScream({ event, auth, user, author, event_id }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="row mx-0">
      <div className="col">
        <div className="card-general no-border">
          {!open && (
            <EventVideoStream
              imageOffline={event?.thumbnail}
              stream_data={event?.stream_data}
            />
          )}
          {open && (
            <StreamWebVideo stream_key={event?.stream_data?.stream_key} />
          )}
          <div className='px-3'>

            <div className="card-info mt-4  px-3 px-md-0">
              <h4 className="font-weight-bold">{event?.title}</h4>
              {/* <span>Scheduled for</span>
            <span>July 24, 2022- 3pm PST</span> */}
              <p
                className="m-0"
                dangerouslySetInnerHTML={{
                  __html: event?.description,
                }}
              />
            </div>
            <h5>BROWSER STREAMING</h5>

            <div className="mt-3 mb-5">
              <button onClick={() => setOpen(!open)} className="btn btn-primary">
                {open ? 'CLOSE LIVE' : 'GO LIVE'}
              </button>
            </div>

            {!open && (
              <>
                <h5>SOFTWARE STREAM SETTINGS</h5>
                <div className="mt-3">
                  <label className="input-search mr-0 mb-4 border-radius-35 w-100  input border-none mb-0">
                    <span className="text-grey">Stream Url</span>
                    <span className="text-red">*</span>
                    <input
                      className="w-100 bg-transparent text-white border-none mt-1"
                      value={event?.stream_data?.rtmp_url}
                      readOnly
                    />
                  </label>
                  <label className="input-search mr-0 border-radius-35 w-100 input border-none  mb-0">
                    <span className="text-grey">Stream Key</span>
                    <input
                      className="w-100 bg-transparent text-white border-none mt-1"
                      value={event?.stream_data?.stream_key}
                      readOnly
                    />
                  </label>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
      <div className="col chat-column">
        {author && (
          <ChatEvent
            auth={auth}
            user={user}
            owner={author}
            vendor_id={event_id}
          />
        )}
      </div>
    </div>
  )
}

export default EventDetailsScream
