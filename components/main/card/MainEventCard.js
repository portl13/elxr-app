import React from "react";
import {getFormatWhitTimezone} from "@utils/dateFromat";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";
import SaveCalendarButton from "@components/shared/action/SaveCalendarButton";
function MainEventCard({ event }) {
  const { title, thumbnail, creator, timezone = null } = event;
  return (
    <div className="card-general w-100 position-relative overflow-hidden">
      <Link href={`/event/${stringToSlug(title)}/${event?.id}`}>
        <a className="text-white">
          <div
            style={{
              backgroundImage: `url(${thumbnail})`,
            }}
            className="ratio ratio-16x9 bg-gray cover-bg border-radius-12"
          ></div>
        </a>
      </Link>
      <div className="py-3 px-2 d-flex position-relative">
        <div className="border-colors cover-bg d-flex align-items-center justify-content-center ">
          <Link href={`/creator/${stringToSlug(creator?.name)}/${creator?.id}`}>
            <a className="text-white">
              <div
                style={{
                  backgroundImage: `url(${creator?.logo})`,
                }}
                className="avatar-event-card bg-gray cover-bg"
              ></div>
            </a>
          </Link>
        </div>
        <div className="card-info-content pl-3 pr-0">
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="title-even-home line-clamp-2 mb-0">
              <Link href={`/event/${stringToSlug(title)}/${event?.id}`}>
                <a className="color-font">{title}</a>
              </Link>
            </h5>
            {/*<SaveCalendarButton type="card" event={event} />*/}
          </div>
          <div className="d-flex alig-items-center">
            <span className="subtitle-even-home d-inline-block ">
              {creator && (
                <Link
                  href={`/creator/${stringToSlug(creator?.name)}/${
                    creator?.id
                  }`}
                >
                  <a className="color-font">by {creator?.name}</a>
                </Link>
              )}
            </span>
          </div>
          <div>
            <span className="date-even-home color-font d-inline-block">
              {event
                  ? getFormatWhitTimezone(
                      event.date_time,
                      timezone,
                      "LLLL dd • h:mm aaa",
                      event?.utc
                  )
                  : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MainEventCard;
