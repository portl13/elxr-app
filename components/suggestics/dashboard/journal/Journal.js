/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/prefer-default-export */
import React, { useEffect } from "react";

import { Divider, Container } from "@material-ui/core";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../store/store";
import { FoodLog } from "./food-log/FoodLog";
import { WaterLog } from "./water-log/WaterLog";
import WeightLog from "./weight-log/WeightLog";
import { DaySelector } from "./day-selector/DaySelector";
import { ProgressChartNew } from "./progress-chart-new/ProgressChartNew";
import { WeeklyJournalData } from "./weekly-journal-data/WeeklyJournalData";
import { DATE_FORMAT } from "../../../../CommonConstants";
import { setDaysAgoIndex } from "../../../../store/features/journal/journal-slice";
import { BottomDashNav } from "../../bottom-dash-nav/BottomDashNav";

export function Journal({ header = true }) {
  const daysAgoIndex = useAppSelector((state) => state.journal.daysAgoIndex);

  const today = dayjs();
  const date = today.subtract(daysAgoIndex, "day");
  const dateString = date.format(DATE_FORMAT);
  const startWeekString = date.subtract(6, "day").format(DATE_FORMAT);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDaysAgoIndex(0));
  }, []);

  return (
    <div className="Journal">
      <Container
        maxWidth="lg"
        className="main-inner d-flex flex-column justify-content-between"
      >
        <div>
          <div className="row">
            {header && (
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="d-flex justify-content-between align-items-start page-header">
                  <div className="journalTitle">
                    <h1 className="text-white">Journal</h1>
                  </div>
                  <BottomDashNav />
                </div>
              </div>
            )}
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-3">
              <WeeklyJournalData start={startWeekString} end={dateString} />
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="dateActivity">
                <DaySelector />
                <ProgressChartNew />
              </div>
            </div>
          </div>

          <div className="row logRow">
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <FoodLog dateString={dateString} />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <WaterLog dateString={dateString} />
            </div>

            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <WeightLog dateString={dateString} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
