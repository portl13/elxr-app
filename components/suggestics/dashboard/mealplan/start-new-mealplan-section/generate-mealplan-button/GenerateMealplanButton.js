import React from "react";
import { useAlert } from "react-alert";

import { useMutation } from "@apollo/client";
import { GENERATE_MEALPLAN } from "../../../../../../graphql/suggestic-mutatons";
import { useAppDispatch } from "../../../../../../store/store";
import { TIMEOUT } from "../../../../../../utils/constant";
import { setCurrentMealplan } from "../../../../../../store/features/mealplan/mealplan-slice";
import dayjs from "dayjs";
import GradientButton from "../../../../../ui/button/GradientButton";

export const GenerateMealplanButton = () => {
  const dispatch = useAppDispatch();
  const alert = useAlert();

  const [generateNewMealPlan, { loading /*data, error */ }] =
    useMutation(GENERATE_MEALPLAN);

  const handleClick = () => {
    generateNewMealPlan({
      variables: {
        ignoreLock: true,
        includeFavorites: true,
      },
    }).then((value) => {
      if (
        value.data?.generateMealPlan?.success &&
        value.data?.generateMealPlan?.mealPlan
      ) {
        // console.log(value);
        dispatch(
          setCurrentMealplan(
            [...value.data.generateMealPlan.mealPlan]
              .sort((item1, item2) => {
                if (item1 === item2) return 0;
                return dayjs(item1.date).isBefore(dayjs(item2.date)) ? -1 : 1;
              })
              .slice(-7)
          )
        );
        alert.success("A new Meal Plan is successfully generated!", TIMEOUT);
      } else {
        alert.error(
          "An error occurred while generating a new Meal Plan...",
          TIMEOUT
        );
      }
    });
  };

  return (
    <div className="GenerateMealplanButton">
      <GradientButton type="submit" isLoading={loading} onClick={handleClick}>
        Generate Meal Plan
      </GradientButton>
    </div>
  );
};
