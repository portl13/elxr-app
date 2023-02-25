import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_MEAL_PLAN } from "@/graphql/suggestic-mutatons";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { GET_CURRENT_MEALPLAN } from "@/graphql/suggestic-queries";
import {
  setCurrentMealplan,
  setRefetchMealPlan,
} from "@/store/features/mealplan/mealplan-slice";
import { setLoaderStatus } from "@/store/features/loader/loader-slice";
import CentereLoader from "@/components/CenterLoader/index";

import { useFavoriteRecipes } from "@/components/suggestics/dashboard/recipes/load-recipes/LoadFavoriteRecipes";

import useEvent from "@/hooks/useEvent";

import { StartNewMealplanSection } from "./start-new-mealplan-section/StartNewMealplanSection";
import { MealplanDisplay } from "./mealplan-display/MealplanDisplay";

export function Mealplan() {
  useFavoriteRecipes();

  const { currentMealplan } = useAppSelector((state) => state.mealplan);

  const isLoading = useAppSelector((state) => state.loader.isLoading);

  const dispatch = useAppDispatch();

  const today = dayjs();

  const { error, data, loading, refetch } = useQuery(GET_CURRENT_MEALPLAN, {
    variables: {
      useDatetime: false,
    },
    notifyOnNetworkStatusChange: true,
  });

  const [generateMealPlan] = useMutation(UPDATE_MEAL_PLAN, "MEDIUM");

  useEffect(() => {
    dispatch(setLoaderStatus(!!loading));
  }, [loading]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }

    if (data) {
      dispatch(
        setCurrentMealplan(
          [...data.mealPlan]
            .sort((item1, item2) => {
              if (item1 === item2) return 0;
              return dayjs(item1.date).isBefore(dayjs(item2.date)) ? -1 : 1;
            })
            .slice(-7)
        )
      );
    }
  }, [data, error]);

  const generateAndReloadMealPlan = useEvent(async () => {
    dispatch(setLoaderStatus(true));

    await generateMealPlan({ variables: { variety: "MEDIUM" } });
    await refetch();
    dispatch(setRefetchMealPlan(false));
  });

  if (isLoading) {
    return (
      <div className="full-page-loader">
        <CentereLoader />
      </div>
    );
  }

  return (
    <div className="Mealplan">
      {!loading && (
        <>
          {(currentMealplan.length === 0 ||
            dayjs(currentMealplan[currentMealplan.length - 1]?.date).isBefore(
              today
            )) && <StartNewMealplanSection />}
          {!(
            currentMealplan.length === 0 ||
            dayjs(currentMealplan[currentMealplan.length - 1]?.date).isBefore(
              today
            )
          ) && <MealplanDisplay updateMealPlan={generateAndReloadMealPlan} />}
        </>
      )}
    </div>
  );
}
