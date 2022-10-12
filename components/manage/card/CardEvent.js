import React, { useEffect, useState } from "react";
import { convertToUTC, getFormat } from "@utils/dateFromat";
import Link from "next/link";
import EventsActions from "@components/dashboard/events/EventsActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import TvIcon from "@icons/TvIcon";
import EventModalDelete from "@components/dashboard/events/EventModalDelete";
import {stringToSlug} from "@lib/stringToSlug";

function CardEvent({ event, mutateEvents }) {
  const [open, setOpen] = useState(false);
  const { title, thumbnail } = event;
  const [dateData, setDateData] = useState({ day: "", month: "", hour: "" });

  useEffect(() => {
    if (!event) return;
    try {
      const dataFormatdata = getFormat(
        convertToUTC(event.date_time),
        "dd-LLL-h:mm aaa"
      );
      const dataArray = dataFormatdata.split("-");
      setDateData({
        ...dateData,
        day: dataArray[0],
        month: dataArray[1],
        hour: dataArray[2],
      });
    } catch (error) {
      console.log(error);
    }
  }, [event]);

  return (
    <>
      <article className="card-general  w-100 position-relative">
        <Link href={`/dashboard/event/${event?.id}`}>
          <a>
            <div
              style={{
                backgroundImage: `url(${thumbnail})`,
              }}
              className="ratio ratio-16x9 bg-gray cover-bg border-radius-17 no-radius-bottom"
            ></div>
          </a>
        </Link>

        <div className="card-info p-0 d-flex position-relative border-radius-17 no-radius-top no-border-top no-border">
          <div className="card-info-date d-flex flex-column text-center p-2">
            <span className="display-3">{dateData?.day}</span>
            <span className="date-info-events text-uppercase">
              {dateData?.month}
            </span>
          </div>
          <div className="card-info-content pt-3 p-2 ">
            <div>
              <span className="font-size-10 badge badge-primary px-1">
                {event && event.category}
              </span>
              <h5 className="font-size-14 mt-2 mb-2 line-clamp-2">
                <Link href={`/dashboard/event/${event?.id}`}>
                  <a className="text-white">{title}</a>
                </Link>
              </h5>
            </div>
            <div>
              <span>
                <FontAwesomeIcon className="icon-clock" icon={faClock} />
              </span>
              <span className="font-size-12 d-inline-block ml-2">
                {dateData?.hour}
              </span>
            </div>
            <div>
              <span>
                <TvIcon className="icon-clock text-font" />
              </span>
              <span className="font-size-12 d-inline-block ml-2">
                {event && event.channel_name && (
                  <Link href={`/dashboard/channel/${event.channel_id}`}>
                    <a className="text-white">{event.channel_name}</a>
                  </Link>
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="card-footer-actions w-100 events">
          <Link href={`/dashboard/event/edit/${event.id}`}>
            <a className="btn btn-action primary events">Edit</a>
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="btn btn-action blue events"
          >
            Delete
          </button>{" "}
          <Link href={`/dashboard/event/${event.id}`}>
            <a className="btn btn-action danger events">
              Go live
            </a>
          </Link>{" "}
          <Link href={`/event/${stringToSlug(title)}/${event?.id}`}>
            <a className="btn btn-action events">View</a>
          </Link>
        </div>
      </article>

      <EventModalDelete
        mutateEvents={mutateEvents}
        event={event}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}

export default CardEvent;
