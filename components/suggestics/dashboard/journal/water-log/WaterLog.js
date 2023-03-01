/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { Typography } from "@material-ui/core";
import { useAppSelector } from "../../../../../store/store";
import { IncreaseDecreaseButton } from "./increase-decrease-button/IncreaseDecreaseButton";
import { WaterGraph } from "./water-graph/WaterGraph";
import { useRouter } from "next/router";

export function WaterLog(props) {
  const waterIntake = useAppSelector((state) => state.journal.waterIntake);
  const { pathname } = useRouter();

  return (
    <div className="WaterLog">
      <div className="log_top">
        <div className="log_heading">
          <img src="/img/glass.svg" alt="ELXR" />
          <h3>Drink water</h3>
        </div>
        <strong>
          Check off your accomplishments for the day or mark as skipped
        </strong>
      </div>
      <div className="waterIntake">
        <div className="intakeTop">
          <img src="/img/glass-small.svg" alt="ELXR" />
          <span>Water Intake</span>
        </div>
        <p>
          Intake for the day:{" "}
          <strong>
            <span>
              <span>{waterIntake}</span>
              /8
            </span>{" "}
            glasses
          </strong>{" "}
        </p>
        <WaterGraph dateString={props.dateString} isWeek />
      </div>
      <div className="waterMapping">
        <div className="mapText">
          <Typography variant="h5">
            {" "}
            {pathname === "/my_dashboard/journal" && "Log:"}{" "}
            <span>{waterIntake}</span>
            /8 Cups{" "}
          </Typography>
        </div>
        <div className="mapArrow">
          <ul className="list-unstyled">
            <li>
              <IncreaseDecreaseButton
                increase={false}
                dateString={props.dateString}
              />
            </li>
            <li>
              <IncreaseDecreaseButton increase dateString={props.dateString} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
