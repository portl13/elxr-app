import React, { useState, useEffect } from "react";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertToUTC, getFormat } from "@utils/dateFromat";
import TvIcon from "@icons/TvIcon";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";
import SaveCalendarButton from "@components/shared/action/SaveCalendarButton";

function MainEventCard({ event }) {
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
    <div className="card-general w-100 position-relative border-top-radius border-bottom-radius overflow-hidden">
      <Link href={`/event/${stringToSlug(title)}/${event?.id}`}>
        <a className="text-white">
          <div
            style={{
              backgroundImage: `url(${thumbnail})`,
            }}
            className="ratio ratio-16x9 bg-gray cover-bg "
          ></div>
        </a>
      </Link>
      <div className="card-info border-bottom-radius  d-flex position-relative">
        <div className="card-info-date color-font d-md-flex flex-column text-center p-2 d-none">
          <span className="display-3">{dateData?.day}</span>
          <span className="date-info-events text-uppercase">
            {dateData?.month}
          </span>
        </div>

        <div className="card-info-content pt-3 pt-2 pl-2 pr-0 pb-2">
          <div>
            <div className="d-flex justify-content-start align-items-center">
              <span className=" badge-purple px-2">
                {event && event.category}
              </span>
              {/* <SaveCalendarButton type="card" event={event} /> */}
            </div>
            <h5 className="font-size-14 mt-2 line-clamp-2 font-weight-700">
              <Link href={`/event/${stringToSlug(title)}/${event?.id}`}>
                <a className="color-font">{title} </a>
              </Link>
            </h5>
          </div>
          <div>
            <span>
              <FontAwesomeIcon
                className="icon-clock color-font"
                icon={faClock}
              />
            </span>
            <span className="font-size-12 color-font d-inline-block ml-2">
              <span className={"d-inline-block d-md-none mr-1"}>
                {getFormat(convertToUTC(event.date_time),"dd LLL")}
              </span>
               {dateData?.hour}
            </span>
          </div>
          <div className="d-flex  alig-items-center">
            <span>
              <TvIcon className="icon-clock color-font" />
            </span>
            <span className="font-size-12 d-inline-block ml-2 mt-1">
              {event && event.channel_name && (
                <Link
                  href={`/channel/${stringToSlug(event?.channel_name)}/${
                    event.channel_id
                  }`}
                >
                  <a className="color-font">{event.channel_name}</a>
                </Link>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainEventCard;
