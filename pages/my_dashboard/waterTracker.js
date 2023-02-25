import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store/store";
import dayjs from "dayjs";
import { Container, Button, Typography } from "@material-ui/core";
import { WaterLog } from "../../components/suggestics/dashboard/journal/water-log/WaterLog";
import { DATE_FORMAT } from "../../CommonConstants";
import { HYDRATION } from "../../graphql/suggestic-queries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { WaterGraph } from "../../components/suggestics/dashboard/journal/water-log/water-graph/WaterGraph";
import { setWeeklyWaterIntake } from "../../store/features/journal/journal-slice";
import { useSelector } from "react-redux";
import { GradientCircularProgress } from "react-circular-gradient-progress";

function waterTracker() {
  const today = dayjs();
  const todayString = dayjs().format(DATE_FORMAT);
  const startWeekString = today.subtract(6, "day").format(DATE_FORMAT);

  const router = useRouter();
  const [waterData, setWaterData] = useState([]);
  const [intake, setIntake] = useState(0);
  const [goal, setGoal] = useState(0);
  const [hyderationData, setHyderationData] = useState([]);

  const dispatch = useAppDispatch();

  const { waterIntake } = useSelector((state) => state.journal);

  const { error, data, refetch /*loading, networkStatus*/ } = useQuery(
    HYDRATION,
    {
      variables: {
        startDate: startWeekString,
        endDate: todayString,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    refetch().then((value) => {
      if (value.data?.hydration) {
        setHyderationData(value?.data?.hydration);

        dispatch(setWeeklyWaterIntake(value.data.hydration));
        setWaterData(value.data.hydration);
        let goals = value.data.hydration.find(
          (i) => i.date === todayString
        )?.goal;
        setGoal(goals || 8);
      }
    }); // makes sure updates show up in chart when user makes changes
  }, [waterIntake]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      dispatch(setWeeklyWaterIntake(data.hydration));
      setWaterData(data.hydration);
    }
  }, [data]);

  useEffect(() => {
    var lastScrollTop = 0;
    let headerEle = document.querySelector(".backtopage");
    document.addEventListener("scroll", () => {
      var st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        headerEle.classList.add("fixed-top");
      } else {
        headerEle.classList.remove("fixed-top");
      }
    });
  }, []);

  return (
    <Container
      maxWidth="lg"
      className="main-inner d-flex flex-column justify-content-between vh100"
    >
      <div>
        <div className="dashboard-container-wrap waterlog-detail">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 backtopage">
              <div onClick={() => router.back()} className="back-btn d-flex">
                <img
                  src="/img/back-arrow.svg"
                  className="d-none d-md-block"
                  alt="back"
                />
                <img
                  src="/img/back-icon.svg"
                  className="d-md-none"
                  alt="back"
                />
                <span>Back to Dashboard</span>
              </div>
            </div>

            <div className="col-sm-12 col-md-12 col-lg-8">
              <div className="dashboard-card detail_card">
                <div className="detail_title">
                  <p>track water intake</p>
                  <h1>Drink water</h1>
                  {/* <p>hai + {daysAgoIndex}</p> */}
                </div>
                <p>
                  Today your hydration goal is {goal} glasses. Stay hydrated!
                </p>
                <div className="weight-log-graph-wrap">
                  <WaterGraph dateString={todayString} isWeek={false} />
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-12 col-lg-4">
              <div className="dashboard-card right_bar">
                <h2>Log Water intakes</h2>
                <div className="logged-lbs">
                  <span>Today ({today.format("MMM DD, YYYY")})</span>
                </div>
                <div className="water-log-wrap">
                  <div className="water-log-bar">
                    <GradientCircularProgress
                      progress={(waterIntake / goal) * 100} // use this to show progress
                      strokeWidth={2}
                      size={80}
                      emptyColor="#c8dbf12e"
                      startColor="#00e0fc"
                      middleColor="#ff73f8"
                      endColor="#f5d1b5"
                    />
                    <img src="/img/water-glass.svg" alt="img" />
                  </div>
                  <div className="water-log-value">
                    {waterIntake}/{goal}
                  </div>
                </div>
                <WaterLog dateString={todayString} />
                <div className="logDetail">
                  {waterData.length > 0 && <p className="log-heading">Log:</p>}
                  <ul className="list-unstyled log_list">
                    {Array.from(waterData)
                      .reverse()
                      ?.map((item, i) => (
                        <li>
                          <img src="/img/log-edit.svg" />
                          <p>
                            <strong>
                              You intake {item.quantity} glasses on:
                            </strong>{" "}
                            <span>
                              {dayjs(item.date).format("MMM DD, YYYY")}
                            </span>
                          </p>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright-text footer-mb">
        Copyright © 2010-2023 ELXR. All rights reserved.
      </div>
    </Container>
  );
}

export default waterTracker;
