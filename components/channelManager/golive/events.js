import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import {
  getChannelEvent,
  deleteEventbyId,
} from "../../../pages/api/go-live.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube, faClock } from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";
import moment from "moment";
import UpcomingEvents from "./upcomingEvents";
import PastEvents from "./pastEvents";
import { LoaderContainer } from "../../livefeed/livefeed.style";
import { columnsHead } from "@components/my-account/ColumnsHead.styles";
function Events({ innerNav, handleRedirect }) {
  const { user } = useContext(UserContext);
  const [result, setResult] = useState([]);
  const [loader, setLoader] = useState(true);
  const [spin, setSpin] = useState(false);
  const [closeModal, setCloseModal] = useState(true);
  const params = {
    postsperpage: 100,
    page: 1,
  };
  function channelEvents() {
    getChannelEvent(user, params).then((res) => {
      setResult(res.data.data);
      setLoader(false);
    });
  }
  useEffect(() => {
    if (user) {
      channelEvents();
    }
  }, [user]);
  function deleteEvent(childData) {
    setCloseModal(false);
    deleteEventbyId(user, childData)
      .then((res) => {
        setResult(result.filter((item) => item.id !== childData));

        setCloseModal(true);
        setSpin(false);
      })
      .catch(() => console.log("error"));
  }
  return (
    <>
      <div className="add-tag-panel">
        <Button
          type="button"
          onClick={() => handleRedirect("golive", "add_event")}
        >
          <FontAwesomeIcon icon={faCube} />
          Add New
        </Button>
      </div>
      <div css={columnsHead} className="wcfm-collapse-content">
        <div className="golive-table">
          <div className="row-head">
            <div className="events-div-1">
              <input type="checkbox" />
            </div>
            <div className="events-div-2">Live Stream</div>
            <div className="events-div-3">Type</div>
            <div className="events-div-4">Date</div>
            <div className="events-div-5">Visibility</div>
            <div className="events-div-6">Action</div>
          </div>
          {loader && (
            <p css={LoaderContainer}>
              <span>
                <FontAwesomeIcon icon={faClock} />
              </span>
              Loading Events. Please wait.
            </p>
          )}
          {!loader && (
            <>
              <div className="main-head">Upcoming Events</div>

              {result &&
                result.map((event) => (
                  <>
                    {moment(event.date_time).format("YYYY-MM-DD") >=
                      moment(Date.now()).format("YYYY-MM-DD") && (
                      <UpcomingEvents
                        event={event}
                        id={event.id}
                        spin={spin}
                        setSpin={setSpin}
                        parentDelete={deleteEvent}
                        closeModal={closeModal}
                        handleRedirect = {handleRedirect}
                      />
                    )}
                  </>
                ))}
              <div className="main-head">Past Events</div>
              {result &&
                result.map((event) => (
                  <>
                    {moment(event.date_time).format("YYYY-MM-DD") <
                      moment(Date.now()).format("YYYY-MM-DD") && (
                      <PastEvents
                        event={event}
                        id={event.id}
                        spin={spin}
                        setSpin={setSpin}
                        parentDelete={deleteEvent}
                        closeModal={closeModal}
                        handleRedirect = {handleRedirect}
                      />
                    )}
                  </>
                ))}
            </>
          )}
        </div>
      </div>
      <div className="wcfm-button-panel">
        <button>Save</button>
      </div>
    </>
  );
}
export default Events;
