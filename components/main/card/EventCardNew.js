import React, { useState, useEffect } from "react";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertToUTC, getFormat } from "@utils/dateFromat";
import TvIcon from "@icons/TvIcon";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";
import CategoryAndTags from "@components/shared/cards/CategoryAndTags";
import SaveCalendarButton from "@components/shared/action/SaveCalendarButton";

function EventCardNew({ event }) {
  const { title, thumbnail } = event;
  const [dateData, setDateData] = useState({ day: "", month: "", hour: "" });

  useEffect(() => {
    if (!event) return;
    try {
      const dataFormatdata = getFormat(
        convertToUTC(event.date_time),
        "dd-LLLL-haaa"
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
    <div className="card-general-new  w-100 position-relative">
      <Link href={`/event/${stringToSlug(title)}/${event?.id}`}>
        <a className="text-white">
          <div
            style={{
              backgroundImage: `url(${thumbnail})`,
            }}
            className="ratio border-radius-17 ratio-1x1 bg-gray cover-bg"
          ></div>
        </a>
      </Link>
      <div className=" py-3">
        <h5 className="font-size-13 m-0 line-clamp-2">
          <Link href={`/event/${stringToSlug(title)}/${event?.id}`}>
            <a className="text-white">{title} </a>
          </Link>
        </h5>
        <div className="d-flex my-1">
            <span className="date-info-events text-primary font-size-13 text-capitalize">
              {dateData?.month} {dateData?.day}, {dateData?.hour}
            </span>
        </div>
        <div className="d-flex text-grey ">
          <span className="font-size-13">Channel: {event && event.channel_name && (
              <Link href={`/channel/${event.channel_id}`}>
                <a className="text-grey">{event.channel_name}</a>
              </Link>
            )}</span>
         
        </div>
        <div className=" d-flex text-grey">
          <span className="font-size-13 mr-1">Category:</span>
          <span className="font-size-13">{event?.category}</span>
        </div>
      </div>
    </div>
  );
}

export default EventCardNew;
