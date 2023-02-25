import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import dayjs from "dayjs";
import moment from "moment";
import { useQuery } from "@apollo/client";

import { Scrollbars } from "react-custom-scrollbars-2";
import "react-multi-carousel/lib/styles.css";

import { fetchData } from "@/request/commonfun";
import { getFetchPublic } from "@/request/creator";
import { genericFetch, genericFetchWithHeader } from "@/request/dashboard";

import { UserContext } from "@/context/UserContext";
import SpinnerLoader from "@/components/shared/loader/SpinnerLoader";
import { BottomDashNav } from "@/components/suggestics/bottom-dash-nav/BottomDashNav";
import { useAppDispatch } from "@/store/store";
import { DATE_FORMAT } from "@/CommonConstants";
import { WEIGHT_TRACKER } from "@/graphql/suggestic-queries";
import { setWeeklyWeightData } from "@/store/features/journal/journal-slice";

import { myDashboardStyle } from "./MyDashboard.style";

const url = `${process.env.baseUrl}`;
const woocomAPIUrl = process.env.woocomApi;
const eventlUrl = `${process.env.apiV2}/channel-event?all=true`;
const courseUrl = `${process.env.baseUrl}/wp-json/ldlms/v2/sfwd-courses/`;
const categoriesUrl = `${process.env.apiV2}/channel-event/categories`;
const myAccountApi = process.env.myAccount + "/subscriptions";
const followingUrl = process.env.bossApi + "/members";

