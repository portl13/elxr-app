import React, { useEffect } from "react";

import { useQuery } from "@apollo/client";
import { RecipeMealTime } from "@suggestic/sdk/dist/__generated_sdk";
import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { RECIPES_BY_MEAL_TIME } from "../../../../../graphql/suggestic-queries";
import {
  INITIAL_RECIPE_COUNT,
  RECIPE_COUNT_INCREMENT,
  setBreakfastRecipes,
  setBreakfastRecipesLoading,
  setPaginationLoader,
} from "../../../../../store/features/recipes/recipes-slice";

export function LoadBreakfastRecipes() {
  const breakfastRecipesCount = useAppSelector(
    (state) => state.recipes.breakfastRecipesCount
  );

  const dispatch = useAppDispatch();

  const { loading, error, data /* refetch, networkStatus */ } = useQuery(
    RECIPES_BY_MEAL_TIME,
    {
      variables: {
        first: breakfastRecipesCount,
        hidePurchasable: true,
        mealTime: RecipeMealTime.Breakfast,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      dispatch(
        setBreakfastRecipes(
          data?.recipesByMealTime?.edges.map((item) => item.node)
        )
      );
    }
  }, [data]);

  useEffect(() => {
    breakfastRecipesCount === INITIAL_RECIPE_COUNT &&
      dispatch(setBreakfastRecipesLoading(loading));
  }, [loading]);

  return (
    // <div className="LoadBreakfastRecipes"/>
    <></>
  );
}
