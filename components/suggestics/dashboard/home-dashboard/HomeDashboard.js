/* eslint-disable */
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import DrinkWaterLog from "./DrinkWaterLog";
import WeightLog from "./WeightLog";
import Notifications from "./Notifications";

function HomeDashboard() {
  const router = useRouter();

  return (
    <div className="dashboard-container-wrap">
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-8">
          <div className="row">
            <div className="col-md-12 col-lg-6">
              <Notifications />
            </div>
            <div className="col-md-12 col-lg-6">
              <WeightLog />
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          {/* <ProgressTracker/> */}
          <DrinkWaterLog />
        </div>
      </div>
    </div>
  );
}

export default HomeDashboard;
