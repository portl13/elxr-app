import React, { useContext } from "react";
import Meta from "@components/layout/Meta";
import {
  faArrowLeft,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArrowDetailsIcon from "@icons/ArrowDetailsIcon";
import CalendarIcon from "@icons/CalendarIcon";
import ClockEventIcon from "@icons/ClockEventIcon";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import { UserContext } from "@context/UserContext";
import { getEventByID } from "@request/dashboard";
import { getFormatedDateFromDate } from "@utils/dateFromat";

const url = `${process.env.apiV2}/channel-event/`;

function EventDetailsPage({ data }) {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const router = useRouter();
  const { id } = data
  
  const { data: event } = useSWR( token ? [`${url}${id}`, token] : null, getEventByID)

  console.log("🚀 ~ file: [id].js ~ line 27 ~ EventDetailsPage ~ event", event)

  return (
  <>
      <Meta />
      <Head>
        <title>EVENT DETAILS</title>
      </Head>
      <div className="container container-80">
        <div className="contain-icon-back d-flex align-items-center py-5">
          <span
          onClick={() => router.back()}
          className="contain-icon pointer">
            <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
          </span>
        </div>
        <div className="row">
          <div className="col-12">
            <div>
              <span className="bg-primary px-2 rounded">{event && event.category}</span>
            </div>
            <div>
              <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center">
                <div>
                  <h3 className="m-0 mb-2 text-uppercase font-weight-bold">{event && event.title}</h3>
                  <div className="d-flex">
                    <div className="pr-3">
                      <i className="pr-2">
                         <CalendarIcon className="icon-setting" />
                      </i>
                      <span className="text-uppercase font-weight-bold">{event && getFormatedDateFromDate(event.date_time, 'MMM dd, yyyy')}</span>
                    </div>
                    <div>
                      <i className="pr-2">
                        <ClockEventIcon className="icon-setting" />
                      </i>
                      <span className="font-weight-bold">{event && getFormatedDateFromDate(event.date_time, 'hh:mm a')}</span>
                    </div>
                  </div>
                </div>
                <div className="d-flex mt-3 m-md-0">
                  <button className="btn btn-create">
                    <i> <ArrowDetailsIcon className="icon-setting" /></i>
                    <span>See Complete Details</span>
                  </button>
                  <div className="contain-icon-border">
                    <i>
                      <FontAwesomeIcon
                        className="icon-setting"
                        icon={faEllipsisH}
                      />
                    </i>
                  </div>
                </div>
              </div>
              <div 
              style={{
                backgroundImage: `url(${event && event.thumbnail})`
              }}
              className="ratio ratio-16x9 bg-secondary mt-4 cover-bg">
              </div>
              {event && <div className="pt-3 text-justify" dangerouslySetInnerHTML={{__html:event.description }} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventDetailsPage;


export async function getServerSideProps({ query }) {
  const { id } = query
  return {
    props: { data: { id } },
  }
}
