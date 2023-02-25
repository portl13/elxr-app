import React from "react";

import { WeeklyWaterData } from "./weekly-water-data/WeeklyWaterData";
import { WeeklyMealTrackerData } from "./weekly-meal-tracker-data/WeeklyMealTrackerData";
import { WeeklyWeightData } from "./weekly-weight-data/WeeklyWeightData";

export function WeeklyJournalData(props) {
  return (
    <div className="WeeklyJournalData">
      {/* TODO: move other polling items here */}
      <WeeklyMealTrackerData start={props.start} end={props.end} />
      <WeeklyWaterData start={props.start} end={props.end} />
      <WeeklyWeightData start={props.start} end={props.end} />
    </div>
  );
}
