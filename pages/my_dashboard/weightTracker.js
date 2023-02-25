import React, { useEffect, useState } from "react";
import { Container, Button, Typography } from "@material-ui/core";
import dayjs from "dayjs";
import { useAppDispatch } from "../../store/store";
import { useQuery } from "@apollo/client";
import { WEIGHT_TRACKER } from "../../graphql/suggestic-queries";
import { setWeeklyWeightData } from "../../store/features/journal/journal-slice";
import { DATE_FORMAT } from "../../CommonConstants";
import WeightGraph from "../../components/suggestics/dashboard/journal/weight-log/weight-graph/WeightGraph";
import { LogWeightButton } from "../../components/suggestics/dashboard/journal/weight-log/update-button/LogWeightButton";
import { useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";

function weightTracker() {
  const router = useRouter();
  let today = dayjs();
  const startDate = today.subtract(6, "day").format(DATE_FORMAT);
  const endDate = dayjs().format(DATE_FORMAT);
  const dispatch = useAppDispatch();
  const { weightData } = useSelector((state) => state.journal);
  const { myprofile } = useSelector((state) => state.userProfile);
  const [loading, setLoading] = useState(true);

  const {
    error,
    data,
    data: { weightTracker, weightTracker: { entries = [] } = {} } = {},
    refetch,
  } = useQuery(WEIGHT_TRACKER, {
    variables: {
      endDate: endDate,
      startDate: startDate,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data) {
      dispatch(setWeeklyWeightData(data.weightTracker?.entries));
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    refetch().then((res) =>
      dispatch(setWeeklyWeightData(res?.data.weightTracker?.entries))
    );
  }, [weightData]);

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
        <div className="dashboard-container-wrap waterlog-detail weightlog-detail Journal">
          <div className="row logRow">
            <div className="col-sm-12 col-md-12 col-lg-12 backtopage">
              <div className="back-btn d-flex" onClick={() => router.back()}>
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
              <div className="dashboard-card detail_card weight_card">
                <div className="detail_title">
                  <p>LOG, track &amp; compare</p>
                  <h1>Loose 31 lbs</h1>
                </div>

                <div class="weight-log-row">
                  <div class="weight-log-col">
                    <div class="weight-log-value">
                      {weightTracker?.start || 0} lbs
                    </div>
                    <div class="weight-log-label">Started at</div>
                  </div>
                  <div class="weight-log-col">
                    <div class="weight-log-value">4 Weeks</div>
                    <div class="weight-log-label">Duration</div>
                  </div>
                </div>
                {data?.weightTracker?.entries != 0 && (
                  <div class="weight-goal-note">
                    {loading ? null : (
                      <div>
                        {" "}
                        <img src="/img/happy-smiley.png" alt="img" />
                        <div class="note-text">
                          Wow! You are taking your goal seriously. Good job!
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div class="weight-log-graph-wrap">
                  <WeightGraph isWeek={true} />
                </div>
              </div>
              <div className="dashboard-card detail_card follow_card">
                <p className="follow-heading">Follow to stay on track:</p>

                <ul className="list-unstyled follow_list">
                  <li>
                    <div className="follow-left">
                      <div className="track-icon">
                        <img src="/img/track-icon-1.png" alt="img" />
                      </div>
                      <span>
                        Stay on plan with your meal program:{" "}
                        {myprofile?.programName}
                      </span>
                    </div>
                    <div className="follow-right"></div>
                  </li>
                  <li>
                    <div className="follow-left">
                      <div className="track-icon">
                        <img src="/img/track-icon-2.png" alt="img" />
                      </div>
                      <span>Consume: 300 kcal/day</span>
                    </div>
                    <div className="follow-right"></div>
                  </li>
                  <li>
                    <div className="follow-left">
                      <div className="track-icon">
                        <img src="/img/track-icon-3.png" alt="img" />
                      </div>
                      <span>Burn Calories based on your daily activities</span>
                    </div>
                    <div className="follow-right"></div>
                  </li>
                  <li>
                    <div className="follow-left">
                      <div className="track-icon">
                        <img src="/img/track-icon-4.png" alt="img" />
                      </div>
                      <span>Drink water: 12 cups everyday</span>
                    </div>
                    <div className="follow-right"></div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-sm-12 col-md-12 col-lg-4">
              <div className="dashboard-card right_bar weight_bar WeightLog">
                <figure>
                  <img src="/img/weight-notepad.png" alt="weight" />
                </figure>
                <h2>CURRENT WEIGHT</h2>
                <strong>
                  Keep logging your weight even when there is a difference of a
                  pound!
                </strong>
                {weightTracker?.entries?.length > 0 && (
                  <div className="logged-lbs">
                    <span>
                      Last logged:{" "}
                      {weightTracker?.entries &&
                        weightTracker?.entries[
                          weightTracker?.entries?.length - 1
                        ]?.value}{" "}
                      lbs
                    </span>
                  </div>
                )}

                {/* <div className='weight-form'>
                  <form>
                    <input type="text" name="" placeholder='Weight (lbs)' />
                    <button>Save</button>
                  </form>
                </div> */}
                <div className="weightText">
                  <LogWeightButton dateString={endDate} />
                </div>
                <div className="logDetail">
                  {weightTracker?.entries?.length > 0 && (
                    <p className="log-heading">Log:</p>
                  )}
                  <ul className="list-unstyled">
                    {Array.from(entries)
                      .reverse()
                      .map((i) => (
                        <li>
                          <img src="/img/log-edit.svg" />
                          <p>
                            <strong>You logged {i.value} lbs on:</strong>{" "}
                            <span>{dayjs(i.date).format("MMM DD, YYYY")}</span>
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

export default weightTracker;
