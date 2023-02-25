import React from "react";

import {
  Motivation,
  setMainMotivation,
} from "../../../../store/features/onboarding-prefs/onboarding-prefs-slice";
import { useAppDispatch } from "../../../../store/store";

export const MainMotivationSlide = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="MainMotivationSlide">
      <p className="question">
        <span>What is your main motivation?</span>
        <br />
        <span className="text-muted">Choose one</span>
      </p>
      {Object.values(Motivation)
        .filter((item) => item !== Motivation.NotSpecified)
        .map((motivation) => (
          <p key={motivation}>
            <input
              className="choice"
              type="radio"
              value={motivation}
              name="motivation"
              onChange={(e) => dispatch(setMainMotivation(e.target.value))}
            />{" "}
            {motivation}
          </p>
        ))}
    </div>
  );
};
