import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { useQuery } from "@apollo/client";
import { RECIPES_BY_MEAL_TIME } from "../../../../../graphql/suggestic-queries";
import {
  INITIAL_RECIPE_COUNT,
  RECIPE_COUNT_INCREMENT,
  setLunchRecipes,
  setLunchRecipesLoading,
  setPaginationLoader,
} from "../../../../../store/features/recipes/recipes-slice";
import { RecipeMealTime } from "@suggestic/sdk/dist/__generated_sdk";

export const LoadLunchRecipes = () => {
  const lunchRecipesCount = useAppSelector(
    (state) => state.recipes.lunchRecipesCount
  );

  const dispatch = useAppDispatch();

  const { loading, error, data /*refetch, networkStatus*/ } = useQuery(
    RECIPES_BY_MEAL_TIME,
    {
      variables: {
        first: lunchRecipesCount,
        hidePurchasable: true,
        mealTime: RecipeMealTime.Lunch,
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
        setLunchRecipes(data?.recipesByMealTime?.edges.map((item) => item.node))
      );
    }
  }, [data]);

  useEffect(() => {
    lunchRecipesCount === INITIAL_RECIPE_COUNT &&
      dispatch(setLunchRecipesLoading(loading));
  }, [loading]);

  return (
    // <div className="LoadLunchRecipes"/>
    <></>
  );
};
