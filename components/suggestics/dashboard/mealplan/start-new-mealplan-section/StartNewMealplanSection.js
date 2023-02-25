import React, { useContext } from "react";

import { GenerateMealplanButton } from "./generate-mealplan-button/GenerateMealplanButton";
import { RepeatMealplanButton } from "./repeat-mealplan-button/RepeatMealplanButton";
import { UserContext } from "@context/UserContext";
import { useAppSelector } from "../../../../../store/store";

export const StartNewMealplanSection = () => {
  const user = useContext(UserContext);
  const { firstName, lastName } = useAppSelector((state) => state.userDetails);
  return (
    <div className="StartNewMealplanSection startplan-card">
      <div className="plan-title">NEW WEEK!</div>
      <div className="plan-title">START A NEW PLAN </div>
      <div className="plan-subtitle">
        Hi {firstName} {lastName}, Your meal plan for the week is complete.
        Let's try some new recipes this week. You can now generate a new meal
        plan as per our recommendations!
      </div>

      <div className="plan-card-btns">
        <GenerateMealplanButton />
        <RepeatMealplanButton />
      </div>
    </div>
  );
};
