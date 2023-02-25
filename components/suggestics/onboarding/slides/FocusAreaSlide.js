import React from "react";

import {
  FocusArea,
  setFocusArea,
} from "../../../../store/features/onboarding-prefs/onboarding-prefs-slice";
import { useAppDispatch } from "../../../../store/store";

export const FocusAreaSlide = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="FocusAreaSlide">
      <p className="question">
        <span>Which of these areas would you like to focus on?</span>
        <br />
        <span className="text-muted">Choose one</span>
      </p>
      {Object.values(FocusArea)
        .filter((item) => item !== FocusArea.NotSpecified)
        .map((focus) => (
          <p key={focus}>
            <input
              className="choice"
              type="radio"
              value={focus}
              name="focus-area"
              onChange={(e) => dispatch(setFocusArea(e.target.value))}
            />{" "}
            {focus}
          </p>
        ))}
    </div>
  );
};