function MyDashboard() {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const router = useRouter();

  const [eventLoading, setEventLoading] = useState(false);
  const [totalEvent, setTotalEvent] = useState(0);
  const [events, setEvents] = useState([]);
  const [selectedEventCategory, setSelectedEventCategory] = useState({
    id: "",
    name: "All",
  });
  const [eventCategory, setEventCategory] = useState([]);

  const [courseLoading, setCourseLoading] = useState(false);
  const [totalCourse, setTotalCourse] = useState(0);
  const [courses, setCourses] = useState([]);

  const [calendarLoading, setCalendarLoading] = useState(false);
  const [myEventsList, setMyEventsList] = useState([]);

  const [subLoading, setSubLoading] = useState(false);
  const [totalSub, setTotalSub] = useState(0);
  const [subList, setSubList] = useState([]);

  const [followLoading, setFollowLoading] = useState(false);
  const [totalFollow, setTotalFollow] = useState(0);
  const [followList, setFollowList] = useState([]);

  let today = dayjs();
  const startDate = today.subtract(6, "day").format(DATE_FORMAT);
  const endDate = dayjs().format(DATE_FORMAT);
  const [loading, setLoading] = useState(true);

  const getSubList = async () => {
    setSubLoading(true);

    try {
      const { data, status } = await axios.get(`${myAccountApi}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (status) {
        setSubList(data.data);
        setTotalSub(data.data.length);
      }
    } catch (error) {
      setSubLoading(false);
    } finally {
      setSubLoading(false);
    }
  };

  const getFollowList = async () => {
    setFollowLoading(true);
    try {
      const { status, data, headers } = await genericFetchWithHeader(
        `${followingUrl}?user_id=${user?.id}&scope=following`,
        token
      );

      if (status === 200) {
        setFollowList(data);
        setTotalFollow(headers["x-wp-total"]);
      }
      setFollowLoading(false);
    } catch (error) {
      setFollowLoading(false);
    }
  };

  const getEventCategory = async () => {
    setEventCategory([]);

    try {
      const eventCategoryList = await getFetchPublic(`${categoriesUrl}`);
      if (eventCategoryList?.length) {
        setEventCategory(eventCategoryList);
      }
    } catch (error) {}
  };

  const getEventList = async (category) => {
    setEventLoading(true);
    setTotalEvent(0);
    setEvents([]);
    setSelectedEventCategory(category);

    try {
      const eventList = await getFetchPublic(
        `${eventlUrl}&page=1&per_page=4&category=${category?.id || ""}`
      );
      if (eventList?.status) {
        setEvents(eventList.data);
        setTotalEvent(eventList.total_items);
      }
      setEventLoading(false);
    } catch (error) {
      setEventLoading(false);
    }
  };

  const getCourseList = async () => {
    setCourseLoading(true);
    setTotalCourse(0);
    setCourses([]);

    try {
      const courseList = await fetchData(
        `${courseUrl}?author=${user?.id}&status=publish&page=1&per_page=4`,
        token
      );
      if (courseList?.status === 200) {
        setCourses(courseList.data);
        if (courseList["headers"]["x-wp-total"]) {
          setTotalCourse(courseList["headers"]["x-wp-total"]);
        }
      }
      setCourseLoading(false);
    } catch (error) {
      setCourseLoading(false);
    }
  };

  const getCalendarEvents = async () => {
    setCalendarLoading(true);
    setMyEventsList([]);

    try {
      const filters = ["per_page=100", "page=1"];
      const allAppointment = await fetchData(
        `${woocomAPIUrl}/orders?${filters.join("&")}`,
        token
      );
      if (allAppointment?.status === 200) {
        const eventsList = allAppointment.data.map((c, k) => {
          const startMoment = moment(c.date_created);
          const endMoment = moment(c.date_created);

          let title = "";
          if (c?.line_items?.length) {
            title = c.line_items[0].name || "";
          }
          if (c.billing.first_name) {
            title = (title ? `${title} - ` : "") + c.billing.first_name;

            if (c.billing.last_name) {
              title += ` ${c.billing.last_name}`;
            }
          }

          return {
            id: k + 1,
            title,
            orderId: c.id,
            start: new Date(
              startMoment.get("years"),
              startMoment.get("months"),
              startMoment.get("days"),
              startMoment.get("hours"),
              startMoment.get("minutes"),
              startMoment.get("milliseconds")
            ),
            end: new Date(
              endMoment.get("years"),
              endMoment.get("months"),
              endMoment.get("days"),
              endMoment.get("hours"),
              endMoment.get("minutes"),
              endMoment.get("milliseconds")
            ),
          };
        });

        setMyEventsList(eventsList);
      }
      setCalendarLoading(false);
    } catch (error) {
      setCalendarLoading(false);
    }
  };

  const dispatch = useAppDispatch();
  const {
    error,
    data,
    data: { weightTracker = {} } = {},
  } = useQuery(WEIGHT_TRACKER, {
    variables: {
      endDate: endDate,
      startDate: startDate,
    },
  });

  useEffect(() => {
    if (data) {
      dispatch(setWeeklyWeightData(data.weightTracker?.entries));
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (token) {
      getSubList();
      getFollowList();
      getCalendarEvents();
      getCourseList();
      getEventList({
        id: "",
        name: "All",
      });
      getEventCategory();
    }
  }, [token]);

  const formatDate = (date, format) => moment(date).format(format);
  const handleSubSeeAllClick = () => {
    router.push("/purchases/subscriptions");
  };
  const handleCourseSeeAllClick = () => {
    router.push("/courses");
  };
  const handleFollowingSeeAllClick = () => {
    router.push("/purchases/subscriptions");
  };
  const handleEventSeeAllClick = () => {
    router.push("/event");
  };
  const extractContent = (html) => {
    let characterLength = 90;
    if (html && html.length > characterLength) {
      return (
        <span
          dangerouslySetInnerHTML={{
            __html: html.slice(0, characterLength).concat("..."),
          }}
        ></span>
      );
    } else {
      return (
        <span
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        ></span>
      );
    }
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const kcalConsumed = [
    {
      label: "Carbs (20/100 gm)",
      value: 70,
      color: "#FF73F8",
    },
    {
      label: "Fat (0.02/1 gm)",
      value: 50,
      color: "#00E0FC",
    },
    {
      label: "Protein (23/30 gm)",
      value: 90,
      color: "#FF5E54",
    },
  ];
  return (
    <div css={myDashboardStyle} className="myDashboard-container">
      <div className="container">
        <div className="row mb-4">
          <div className="col-12 col-sm-8 d-sm-flex align-items-sm-end">
            <span className="user-name">Hello {user?.name},</span>
          </div>
          <div className="col-12 col-sm-4">
            <BottomDashNav />
          </div>
        </div>
        <div className="main-container">
          <div className="row mt-0 mt-sm-5">
            <div className="col-lg-8">
              <div className="row">
                <div className="col-lg-6">
                  <div className="card-box mobile-box pr-3">
                    <div className="total-count">Your</div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="subhead">Subscriptions ({totalSub})</div>
                    </div>
                    <div className="list-container">
                      {subLoading && <SpinnerLoader />}
                      {!subLoading && (!subList || subList.length === 0) && (
                        <div className="text-center w-100 p-2">
                          <p className="no-record-color">
                            You have no Subscriptions yet.
                          </p>
                          <a className="link text-center" href="/professionals">
                            Discover Professionals
                          </a>
                        </div>
                      )}
                      {!subLoading && subList && subList.length > 0 && (
                        <Scrollbars
                          universal
                          renderView={(props) => (
                            <div {...props} className="scroll-inner" />
                          )}
                          renderThumbVertical={(props) => (
                            <div {...props} className="thumb-vertical" />
                          )}
                        >
                          {subList.map((c, k) => {
                            const userName = c.product[0].name;

                            return (
                              <div className="list-row" key={k}>
                                <div className="img-box">
                                  {c.product[0].img ? (
                                    <img src={c.product[0].img} alt="default" />
                                  ) : (
                                    <div className="name-world">
                                      <span className="name-inner-container">
                                        {userName
                                          .split(" ")
                                          ?.map((n) => n[0])
                                          ?.join("")
                                          ?.slice(0, 2) || "NA"}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className="info-box">
                                  <div className="bold-text">{userName}</div>
                                </div>
                              </div>
                            );
                          })}
                        </Scrollbars>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="card-box mobile-box pr-3">
                    <div className="total-count">People you are</div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="subhead">Following ({totalFollow})</div>
                    </div>
                    <div className="list-container">
                      {followLoading && <SpinnerLoader />}
                      {!followLoading &&
                        (!followList || followList.length === 0) && (
                          <div className="text-center w-100 p-2">
                            <p className="no-record-color">
                              You are not Following anyone yet.
                            </p>
                            <a className="link text-center" href="/">
                              Follow Elxr Professionals
                            </a>
                          </div>
                        )}
                      {!followLoading &&
                        followList &&
                        followList.length > 0 && (
                          <Scrollbars
                            universal
                            renderView={(props) => (
                              <div {...props} className="scroll-inner" />
                            )}
                            renderThumbVertical={(props) => (
                              <div {...props} className="thumb-vertical" />
                            )}
                          >
                            {followList.map((c, k) => {
                              const userName = "";
                              return (
                                <a className="list-row" key={k} href={c?.link}>
                                  <div className="img-box small-box">
                                    {c?.avatar_urls?.thumb ? (
                                      <img
                                        src={c?.avatar_urls?.thumb}
                                        alt="default"
                                      />
                                    ) : (
                                      <div className="name-world">
                                        <span className="name-inner-container">
                                          {userName}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  <div className="info-box">
                                    <div className="bold-text">{c?.name}</div>
                                    <div className="description-text">
                                      {c.mention_name}
                                    </div>
                                  </div>
                                </a>
                              );
                            })}
                          </Scrollbars>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card-box course-box pr-3">
                <div className="total-count">your</div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="subhead">Courses ({totalCourse})</div>
                </div>
                <div className="list-container">
                  <Scrollbars
                    universal
                    renderView={(props) => (
                      <div {...props} className="scroll-inner" />
                    )}
                    renderThumbVertical={(props) => (
                      <div {...props} className="thumb-vertical" />
                    )}
                  >
                    {courseLoading && <SpinnerLoader />}
                    {!courseLoading && (!courses || courses.length === 0) && (
                      <div className="text-center w-100 p-2">
                        <p className="no-record-color">
                          You have not taken any Courses yet.
                        </p>
                        <a className="link text-center" href="/courses">
                          Explore courses
                        </a>
                      </div>
                    )}
                    {!courseLoading &&
                      courses &&
                      courses.length > 0 &&
                      courses.map((c, k) => {
                        return (
                          <div className="list-row pr-0 pr-sm-2" key={k}>
                            <a className="img-box" href={c?.link}>
                              <img
                                src={
                                  c.course_img ? c.course_img : "/img/user.png"
                                }
                                alt="default"
                              />
                            </a>
                            <div className="info-box">
                              <div className="small-image-container">
                                <div className="author-box"></div>
                                <div className="count-box">{c?.lessons}</div>
                              </div>
                              <div className="bold-text">
                                {c?.title?.rendered}
                              </div>
                              <div className="description-text">
                                {extractContent(c?.content?.rendered)}
                              </div>
                              <div className="mt-3 text-center d-block d-sm-none">
                                <button
                                  className="btn btn-primary continue-btn"
                                  onClick={() =>
                                    (window.location.href = c?.link)
                                  }
                                >
                                  Continue Learning
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </Scrollbars>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyDashboard;
